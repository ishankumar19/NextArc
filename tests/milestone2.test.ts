import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { PrismaClient } from "../src/generated/client";
import {
  normalizeTopic,
  normalizeTopics,
} from "../src/normalization/topic.normalizer";
import { normalizeDifficulty } from "../src/normalization/difficulty.normalizer";
import {
  normalizeSubmission,
  standardizeVerdict,
} from "../src/normalization/submission.normalizer";
import { IngestionService } from "../src/normalization/ingestion.service";
import {
  getPlatformAdapter,
  isPlatformSupported,
} from "../src/platforms/platform.registry";
import { CodeforcesAdapter } from "../src/platforms/adapters/codeforces.adapter";
import { LeetCodeAdapter } from "../src/platforms/adapters/leetcode.adapter";
import { SharedPlatformThrottler } from "../src/platforms/throttler";
import { RawPlatformSubmission } from "../src/platforms/platform.types";

const prisma = new PrismaClient();

describe("Milestone 2: Platform Adapters, Normalization & Ingestion", () => {
  const testUserId = "user_test_m2";

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: { id: testUserId },
    });
    await prisma.user.create({
      data: {
        id: testUserId,
        email: "test_m2@progress.dev",
        name: "Milestone 2 Engineer",
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { id: testUserId },
    });
    await prisma.$disconnect();
  });

  describe("Step 7: Topic Normalization Taxonomy", () => {
    it("should map Codeforces tags into canonical taxonomy", () => {
      expect(normalizeTopic("codeforces", "two pointers")).toBe("two-pointers");
      expect(normalizeTopic("codeforces", "dfs and similar")).toBe("graphs");
      expect(normalizeTopic("codeforces", "dp")).toBe("dynamic-programming");
      expect(normalizeTopic("codeforces", "math")).toBe("math");
      expect(normalizeTopic("codeforces", "brute force")).toBe("implementation");
      expect(normalizeTopic("codeforces", "binary search")).toBe("binary-search");
    });

    it("should map LeetCode tags into canonical taxonomy", () => {
      expect(normalizeTopic("leetcode", "Array")).toBe("arrays");
      expect(normalizeTopic("leetcode", "String")).toBe("strings");
      expect(normalizeTopic("leetcode", "Two Pointers")).toBe("two-pointers");
      expect(normalizeTopic("leetcode", "Sliding Window")).toBe("sliding-window");
      expect(normalizeTopic("leetcode", "Depth-First Search")).toBe("graphs");
      expect(normalizeTopic("leetcode", "Simulation")).toBe("implementation");
    });

    it("should deduplicate and clean raw tags in normalizeTopics", () => {
      const rawTags = ["two pointers", "Two Pointers", "graphs", "dfs and similar"];
      const normalized = normalizeTopics("codeforces", rawTags);

      // Both "two pointers" map to "two-pointers"; both "graphs" and "dfs and similar" map to "graphs"
      expect(normalized).toEqual(["two-pointers", "graphs"]);
    });

    it("should preserve custom unknown tags as clean kebab slugs without throwing", () => {
      expect(normalizeTopic("codeforces", "interactive & geometry 3D")).toBe("interactive-geometry-3d");
    });
  });

  describe("Step 6: Difficulty Normalization (Preserving Native Coordinates)", () => {
    it("should keep Codeforces native rating separate and not equate CF 1400 == LC Medium", () => {
      const cfDiff = normalizeDifficulty("codeforces", 1400);
      expect(cfDiff.nativeDifficulty).toBe("1400");
      expect(cfDiff.numericDifficulty).toBe(1400);

      const lcDiff = normalizeDifficulty("leetcode", "Medium");
      expect(lcDiff.nativeDifficulty).toBe("Medium");
      expect(lcDiff.numericDifficulty).toBe(2);

      // Explicitly verifies native coordinates are preserved without arbitrary equality
      expect(cfDiff.nativeDifficulty).not.toBe(lcDiff.nativeDifficulty);
      expect(cfDiff.numericDifficulty).not.toBe(lcDiff.numericDifficulty);
    });

    it("should handle LeetCode Easy, Medium, and Hard tiers cleanly", () => {
      expect(normalizeDifficulty("leetcode", "Easy").numericDifficulty).toBe(1);
      expect(normalizeDifficulty("leetcode", "Medium").numericDifficulty).toBe(2);
      expect(normalizeDifficulty("leetcode", "Hard").numericDifficulty).toBe(3);
    });
  });

  describe("Step 6: Submission Normalizer", () => {
    it("should standardize verdicts and accepted flags", () => {
      expect(standardizeVerdict("codeforces", "OK")).toEqual({
        verdict: "ACCEPTED",
        accepted: true,
      });
      expect(standardizeVerdict("codeforces", "WRONG_ANSWER")).toEqual({
        verdict: "WRONG_ANSWER",
        accepted: false,
      });
      expect(standardizeVerdict("leetcode", "Time Limit Exceeded")).toEqual({
        verdict: "TIME_LIMIT_EXCEEDED",
        accepted: false,
      });
    });

    it("should normalize raw submission into canonical domain payload", () => {
      const raw: RawPlatformSubmission = {
        id: "198273612",
        problemId: "1800B",
        problemTitle: "Count the Number of Pairs",
        verdict: "OK",
        accepted: true,
        language: "GNU C++20",
        difficulty: "1000",
        numericDifficulty: 1000,
        rawTags: ["greedy", "strings"],
        timestamp: new Date("2026-10-20T12:00:00Z"),
        contestId: "1800",
      };

      const normalized = normalizeSubmission(testUserId, "codeforces", raw);

      expect(normalized.userId).toBe(testUserId);
      expect(normalized.platform).toBe("codeforces");
      expect(normalized.verdict).toBe("ACCEPTED");
      expect(normalized.accepted).toBe(true);
      expect(normalized.difficulty).toBe("1000");
      expect(normalized.topics).toEqual(["greedy", "strings"]);
    });
  });

  describe("Database Ingestion Pipeline (IngestionService)", () => {
    it("should idempotently upsert problems and normalized submissions", async () => {
      const rawSub: RawPlatformSubmission = {
        id: "cf_ingest_101",
        problemId: "1900A",
        problemTitle: "Cover in Water",
        verdict: "OK",
        accepted: true,
        language: "Rust",
        difficulty: "800",
        numericDifficulty: 800,
        rawTags: ["implementation", "brute force"],
        timestamp: new Date(),
      };

      const normalized = normalizeSubmission(testUserId, "codeforces", rawSub);

      // Ingest once
      const created = await IngestionService.upsertSubmission(normalized);
      expect(created.id).toBeDefined();
      expect(created.problemTitle).toBe("Cover in Water");
      expect(created.accepted).toBe(true);

      // Ingest same submission again with updated verdict (idempotent re-sync)
      normalized.verdict = "ACCEPTED";
      const updated = await IngestionService.upsertSubmission(normalized);

      expect(updated.id).toBe(created.id); // Same record updated, no duplicates

      // Verify problem record
      const problem = await prisma.problem.findUnique({
        where: {
          platform_externalProblemId: {
            platform: "codeforces",
            externalProblemId: "1900A",
          },
        },
      });
      expect(problem).toBeDefined();
      expect(problem?.title).toBe("Cover in Water");
    });

    it("should idempotently upsert contest history", async () => {
      await IngestionService.upsertContest(testUserId, "codeforces", {
        contestId: "980",
        contestName: "Codeforces Round 980 (Div. 2)",
        rank: 2450,
        oldRating: 1261,
        newRating: 1284,
        ratingChange: 23,
        timestamp: new Date(),
      });

      const contest = await prisma.contestHistory.findUnique({
        where: {
          userId_platform_contestId: {
            userId: testUserId,
            platform: "codeforces",
            contestId: "980",
          },
        },
      });

      expect(contest).toBeDefined();
      expect(contest?.ratingChange).toBe(23);
      expect(contest?.newRating).toBe(1284);
    });
  });

  describe("Platform Registry & Adapters", () => {
    it("should resolve registered adapters correctly", () => {
      expect(isPlatformSupported("codeforces")).toBe(true);
      expect(isPlatformSupported("leetcode")).toBe(true);
      expect(isPlatformSupported("codechef")).toBe(false);

      const cfAdapter = getPlatformAdapter("codeforces");
      expect(cfAdapter.platform).toBe("codeforces");

      const lcAdapter = getPlatformAdapter("leetcode");
      expect(lcAdapter.platform).toBe("leetcode");
    });

    it("should correctly parse Codeforces profile data from adapter", async () => {
      const cfAdapter = new CodeforcesAdapter();

      // Mock fetch response for Codeforces user.info
      const mockFetch = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: "OK",
          result: [
            {
              handle: "tourist",
              rating: 3850,
              maxRating: 3979,
              rank: "legendary grandmaster",
              maxRank: "tourist",
              avatar: "https://cf.example.com/tourist.jpg",
            },
          ],
        }),
      } as any);

      const profile = await cfAdapter.getProfile("tourist");
      expect(profile.username).toBe("tourist");
      expect(profile.rating).toBe(3850);
      expect(profile.maxRating).toBe(3979);
      expect(profile.rank).toBe("legendary grandmaster");

      mockFetch.mockRestore();
    });

    it("should correctly parse LeetCode profile stats from GraphQL", async () => {
      const lcAdapter = new LeetCodeAdapter();

      // Mock fetch response for LeetCode GraphQL
      const mockFetch = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: {
            matchedUser: {
              username: "algo_expert",
              profile: {
                ranking: 15420,
                userAvatar: "https://lc.example.com/avatar.png",
              },
              submitStatsGlobal: {
                acSubmissionNum: [
                  { difficulty: "All", count: 280, submissions: 450 },
                  { difficulty: "Easy", count: 120, submissions: 150 },
                  { difficulty: "Medium", count: 130, submissions: 220 },
                  { difficulty: "Hard", count: 30, submissions: 80 },
                ],
              },
            },
          },
        }),
      } as any);

      const profile = await lcAdapter.getProfile("algo_expert");
      expect(profile.username).toBe("algo_expert");
      expect(profile.totalSolved).toBe(280);
      expect(profile.easySolved).toBe(120);
      expect(profile.mediumSolved).toBe(130);
      expect(profile.hardSolved).toBe(30);

      mockFetch.mockRestore();
    });

    it("should ensure LeetCode and Codeforces adapters fail independently", async () => {
      // Use test throttler with 0 retries for instant error assertion
      const fastThrottler = new SharedPlatformThrottler({
        minIntervalMs: 0,
        maxRetries: 0,
      });
      const cfAdapter = new CodeforcesAdapter(fastThrottler);
      const lcAdapter = new LeetCodeAdapter();

      // Mock Codeforces failing with a 500 network error
      const mockFetch = vi.spyOn(globalThis, "fetch").mockImplementation(async (url: any) => {
        if (typeof url === "string" && url.includes("codeforces.com")) {
          return {
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
          } as any;
        }
        // LeetCode succeeds
        return {
          ok: true,
          json: async () => ({
            data: {
              matchedUser: {
                username: "healthy_user",
                profile: { ranking: 1000 },
                submitStatsGlobal: { acSubmissionNum: [] },
              },
            },
          }),
        } as any;
      });

      // Codeforces fails cleanly
      await expect(cfAdapter.getProfile("any_cf_user")).rejects.toThrow();

      // But LeetCode functions independently without crash
      const lcProfile = await lcAdapter.getProfile("healthy_user");
      expect(lcProfile.username).toBe("healthy_user");

      mockFetch.mockRestore();
    });
  });
});
