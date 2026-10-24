import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { PrismaClient } from "../src/generated/client";
import { SyncService } from "../src/sync/sync.service";
import { ActivityAnalytics } from "../src/analytics/activity.analytics";
import { DifficultyAnalytics } from "../src/analytics/difficulty.analytics";
import { TopicAnalytics } from "../src/analytics/topic.analytics";
import { ContestAnalytics } from "../src/analytics/contest.analytics";
import { EvidenceService } from "../src/goals/evidence.service";
import { ProgressContextService } from "../src/goals/progress-context.service";
import { GoalService } from "../src/goals/goal.service";
import { IngestionService } from "../src/normalization/ingestion.service";
import { subDays, addDays } from "date-fns";
import { codeforcesThrottler } from "../src/platforms/throttler";

const prisma = new PrismaClient();

describe("Milestone 3: Sync Engine, Deterministic Analytics & Progress Context", () => {
  const testUserId = "user_test_m3";
  let activeGoalId: string;

  beforeAll(async () => {
    // Configure throttler for zero-delay instant test execution
    codeforcesThrottler.configure({
      minIntervalMs: 0,
      maxRetries: 0,
      initialBackoffMs: 0,
    });
    // Clean up previous test runs
    await prisma.user.deleteMany({
      where: { id: testUserId },
    });

    // Create test user
    await prisma.user.create({
      data: {
        id: testUserId,
        email: "test_m3@progress.dev",
        name: "Milestone 3 Test Engineer",
      },
    });

    // Create test goal: Become Codeforces Specialist (Target: 1400, Initial: 1284)
    const goal = await GoalService.createGoal({
      userId: testUserId,
      title: "Become Codeforces Specialist",
      category: "competitive_programming",
      targetMetric: "codeforces_rating",
      targetValue: 1400,
      initialValue: 1284,
      deadline: addDays(new Date(), 37),
      availableHoursPerWeek: 10,
    });
    activeGoalId = goal.id;

    // Create Platform Connections
    await prisma.platformConnection.createMany({
      data: [
        {
          userId: testUserId,
          platform: "codeforces",
          username: "tourist_fan_m3",
          status: "connected",
          profileData: JSON.stringify({
            rating: 1284,
            maxRating: 1284,
            rank: "pupil",
          }),
        },
        {
          userId: testUserId,
          platform: "leetcode",
          username: "algo_coder_m3",
          status: "connected",
          profileData: JSON.stringify({
            totalSolved: 120,
            easySolved: 50,
            mediumSolved: 60,
            hardSolved: 10,
          }),
        },
      ],
    });

    // Seed realistic submissions for analytics verification
    const now = new Date();

    // Problem 1: CF 1300 Greedy (Target range, solved 2 days ago)
    await IngestionService.upsertSubmission({
      userId: testUserId,
      platform: "codeforces",
      externalSubmissionId: "sub_cf_1",
      problemId: "1800B",
      problemTitle: "Count Pairs",
      verdict: "ACCEPTED",
      accepted: true,
      difficulty: "1300",
      numericDifficulty: 1300,
      topics: ["greedy", "strings"],
      rawTags: ["greedy", "strings"],
      timestamp: subDays(now, 2),
    });

    // Problem 2: CF 1350 Two Pointers (Target range, solved 3 days ago)
    await IngestionService.upsertSubmission({
      userId: testUserId,
      platform: "codeforces",
      externalSubmissionId: "sub_cf_2",
      problemId: "1800C",
      problemTitle: "Powering Up",
      verdict: "ACCEPTED",
      accepted: true,
      difficulty: "1350",
      numericDifficulty: 1350,
      topics: ["two-pointers"],
      rawTags: ["two-pointers"],
      timestamp: subDays(now, 3),
    });

    // Problem 3: CF 1400 Graphs (Target range, failed yesterday)
    await IngestionService.upsertSubmission({
      userId: testUserId,
      platform: "codeforces",
      externalSubmissionId: "sub_cf_3",
      problemId: "1800D",
      problemTitle: "Graph Path",
      verdict: "WRONG_ANSWER",
      accepted: false,
      difficulty: "1400",
      numericDifficulty: 1400,
      topics: ["graphs"],
      rawTags: ["graphs"],
      timestamp: subDays(now, 1),
    });

    // Problem 4: LeetCode Medium Two Pointers (Solved today)
    await IngestionService.upsertSubmission({
      userId: testUserId,
      platform: "leetcode",
      externalSubmissionId: "sub_lc_1",
      problemId: "two-sum-ii",
      problemTitle: "Two Sum II",
      verdict: "ACCEPTED",
      accepted: true,
      difficulty: "Medium",
      numericDifficulty: 2,
      topics: ["two-pointers", "arrays"],
      rawTags: ["Two Pointers", "Array"],
      timestamp: now,
    });

    // Seed Contest History (Codeforces Round 980: +23 rating)
    await IngestionService.upsertContest(testUserId, "codeforces", {
      contestId: "980",
      contestName: "Codeforces Round 980 (Div. 2)",
      rank: 2100,
      oldRating: 1261,
      newRating: 1284,
      ratingChange: 23,
      timestamp: subDays(now, 2),
    });
  });

  afterAll(async () => {
    // Restore production throttling config
    codeforcesThrottler.configure({
      minIntervalMs: 2000,
      maxRetries: 3,
      initialBackoffMs: 1500,
      rateLimitBackoffMs: 3000,
    });
    await prisma.user.deleteMany({
      where: { id: testUserId },
    });
    await prisma.$disconnect();
  });

  describe("Step 8: Sync Engine Resiliency & Idempotency", () => {
    it("should preserve previously collected data when sync encounters an error", async () => {
      // Mock fetch failure for Codeforces
      const mockFetch = vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
        new Error("CF API Gateway 502 Bad Gateway")
      );

      // Attempt sync
      const result = await SyncService.syncPlatform(testUserId, "codeforces");

      expect(result.success).toBe(false);
      expect(result.error).toContain("502");

      // Verify connection status updated to error
      const conn = await prisma.platformConnection.findUnique({
        where: { userId_platform: { userId: testUserId, platform: "codeforces" } },
      });
      expect(conn?.status).toBe("error");
      expect(conn?.lastError).toContain("502");

      // CRITICAL REQUIREMENT: Previously synced submissions must NOT be deleted
      const subCount = await prisma.normalizedSubmission.count({
        where: { userId: testUserId, platform: "codeforces" },
      });
      expect(subCount).toBeGreaterThanOrEqual(3);

      mockFetch.mockRestore();
    });

    it("should sync platforms independently without cross-platform failure cascading", async () => {
      // Mock LeetCode failing, but Codeforces succeeding
      const mockFetch = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) => {
        if (typeof url === "string" && url.includes("codeforces.com/api/user.info")) {
          return {
            ok: true,
            json: async () => ({
              status: "OK",
              result: [{ handle: "tourist_fan_m3", rating: 1284, maxRating: 1284, rank: "pupil" }],
            }),
          } as any;
        }
        if (typeof url === "string" && url.includes("codeforces.com/api/user.status")) {
          return {
            ok: true,
            json: async () => ({ status: "OK", result: [] }),
          } as any;
        }
        if (typeof url === "string" && url.includes("codeforces.com/api/user.rating")) {
          return {
            ok: true,
            json: async () => ({ status: "OK", result: [] }),
          } as any;
        }
        // LeetCode fails with 500
        return {
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
        } as any;
      });

      const results = await SyncService.syncAllPlatforms(testUserId);
      expect(results.length).toBe(2);

      const cfResult = results.find((r) => r.platform === "codeforces");
      const lcResult = results.find((r) => r.platform === "leetcode");

      // Codeforces succeeds
      expect(cfResult?.success).toBe(true);

      // LeetCode fails independently without crashing Codeforces
      expect(lcResult?.success).toBe(false);

      mockFetch.mockRestore();
    });
  });

  describe("Step 9: Deterministic Activity Analytics", () => {
    it("should compute accurate volume, acceptance, and streak counts", async () => {
      const activity = await ActivityAnalytics.computeUserActivity(testUserId);

      // Unique problems solved: 1800B, 1800C, two-sum-ii = 3
      expect(activity.totalProblemsSolved).toBe(3);

      // Unique problems attempted: 1800B, 1800C, 1800D, two-sum-ii = 4
      expect(activity.totalProblemsAttempted).toBe(4);

      // Submissions: 3 accepted, 1 failed = 4 total
      expect(activity.totalAcceptedSubmissions).toBe(3);
      expect(activity.totalFailedSubmissions).toBe(1);

      // 7-day activity window
      expect(activity.last7Days.problemsSolved).toBe(3);
      expect(activity.last7Days.submissions).toBe(4);
      expect(activity.last7Days.activeDays).toBeGreaterThanOrEqual(2);

      // Streak: Active today (sub_lc_1) and yesterday (sub_cf_3) -> streak >= 2
      expect(activity.currentStreak).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Step 9: Deterministic Difficulty Analytics (Separated Systems)", () => {
    it("should calculate Codeforces bins without conflating with LeetCode tiers", async () => {
      const diff = await DifficultyAnalytics.computeDifficultyStats(testUserId);

      // Codeforces 1300 bin (both 1800B rated 1300 and 1800C rated 1350 attempted & solved)
      expect(diff.codeforces["1300"].attempted).toBe(2);
      expect(diff.codeforces["1300"].solved).toBe(2);
      expect(diff.codeforces["1300"].acceptanceRate).toBe(100);

      // Codeforces 1400 bin (1800D attempted, 0 solved)
      expect(diff.codeforces["1400"].attempted).toBe(1);
      expect(diff.codeforces["1400"].solved).toBe(0);
      expect(diff.codeforces["1400"].acceptanceRate).toBe(0);

      // LeetCode Medium (two-sum-ii solved + connection profile snapshot fallback)
      expect(diff.leetcode.Medium.solved).toBeGreaterThanOrEqual(1);

      // Strictly verifies CF and LC remain separate structures
      expect(diff.codeforces["1300"]).toBeDefined();
      expect(diff.leetcode.Medium).toBeDefined();
    });
  });

  describe("Step 9: Deterministic Topic Analytics", () => {
    it("should calculate topic performance facts without subjective labels", async () => {
      const topics = await TopicAnalytics.computeTopicStats(testUserId);

      // Two-pointers: tested on 1800C (CF solved) and two-sum-ii (LC solved)
      expect(topics["two-pointers"].attempted).toBe(2);
      expect(topics["two-pointers"].solved).toBe(2);
      expect(topics["two-pointers"].acceptanceRate).toBe(100);

      // Graphs: 1800D (attempted, 0 solved)
      expect(topics["graphs"].attempted).toBe(1);
      expect(topics["graphs"].solved).toBe(0);
      expect(topics["graphs"].acceptanceRate).toBe(0);

      // Greedy: 1800B (1 attempted, 1 solved)
      expect(topics["greedy"].attempted).toBe(1);
      expect(topics["greedy"].solved).toBe(1);
    });
  });

  describe("Step 9: Contest Analytics", () => {
    it("should compute contest count, rating deltas and trends", async () => {
      const contests = await ContestAnalytics.computeContestStats(testUserId);

      expect(contests.totalContests).toBe(1);
      expect(contests.currentRating).toBe(1284);
      expect(contests.ratingChange7d).toBe(23);
      expect(contests.ratingChange30d).toBe(23);
      expect(contests.recentContests.length).toBe(1);
      expect(contests.recentContests[0].contestName).toBe("Codeforces Round 980 (Div. 2)");
    });
  });

  describe("Step 10: Supporting Evidence Engine", () => {
    it("should compute target range problems and weekly evidence metrics", async () => {
      const evidence = await EvidenceService.computeSupportingEvidence(
        testUserId,
        activeGoalId
      );

      // For CF Specialist (1400 target):
      // Target range is 1300-1400.
      // Solved this week in target range: 1800B (1300) and 1800C (1350) = 2
      expect(evidence.targetRangeProblemsSolvedThisWeek).toBe(2);
      expect(evidence.targetRangeLabel).toBe("1300-1400");
      expect(evidence.contestsThisMonth).toBe(1);
      expect(evidence.activeDaysThisWeek).toBeGreaterThanOrEqual(2);
      expect(evidence.netRatingMovementRecent).toBe(23);
    });
  });

  describe("Step 11 & Amendment 4: getUserProgressContext Contract", () => {
    it("should generate a complete, valid ProgressContextV1 object", async () => {
      const context = await ProgressContextService.getUserProgressContext(
        testUserId,
        activeGoalId
      );

      // Amendment 4: Versioning and Freshness
      expect(context.schemaVersion).toBe("1.0.0");
      expect(context.generatedAt).toBeDefined();
      expect(context.dataFreshness.codeforces).toBeDefined();
      expect(context.dataFreshness.leetcode).toBeDefined();
      expect(context.platformCompleteness.codeforces.completeness).toBe("complete");
      expect(context.platformCompleteness.leetcode.completeness).toBe("partial");

      // Honest Goal Progress
      expect(context.goal.title).toBe("Become Codeforces Specialist");
      expect(context.goal.targetValue).toBe(1400);
      expect(context.goal.currentValue).toBe(1284);
      expect(context.goal.gap).toBe(116); // Honest +116 needed
      expect(context.goal.daysRemaining).toBe(37);

      // Facts
      expect(context.currentState.codeforcesRating).toBe(1284);
      expect(context.recentActivity.last7Days.problemsSolved).toBe(3);
      expect(context.recentActivity.currentStreak).toBeGreaterThanOrEqual(2);
      expect(context.difficultyPerformance.codeforces["1300"].solved).toBe(2);
      expect(context.topicPerformance["two-pointers"].solved).toBe(2);
      expect(context.contestPerformance.ratingChange7d).toBe(23);

      // Supporting Evidence
      expect(context.supportingEvidence.targetRangeProblemsSolvedThisWeek).toBe(2);
      expect(context.supportingEvidence.netRatingMovementRecent).toBe(23);
    });
  });
});
