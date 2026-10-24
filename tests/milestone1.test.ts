import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "../src/generated/client";
import { GoalService } from "../src/goals/goal.service";
import { PlatformAdapter, PlatformProfile, RawPlatformSubmission } from "../src/platforms/platform.types";
import {
  CODEFORCES_CAPABILITIES,
  LEETCODE_CAPABILITIES,
  getPlatformQualityReport,
} from "../src/platforms/capabilities";
import { SharedPlatformThrottler } from "../src/platforms/throttler";
import { ProgressContextV1 } from "../src/goals/progress-context.types";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

describe("Milestone 1: Foundations, Schema & Domain Contracts", () => {
  const testUserId = "user_test_m1";
  const secondUserId = "user_test_m1_second";

  beforeAll(async () => {
    // Clean up test data
    await prisma.user.deleteMany({
      where: { id: { in: [testUserId, secondUserId] } },
    });

    // Create primary test user
    await prisma.user.create({
      data: {
        id: testUserId,
        email: "test_m1@progress.dev",
        name: "Test Engineer",
      },
    });

    // Create second test user for defensive uniqueness verification
    await prisma.user.create({
      data: {
        id: secondUserId,
        email: "test_m1_second@progress.dev",
        name: "Second Engineer",
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { id: { in: [testUserId, secondUserId] } },
    });
    await prisma.$disconnect();
  });

  describe("Step 2: Goal System & Honest Gap Progress (No Fake Percentage)", () => {
    it("should compute honest progress metrics with gap and days remaining", () => {
      const deadline = addDays(new Date(), 37);
      const target = 1400;
      const current = 1284;

      const progress = GoalService.calculateProgress(target, current, deadline);

      expect(progress.targetValue).toBe(1400);
      expect(progress.currentValue).toBe(1284);
      expect(progress.gap).toBe(116); // +116 needed
      expect(progress.daysRemaining).toBe(37);
      expect(progress.isOverdue).toBe(false);

      // Verifies that progress is strictly honest and NOT a fake percentage (1284 / 1400 = 91.7%)
      expect(progress.gap).not.toBe(91.7);
    });

    it("should persist a goal in the database and retrieve it with honest gap metrics", async () => {
      const deadline = addDays(new Date(), 30);
      const createdGoal = await GoalService.createGoal({
        userId: testUserId,
        title: "Become Codeforces Specialist",
        category: "competitive_programming",
        targetMetric: "codeforces_rating",
        targetValue: 1400,
        initialValue: 1284,
        deadline: deadline,
        availableHoursPerWeek: 12,
      });

      expect(createdGoal.id).toBeDefined();
      expect(createdGoal.title).toBe("Become Codeforces Specialist");
      expect(createdGoal.targetValue).toBe(1400);
      expect(createdGoal.initialValue).toBe(1284);

      // Query through GoalService
      const userGoals = await GoalService.getUserGoals(testUserId);
      expect(userGoals.length).toBeGreaterThanOrEqual(1);

      const found = userGoals.find((g) => g.id === createdGoal.id);
      expect(found).toBeDefined();
      expect(found?.targetValue).toBe(1400);
      expect(found?.gap).toBe(116);
      expect(found?.daysRemaining).toBe(30);
    });
  });

  describe("Amendment 5: Defensive Submission Uniqueness Constraint", () => {
    it("should enforce uniqueness on [userId, platform, externalSubmissionId]", async () => {
      const problem = await prisma.problem.upsert({
        where: {
          platform_externalProblemId: {
            platform: "codeforces",
            externalProblemId: "1800B_defensive",
          },
        },
        update: {},
        create: {
          platform: "codeforces",
          externalProblemId: "1800B_defensive",
          title: "Count the Number of Pairs",
          difficulty: "1000",
          numericDifficulty: 1000,
          topics: JSON.stringify(["strings", "greedy"]),
          rawTags: JSON.stringify(["strings", "greedy"]),
        },
      });

      // User 1 creates submission with external ID 'sub_shared_99'
      await prisma.normalizedSubmission.deleteMany({
        where: {
          userId: testUserId,
          platform: "codeforces",
          externalSubmissionId: "sub_shared_99",
        },
      });

      await prisma.normalizedSubmission.create({
        data: {
          userId: testUserId,
          platform: "codeforces",
          externalSubmissionId: "sub_shared_99",
          problemId: problem.id,
          problemTitle: problem.title,
          verdict: "ACCEPTED",
          accepted: true,
          difficulty: "1000",
          topics: problem.topics,
          timestamp: new Date(),
        },
      });

      // User 1 cannot insert the same submission again (duplicate prevention)
      await expect(
        prisma.normalizedSubmission.create({
          data: {
            userId: testUserId,
            platform: "codeforces",
            externalSubmissionId: "sub_shared_99",
            problemId: problem.id,
            problemTitle: problem.title,
            verdict: "ACCEPTED",
            accepted: true,
            difficulty: "1000",
            topics: problem.topics,
            timestamp: new Date(),
          },
        })
      ).rejects.toThrow();

      // But User 2 CAN have the same externalSubmissionId (defensive partitioning per user)
      const user2Submission = await prisma.normalizedSubmission.create({
        data: {
          userId: secondUserId,
          platform: "codeforces",
          externalSubmissionId: "sub_shared_99",
          problemId: problem.id,
          problemTitle: problem.title,
          verdict: "ACCEPTED",
          accepted: true,
          difficulty: "1000",
          topics: problem.topics,
          timestamp: new Date(),
        },
      });

      expect(user2Submission.id).toBeDefined();
      expect(user2Submission.userId).toBe(secondUserId);
    });

    it("should enforce unique constraint on PlatformConnection [userId, platform]", async () => {
      await prisma.platformConnection.create({
        data: {
          userId: testUserId,
          platform: "codeforces",
          username: "test_cf_handle",
          status: "connected",
        },
      });

      // Duplicate platform connection for same user must be rejected
      await expect(
        prisma.platformConnection.create({
          data: {
            userId: testUserId,
            platform: "codeforces",
            username: "another_cf_handle",
            status: "connected",
          },
        })
      ).rejects.toThrow();
    });
  });

  describe("Amendment 2: Shared Throttler Contract & Queue Behavior", () => {
    it("should enforce minimum interval between queued requests", async () => {
      // Create throttler with 100ms test interval for fast deterministic test
      const testThrottler = new SharedPlatformThrottler({
        minIntervalMs: 100,
        maxRetries: 1,
      });

      const timestamps: number[] = [];

      // Enqueue 3 rapid consecutive tasks
      const p1 = testThrottler.enqueue(async () => {
        timestamps.push(Date.now());
        return "task1";
      });
      const p2 = testThrottler.enqueue(async () => {
        timestamps.push(Date.now());
        return "task2";
      });
      const p3 = testThrottler.enqueue(async () => {
        timestamps.push(Date.now());
        return "task3";
      });

      const results = await Promise.all([p1, p2, p3]);

      expect(results).toEqual(["task1", "task2", "task3"]);
      expect(timestamps.length).toBe(3);

      const delta1 = timestamps[1] - timestamps[0];
      const delta2 = timestamps[2] - timestamps[1];

      // Each execution must respect the minimum interval
      expect(delta1).toBeGreaterThanOrEqual(90);
      expect(delta2).toBeGreaterThanOrEqual(90);
    });

    it("should retry with backoff on failure", async () => {
      const testThrottler = new SharedPlatformThrottler({
        minIntervalMs: 20,
        maxRetries: 2,
        initialBackoffMs: 20,
        rateLimitBackoffMs: 20,
      });

      let attempts = 0;
      const result = await testThrottler.enqueue(async () => {
        attempts++;
        if (attempts < 2) {
          throw new Error("Temporary rate limit 429");
        }
        return "recovered";
      });

      expect(result).toBe("recovered");
      expect(attempts).toBe(2);
    });
  });

  describe("Amendment 3: PlatformCapabilities & LeetCode Best-Effort Tiering", () => {
    it("should distinguish Codeforces authoritative capabilities from LeetCode best-effort capabilities", () => {
      expect(CODEFORCES_CAPABILITIES.reliabilityTier).toBe("authoritative");
      expect(CODEFORCES_CAPABILITIES.supportsExactRating).toBe(true);
      expect(CODEFORCES_CAPABILITIES.supportsContestHistory).toBe(true);
      expect(CODEFORCES_CAPABILITIES.minRequestIntervalMs).toBe(2000);

      expect(LEETCODE_CAPABILITIES.reliabilityTier).toBe("best_effort");
      expect(LEETCODE_CAPABILITIES.supportsExactRating).toBe(false);
      expect(LEETCODE_CAPABILITIES.supportsContestHistory).toBe(false);
      expect(LEETCODE_CAPABILITIES.supportsOfficialPublicAPI).toBe(false);
    });

    it("should generate platform quality reports reflecting data completeness", () => {
      const cfReport = getPlatformQualityReport("codeforces");
      expect(cfReport.completeness).toBe("complete");
      expect(cfReport.supportedMetrics).toContain("codeforces_rating");

      const lcReport = getPlatformQualityReport("leetcode");
      expect(lcReport.completeness).toBe("partial");
      expect(lcReport.unsupportedMetrics).toContain("contest_rating_progression");
      expect(lcReport.knownLimitations.length).toBeGreaterThan(0);
    });
  });

  describe("Amendment 4: ProgressContext v1 Contract Structure", () => {
    it("should instantiate a valid ProgressContextV1 object with schemaVersion and dataFreshness", () => {
      const mockContext: ProgressContextV1 = {
        schemaVersion: "1.0.0",
        generatedAt: new Date().toISOString(),
        dataFreshness: {
          codeforces: {
            platform: "codeforces",
            lastSyncedAt: new Date().toISOString(),
            ageMinutes: 5,
            freshnessStatus: "fresh",
          },
          leetcode: {
            platform: "leetcode",
            lastSyncedAt: null,
            ageMinutes: null,
            freshnessStatus: "unknown",
          },
        },
        platformCompleteness: {
          codeforces: getPlatformQualityReport("codeforces"),
          leetcode: getPlatformQualityReport("leetcode"),
        },
        goal: {
          id: "goal_1",
          title: "Become Codeforces Specialist",
          category: "competitive_programming",
          targetMetric: "codeforces_rating",
          targetValue: 1400,
          currentValue: 1284,
          initialValue: 1284,
          gap: 116,
          daysRemaining: 37,
          isOverdue: false,
          startDate: new Date().toISOString(),
          deadline: addDays(new Date(), 37).toISOString(),
          availableHoursPerWeek: 10,
        },
        platforms: [
          {
            platform: "codeforces",
            username: "tourist_fan",
            status: "connected",
            lastSyncedAt: new Date().toISOString(),
          },
        ],
        currentState: {
          codeforcesRating: 1284,
          codeforcesMaxRating: 1284,
          codeforcesRank: "pupil",
        },
        recentActivity: {
          last7Days: { problemsSolved: 7, submissions: 12, activeDays: 5 },
          last30Days: { problemsSolved: 24, submissions: 40, activeDays: 16 },
          currentStreak: 4,
        },
        difficultyPerformance: {
          codeforces: {
            "1200": { attempted: 10, solved: 8, acceptanceRate: 80 },
            "1300": { attempted: 8, solved: 3, acceptanceRate: 37.5 },
          },
          leetcode: {
            Easy: { attempted: 20, solved: 19, acceptanceRate: 95 },
            Medium: { attempted: 15, solved: 10, acceptanceRate: 66.7 },
            Hard: { attempted: 4, solved: 1, acceptanceRate: 25 },
          },
        },
        topicPerformance: {
          greedy: {
            topic: "greedy",
            attempted: 12,
            solved: 7,
            acceptanceRate: 58.3,
            recentSolved: 3,
          },
        },
        contestPerformance: {
          totalContests: 5,
          ratingChange7d: 24,
          ratingChange30d: 68,
          recentContests: [],
        },
        supportingEvidence: {
          targetRangeProblemsSolvedThisWeek: 7,
          contestsThisMonth: 2,
          activeDaysThisWeek: 5,
          netRatingMovementRecent: 24,
        },
      };

      expect(mockContext.schemaVersion).toBe("1.0.0");
      expect(mockContext.dataFreshness.codeforces.freshnessStatus).toBe("fresh");
      expect(mockContext.platformCompleteness.leetcode.completeness).toBe("partial");
      expect(mockContext.goal.gap).toBe(116);
    });
  });

  describe("PlatformAdapter Interface Contract", () => {
    it("should allow creating compliant adapters", async () => {
      class MockAdapter implements PlatformAdapter {
        readonly platform = "codeforces" as const;
        async validateUser(username: string): Promise<boolean> {
          return username === "tourist";
        }
        async getProfile(username: string): Promise<PlatformProfile> {
          return { platform: "codeforces", username, rating: 3800 };
        }
        async getSubmissions(username: string): Promise<RawPlatformSubmission[]> {
          return [];
        }
      }

      const adapter = new MockAdapter();
      expect(adapter.platform).toBe("codeforces");
      expect(await adapter.validateUser("tourist")).toBe(true);
      expect(await adapter.validateUser("nonexistent")).toBe(false);
    });
  });
});
