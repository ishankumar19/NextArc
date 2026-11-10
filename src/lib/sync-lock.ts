import crypto from "node:crypto";
import { getRedisClient } from "./redis";

export const DEFAULT_SYNC_LOCK_TTL_MS = 5 * 60 * 1000; // 5 minutes max lease

// In-memory fallback map for offline tests: key -> { token, expiresAt }
const inMemoryLocks = new Map<string, { token: string; expiresAt: number }>();

function lockKey(userId: string, platform: string): string {
  return `synclock:${userId}:${platform}`;
}

export interface SyncLockHandle {
  acquired: boolean;
  token?: string;
  key: string;
}

// Atomic lock release Lua script (fencing token verification)
const RELEASE_LOCK_LUA = `
if redis.call('get', KEYS[1]) == ARGV[1] then
  return redis.call('del', KEYS[1])
else
  return 0
end
`;

/**
 * Atomically acquires a distributed sync lock backed by Redis with a cryptographic ownership token.
 * Prevents multiple workers or application nodes from syncing the same user+platform concurrently.
 */
export async function acquireDistributedSyncLock(
  userId: string,
  platform: string,
  ttlMs: number = DEFAULT_SYNC_LOCK_TTL_MS
): Promise<SyncLockHandle> {
  const key = lockKey(userId, platform);
  const token = crypto.randomUUID();
  const redis = getRedisClient();

  try {
    const res = await redis.set(key, token, "PX", ttlMs, "NX");
    if (res === "OK") {
      inMemoryLocks.set(key, { token, expiresAt: Date.now() + ttlMs });
      return { acquired: true, token, key };
    }
    // Key already locked in Redis
    return { acquired: false, key };
  } catch (err) {
    console.warn("[SyncLock] Redis acquire error, falling back to local lease:", err);
  }

  // In-memory fallback check
  const now = Date.now();
  const existing = inMemoryLocks.get(key);
  if (existing && now < existing.expiresAt) {
    return { acquired: false, key };
  }

  inMemoryLocks.set(key, { token, expiresAt: now + ttlMs });
  return { acquired: true, token, key };
}

/**
 * Safely releases the lock ONLY if the caller presents the verified ownership token.
 * Prevents a delayed worker from releasing a lock that expired and was re-acquired by another worker.
 */
export async function releaseDistributedSyncLock(
  userId: string,
  platform: string,
  token?: string
): Promise<boolean> {
  const key = lockKey(userId, platform);
  const redis = getRedisClient();

  if (token) {
    try {
      const res = await redis.eval(RELEASE_LOCK_LUA, 1, key, token);
      if (Number(res) === 1) {
        inMemoryLocks.delete(key);
        return true;
      }
    } catch {}
  } else {
    try {
      await redis.del(key);
    } catch {}
  }

  // Fallback cleanup
  const current = inMemoryLocks.get(key);
  if (!token || current?.token === token) {
    inMemoryLocks.delete(key);
    return true;
  }
  return false;
}

/**
 * Synchronous wrapper for existing synchronous callers and backward compatibility.
 */
export function acquireSyncLock(
  userId: string,
  platform: string,
  ttlMs: number = DEFAULT_SYNC_LOCK_TTL_MS
): boolean {
  const key = lockKey(userId, platform);
  const now = Date.now();
  const existing = inMemoryLocks.get(key);

  if (existing && now < existing.expiresAt) {
    return false;
  }

  const token = crypto.randomUUID();
  inMemoryLocks.set(key, { token, expiresAt: now + ttlMs });

  // Fire-and-forget sync to Redis
  const redis = getRedisClient();
  redis.set(key, token, "PX", ttlMs, "NX").catch(() => {});

  return true;
}

export function releaseSyncLock(userId: string, platform: string): void {
  const key = lockKey(userId, platform);
  inMemoryLocks.delete(key);
  const redis = getRedisClient();
  redis.del(key).catch(() => {});
}

export function isSyncLocked(userId: string, platform: string): boolean {
  const key = lockKey(userId, platform);
  const existing = inMemoryLocks.get(key);
  if (!existing) return false;
  if (Date.now() >= existing.expiresAt) {
    inMemoryLocks.delete(key);
    return false;
  }
  return true;
}

export function getLockRemainingMs(userId: string, platform: string): number {
  const key = lockKey(userId, platform);
  const existing = inMemoryLocks.get(key);
  if (!existing) return 0;
  return Math.max(0, existing.expiresAt - Date.now());
}

export function clearAllSyncLocks(): void {
  inMemoryLocks.clear();
  const redis = getRedisClient();
  redis.del("synclock:*").catch(() => {});
}
