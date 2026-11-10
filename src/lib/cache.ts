interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export interface CacheMetrics {
  hits: number;
  misses: number;
  evictions: number;
  size: number;
}

export class TtlCache {
  private store = new Map<string, CacheEntry<unknown>>();
  private readonly maxEntries: number;
  private metrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    evictions: 0,
    size: 0,
  };

  constructor(maxEntries = 5000) {
    this.maxEntries = maxEntries;
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.metrics.misses++;
      return null;
    }
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.metrics.misses++;
      this.metrics.size = this.store.size;
      return null;
    }
    this.metrics.hits++;
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlMs: number): void {
    const now = Date.now();

    // Bound memory: if capacity exceeded, prune expired entries first
    if (this.store.size >= this.maxEntries && !this.store.has(key)) {
      this.pruneExpired(now);
      // If still at capacity, evict the oldest entry (FIFO/LRU insertion order)
      if (this.store.size >= this.maxEntries) {
        const oldestKey = this.store.keys().next().value;
        if (oldestKey) {
          this.store.delete(oldestKey);
          this.metrics.evictions++;
        }
      }
    }

    this.store.set(key, { value, expiresAt: now + ttlMs });
    this.metrics.size = this.store.size;
  }

  delete(key: string): void {
    this.store.delete(key);
    this.metrics.size = this.store.size;
  }

  /** Deletes all keys whose string starts with `prefix`. */
  invalidatePrefix(prefix: string): void {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
      }
    }
    this.metrics.size = this.store.size;
  }

  /**
   * Invalidates all cached data associated with a specific user:
   * dashboard, analytics, and activity feed.
   */
  invalidateUser(userId: string): void {
    this.delete(cacheKey.dashboard(userId));
    this.delete(cacheKey.analytics(userId));
    this.delete(cacheKey.activity(userId));
    this.delete(`analytics:difficulty:${userId}`);
    this.delete(`analytics:topics:${userId}`);
  }

  /**
   * Invalidates goal-specific context and optionally the user's dashboard.
   */
  invalidateGoal(goalId: string, userId?: string): void {
    this.delete(cacheKey.progressContext(goalId));
    if (userId) {
      this.invalidateUser(userId);
    }
  }

  getMetrics(): CacheMetrics {
    return { ...this.metrics, size: this.store.size };
  }

  resetMetrics(): void {
    this.metrics = { hits: 0, misses: 0, evictions: 0, size: this.store.size };
  }

  private pruneExpired(now: number): void {
    for (const [k, v] of this.store.entries()) {
      if (now > v.expiresAt) {
        this.store.delete(k);
      }
    }
  }
}

export const appCache = new TtlCache();

/** Canonical cache key builders. */
export const cacheKey = {
  dashboard: (userId: string) => `dashboard:${userId}`,
  analytics: (userId: string) => `analytics:${userId}`,
  progressContext: (goalId: string) => `progress-context:${goalId}`,
  activity: (userId: string) => `activity:${userId}`,
};
