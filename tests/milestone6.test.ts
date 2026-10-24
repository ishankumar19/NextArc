import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ConfidenceCalculator } from "@/planning/signals/confidence.calculator";
import { DifficultySignalExtractor } from "@/planning/signals/difficulty.extractor";
import { TopicSignalExtractor } from "@/planning/signals/topic.extractor";
import { ContestSignalExtractor } from "@/planning/signals/contest.extractor";
import { CompletenessSignalExtractor } from "@/planning/signals/completeness.extractor";
import { SignalEngine } from "@/planning/signals/signal.engine";

describe("Milestone 6: Planning Contracts & Signal Engine", () => {
  describe("EvidenceConfidence Calculator", () => {
    it("assigns low confidence for small sample sizes (< 3)", () => {
      const conf = ConfidenceCalculator.compute({
        source: "codeforces",
        sampleSize: 2,
        completeness: "complete",
      });
      expect(conf.level).toBe("low");
      expect(conf.sampleSize).toBe(2);
      expect(conf.reason).toContain("too small");
    });

    it("assigns medium confidence for moderate sample sizes (3-9)", () => {
      const conf = ConfidenceCalculator.compute({
        source: "codeforces",
        sampleSize: 5,
        completeness: "complete",
      });
      expect(conf.level).toBe("medium");
      expect(conf.sampleSize).toBe(5);
    });

    it("assigns high confidence for large sample sizes from authoritative sources", () => {
      const conf = ConfidenceCalculator.compute({
        source: "codeforces",
        sampleSize: 45,
        completeness: "complete",
      });
      expect(conf.level).toBe("high");
      expect(conf.sampleSize).toBe(45);
      expect(conf.completeness).toBe("complete");
    });

    it("strictly caps LeetCode confidence at medium even with large samples", () => {
      const conf = ConfidenceCalculator.compute({
        source: "leetcode",
        sampleSize: 50,
      });
      expect(conf.level).toBe("medium");
      expect(conf.completeness).toBe("bounded_history");
      expect(conf.reason).toContain("bounded by LeetCode public window limits");
    });
  });

  describe("DifficultySignalExtractor", () => {
    it("extracts difficulty_dropoff when success rate drops steeply between adjacent bins", () => {
      const mockContext: Partial<ProgressContextV1> = {
        currentState: { codeforcesRating: 1284 },
        goal: {
          id: "g1",
          title: "Specialist",
          category: "competitive_programming",
          targetMetric: "codeforces_rating",
          targetValue: 1400,
          currentValue: 1284,
          initialValue: 1284,
          gap: 116,
          daysRemaining: 30,
          isOverdue: false,
          startDate: new Date().toISOString(),
          deadline: new Date().toISOString(),
        },
        difficultyPerformance: {
          codeforces: {
            "1200": { attempted: 16, solved: 13, acceptanceRate: 81.25, recentSolved: 5 },
            "1300": { attempted: 13, solved: 5, acceptanceRate: 38.46, recentSolved: 2 },
          },
          leetcode: {
            Easy: { attempted: 0, solved: 0, acceptanceRate: 0 },
            Medium: { attempted: 0, solved: 0, acceptanceRate: 0 },
            Hard: { attempted: 0, solved: 0, acceptanceRate: 0 },
          },
        },
        platforms: [{ platform: "codeforces", username: "test", status: "connected", lastSyncedAt: null }],
        recentActivity: {
          last7Days: { problemsSolved: 5, submissions: 10, activeDays: 3 },
          last30Days: { problemsSolved: 18, submissions: 29, activeDays: 12 },
          currentStreak: 2,
        },
        platformCompleteness: {
          codeforces: {
            platform: "codeforces",
            reliabilityTier: "authoritative",
            completeness: "complete",
            supportedMetrics: [],
            unsupportedMetrics: [],
            knownLimitations: [],
          },
          leetcode: {
            platform: "leetcode",
            reliabilityTier: "best_effort",
            completeness: "partial",
            supportedMetrics: [],
            unsupportedMetrics: [],
            knownLimitations: [],
          },
        },
      };

      const signals = DifficultySignalExtractor.extract(mockContext as ProgressContextV1);
      const dropoff = signals.find((s) => s.type === "difficulty_dropoff");

      expect(dropoff).toBeDefined();
      expect(dropoff?.metric).toBe("codeforces_difficulty_1300");
      expect(dropoff?.value).toBe("38%");
      expect(dropoff?.confidence.level).toBe("high");
      expect(dropoff?.evidence.description).toContain("Codeforces 1300 success rate is 38%");
      expect(dropoff?.evidence.description).toContain("dropping from 81% at rating 1200");
    });

    it("extracts difficulty_stagnation when user practices exclusively well below rating", () => {
      const mockContext: Partial<ProgressContextV1> = {
        currentState: { codeforcesRating: 1400 },
        goal: {
          id: "g1",
          title: "Expert",
          category: "competitive_programming",
          targetMetric: "codeforces_rating",
          targetValue: 1600,
          currentValue: 1400,
          initialValue: 1400,
          gap: 200,
          daysRemaining: 40,
          isOverdue: false,
          startDate: new Date().toISOString(),
          deadline: new Date().toISOString(),
        },
        difficultyPerformance: {
          codeforces: {
            "900": { attempted: 10, solved: 10, acceptanceRate: 100 },
            "1000": { attempted: 15, solved: 14, acceptanceRate: 93.3 },
            "1400": { attempted: 2, solved: 1, acceptanceRate: 50 },
          },
          leetcode: {
            Easy: { attempted: 0, solved: 0, acceptanceRate: 0 },
            Medium: { attempted: 0, solved: 0, acceptanceRate: 0 },
            Hard: { attempted: 0, solved: 0, acceptanceRate: 0 },
          },
        },
        platforms: [{ platform: "codeforces", username: "test", status: "connected", lastSyncedAt: null }],
        recentActivity: {
          last7Days: { problemsSolved: 5, submissions: 6, activeDays: 3 },
          last30Days: { problemsSolved: 25, submissions: 27, activeDays: 14 },
          currentStreak: 3,
        },
      };

      const signals = DifficultySignalExtractor.extract(mockContext as ProgressContextV1);
      const stagnation = signals.find((s) => s.type === "difficulty_stagnation");

      expect(stagnation).toBeDefined();
      expect(stagnation?.metric).toBe("low_difficulty_practice_ratio");
      expect(stagnation?.value).toBe("96%");
    });
  });

  describe("TopicSignalExtractor", () => {
    it("extracts underexposed_topic for core DSA topics with low recent solves", () => {
      const mockContext: Partial<ProgressContextV1> = {
        topicPerformance: {
          "greedy": { topic: "greedy", attempted: 2, solved: 2, acceptanceRate: 100, recentSolved: 2 },
          "implementation": { topic: "implementation", attempted: 15, solved: 15, acceptanceRate: 100, recentSolved: 12 },
        },
        platforms: [{ platform: "codeforces", username: "test", status: "connected", lastSyncedAt: null }],
        recentActivity: {
          last7Days: { problemsSolved: 5, submissions: 7, activeDays: 3 },
          last30Days: { problemsSolved: 15, submissions: 20, activeDays: 10 },
          currentStreak: 1,
        },
      };

      const signals = TopicSignalExtractor.extract(mockContext as ProgressContextV1);
      const greedySignal = signals.find((s) => s.id === "sig-topic-underexposed-greedy");

      expect(greedySignal).toBeDefined();
      expect(greedySignal?.type).toBe("underexposed_topic");
      expect(greedySignal?.value).toBe("2 recent solves");
      expect(greedySignal?.evidence.description).toContain("Only 2 problems solved in topic 'greedy'");
    });

    it("extracts overexposed_topic when one topic dominates majority of practice", () => {
      const mockContext: Partial<ProgressContextV1> = {
        topicPerformance: {
          "implementation": { topic: "implementation", attempted: 25, solved: 24, acceptanceRate: 96, recentSolved: 18 },
          "math": { topic: "math", attempted: 6, solved: 5, acceptanceRate: 83.3, recentSolved: 3 },
        },
        platforms: [{ platform: "codeforces", username: "test", status: "connected", lastSyncedAt: null }],
        recentActivity: {
          last7Days: { problemsSolved: 6, submissions: 8, activeDays: 4 },
          last30Days: { problemsSolved: 21, submissions: 26, activeDays: 12 },
          currentStreak: 2,
        },
      };

      const signals = TopicSignalExtractor.extract(mockContext as ProgressContextV1);
      const overexposed = signals.find((s) => s.type === "overexposed_topic");

      expect(overexposed).toBeDefined();
      expect(overexposed?.metric).toBe("topic_dominance_implementation");
      expect(overexposed?.value).toBe("83%");
    });

    it("extracts topic_weakness when acceptance rate is below 40% with sufficient attempts", () => {
      const mockContext: Partial<ProgressContextV1> = {
        topicPerformance: {
          "dynamic-programming": { topic: "dynamic-programming", attempted: 8, solved: 2, acceptanceRate: 25, recentSolved: 1 },
        },
        platforms: [{ platform: "codeforces", username: "test", status: "connected", lastSyncedAt: null }],
        recentActivity: {
          last7Days: { problemsSolved: 1, submissions: 4, activeDays: 2 },
          last30Days: { problemsSolved: 5, submissions: 15, activeDays: 6 },
          currentStreak: 0,
        },
      };

      const signals = TopicSignalExtractor.extract(mockContext as ProgressContextV1);
      const weakness = signals.find((s) => s.type === "topic_weakness");

      expect(weakness).toBeDefined();
      expect(weakness?.value).toBe("25%");
      expect(weakness?.metric).toBe("topic_acceptance_dynamic-programming");
    });
  });

  describe("ContestSignalExtractor", () => {
    it("extracts low_contest_frequency for CP goal with <= 1 contest in 30 days", () => {
      const mockContext: Partial<ProgressContextV1> = {
        goal: {
          id: "g1",
          title: "Specialist",
          category: "competitive_programming",
          targetMetric: "codeforces_rating",
          targetValue: 1400,
          currentValue: 1284,
          initialValue: 1284,
          gap: 116,
          daysRemaining: 25,
          isOverdue: false,
          startDate: new Date().toISOString(),
          deadline: new Date().toISOString(),
        },
        supportingEvidence: {
          contestsThisMonth: 1,
          targetRangeProblemsSolvedThisWeek: 4,
          activeDaysThisWeek: 3,
          netRatingMovementRecent: 15,
        },
        contestPerformance: {
          totalContests: 5,
          ratingChange7d: 0,
          ratingChange30d: 15,
          recentContests: [],
        },
      };

      const signals = ContestSignalExtractor.extract(mockContext as ProgressContextV1);
      const freqSignal = signals.find((s) => s.type === "low_contest_frequency");

      expect(freqSignal).toBeDefined();
      expect(freqSignal?.value).toBe("1 contest in 30 days");
    });

    it("extracts positive_rating_trend when recent contests show net rating climb", () => {
      const mockContext: Partial<ProgressContextV1> = {
        goal: {
          id: "g1",
          title: "Specialist",
          category: "competitive_programming",
          targetMetric: "codeforces_rating",
          targetValue: 1400,
          currentValue: 1358,
          initialValue: 1284,
          gap: 42,
          daysRemaining: 20,
          isOverdue: false,
          startDate: new Date().toISOString(),
          deadline: new Date().toISOString(),
        },
        supportingEvidence: {
          contestsThisMonth: 3,
          targetRangeProblemsSolvedThisWeek: 5,
          activeDaysThisWeek: 4,
          netRatingMovementRecent: 74,
        },
        contestPerformance: {
          totalContests: 12,
          ratingChange7d: 32,
          ratingChange30d: 74,
          recentContests: [
            { contestId: "1", contestName: "Round 1", rank: 1200, oldRating: 1326, newRating: 1358, ratingChange: 32, timestamp: new Date().toISOString() },
            { contestId: "2", contestName: "Round 2", rank: 1100, oldRating: 1284, newRating: 1326, ratingChange: 42, timestamp: new Date().toISOString() },
          ],
        },
      };

      const signals = ContestSignalExtractor.extract(mockContext as ProgressContextV1);
      const trend = signals.find((s) => s.type === "positive_rating_trend");

      expect(trend).toBeDefined();
      expect(trend?.value).toBe("+74");
      expect(trend?.evidence.description).toContain("+74 rating movement over the last 2 contests");
    });
  });

  describe("CompletenessSignalExtractor", () => {
    it("extracts data_completeness_bound for partial platform integrations", () => {
      const mockContext: Partial<ProgressContextV1> = {
        recentActivity: {
          last7Days: { problemsSolved: 2, submissions: 3, activeDays: 2 },
          last30Days: { problemsSolved: 10, submissions: 15, activeDays: 5 },
          currentStreak: 1,
        },
        platformCompleteness: {
          codeforces: {
            platform: "codeforces",
            reliabilityTier: "authoritative",
            completeness: "complete",
            supportedMetrics: [],
            unsupportedMetrics: [],
            knownLimitations: [],
          },
          leetcode: {
            platform: "leetcode",
            reliabilityTier: "best_effort",
            completeness: "partial",
            supportedMetrics: ["leetcode_solved_total"],
            unsupportedMetrics: ["contest_rating_progression", "complete_historical_submission_log"],
            knownLimitations: ["Bounded to recent submissions"],
          },
        },
      };

      const signals = CompletenessSignalExtractor.extract(mockContext as ProgressContextV1);
      const bound = signals.find((s) => s.type === "data_completeness_bound");

      expect(bound).toBeDefined();
      expect(bound?.confidence.level).toBe("medium");
      expect(bound?.evidence.description).toContain("Unsupported metrics include: contest_rating_progression");
    });
  });

  describe("Signal Integrity & Descriptive Guardrails", () => {
    it("ensures signals are purely descriptive facts and do not contain prescriptive imperatives", () => {
      const mockContext: Partial<ProgressContextV1> = {
        currentState: { codeforcesRating: 1284 },
        goal: {
          id: "g1",
          title: "Specialist",
          category: "competitive_programming",
          targetMetric: "codeforces_rating",
          targetValue: 1400,
          currentValue: 1284,
          initialValue: 1284,
          gap: 116,
          daysRemaining: 30,
          isOverdue: false,
          startDate: new Date().toISOString(),
          deadline: new Date().toISOString(),
        },
        difficultyPerformance: {
          codeforces: {
            "1200": { attempted: 10, solved: 8, acceptanceRate: 80, recentSolved: 4 },
            "1300": { attempted: 10, solved: 3, acceptanceRate: 30, recentSolved: 1 },
          },
          leetcode: {
            Easy: { attempted: 0, solved: 0, acceptanceRate: 0 },
            Medium: { attempted: 0, solved: 0, acceptanceRate: 0 },
            Hard: { attempted: 0, solved: 0, acceptanceRate: 0 },
          },
        },
        topicPerformance: {
          "greedy": { topic: "greedy", attempted: 2, solved: 1, acceptanceRate: 50, recentSolved: 1 },
        },
        platforms: [{ platform: "codeforces", username: "test", status: "connected", lastSyncedAt: null }],
        recentActivity: {
          last7Days: { problemsSolved: 3, submissions: 5, activeDays: 2 },
          last30Days: { problemsSolved: 12, submissions: 20, activeDays: 8 },
          currentStreak: 1,
        },
        supportingEvidence: {
          contestsThisMonth: 0,
          targetRangeProblemsSolvedThisWeek: 1,
          activeDaysThisWeek: 2,
          netRatingMovementRecent: 0,
        },
        contestPerformance: {
          totalContests: 2,
          ratingChange7d: 0,
          ratingChange30d: 0,
          recentContests: [],
        },
        platformCompleteness: {
          codeforces: {
            platform: "codeforces",
            reliabilityTier: "authoritative",
            completeness: "complete",
            supportedMetrics: [],
            unsupportedMetrics: [],
            knownLimitations: [],
          },
          leetcode: {
            platform: "leetcode",
            reliabilityTier: "best_effort",
            completeness: "partial",
            supportedMetrics: [],
            unsupportedMetrics: [],
            knownLimitations: [],
          },
        },
      };

      const signals = SignalEngine.extractSignals(mockContext as ProgressContextV1);
      const prescriptiveWords = ["you should", "you must", "solve more", "practice more", "recommend", "prescribe"];

      for (const signal of signals) {
        const text = `${signal.evidence.description} ${signal.confidence.reason || ""}`.toLowerCase();
        for (const badWord of prescriptiveWords) {
          expect(text).not.toContain(badWord);
        }
      }
    });

    it("extracts signals accurately from the live ProgressContext v1 fixture", () => {
      const fixturePath = path.resolve(__dirname, "../fixtures/progress-context-v1.fixture.json");
      if (!fs.existsSync(fixturePath)) return;

      const rawFixture = fs.readFileSync(fixturePath, "utf-8");
      const fixture = JSON.parse(rawFixture) as ProgressContextV1;

      const signals = SignalEngine.extractSignals(fixture);
      expect(signals.length).toBeGreaterThan(0);

      // Verify all signals have valid confidence objects
      for (const sig of signals) {
        expect(["high", "medium", "low"]).toContain(sig.confidence.level);
        expect(typeof sig.value).toBe("string");
        expect(sig.evidence.description.length).toBeGreaterThan(5);
      }
    });
  });
});
