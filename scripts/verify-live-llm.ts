/**
 * Live LLM Planning Verification Harness
 * 
 * Verifies live LLM planning when credentials (GEMINI_API_KEY or OPENAI_API_KEY) are provided,
 * and validates deterministic fallback resilience when credentials are absent or refused.
 */

import { PlannerService, DeterministicPlanner } from "../src/planning/planner.service";
import { PlanValidator } from "../src/planning/plan.validator";
import { ProgressContextV1 } from "../src/goals/progress-context.types";
import { ProgressSignal } from "../src/planning/signals.types";
import { PlanOutcome } from "../src/planning/evaluation/evaluation.types";
import { getPlatformQualityReport } from "../src/platforms/capabilities";

async function runLLMVerification() {
  console.log("============================================================");
  console.log("   LIVE LLM & DETERMINISTIC FALLBACK VERIFICATION HARNESS   ");
  console.log("============================================================\n");

  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const hasLiveCredentials = Boolean(geminiKey || openaiKey);

  console.log(`[Status] Provider Credentials:`);
  console.log(` - GEMINI_API_KEY: ${geminiKey ? "CONFIGURED (Live Mode)" : "NOT CONFIGURED"}`);
  console.log(` - OPENAI_API_KEY: ${openaiKey ? "CONFIGURED (Live Mode)" : "NOT CONFIGURED"}`);

  // Construct realistic, fully typed ProgressContextV1
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
      id: "goal_verify_llm",
      title: "Reach 1600 on Codeforces",
      category: "competitive_programming",
      targetMetric: "codeforces_rating",
      targetValue: 1600,
      initialValue: 1284,
      currentValue: 1312,
      gap: 288,
      daysRemaining: 45,
      isOverdue: false,
      startDate: new Date(Date.now() - 30 * 86400000).toISOString(),
      deadline: new Date(Date.now() + 45 * 86400000).toISOString(),
      availableHoursPerWeek: 10,
    },
    platforms: [
      {
        platform: "codeforces",
        username: "test_solver",
        status: "connected",
        lastSyncedAt: new Date().toISOString(),
      },
    ],
    currentState: {
      codeforcesRating: 1312,
      codeforcesMaxRating: 1312,
      codeforcesRank: "pupil",
      leetcodeTotalSolved: 0,
      leetcodeEasy: 0,
      leetcodeMedium: 0,
      leetcodeHard: 0,
    },
    recentActivity: {
      last7Days: { problemsSolved: 9, submissions: 12, activeDays: 4 },
      last30Days: { problemsSolved: 32, submissions: 45, activeDays: 14 },
      currentStreak: 4,
    },
    difficultyPerformance: {
      codeforces: {
        "1200": { attempted: 15, solved: 13, acceptanceRate: 86.7 },
        "1300": { attempted: 14, solved: 9, acceptanceRate: 64.3 },
        "1400": { attempted: 16, solved: 6, acceptanceRate: 37.5 },
      },
      leetcode: {
        Easy: { attempted: 0, solved: 0, acceptanceRate: 0 },
        Medium: { attempted: 0, solved: 0, acceptanceRate: 0 },
        Hard: { attempted: 0, solved: 0, acceptanceRate: 0 },
      },
    },
    topicPerformance: {
      "binary-search": { topic: "binary-search", attempted: 12, solved: 8, acceptanceRate: 66.7, recentSolved: 5 },
      greedy: { topic: "greedy", attempted: 18, solved: 14, acceptanceRate: 77.8, recentSolved: 8 },
      graphs: { topic: "graphs", attempted: 10, solved: 4, acceptanceRate: 40.0, recentSolved: 2 },
    },
    contestPerformance: {
      totalContests: 2,
      ratingChange7d: 28,
      ratingChange30d: 28,
      recentContests: [
        { contestId: "102", contestName: "Round 2", oldRating: 1284, newRating: 1312, ratingChange: 28, rank: 3500, timestamp: new Date().toISOString() },
      ],
    },
    supportingEvidence: {
      targetRangeProblemsSolvedThisWeek: 6,
      contestsThisMonth: 1,
      activeDaysThisWeek: 4,
      netRatingMovementRecent: 28,
    },
  };

  const mockSignals: ProgressSignal[] = [
    {
      id: "sig_diff_dropoff_1400",
      type: "difficulty_dropoff",
      metric: "codeforces_rating_1400",
      value: 0.375,
      confidence: {
        level: "high",
        source: "codeforces",
        completeness: "complete",
        sampleSize: 16,
      },
      evidence: {
        description: "Codeforces 1400 solve rate dropped to 37.5% across 16 attempts.",
        sampleCount: 16,
        metrics: { successRate: 0.375 },
        platformSource: "codeforces",
      },
    },
    {
      id: "sig_weak_topic_graphs",
      type: "underexposed_topic",
      metric: "graphs",
      value: 0.4,
      confidence: {
        level: "medium",
        source: "codeforces",
        completeness: "complete",
        sampleSize: 10,
      },
      evidence: {
        description: "Graphs accuracy is 40.0% across 10 attempts.",
        sampleCount: 10,
        metrics: { successRate: 0.4 },
        platformSource: "codeforces",
      },
    },
  ];

  if (hasLiveCredentials) {
    console.log("\n[Test 1] Executing Live LLM Plan Generation...");
    const plan = await PlannerService.generatePlan({
      context: mockContext,
      signals: mockSignals,
    });

    console.log(` - Generated Plan Version: ${plan.versionNumber}`);
    console.log(` - Assessment: ${plan.assessment.summary.substring(0, 80)}...`);
    console.log(` - Tasks planned: ${plan.tasks.length}`);

    const validation = PlanValidator.validate(plan, {
      availableHoursPerWeek: 10,
      validSignalIds: mockSignals.map((s) => s.id),
      signalConfidenceMap: {
        sig_diff_dropoff_1400: "high",
        sig_weak_topic_graphs: "medium",
      },
    });

    if (!validation.success) {
      console.error(" - Live LLM plan failed schema validation:", validation.errors);
      process.exit(1);
    }
    console.log(" ✓ Live LLM Plan passed strict validation!");

    console.log("\n[Test 2] Executing Live LLM Plan Adaptation...");
    const mockOutcome: PlanOutcome = {
      planId: "plan_verify_1",
      versionNumber: 1,
      evaluatedAt: new Date().toISOString(),
      completionRate: 100,
      tasksPlanned: plan.tasks.length,
      tasksCompleted: plan.tasks.length,
      insufficientEvidence: false,
      outcomeImprovement: "improved",
      evidenceCollected: {
        totalSubmissionsInPeriod: 15,
        totalProblemsSolvedInPeriod: 10,
        contestsParticipated: 1,
        targetRangeProblemsSolved: 6,
      },
      metricChanges: {
        startRating: 1284,
        endRating: 1312,
        ratingDelta: 28,
        activeDays: 6,
        topicProgression: {
          greedy: { solves: 4 },
          "binary-search": { solves: 2 },
        },
      },
      summary: "Plan worked: all tasks completed with rating gain.",
      adaptationGuidance: "Advance difficulty to next bracket.",
    };

    const adaptedPlan = await PlannerService.generatePlan({
      context: mockContext,
      signals: mockSignals,
      previousPlan: plan,
      previousOutcome: mockOutcome,
    });

    console.log(` - Adapted Plan Version: ${adaptedPlan.versionNumber}`);
    console.log(` - Adapted Milestone: ${adaptedPlan.nextMilestone.description}`);

    const adaptedValidation = PlanValidator.validate(adaptedPlan, {
      availableHoursPerWeek: 10,
      validSignalIds: mockSignals.map((s) => s.id),
      signalConfidenceMap: {
        sig_diff_dropoff_1400: "high",
        sig_weak_topic_graphs: "medium",
      },
    });

    if (!adaptedValidation.success) {
      console.error(" - Live LLM adapted plan failed validation:", adaptedValidation.errors);
      process.exit(1);
    }
    console.log(" ✓ Live LLM Adapted Plan passed strict validation!");
  } else {
    console.log("\n[Live Provider Check] No external provider credentials provided.");
    console.log("Explicit status: Live LLM planning with real provider credentials is NOT YET VERIFIED.");
    console.log("\n[Test 1] Verifying Deterministic Planner Fallback...");

    const deterministicPlan = DeterministicPlanner.generatePlan({
      context: mockContext,
      signals: mockSignals,
    });

    expectEqual(deterministicPlan.schemaVersion, "1.0.0");
    expectEqual(deterministicPlan.versionNumber, 1);
    expectEqual(deterministicPlan.tasks.length > 0, true);

    const validation = PlanValidator.validate(deterministicPlan, {
      availableHoursPerWeek: 10,
      validSignalIds: mockSignals.map((s) => s.id),
      signalConfidenceMap: {
        sig_diff_dropoff_1400: "high",
        sig_weak_topic_graphs: "medium",
      },
    });

    expectEqual(validation.success, true);
    console.log(" ✓ Deterministic fallback generates 100% compliant AdaptivePlanV1.");

    console.log("\n[Test 2] Verifying Fallback on Simulated Refusal / Error...");
    const fallbackPlan = await PlannerService.generatePlan({
      context: mockContext,
      signals: mockSignals,
    });
    expectEqual(fallbackPlan.schemaVersion, "1.0.0");
    console.log(" ✓ PlannerService cleanly executes deterministic fallback without throwing unhandled exceptions.");
  }

  console.log("\n============================================================");
  console.log("   LLM VERIFICATION COMPLETED SUCCESSFULLY                  ");
  console.log("============================================================\n");
}

function expectEqual(actual: any, expected: any) {
  if (actual !== expected) {
    throw new Error(`Assertion failed: expected ${expected}, got ${actual}`);
  }
}

runLLMVerification().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
