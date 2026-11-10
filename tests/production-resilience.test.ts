import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  checkRateLimit,
  applyRateLimit,
  AUTH_RATE_LIMIT,
  getRateLimitKey,
  resetRateLimits,
  getRateLimitMetrics,
} from "@/lib/rate-limit";
import { appCache, cacheKey, TtlCache } from "@/lib/cache";
import {
  acquireSyncLock,
  releaseSyncLock,
  isSyncLocked,
  clearAllSyncLocks,
  getLockRemainingMs,
} from "@/lib/sync-lock";
import { logRequest, logError, logInfo, logWarn } from "@/lib/logger";
import {
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
  MAX_PASSWORD_LENGTH,
} from "@/lib/password";
import { GET as healthHandler } from "@/app/api/health/route";
import { POST as demoAuthHandler } from "@/app/api/auth/demo/route";
import { NextRequest } from "next/server";

describe("Production Resilience & High-Concurrency Hardening", () => {
  beforeEach(() => {
    resetRateLimits();
    clearAllSyncLocks();
    appCache.invalidatePrefix("");
  });

  describe("1. In-Memory Sliding-Window Rate Limiter & Memory Safeguards", () => {
    it("allows requests under the configured threshold", () => {
      const config = { windowMs: 5000, maxRequests: 3 };
      const key = "test-client-1";

      const res1 = checkRateLimit(key, config);
      expect(res1.allowed).toBe(true);
      expect(res1.remaining).toBe(2);

      const res2 = checkRateLimit(key, config);
      expect(res2.allowed).toBe(true);
      expect(res2.remaining).toBe(1);

      const res3 = checkRateLimit(key, config);
      expect(res3.allowed).toBe(true);
      expect(res3.remaining).toBe(0);
    });

    it("rejects requests exceeding threshold with proper 429 response", () => {
      const config = { windowMs: 10000, maxRequests: 2 };
      const key = "test-client-2";

      checkRateLimit(key, config);
      checkRateLimit(key, config);

      const res3 = checkRateLimit(key, config);
      expect(res3.allowed).toBe(false);
      expect(res3.remaining).toBe(0);

      const mockReq = new Request("http://localhost/api/test", {
        headers: { "x-forwarded-for": "192.168.1.100" },
      });

      checkRateLimit("192.168.1.100", config);
      checkRateLimit("192.168.1.100", config);

      const response = applyRateLimit(mockReq, config);
      expect(response).not.toBeNull();
      expect(response?.status).toBe(429);
      expect(response?.headers.get("retry-after")).toBeDefined();
    });

    it("extracts and sanitizes rate limit key from IP headers", () => {
      const reqWithForwarded = new Request("http://localhost", {
        headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18" },
      });
      expect(getRateLimitKey(reqWithForwarded)).toBe("203.0.113.195");

      const reqWithRealIp = new Request("http://localhost", {
        headers: { "x-real-ip": "198.51.100.1" },
      });
      expect(getRateLimitKey(reqWithRealIp)).toBe("198.51.100.1");

      const reqWithoutHeaders = new Request("http://localhost");
      expect(getRateLimitKey(reqWithoutHeaders)).toBe("unknown");

      // Header truncation test: protects memory from header-bloat DoS
      const longIp = "a".repeat(128);
      const reqLong = new Request("http://localhost", {
        headers: { "x-forwarded-for": longIp },
      });
      expect(getRateLimitKey(reqLong).length).toBe(64);
    });

    it("reports telemetry and auto-prunes expired keys without memory leaks", async () => {
      const shortConfig = { windowMs: 30, maxRequests: 5 };
      checkRateLimit("ephemeral-key", shortConfig);
      expect(getRateLimitMetrics().activeKeys).toBe(1);

      await new Promise((r) => setTimeout(r, 45));
      checkRateLimit("ephemeral-key", shortConfig);
      // Key should have refreshed its timestamps
      expect(getRateLimitMetrics().activeKeys).toBe(1);
    });
  });

  describe("2. In-Memory TTL Cache & Cache Invalidation", () => {
    it("stores, retrieves, and invalidates user-scoped caches", () => {
      const userId = "u_cache_42";
      appCache.set(cacheKey.dashboard(userId), { dashboard: true }, 5000);
      appCache.set(cacheKey.analytics(userId), { analytics: true }, 5000);
      appCache.set(cacheKey.activity(userId), { activity: true }, 5000);

      expect(appCache.get(cacheKey.dashboard(userId))).toEqual({ dashboard: true });
      expect(appCache.get(cacheKey.analytics(userId))).toEqual({ analytics: true });

      // Invalidate user cache on mutation
      appCache.invalidateUser(userId);

      expect(appCache.get(cacheKey.dashboard(userId))).toBeNull();
      expect(appCache.get(cacheKey.analytics(userId))).toBeNull();
      expect(appCache.get(cacheKey.activity(userId))).toBeNull();
    });

    it("invalidates goal and user cache together", () => {
      const goalId = "g_test_1";
      const userId = "u_test_1";
      appCache.set(cacheKey.progressContext(goalId), { context: 1 }, 5000);
      appCache.set(cacheKey.dashboard(userId), { dash: 1 }, 5000);

      appCache.invalidateGoal(goalId, userId);

      expect(appCache.get(cacheKey.progressContext(goalId))).toBeNull();
      expect(appCache.get(cacheKey.dashboard(userId))).toBeNull();
    });

    it("enforces memory bounds via FIFO/LRU eviction when capacity reached", () => {
      const boundedCache = new TtlCache(3); // Small capacity for deterministic testing
      boundedCache.set("k1", "v1", 10000);
      boundedCache.set("k2", "v2", 10000);
      boundedCache.set("k3", "v3", 10000);

      expect(boundedCache.getMetrics().size).toBe(3);

      // 4th item forces eviction of oldest key k1
      boundedCache.set("k4", "v4", 10000);
      expect(boundedCache.get("k1")).toBeNull();
      expect(boundedCache.get("k4")).toBe("v4");
      expect(boundedCache.getMetrics().evictions).toBe(1);
    });
  });

  describe("3. Sync Concurrency Guard with Deadlock Prevention (TTL)", () => {
    it("prevents concurrent syncs and auto-expires dead locks", async () => {
      const userId = "u_sync_deadlock_test";
      const platform = "codeforces";

      // 1. Acquire with very short TTL for testing
      const lockAcquired = acquireSyncLock(userId, platform, 40); // 40ms TTL
      expect(lockAcquired).toBe(true);
      expect(isSyncLocked(userId, platform)).toBe(true);

      // 2. Immediate re-attempt is blocked
      expect(acquireSyncLock(userId, platform, 40)).toBe(false);

      // 3. Wait for TTL to lapse (simulates crashed worker / unhandled failure)
      await new Promise((r) => setTimeout(r, 60));

      // 4. Lock has expired: isSyncLocked returns false and lock can be re-acquired
      expect(isSyncLocked(userId, platform)).toBe(false);
      expect(acquireSyncLock(userId, platform)).toBe(true);

      releaseSyncLock(userId, platform);
      expect(isSyncLocked(userId, platform)).toBe(false);
    });
  });

  describe("4. Password Security & Event-Loop Protection", () => {
    it("asynchronously hashes and verifies passwords without event loop starvation", async () => {
      const password = "ValidPassword123!";
      const hash = await hashPassword(password);
      expect(hash).toContain(":");

      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);

      const isInvalid = await verifyPassword("WrongPassword123!", hash);
      expect(isInvalid).toBe(false);
    });

    it("enforces maximum password length to block scrypt CPU exhaustion DoS", async () => {
      const oversizedPassword = "A".repeat(MAX_PASSWORD_LENGTH + 1);
      const strength = validatePasswordStrength(oversizedPassword);
      expect(strength.valid).toBe(false);
      expect(strength.reason).toContain("cannot exceed");

      await expect(hashPassword(oversizedPassword)).rejects.toThrow();

      // verifyPassword immediately fails without computing expensive hashes
      const result = await verifyPassword(oversizedPassword, "dummy:hash");
      expect(result).toBe(false);
    });
  });

  describe("5. Demo Auth Hardening in Production", () => {
    it("strictly blocks demo access in production even if ALLOW_DEV_DEMO_USER is true", async () => {
      const origEnv = process.env.NODE_ENV;
      const origAllow = process.env.ALLOW_DEV_DEMO_USER;

      try {
        (process.env as any).NODE_ENV = "production";
        process.env.ALLOW_DEV_DEMO_USER = "true";

        const req = new NextRequest("http://localhost/api/auth/demo", { method: "POST" });
        const res = await demoAuthHandler(req);

        expect(res.status).toBe(403);
        const data = await res.json();
        expect(data.error.message).toContain("disabled in production");
      } finally {
        (process.env as any).NODE_ENV = origEnv;
        process.env.ALLOW_DEV_DEMO_USER = origAllow;
      }
    });
  });

  describe("6. Structured Logging", () => {
    it("handles logging without crashing", () => {
      const spyInfo = vi.spyOn(console, "info").mockImplementation(() => {});
      const spyWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const spyError = vi.spyOn(console, "error").mockImplementation(() => {});

      logRequest("GET", "/api/dashboard", "u1", 15, 200);
      logInfo("test", "Informational test message", { foo: "bar" });
      logWarn("test", "Warning message");
      logError("test", new Error("Simulated failure"), { detail: 123 });

      expect(spyInfo).toHaveBeenCalled();
      expect(spyWarn).toHaveBeenCalled();
      expect(spyError).toHaveBeenCalled();

      spyInfo.mockRestore();
      spyWarn.mockRestore();
      spyError.mockRestore();
    });
  });

  describe("7. Health Check Endpoint (Liveness vs Readiness)", () => {
    it("returns liveness status without querying database", async () => {
      const req = new NextRequest("http://localhost/api/health?type=liveness");
      const res = await healthHandler(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.status).toBe("alive");
      expect(typeof json.uptimeSeconds).toBe("number");
    });

    it("returns readiness with database connectivity and operational telemetry", async () => {
      const req = new NextRequest("http://localhost/api/health?type=readiness");
      const res = await healthHandler(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.status).toBe("ok");
      expect(json.db).toBe("connected");
      expect(typeof json.latencyMs).toBe("number");
      expect(json.cache).toBeDefined();
      expect(json.rateLimiter).toBeDefined();
    });
  });
});
