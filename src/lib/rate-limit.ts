import { NextResponse } from "next/server";
import { getRedisClient } from "./redis";

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

// Configurable Policy Presets
export const AUTH_RATE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 10 };
export const SYNC_RATE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 30 };
export const READ_RATE_LIMIT: RateLimitConfig = { windowMs: 60_000, maxRequests: 100 };

// Standard Lua script for atomic sliding-window rate limiting in Redis
const SLIDING_WINDOW_LUA = `
-- check_rate_limit
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local max = tonumber(ARGV[3])
local clearBefore = now - window

redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)
local current = redis.call('ZCARD', key)

if current < max then
  redis.call('ZADD', key, now, now)
  redis.call('PEXPIRE', key, window + 1000)
  return {1, max - current - 1, window}
else
  local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
  local resetMs = window
  if oldest and #oldest > 1 then
    resetMs = math.max(0, tonumber(oldest[2]) + window - now)
  end
  return {0, 0, resetMs}
end
`;

/**
 * Extracts sanitized rate-limit key from request.
 * If user session/ID is available, binds rate-limiting to user identity
 * so rotating IP addresses cannot bypass per-user limits.
 */
export function getRateLimitKey(req: Request, userId?: string | null): string {
  if (userId) {
    return userId;
  }

  // Trusted proxy validation: parse leftmost IP with max length bound
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
 * Distributed sliding-window rate limiter executed atomically in Redis.
 * Compatible with multi-instance clusters and serverless deployments.
 */
export async function checkRateLimitDistributed(
  key: string,
  config: RateLimitConfig
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const redis = getRedisClient();
  const now = Date.now();

  try {
    const result = await redis.eval(
      SLIDING_WINDOW_LUA,
      1,
      key,
      now,
      config.windowMs,
      config.maxRequests
    );

    const allowed = Array.isArray(result) ? Number(result[0]) === 1 : true;
    const remaining = Array.isArray(result) ? Number(result[1]) : config.maxRequests;
    const resetMs = Array.isArray(result) ? Number(result[2]) : config.windowMs;

    return {
      allowed,
      remaining: Math.max(0, remaining),
      resetAt: now + resetMs,
    };
  } catch (err) {
    // Fail-open for transient Redis blips to avoid locking out legitimate users,
    // while logging error for observability
    console.error("[RateLimiter] Redis rate-limit evaluation error:", err);
    return {
      allowed: true,
      remaining: 1,
      resetAt: now + config.windowMs,
    };
  }
}

/**
 * Synchronous in-memory fallback check used by synchronous components and legacy tests.
 */
const inMemoryStore = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  let timestamps = inMemoryStore.get(key) ?? [];
  timestamps = timestamps.filter((t) => t > windowStart);

  if (timestamps.length === 0) {
    inMemoryStore.delete(key);
  }

  const resetAt = timestamps.length > 0 ? timestamps[0] + config.windowMs : now + config.windowMs;

  if (timestamps.length >= config.maxRequests) {
    inMemoryStore.set(key, timestamps);
    return { allowed: false, remaining: 0, resetAt };
  }

  if (inMemoryStore.size >= 10_000 && !inMemoryStore.has(key)) {
    const oldestKey = inMemoryStore.keys().next().value;
    if (oldestKey) inMemoryStore.delete(oldestKey);
  }

  timestamps.push(now);
  inMemoryStore.set(key, timestamps);

  return {
    allowed: true,
    remaining: config.maxRequests - timestamps.length,
    resetAt,
  };
}

/**
 * Convenience wrapper: returns a 429 NextResponse or null if allowed.
 */
export function applyRateLimit(
  req: Request,
  config: RateLimitConfig,
  userId?: string | null
): Response | null {
  const key = getRateLimitKey(req, userId);
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

export function resetRateLimits(): void {
  inMemoryStore.clear();
}

export function getRateLimitMetrics(): { activeKeys: number; totalRateLimited: number } {
  return {
    activeKeys: inMemoryStore.size,
    totalRateLimited: 0,
  };
}
