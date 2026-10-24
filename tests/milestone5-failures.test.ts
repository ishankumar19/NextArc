import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { PrismaClient } from "../src/generated/client";
import { SyncService } from "../src/sync/sync.service";
import { GoalService } from "../src/goals/goal.service";
import { ActivityAnalytics } from "../src/analytics/activity.analytics";
import { DifficultyAnalytics } from "../src/analytics/difficulty.analytics";
import { TopicAnalytics } from "../src/analytics/topic.analytics";
import { ContestAnalytics } from "../src/analytics/contest.analytics";
import { EvidenceService } from "../src/goals/evidence.service";
import { ProgressContextService } from "../src/goals/progress-context.service";
import { IngestionService } from "../src/normalization/ingestion.service";
import { codeforcesAdapter } from "../src/platforms/adapters/codeforces.adapter";
import { leetcodeAdapter } from "../src/platforms/adapters/leetcode.adapter";
import { codeforcesThrottler } from "../src/platforms/throttler";
import { subDays, addDays } from "date-fns";

const prisma = new PrismaClient();

describe("Milestone 5: Comprehensive Failure & Edge Case Testing", () => {
  const failureUserId = "user_test_m5_failures";
  const emptyUserId = "user_test_m5_empty";

  beforeAll(async () => {
    // Zero delay for tests
    codeforcesThrottler.configure({ minIntervalMs: 0, maxRetries: 0 });

    await prisma.user.deleteMany({
      where: { id: { in: [failureUserId, emptyUserId] } },
    });

    await prisma.user.createMany({
      data: [
        { id: failureUserId, email: "m5_failures@progress.dev", name: "Failure Test User" },
        { id: emptyUserId, email: "m5_empty@progress.dev", name: "Empty User" },
      ],
    });
  });

  afterAll(async () => {
    codeforcesThrottler.configure({
      minIntervalMs: 2000,
      maxRetries: 3,
      initialBackoffMs: 1500,
      rateLimitBackoffMs: 3000,
    });

    await prisma.user.deleteMany({
      where: { id: { in: [failureUserId, emptyUserId] } },
    });
    await prisma.$disconnect();
  });

  describe("External Platform Failure & Validation Tests", () => {
    it("should reject invalid Codeforces handle gracefully", async () => {
      const mockFetch = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          status: "FAILED",
          comment: "handles: User with handle non_existent_handle_12345 not found",
        }),
      } as any);

      const isValid = await codeforcesAdapter.validateUser("non_existent_handle_12345");
      expect(isValid).toBe(false);

      mockFetch.mockRestore();
    });

    it("should reject invalid LeetCode username gracefully", async () => {
      const mockFetch = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: { matchedUser: null },
        }),
      } as any);

      const isValid = await leetcodeAdapter.validateUser("non_existent_lc_user_999");
      expect(isValid).toBe(false);

      mockFetch.mockRestore();
    });

    it("should handle Codeforces timeout or 503 without crashing and preserve existing data", async () => {
      // Seed an initial submission
      await IngestionService.upsertSubmission({
        userId: failureUserId,
        platform: "codeforces",
        externalSubmissionId: "sub_safe_1",
        problemId: "1000A",
        problemTitle: "Problem Safe",
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1000",
        numericDifficulty: 1000,
        topics: ["implementation"],
        rawTags: ["implementation"],
        timestamp: new Date(),
      });

      // Create platform connection
      await prisma.platformConnection.upsert({
        where: { userId_platform: { userId: failureUserId, platform: "codeforces" } },
        update: { status: "connected" },
        create: {
          userId: failureUserId,
          platform: "codeforces",
          username: "safe_user",
          status: "connected",
        },
      });

      // Simulate network 503 outage
      const mockFetch = vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
        new Error("CF API 503 Service Unavailable")
      );

      const syncResult = await SyncService.syncPlatform(failureUserId, "codeforces");
      expect(syncResult.success).toBe(false);
      expect(syncResult.error).toContain("503");

      // Verify connection records error
      const conn = await prisma.platformConnection.findUnique({
        where: { userId_platform: { userId: failureUserId, platform: "codeforces" } },
      });
      expect(conn?.status).toBe("error");

      // CRITICAL: Previously stored data MUST survive
      const count = await prisma.normalizedSubmission.count({
        where: { userId: failureUserId, platform: "codeforces" },
      });
      expect(count).toBeGreaterThanOrEqual(1);

      mockFetch.mockRestore();
    });

    it("should handle malformed JSON from external platform gracefully", async () => {
      const mockFetch = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("SyntaxError: Unexpected token < in JSON at position 0");
        },
      } as any);

      await expect(codeforcesAdapter.getProfile("any_user")).rejects.toThrow();

      mockFetch.mockRestore();
    });
  });

  describe("Goal Edge Cases (Past Deadline, Already Achieved)", () => {
    it("should correctly handle past deadline (overdue) goals", async () => {
      const pastDeadline = subDays(new Date(), 5);
      const goal = await GoalService.createGoal({
        userId: failureUserId,
        title: "Overdue Goal",
        category: "competitive_programming",
        targetMetric: "codeforces_rating",
        targetValue: 1400,
        initialValue: 1200,
        deadline: pastDeadline,
      });

      const view = await GoalService.getGoalById(goal.id, failureUserId);
      expect(view?.isOverdue).toBe(true);
      expect(view?.daysRemaining).toBe(0);
      expect(view?.gap).toBe(200); // 1400 - 1200 = 200
    });

    it("should correctly handle already achieved goals (negative or zero gap)", async () => {
      const goal = await GoalService.createGoal({
        userId: failureUserId,
        title: "Achieved Goal",
        category: "competitive_programming",
        targetMetric: "codeforces_rating",
        targetValue: 1200,
        initialValue: 1350, // current > target
        deadline: addDays(new Date(), 30),
      });

      const view = await GoalService.getGoalById(goal.id, failureUserId);
      expect(view?.gap).toBe(-150); // negative gap indicates surpassed target
      expect(view?.daysRemaining).toBe(30);
    });
  });

  describe("Empty User Edge Cases (Zero Submissions, No Contests)", () => {
    it("should return zeroed deterministic stats for a user with zero submissions", async () => {
      const activity = await ActivityAnalytics.computeUserActivity(emptyUserId);
      expect(activity.totalProblemsSolved).toBe(0);
      expect(activity.totalProblemsAttempted).toBe(0);
      expect(activity.totalAcceptedSubmissions).toBe(0);
      expect(activity.totalFailedSubmissions).toBe(0);
      expect(activity.currentStreak).toBe(0);
      expect(activity.totalActiveDays).toBe(0);

      const difficulty = await DifficultyAnalytics.computeDifficultyStats(emptyUserId);
      expect(difficulty.codeforces["1300"].attempted).toBe(0);
      expect(difficulty.codeforces["1300"].solved).toBe(0);
      expect(difficulty.codeforces["1300"].acceptanceRate).toBe(0);

      const contests = await ContestAnalytics.computeContestStats(emptyUserId);
      expect(contests.totalContests).toBe(0);
      expect(contests.currentRating).toBe(0);
      expect(contests.maxRating).toBe(0);
      expect(contests.ratingChange7d).toBe(0);
    });
  });

  describe("Analytics Correctness Edge Cases (Step 9)", () => {
    it("should count unique problems solved on multiple submissions (WA -> WA -> AC -> AC)", async () => {
      const edgeUserId = "user_test_m5_edge";
      await prisma.user.create({
        data: { id: edgeUserId, email: "m5_edge@progress.dev", name: "Edge User" },
      });

      // 1. Submit WA on Problem X
      await IngestionService.upsertSubmission({
        userId: edgeUserId,
        platform: "codeforces",
        externalSubmissionId: "sub_x_1",
        problemId: "2000A",
        problemTitle: "Hard Problem X",
        verdict: "WRONG_ANSWER",
        accepted: false,
        difficulty: "1400",
        numericDifficulty: 1400,
        topics: ["greedy"],
        rawTags: ["greedy"],
        timestamp: subDays(new Date(), 3),
      });

      // 2. Submit second WA on Problem X
      await IngestionService.upsertSubmission({
        userId: edgeUserId,
        platform: "codeforces",
        externalSubmissionId: "sub_x_2",
        problemId: "2000A",
        problemTitle: "Hard Problem X",
        verdict: "WRONG_ANSWER",
        accepted: false,
        difficulty: "1400",
        numericDifficulty: 1400,
        topics: ["greedy"],
        rawTags: ["greedy"],
        timestamp: subDays(new Date(), 2),
      });

      // 3. Submit AC on Problem X
      await IngestionService.upsertSubmission({
        userId: edgeUserId,
        platform: "codeforces",
        externalSubmissionId: "sub_x_3",
        problemId: "2000A",
        problemTitle: "Hard Problem X",
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1400",
        numericDifficulty: 1400,
        topics: ["greedy"],
        rawTags: ["greedy"],
        timestamp: subDays(new Date(), 1),
      });

      // 4. Submit later resubmission (another AC on Problem X)
      await IngestionService.upsertSubmission({
        userId: edgeUserId,
        platform: "codeforces",
        externalSubmissionId: "sub_x_4",
        problemId: "2000A",
        problemTitle: "Hard Problem X",
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1400",
        numericDifficulty: 1400,
        topics: ["greedy"],
        rawTags: ["greedy"],
        timestamp: new Date(),
      });

      const stats = await ActivityAnalytics.computeUserActivity(edgeUserId);

      // Must count exactly 1 unique problem attempted and 1 unique problem solved
      expect(stats.totalProblemsAttempted).toBe(1);
      expect(stats.totalProblemsSolved).toBe(1);

      // Total submissions: 2 accepted, 2 failed = 4
      expect(stats.totalAcceptedSubmissions).toBe(2);
      expect(stats.totalFailedSubmissions).toBe(2);

      // Difficulty bin 1400 should have 1 attempted, 1 solved, 100% solve rate
      const diff = await DifficultyAnalytics.computeDifficultyStats(edgeUserId);
      expect(diff.codeforces["1400"].attempted).toBe(1);
      expect(diff.codeforces["1400"].solved).toBe(1);
      expect(diff.codeforces["1400"].acceptanceRate).toBe(100);

      // Clean up
      await prisma.user.delete({ where: { id: edgeUserId } });
    });

    it("should correctly handle contest with negative rating change", async () => {
      const contestUserId = "user_test_m5_contest";
      await prisma.user.create({
        data: { id: contestUserId, email: "m5_contest@progress.dev", name: "Contest User" },
      });

      // Contest 1: +50 rating
      await IngestionService.upsertContest(contestUserId, "codeforces", {
        contestId: "1001",
        contestName: "Round 1",
        rank: 500,
        oldRating: 1400,
        newRating: 1450,
        ratingChange: 50,
        timestamp: subDays(new Date(), 5),
      });

      // Contest 2: -35 rating
      await IngestionService.upsertContest(contestUserId, "codeforces", {
        contestId: "1002",
        contestName: "Round 2",
        rank: 3500,
        oldRating: 1450,
        newRating: 1415,
        ratingChange: -35,
        timestamp: subDays(new Date(), 2),
      });

      const stats = await ContestAnalytics.computeContestStats(contestUserId);
      expect(stats.totalContests).toBe(2);
      expect(stats.currentRating).toBe(1415);
      expect(stats.maxRating).toBe(1450);
      expect(stats.ratingChange7d).toBe(15); // +50 + (-35) = +15

      await prisma.user.delete({ where: { id: contestUserId } });
    });
  });
});
