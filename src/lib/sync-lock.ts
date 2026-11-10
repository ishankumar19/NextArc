/**
 * Sync concurrency guard with automatic TTL expiration to prevent permanent deadlocks.
 * Keyed as `${userId}:${platform}` -> expiration timestamp in ms.
 */
export const DEFAULT_SYNC_LOCK_TTL_MS = 5 * 60 * 1000; // 5 minutes max sync duration

const activeLocks = new Map<string, number>();

function lockKey(userId: string, platform: string): string {
  return `${userId}:${platform}`;
}

/**
 * Attempts to acquire a sync lock for the given user+platform pair.
 * If an existing lock has expired past its TTL, it is automatically overridden.
 * Returns true if the lock was acquired, false if a valid lock is still active.
 */
export function acquireSyncLock(
  userId: string,
  platform: string,
  ttlMs: number = DEFAULT_SYNC_LOCK_TTL_MS
): boolean {
  const key = lockKey(userId, platform);
  const now = Date.now();
  const expiresAt = activeLocks.get(key);

  if (expiresAt !== undefined && now < expiresAt) {
    return false; // Valid lock still active
  }

  activeLocks.set(key, now + ttlMs);
  return true;
}

/**
 * Releases the sync lock for the given user+platform pair.
 */
export function releaseSyncLock(userId: string, platform: string): void {
  activeLocks.delete(lockKey(userId, platform));
}

/**
 * Returns true if a valid, unexpired sync lock is currently held.
 */
export function isSyncLocked(userId: string, platform: string): boolean {
  const key = lockKey(userId, platform);
  const expiresAt = activeLocks.get(key);
  if (expiresAt === undefined) return false;
  if (Date.now() >= expiresAt) {
    activeLocks.delete(key);
    return false;
  }
  return true;
}

/**
 * Returns remaining milliseconds until lock expiration, or 0 if unlocked.
 */
export function getLockRemainingMs(userId: string, platform: string): number {
  const key = lockKey(userId, platform);
  const expiresAt = activeLocks.get(key);
  if (!expiresAt) return 0;
  return Math.max(0, expiresAt - Date.now());
}

/**
 * Clears all active locks (useful for test resets).
 */
export function clearAllSyncLocks(): void {
  activeLocks.clear();
}
