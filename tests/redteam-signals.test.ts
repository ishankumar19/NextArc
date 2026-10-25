import { describe, it, expect } from "vitest";
import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ConfidenceCalculator } from "@/planning/signals/confidence.calculator";
import { DifficultySignalExtractor } from "@/planning/signals/difficulty.extractor";
import { TopicSignalExtractor } from "@/planning/signals/topic.extractor";
import { ContestSignalExtractor } from "@/planning/signals/contest.extractor";
import { SignalEngine } from "@/planning/signals/signal.engine";

describe("Red-Team 1: Signal Engine Thresholds & Boundary Verification", () => {
  const baseContext: ProgressContextV1 = {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    goal: {
      id: "goal-rt-1",
      title: "Specialist Goal",
      category: "competitive_programming",
      targetMetric: "codeforces_rating",
      targetValue: 1400,
      currentValue: 1250,
      initialValue: 1200,
      gap: 150,
      daysRemaining: 30,
      isOverdue: false,
      startDate: new Date().toISOString(),
      deadline: new Date().toISOString(),
      availableHoursPerWeek: 10,
    },
    platforms: [{ platform: "codeforces", username: "tester", status: "connected", lastSyncedAt: null }],
    dataFreshness: {
      codeforces: { platform: "codeforces", lastSyncedAt: null, ageMinutes: 0, freshnessStatus: "fresh" },
      leetcode: { platform: "leetcode", lastSyncedAt: null, ageMinutes: 0, freshnessStatus: "fresh" },
    },
    platformCompleteness: {
      codeforces: {
        platform: "codeforces",
        reliabilityTier: "authoritative",
        completeness: "complete",
        supportedMetrics: ["codeforces_rating", "full_submission_history"],
        unsupportedMetrics: [],
        knownLimitations: [],
      },
      leetcode: {
        platform: "leetcode",
        reliabilityTier: "best_effort",
        completeness: "partial",
        supportedMetrics: ["leetcode_solved_total"],
        unsupportedMetrics: ["contest_rating_progression"],
        knownLimitations: ["bounded history"],
      },
    },
    currentState: { codeforcesRating: 1250 },
    recentActivity: {
      last7Days: { problemsSolved: 5, submissions: 10, activeDays: 3 },
      last30Days: { problemsSolved: 15, submissions: 25, activeDays: 10 },
      currentStreak: 2,
    },
    difficultyPerformance: {
      codeforces: {},
      leetcode: {
        Easy: { attempted: 0, solved: 0, acceptanceRate: 0 },
        Medium: { attempted: 0, solved: 0, acceptanceRate: 0 },
        Hard: { attempted: 0, solved: 0, acceptanceRate: 0 },
      },
    },
    topicPerformance: {},
    contestPerformance: {
      totalContests: 5,
      ratingChange7d: 0,
      ratingChange30d: 0,
      recentContests: [],
    },
    supportingEvidence: {
      contestsThisMonth: 1,
      targetRangeProblemsSolvedThisWeek: 3,
      activeDaysThisWeek: 3,
      netRatingMovementRecent: 0,
    },
  };

  describe("Sample Size Thresholds in ConfidenceCalculator", () => {
    it("boundary below threshold: 2 observations yield strictly 'low' confidence", () => {
      const conf = ConfidenceCalculator.compute({ source: "codeforces", sampleSize: 2 });
      expect(conf.level).toBe("low");
      expect(conf.reason).toContain("too small");
    });

    it("boundary at threshold: 3 observations step up to 'medium' confidence", () => {
      const conf = ConfidenceCalculator.compute({ source: "codeforces", sampleSize: 3 });
      expect(conf.level).toBe("medium");
    });

    it("boundary below high threshold: 9 observations remain 'medium'", () => {
      const conf = ConfidenceCalculator.compute({ source: "codeforces", sampleSize: 9 });
      expect(conf.level).toBe("medium");
    });

    it("boundary at high threshold: 10 authoritative observations yield 'high' confidence", () => {
      const conf = ConfidenceCalculator.compute({ source: "codeforces", sampleSize: 10 });
      expect(conf.level).toBe("high");
    });

    it("partial LeetCode history: 50 observations are strictly capped at 'medium' confidence", () => {
      const conf = ConfidenceCalculator.compute({ source: "leetcode", sampleSize: 50 });
      expect(conf.level).toBe("medium");
      expect(conf.completeness).toBe("bounded_history");
      expect(conf.reason).toContain("bounded by LeetCode public window limits");
    });
  });

  describe("Difficulty Stagnation Concentration Thresholds (69% vs 70%)", () => {
    it("concentration at 69% (below 70% threshold) does NOT trigger difficulty_stagnation", () => {
      // 100 total solved: 69 rated <= 1000 (threshold is 1250 - 200 = 1050), 31 rated 1200
      const ctx: ProgressContextV1 = {
        ...baseContext,
        difficultyPerformance: {
          ...baseContext.difficultyPerformance,
          codeforces: {
            "900": { attempted: 69, solved: 69, acceptanceRate: 100 },
            "1200": { attempted: 35, solved: 31, acceptanceRate: 88.5 },
          },
        },
      };

      const signals = DifficultySignalExtractor.extract(ctx);
      const stagnation = signals.find((s) => s.type === "difficulty_stagnation");
      expect(stagnation).toBeUndefined();
    });

    it("concentration at 70% (at/above 70% threshold) triggers difficulty_stagnation", () => {
      // 100 total solved: 70 rated <= 1000, 30 rated 1200
      const ctx: ProgressContextV1 = {
        ...baseContext,
        difficultyPerformance: {
          ...baseContext.difficultyPerformance,
          codeforces: {
            "900": { attempted: 70, solved: 70, acceptanceRate: 100 },
            "1200": { attempted: 35, solved: 30, acceptanceRate: 85.7 },
          },
        },
      };

      const signals = DifficultySignalExtractor.extract(ctx);
      const stagnation = signals.find((s) => s.type === "difficulty_stagnation");
      expect(stagnation).toBeDefined();
      expect(stagnation?.value).toBe("70%");
    });
  });

  describe("Adjacent Difficulty Buckets with Tiny Samples (< 3 attempts)", () => {
    it("does not trigger difficulty dropoff if higher bucket has only 2 attempts", () => {
      const ctx: ProgressContextV1 = {
        ...baseContext,
        difficultyPerformance: {
          ...baseContext.difficultyPerformance,
          codeforces: {
            "1200": { attempted: 15, solved: 13, acceptanceRate: 86.6 },
            "1300": { attempted: 2, solved: 0, acceptanceRate: 0 }, // 0% but only 2 attempts
          },
        },
      };

      const signals = DifficultySignalExtractor.extract(ctx);
      const dropoff = signals.find((s) => s.type === "difficulty_dropoff");
      expect(dropoff).toBeUndefined(); // Suppressed because sampleSize < 3
    });

    it("triggers difficulty dropoff as soon as higher bucket reaches 3 attempts", () => {
      const ctx: ProgressContextV1 = {
        ...baseContext,
        difficultyPerformance: {
          ...baseContext.difficultyPerformance,
          codeforces: {
            "1200": { attempted: 15, solved: 13, acceptanceRate: 86.6 },
            "1300": { attempted: 3, solved: 0, acceptanceRate: 0 },
          },
        },
      };

      const signals = DifficultySignalExtractor.extract(ctx);
      const dropoff = signals.find((s) => s.type === "difficulty_dropoff");
      expect(dropoff).toBeDefined();
      expect(dropoff?.value).toBe("0%");
      expect(dropoff?.confidence.level).toBe("medium");
    });
  });

  describe("Zero Activity & Single Bucket Scenarios", () => {
    it("handles zero activity context gracefully without throwing or inventing phantom signals", () => {
      const emptyCtx: ProgressContextV1 = {
        ...baseContext,
        currentState: {},
        recentActivity: {
          last7Days: { problemsSolved: 0, submissions: 0, activeDays: 0 },
          last30Days: { problemsSolved: 0, submissions: 0, activeDays: 0 },
          currentStreak: 0,
        },
        difficultyPerformance: {
          codeforces: {},
          leetcode: {
            Easy: { attempted: 0, solved: 0, acceptanceRate: 0 },
            Medium: { attempted: 0, solved: 0, acceptanceRate: 0 },
            Hard: { attempted: 0, solved: 0, acceptanceRate: 0 },
          },
        },
        topicPerformance: {},
        contestPerformance: {
          totalContests: 0,
          ratingChange7d: 0,
          ratingChange30d: 0,
          recentContests: [],
        },
        supportingEvidence: {
          contestsThisMonth: 0,
          targetRangeProblemsSolvedThisWeek: 0,
          activeDaysThisWeek: 0,
          netRatingMovementRecent: 0,
        },
      };

      const signals = SignalEngine.extractSignals(emptyCtx);
      // Low contest frequency should trigger (since CP goal has 0 contests), but no difficulty dropoff or phantom topics
      expect(signals.some((s) => s.type === "difficulty_dropoff")).toBe(false);
      expect(signals.some((s) => s.type === "difficulty_stagnation")).toBe(false);
      expect(signals.some((s) => s.type === "overexposed_topic")).toBe(false);
    });

    it("does not trigger difficulty dropoff when only one bucket is populated", () => {
      const ctx: ProgressContextV1 = {
        ...baseContext,
        difficultyPerformance: {
          ...baseContext.difficultyPerformance,
          codeforces: {
            "1200": { attempted: 20, solved: 18, acceptanceRate: 90 },
          },
        },
      };

      const signals = DifficultySignalExtractor.extract(ctx);
      expect(signals.filter((s) => s.type === "difficulty_dropoff")).toHaveLength(0);
    });
  });

  describe("Topic Exposure Thresholds (49% vs 50%)", () => {
    it("concentration at 49% does not trigger overexposed_topic", () => {
      // 100 total solves: 49 implementation (49%), 26 math (26%), 25 greedy (25%) -> none >= 50%
      const ctx: ProgressContextV1 = {
        ...baseContext,
        topicPerformance: {
          implementation: { topic: "implementation", attempted: 50, solved: 49, acceptanceRate: 98, recentSolved: 20 },
          math: { topic: "math", attempted: 27, solved: 26, acceptanceRate: 96, recentSolved: 10 },
          greedy: { topic: "greedy", attempted: 26, solved: 25, acceptanceRate: 96, recentSolved: 10 },
        },
      };

      const signals = TopicSignalExtractor.extract(ctx);
      expect(signals.find((s) => s.type === "overexposed_topic")).toBeUndefined();
    });

    it("concentration at 50% triggers overexposed_topic", () => {
      // 20 total solves: 10 implementation (50%), 10 math
      const ctx: ProgressContextV1 = {
        ...baseContext,
        topicPerformance: {
          implementation: { topic: "implementation", attempted: 10, solved: 10, acceptanceRate: 100, recentSolved: 10 },
          math: { topic: "math", attempted: 10, solved: 10, acceptanceRate: 100, recentSolved: 5 },
        },
      };

      const signals = TopicSignalExtractor.extract(ctx);
      const overexposed = signals.find((s) => s.type === "overexposed_topic");
      expect(overexposed).toBeDefined();
      expect(overexposed?.metric).toBe("topic_dominance_implementation");
      expect(overexposed?.value).toBe("50%");
    });
  });
});
