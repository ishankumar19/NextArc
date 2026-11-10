import { describe, it, expect, beforeEach, vi } from "vitest";
import { CircuitBreaker } from "@/lib/circuit-breaker";
import { singleFlight, appCache } from "@/lib/cache";
import {
  acquireDistributedSyncLock,
  releaseDistributedSyncLock,
  DEFAULT_SYNC_LOCK_TTL_MS,
} from "@/lib/sync-lock";
import { checkRateLimitDistributed } from "@/lib/rate-limit";
import { enqueueSyncJob, getSyncJobStatus } from "@/lib/sync-queue";
import { getDatabaseConnectionBudget } from "@/lib/prisma";

describe("Milestone 10: Distributed Systems Chaos & Failure Testing", () => {
  describe("1. Circuit Breakers & Upstream Fault Isolation", () => {
    it("transitions through CLOSED -> OPEN -> HALF_OPEN -> CLOSED lifecycle", async () => {
      const breaker = new CircuitBreaker("test-service", {
        failureThreshold: 2,
        recoveryTimeoutMs: 50,
        halfOpenSuccessThreshold: 2,
      });

      expect(breaker.getState()).toBe("CLOSED");

      // 1. Trigger failures to trip threshold
      await expect(
        breaker.execute(async () => {
          throw new Error("Upstream 503");
        })
      ).rejects.toThrow("Upstream 503");

      expect(breaker.getState()).toBe("CLOSED");

      await expect(
        breaker.execute(async () => {
          throw new Error("Upstream 503");
        })
      ).rejects.toThrow("Upstream 503");

      // Now circuit must be OPEN
      expect(breaker.getState()).toBe("OPEN");
      expect(breaker.isOpen()).toBe(true);

      // 2. Fast-fails requests while OPEN without executing action
      let actionExecuted = false;
      await expect(
        breaker.execute(async () => {
          actionExecuted = true;
          return "ok";
        })
      ).rejects.toThrow(/is OPEN\. Fast-failing/);
      expect(actionExecuted).toBe(false);

      // Fast-fails with fallback if provided
      const fallbackResult = await breaker.execute(
        async () => "ok",
        () => "cached_fallback"
      );
      expect(fallbackResult).toBe("cached_fallback");

      // 3. Wait for recovery timeout to elapse -> transitions to HALF_OPEN
      await new Promise((r) => setTimeout(r, 60));
      expect(breaker.getState()).toBe("HALF_OPEN");

      // 4. Consecutive successes close the circuit
      await breaker.execute(async () => "success 1");
      expect(breaker.getState()).toBe("HALF_OPEN");

      await breaker.execute(async () => "success 2");
      expect(breaker.getState()).toBe("CLOSED");
      expect(breaker.isOpen()).toBe(false);
    });
  });

  describe("2. Single-Flight Cache Stampede Protection", () => {
    it("collapses 20 concurrent cache-miss requests into exactly 1 underlying execution", async () => {
      let executionCount = 0;
      const stampedeKey = "dashboard:stampede:user_42";

      const slowDbQuery = async () => {
        executionCount++;
        await new Promise((r) => setTimeout(r, 30)); // 30ms DB computation
        return { data: "computed_payload", count: executionCount };
      };

      // Fire 20 requests concurrently
      const concurrentRequests = Array.from({ length: 20 }, () =>
        singleFlight(stampedeKey, slowDbQuery)
      );

      const results = await Promise.all(concurrentRequests);

      // All 20 requests received identical payload
      for (const res of results) {
        expect(res.data).toBe("computed_payload");
        expect(res.count).toBe(1);
      }

      // Crucial: generator was executed only ONCE
      expect(executionCount).toBe(1);
    });
  });

  describe("3. Distributed Lock Leasing, Ownership Fencing & Expiration", () => {
    it("enforces cryptographic ownership token: Worker A cannot release Worker B's lock", async () => {
      const userId = "u_fencing_test";
      const platform = "codeforces";

      // Worker A acquires lock
      const lockA = await acquireDistributedSyncLock(userId, platform, 2000);
      expect(lockA.acquired).toBe(true);
      expect(lockA.token).toBeDefined();

      // Worker B attempts to acquire -> blocked
      const lockB = await acquireDistributedSyncLock(userId, platform, 2000);
      expect(lockB.acquired).toBe(false);

      // Worker B attempts to release with invalid/wrong token -> fails
      const releasedByB = await releaseDistributedSyncLock(userId, platform, "wrong-token-xyz");
      expect(releasedByB).toBe(false);

      // Worker A releases with correct token -> succeeds
      const releasedByA = await releaseDistributedSyncLock(userId, platform, lockA.token);
      expect(releasedByA).toBe(true);

      // Now re-acquisition succeeds
      const lockA2 = await acquireDistributedSyncLock(userId, platform, 2000);
      expect(lockA2.acquired).toBe(true);
      await releaseDistributedSyncLock(userId, platform, lockA2.token);
    });

    it("auto-expires locks after TTL so crashed workers cannot cause permanent deadlocks", async () => {
      const userId = "u_crash_test";
      const platform = "leetcode";

      // Acquire with 40ms TTL
      const lock = await acquireDistributedSyncLock(userId, platform, 40);
      expect(lock.acquired).toBe(true);

      // Immediate second attempt blocked
      const immediate = await acquireDistributedSyncLock(userId, platform, 40);
      expect(immediate.acquired).toBe(false);

      // Simulate worker crash / delay past TTL
      await new Promise((r) => setTimeout(r, 60));

      // Lock expired: new acquisition succeeds
      const reacquired = await acquireDistributedSyncLock(userId, platform, 1000);
      expect(reacquired.acquired).toBe(true);
      await releaseDistributedSyncLock(userId, platform, reacquired.token);
    });
  });

  describe("4. Distributed Rate Limiter Consistency & Graceful Resilience", () => {
    it("accurately tracks allowances across simulated distributed invocations", async () => {
      const key = "ratelimit:user:u_dist_test";
      const config = { windowMs: 2000, maxRequests: 3 };

      const res1 = await checkRateLimitDistributed(key, config);
      expect(res1.allowed).toBe(true);
      expect(res1.remaining).toBe(2);

      const res2 = await checkRateLimitDistributed(key, config);
      expect(res2.allowed).toBe(true);
      expect(res2.remaining).toBe(1);

      const res3 = await checkRateLimitDistributed(key, config);
      expect(res3.allowed).toBe(true);
      expect(res3.remaining).toBe(0);

      const res4 = await checkRateLimitDistributed(key, config);
      expect(res4.allowed).toBe(false);
      expect(res4.remaining).toBe(0);
      expect(res4.resetAt).toBeGreaterThan(Date.now());
    });
  });

  describe("5. Job Queue Concurrency & Deduplication", () => {
    it("deduplicates concurrent sync requests for the same user and platform", async () => {
      const userId = "u_queue_dedup";
      const platform = "codeforces";

      const job1 = await enqueueSyncJob(userId, platform);
      expect(job1.jobId).toContain(`sync:${userId}:${platform}`);
      expect(job1.queued).toBe(true);

      // Immediate duplicate request is deduplicated
      const job2 = await enqueueSyncJob(userId, platform);
      expect(job2.jobId).toBe(job1.jobId);
      expect(job2.queued).toBe(false);

      const status = await getSyncJobStatus(job1.jobId);
      expect(["queued", "active", "completed"]).toContain(status.status);
    });
  });

  describe("6. Database Connection Budget Calculation", () => {
    it("proves multi-instance pool sizing stays below 100-connection provider limit", () => {
      const budget = getDatabaseConnectionBudget(4, 2); // 4 Next.js nodes, 2 Workers
      expect(budget.appInstances).toBe(4);
      expect(budget.connectionsPerApp).toBe(10);
      expect(budget.workerInstances).toBe(2);
      expect(budget.connectionsPerWorker).toBe(5);
      expect(budget.adminReserve).toBe(5);
      expect(budget.monitoringReserve).toBe(5);

      // (4 * 10) + (2 * 5) + 5 + 5 = 60 connections
      expect(budget.totalBudget).toBe(60);
      expect(budget.safeFor100ConnDb).toBe(true);
    });
  });
});
