import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkRateLimit, applyRateLimit, AUTH_RATE_LIMIT, getRateLimitKey } from "@/lib/rate-limit";
import { appCache, cacheKey } from "@/lib/cache";
import { acquireSyncLock, releaseSyncLock, isSyncLocked } from "@/lib/sync-lock";
import { logRequest, logError, logInfo, logWarn } from "@/lib/logger";
import { GET as healthHandler } from "@/app/api/health/route";

describe("Production Resilience & High-Concurrency Hardening", () => {
  describe("1. In-Memory Sliding-Window Rate Limiter", () => {
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

      // Verify applyRateLimit produces standard 429 response
      const mockReq = new Request("http://localhost/api/test", {
        headers: { "x-forwarded-for": "192.168.1.100" },
      });

      // Exceed threshold for this IP
      checkRateLimit("192.168.1.100", config);
      checkRateLimit("192.168.1.100", config);

      const response = applyRateLimit(mockReq, config);
      expect(response).not.toBeNull();
      expect(response?.status).toBe(429);
      expect(response?.headers.get("retry-after")).toBeDefined();
    });

    it("extracts rate limit key from IP headers correctly", () => {
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
    });
  });

  describe("2. In-Memory TTL Cache", () => {
    beforeEach(() => {
      appCache.invalidatePrefix("");
    });

    it("stores and retrieves cached items before expiration", () => {
      const key = cacheKey.dashboard("user_123");
      const mockData = { totalSolved: 42, rating: 1500 };

      appCache.set(key, mockData, 5000);
      const cached = appCache.get(key);

      expect(cached).toEqual(mockData);
    });

    it("returns null for expired cache entries", async () => {
      const key = cacheKey.analytics("user_123");
      appCache.set(key, { data: "test" }, 20); // 20ms TTL

      await new Promise((r) => setTimeout(r, 50));
      const cached = appCache.get(key);

      expect(cached).toBeNull();
    });

    it("invalidates by key and prefix", () => {
      appCache.set("dashboard:u1", { a: 1 }, 10000);
      appCache.set("dashboard:u2", { a: 2 }, 10000);
      appCache.set("analytics:u1", { b: 1 }, 10000);

      appCache.delete("dashboard:u1");
      expect(appCache.get("dashboard:u1")).toBeNull();
      expect(appCache.get("dashboard:u2")).not.toBeNull();

      appCache.invalidatePrefix("dashboard");
      expect(appCache.get("dashboard:u2")).toBeNull();
      expect(appCache.get("analytics:u1")).not.toBeNull();
    });
  });

  describe("3. Sync Concurrency Guard (Locking)", () => {
    it("prevents concurrent syncs for the same user and platform", () => {
      const userId = "u_sync_test";
      const platform = "codeforces";

      expect(acquireSyncLock(userId, platform)).toBe(true);
      expect(isSyncLocked(userId, platform)).toBe(true);

      // Second attempt must fail
      expect(acquireSyncLock(userId, platform)).toBe(false);

      // Different platform or user is allowed
      expect(acquireSyncLock(userId, "leetcode")).toBe(true);
      expect(acquireSyncLock("u_other", platform)).toBe(true);

      // Clean up
      releaseSyncLock(userId, platform);
      expect(isSyncLocked(userId, platform)).toBe(false);

      // Can acquire again after release
      expect(acquireSyncLock(userId, platform)).toBe(true);
      releaseSyncLock(userId, platform);
      releaseSyncLock(userId, "leetcode");
      releaseSyncLock("u_other", platform);
    });
  });

  describe("4. Structured Logging", () => {
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

  describe("5. Health Check Endpoint", () => {
    it("returns 200 OK with connected database and latency metrics", async () => {
      const res = await healthHandler();
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.status).toBe("ok");
      expect(json.db).toBe("connected");
      expect(typeof json.latencyMs).toBe("number");
      expect(json.timestamp).toBeDefined();
    });
  });
});
