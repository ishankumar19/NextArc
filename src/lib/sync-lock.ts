// In-memory set of active sync locks, keyed as `${userId}:${platform}`
const activeLocks = new Set<string>();

function lockKey(userId: string, platform: string): string {
  return `${userId}:${platform}`;
}

/**
 * Attempts to acquire a sync lock for the given user+platform pair.
 * Returns true if the lock was acquired, false if already locked.
 */
export function acquireSyncLock(userId: string, platform: string): boolean {
  const key = lockKey(userId, platform);
  if (activeLocks.has(key)) return false;
  activeLocks.add(key);
  return true;
}

/**
 * Releases the sync lock for the given user+platform pair.
 */
export function releaseSyncLock(userId: string, platform: string): void {
  activeLocks.delete(lockKey(userId, platform));
}

/**
 * Returns true if a sync is currently in progress for the given user+platform.
 */
export function isSyncLocked(userId: string, platform: string): boolean {
  return activeLocks.has(lockKey(userId, platform));
}
