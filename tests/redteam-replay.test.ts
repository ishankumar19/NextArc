import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { ProgressContextV1 } from "@/goals/progress-context.types";
import { SignalEngine } from "@/planning/signals/signal.engine";
import { DeterministicPlanner } from "@/planning/planner.service";
import { PlanRepository } from "@/planning/plan.repository";
import { TaskEvidenceMatcher } from "@/planning/matching/task-matcher";
import { PlanEvaluator } from "@/planning/evaluation/plan-evaluator";
import { AdaptivePlanV1 } from "@/planning/plan.types";

describe("Red-Team 11: Real Evidence Historical Replay across 3 Sequential Windows", () => {
  let userId: string;
  let goalId: string;

  beforeEach(async () => {
    const user = await prisma.user.upsert({
      where: { email: "replay-redteam@example.com" },
      update: {},
      create: { email: "replay-redteam@example.com", name: "Replay Tester" },
    });
    userId = user.id;

    await prisma.plan.deleteMany({ where: { userId } });
    await prisma.normalizedSubmission.deleteMany({ where: { userId } });
    await prisma.contestHistory.deleteMany({ where: { userId } });
    await prisma.goal.deleteMany({ where: { userId } });

    const goal = await prisma.goal.create({
      data: {
        userId,
        title: "Become Codeforces Specialist",
        category: "competitive_programming",
        targetMetric: "codeforces_rating",
        targetValue: 1400,
        initialValue: 1284,
        availableHoursPerWeek: 10,
        deadline: new Date("2026-12-31T00:00:00.000Z"),
      },
    });
    goalId = goal.id;
  });

  it("replays 3 sequential historical time windows and confirms logically defensible adaptations", async () => {
    // ══════════════════════════════════════════════════════════════════
    // WINDOW 1: Initial Baseline Plan Generation (T0 -> T1)
    // ══════════════════════════════════════════════════════════════════
    const t0 = new Date("2026-10-01T00:00:00.000Z");
    const t1 = new Date("2026-10-08T00:00:00.000Z");

    const contextT0: Partial<ProgressContextV1> = {
      goal: {
        id: goalId,
        title: "Become Codeforces Specialist",
        category: "competitive_programming",
        targetMetric: "codeforces_rating",
        targetValue: 1400,
        currentValue: 1284,
        initialValue: 1284,
        gap: 116,
        daysRemaining: 80,
        isOverdue: false,
        startDate: t0.toISOString(),
        deadline: new Date("2026-12-31T00:00:00.000Z").toISOString(),
        availableHoursPerWeek: 10,
      },
      currentState: { codeforcesRating: 1284 },
      platforms: [{ platform: "codeforces", username: "tester", status: "connected", lastSyncedAt: null }],
      recentActivity: {
        last7Days: { problemsSolved: 3, submissions: 6, activeDays: 2 },
        last30Days: { problemsSolved: 12, submissions: 22, activeDays: 8 },
        currentStreak: 1,
      },
      difficultyPerformance: {
        codeforces: {
          "1200": { attempted: 10, solved: 8, acceptanceRate: 80 },
          "1300": { attempted: 10, solved: 3, acceptanceRate: 30 },
        },
        leetcode: { Easy: { attempted: 0, solved: 0, acceptanceRate: 0 }, Medium: { attempted: 0, solved: 0, acceptanceRate: 0 }, Hard: { attempted: 0, solved: 0, acceptanceRate: 0 } },
      },
      topicPerformance: {
        greedy: { topic: "greedy", attempted: 2, solved: 1, acceptanceRate: 50, recentSolved: 1 },
      },
      contestPerformance: { totalContests: 2, ratingChange7d: 0, ratingChange30d: 0, recentContests: [] },
      supportingEvidence: { contestsThisMonth: 1, targetRangeProblemsSolvedThisWeek: 2, activeDaysThisWeek: 2, netRatingMovementRecent: 0 },
      platformCompleteness: {
        codeforces: { platform: "codeforces", reliabilityTier: "authoritative", completeness: "complete", supportedMetrics: [], unsupportedMetrics: [], knownLimitations: [] },
        leetcode: { platform: "leetcode", reliabilityTier: "best_effort", completeness: "partial", supportedMetrics: [], unsupportedMetrics: [], knownLimitations: [] },
      },
    };

    const signalsT0 = SignalEngine.extractSignals(contextT0 as ProgressContextV1);
    const planV1 = DeterministicPlanner.generatePlan({
      context: contextT0 as ProgressContextV1,
      signals: signalsT0,
    });

    expect(planV1.versionNumber).toBe(1);

    const planV1Data: AdaptivePlanV1 = {
      ...planV1,
      tasks: [
        {
          id: "task-w1-1",
          type: "practice",
          title: "Solve 1 problem rated 1200–1300 in Greedy",
          quantity: 1,
          platform: "codeforces",
          difficulty: { min: 1200, max: 1300 },
          topics: ["greedy"],
          reason: "Window 1 target",
          evidenceReferences: [signalsT0[0]?.id ?? "sig-drop-1300"],
          completionMetric: "cf_greedy_1200",
        },
        {
          id: "task-w1-contest",
          type: "contest",
          title: "Participate in 1 rated Codeforces contest",
          quantity: 1,
          platform: "codeforces",
          reason: "Window 1 contest target",
          evidenceReferences: [signalsT0[0]?.id ?? "sig-drop-1300"],
          completionMetric: "cf_contest",
        },
      ],
    };

    // Persist Plan v1 in database
    const dbPlan = await PlanRepository.createPlan({
      userId,
      goalId,
      planData: planV1Data,
    });

    // Replay Window 1 Activity: User solves target problems and participates in contest
    const prob1 = await prisma.problem.upsert({
      where: { platform_externalProblemId: { platform: "codeforces", externalProblemId: "p-w1-1" } },
      update: {},
      create: { platform: "codeforces", externalProblemId: "p-w1-1", title: "Greedy 1", difficulty: "1250", numericDifficulty: 1250, topics: JSON.stringify(["greedy"]), rawTags: "[]" },
    });

    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-w1-1",
        problemId: prob1.id,
        problemTitle: prob1.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1250",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date("2026-10-04T12:00:00.000Z"),
      },
    });

    await prisma.contestHistory.create({
      data: {
        userId,
        platform: "codeforces",
        contestId: "c-w1",
        contestName: "Round 980 (Div. 2)",
        rank: 980,
        oldRating: 1284,
        newRating: 1321,
        ratingChange: 37,
        timestamp: new Date("2026-10-05T15:00:00.000Z"),
      },
    });

    // Evaluate Plan v1
    const outcomeV1 = await PlanEvaluator.evaluateGoalPlan(goalId);
    expect(outcomeV1).toBeDefined();
    expect(outcomeV1?.metricChanges.ratingDelta).toBe(37);
    expect(outcomeV1?.outcomeImprovement).toBe("improved");

    // ══════════════════════════════════════════════════════════════════
    // WINDOW 2: Adapt to Plan v2 (T1 -> T2)
    // ══════════════════════════════════════════════════════════════════
    const t2 = new Date("2026-10-15T00:00:00.000Z");
    const contextT1: Partial<ProgressContextV1> = {
      ...contextT0,
      currentState: { codeforcesRating: 1321 },
      goal: { ...contextT0.goal!, currentValue: 1321, gap: 79, startDate: t1.toISOString() },
    };

    const signalsT1 = SignalEngine.extractSignals(contextT1 as ProgressContextV1);
    const planV2 = DeterministicPlanner.generatePlan({
      context: contextT1 as ProgressContextV1,
      signals: signalsT1,
      previousPlan: planV1Data,
      previousOutcome: outcomeV1,
    });

    // Adapt to higher difficulty because Window 1 succeeded
    expect(planV2.versionNumber).toBe(2);
    expect(planV2.tasks[0].difficulty?.min).toBe(1350);
    expect(planV2.tasks[0].difficulty?.max).toBe(1450);
    expect(planV2.tasks[0].topics).toContain("binary-search");

    await PlanRepository.createAdaptedVersion(dbPlan!.id, planV2);

    // Replay Window 2 Activity: User struggles with harder problems (only 1 solve) and loses rating in contest
    const prob2 = await prisma.problem.upsert({
      where: { platform_externalProblemId: { platform: "codeforces", externalProblemId: "p-w2-1" } },
      update: {},
      create: { platform: "codeforces", externalProblemId: "p-w2-1", title: "Binary Search Hard", difficulty: "1400", numericDifficulty: 1400, topics: JSON.stringify(["binary-search"]), rawTags: "[]" },
    });

    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-w2-1",
        problemId: prob2.id,
        problemTitle: prob2.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1400",
        topics: JSON.stringify(["binary-search"]),
        timestamp: new Date("2026-10-10T12:00:00.000Z"),
      },
    });

    await prisma.contestHistory.create({
      data: {
        userId,
        platform: "codeforces",
        contestId: "c-w2",
        contestName: "Round 985 (Div. 2)",
        rank: 2100,
        oldRating: 1321,
        newRating: 1296,
        ratingChange: -25,
        timestamp: new Date("2026-10-12T15:00:00.000Z"),
      },
    });

    // Evaluate Plan v2
    const outcomeV2 = await PlanEvaluator.evaluateGoalPlan(goalId);
    expect(outcomeV2?.outcomeImprovement).toBe("regressed");
    expect(outcomeV2?.metricChanges.ratingDelta).toBe(-25);

    // ══════════════════════════════════════════════════════════════════
    // WINDOW 3: Adapt to Plan v3 (T2 -> T3)
    // ══════════════════════════════════════════════════════════════════
    const contextT2: Partial<ProgressContextV1> = {
      ...contextT1,
      currentState: { codeforcesRating: 1296 },
      goal: { ...contextT1.goal!, currentValue: 1296, gap: 104, startDate: t2.toISOString() },
    };

    const signalsT2 = SignalEngine.extractSignals(contextT2 as ProgressContextV1);
    const planV3 = DeterministicPlanner.generatePlan({
      context: contextT2 as ProgressContextV1,
      signals: signalsT2,
      previousPlan: planV2,
      previousOutcome: outcomeV2,
    });

    // Defensively consolidates: does NOT increase difficulty, reduces workload or consolidates
    expect(planV3.versionNumber).toBe(3);
    expect(planV3.tasks[0].difficulty?.min).toBe(1200);
    expect(planV3.assessment.summary).toContain("Maintaining focus");

    await PlanRepository.createAdaptedVersion(dbPlan!.id, planV3);

    // Verify all 3 plan versions are persisted in database
    const history = await PlanRepository.getPlanHistory(goalId);
    expect(history[0].versions.length).toBe(3);
    expect(history[0].versions[0].versionNumber).toBe(1);
    expect(history[0].versions[1].versionNumber).toBe(2);
    expect(history[0].versions[2].versionNumber).toBe(3);
  });
});
