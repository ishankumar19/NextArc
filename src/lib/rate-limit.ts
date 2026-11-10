import { NextResponse } from "next/server";

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

// Presets
export const AUTH_RATE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 10 };
export const SYNC_RATE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 30 };
export const READ_RATE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 100 };

const MAX_RATE_LIMIT_KEYS = 10_000;

// Map<key, timestamps[]>
const store = new Map<string, number[]>();

let totalRateLimitedCount = 0;

/**
 * Extracts sanitized rate-limit key from request (IP-based).
 * Truncates to 64 chars to prevent memory expansion attacks via bloated headers.
 */
export function getRateLimitKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const rawIp = forwarded.split(",")[0].trim();
    return rawIp.slice(0, 64);
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim().slice(0, 64);
  }
  return "unknown";
}

/**
 * Sliding-window in-memory rate limiter with bounded memory and auto-pruning.
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  let timestamps = store.get(key) ?? [];

  // Prune old timestamps outside the current window
  timestamps = timestamps.filter((t) => t > windowStart);

  // If no recent timestamps remain, remove the key entirely to prevent memory leaks
  if (timestamps.length === 0) {
    store.delete(key);
  }

  const resetAt = timestamps.length > 0 ? timestamps[0] + config.windowMs : now + config.windowMs;

  if (timestamps.length >= config.maxRequests) {
    store.set(key, timestamps);
    totalRateLimitedCount++;
    return { allowed: false, remaining: 0, resetAt };
  }

  // Memory safeguard: if unique keys exceed threshold, evict the oldest key
  if (store.size >= MAX_RATE_LIMIT_KEYS && !store.has(key)) {
    const oldestKey = store.keys().next().value;
    if (oldestKey) {
      store.delete(oldestKey);
    }
  }

  timestamps.push(now);
  store.set(key, timestamps);

  return {
    allowed: true,
    remaining: config.maxRequests - timestamps.length,
    resetAt,
  };
}

/**
 * Convenience wrapper: returns a 429 NextResponse or null if allowed.
 */
export function applyRateLimit(req: Request, config: RateLimitConfig): Response | null {
  const key = getRateLimitKey(req);
  const { allowed, remaining, resetAt } = checkRateLimit(key, config);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later.", code: "RATE_LIMITED" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(config.maxRequests),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
          "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  return null;
}

/**
 * Resets the rate limiter store (useful in testing).
 */
export function resetRateLimits(): void {
  store.clear();
  totalRateLimitedCount = 0;
}

/**
 * Diagnostic metrics for observability.
 */
export function getRateLimitMetrics(): { activeKeys: number; totalRateLimited: number } {
  return {
    activeKeys: store.size,
    totalRateLimited: totalRateLimitedCount,
  };
}
