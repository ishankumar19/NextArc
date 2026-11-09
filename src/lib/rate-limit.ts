import { NextResponse } from "next/server";

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

// Presets
export const AUTH_RATE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 10 };
export const SYNC_RATE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 30 };
export const READ_RATE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 100 };

// Map<key, timestamps[]>
const store = new Map<string, number[]>();

/**
 * Extracts rate-limit key from request (IP-based).
 */
export function getRateLimitKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Sliding-window in-memory rate limiter.
 * Returns allowed, remaining, and resetAt timestamp.
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

  const resetAt = timestamps.length > 0 ? timestamps[0] + config.windowMs : now + config.windowMs;

  if (timestamps.length >= config.maxRequests) {
    store.set(key, timestamps);
    return { allowed: false, remaining: 0, resetAt };
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
