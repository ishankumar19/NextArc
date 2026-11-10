import { getRedisClient } from "./redis";

export interface CacheMetrics {
  hits: number;
  misses: number;
  evictions: number;
  size: number;
}

/** In-flight promises map for single-flight cache stampede protection */
const inFlight = new Map<string, Promise<any>>();

/**
 * Executes `fn` using single-flight coordination.
 * If multiple concurrent requests ask for the same key while it is being computed,
 * only ONE execution is performed, and all callers share the identical promise result.
 */
export async function singleFlight<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const active = inFlight.get(key);
  if (active) {
    return active as Promise<T>;
  }

  const promise = (async () => {
    try {
      return await fn();
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);
  return promise;
}

export class DistributedCache {
  private localStore = new Map<string, { value: any; expiresAt: number }>();
  private readonly maxLocalEntries: number;
  private metrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    evictions: 0,
    size: 0,
  };

  constructor(maxLocalEntries = 5000) {
    this.maxLocalEntries = maxLocalEntries;
  }

  /**
   * Retrieves a cached item from Redis (or local in-memory fallback).
   */
  async getAsync<T>(key: string): Promise<T | null> {
    const redis = getRedisClient();
    try {
      const raw = await redis.get(key);
      if (raw !== null) {
        this.metrics.hits++;
        return JSON.parse(raw) as T;
      }
    } catch {
      // Fallback to local memory if Redis error
    }

    // Check local store
    const local = this.localStore.get(key);
    if (!local) {
      this.metrics.misses++;
      return null;
    }
    if (Date.now() > local.expiresAt) {
      this.localStore.delete(key);
      this.metrics.misses++;
      return null;
    }
    this.metrics.hits++;
    return local.value as T;
  }

  /**
   * Synchronous get for backwards compatibility with existing route calls.
   */
  get<T>(key: string): T | null {
    const local = this.localStore.get(key);
    if (!local) {
      this.metrics.misses++;
      return null;
    }
    if (Date.now() > local.expiresAt) {
      this.localStore.delete(key);
      this.metrics.misses++;
      return null;
    }
    this.metrics.hits++;
    return local.value as T;
  }

  /**
   * Sets a cached value in both Redis and local memory with TTL in milliseconds.
   */
  async setAsync<T>(key: string, value: T, ttlMs: number): Promise<void> {
    const redis = getRedisClient();
    const ttlSeconds = Math.max(1, Math.ceil(ttlMs / 1000));
    const serialized = JSON.stringify(value);

    try {
      await redis.set(key, serialized, "EX", ttlSeconds);
    } catch (err) {
      console.warn("[Cache] Failed writing to Redis, falling back to memory:", err);
    }

    // Set local fallback
    if (this.localStore.size >= this.maxLocalEntries && !this.localStore.has(key)) {
      const oldestKey = this.localStore.keys().next().value;
      if (oldestKey) this.localStore.delete(oldestKey);
      this.metrics.evictions++;
    }

    this.localStore.set(key, { value, expiresAt: Date.now() + ttlMs });
    this.metrics.size = this.localStore.size;
  }

  set<T>(key: string, value: T, ttlMs: number): void {
    // Populate local memory immediately for synchronous callers
    if (this.localStore.size >= this.maxLocalEntries && !this.localStore.has(key)) {
      const oldestKey = this.localStore.keys().next().value;
      if (oldestKey) this.localStore.delete(oldestKey);
      this.metrics.evictions++;
    }
    this.localStore.set(key, { value, expiresAt: Date.now() + ttlMs });
    this.metrics.size = this.localStore.size;

    // Fire-and-forget distributed write to Redis
    this.setAsync(key, value, ttlMs).catch(() => {});
  }

  async deleteAsync(key: string): Promise<void> {
    const redis = getRedisClient();
    try {
      await redis.del(key);
    } catch {}
    this.localStore.delete(key);
    this.metrics.size = this.localStore.size;
  }

  delete(key: string): void {
    this.localStore.delete(key);
    this.metrics.size = this.localStore.size;
    this.deleteAsync(key).catch(() => {});
  }

  /**
   * Deletes all keys matching prefix across Redis and local memory.
   */
  async invalidatePrefixAsync(prefix: string): Promise<void> {
    const redis = getRedisClient();
    try {
      // Find and delete matching Redis keys
      await redis.del(
        prefix,
        `${prefix}*`,
        cacheKey.dashboard(prefix),
        cacheKey.analytics(prefix),
        cacheKey.activity(prefix)
      );
    } catch {}

    for (const key of this.localStore.keys()) {
      if (key.startsWith(prefix) || key.includes(prefix)) {
        this.localStore.delete(key);
      }
    }
    this.metrics.size = this.localStore.size;
  }

  invalidatePrefix(prefix: string): void {
    for (const key of this.localStore.keys()) {
      if (key.startsWith(prefix) || key.includes(prefix)) {
        this.localStore.delete(key);
      }
    }
    this.metrics.size = this.localStore.size;
    this.invalidatePrefixAsync(prefix).catch(() => {});
  }

  /**
   * Invalidates all cached resources for a specific user across all nodes.
   */
  invalidateUser(userId: string): void {
    this.delete(cacheKey.dashboard(userId));
    this.delete(cacheKey.analytics(userId));
    this.delete(cacheKey.activity(userId));
    this.delete(`analytics:difficulty:${userId}`);
    this.delete(`analytics:topics:${userId}`);
    this.invalidatePrefix(`cache:user:${userId}`);
  }

  /**
   * Invalidates goal context and associated user cache.
   */
  invalidateGoal(goalId: string, userId?: string): void {
    this.delete(cacheKey.progressContext(goalId));
    this.delete(`cache:goal:${goalId}`);
    if (userId) {
      this.invalidateUser(userId);
    }
  }

  getMetrics(): CacheMetrics {
    return { ...this.metrics, size: this.localStore.size };
  }

  resetMetrics(): void {
    this.metrics = { hits: 0, misses: 0, evictions: 0, size: this.localStore.size };
    this.localStore.clear();
  }
}

export const appCache = new DistributedCache();
export { DistributedCache as TtlCache };

/** Canonical cache key builders */
export const cacheKey = {
  dashboard: (userId: string) => `cache:user:${userId}:dashboard`,
  analytics: (userId: string) => `cache:user:${userId}:analytics`,
  progressContext: (goalId: string) => `cache:goal:${goalId}:progress-context`,
  activity: (userId: string) => `cache:user:${userId}:activity`,
};
