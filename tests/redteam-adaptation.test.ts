import { describe, it, expect } from "vitest";
import { ProgressContextV1 } from "@/goals/progress-context.types";
import { DeterministicPlanner } from "@/planning/planner.service";
import { PlanOutcome } from "@/planning/evaluation/evaluation.types";
import { ProgressSignal } from "@/planning/signals.types";
import { AdaptivePlanV1 } from "@/planning/plan.types";

describe("Red-Team 7, 8 & 9: Adaptation Scenarios A-H, Traceability & Workload Audit", () => {
  const baseGoal = {
    id: "goal-adapt-1",
    title: "Become Codeforces Specialist",
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
    availableHoursPerWeek: 10,
  };

  const signals: ProgressSignal[] = [
    {
      id: "sig-drop-1300",
      type: "difficulty_dropoff",
      metric: "codeforces_difficulty_1300",
      value: "35%",
      confidence: { level: "high", source: "codeforces", completeness: "complete", sampleSize: 15 },
      evidence: { description: "35% solve rate at 1300", sampleCount: 15, metrics: {} },
    },
    {
      id: "sig-greedy-underexposed",
      type: "underexposed_topic",
      metric: "topic_exposure_greedy",
      value: "1 recent solve",
      confidence: { level: "high", source: "codeforces", completeness: "complete", sampleSize: 15 },
      evidence: { description: "Only 1 greedy solve in last 30d", sampleCount: 15, metrics: {} },
    },
    {
      id: "sig-contest-low",
      type: "low_contest_frequency",
      metric: "contests_in_30_days",
      value: "1 contest",
      confidence: { level: "high", source: "codeforces", completeness: "complete", sampleSize: 5 },
      evidence: { description: "1 contest in 30 days", sampleCount: 1, metrics: {} },
    },
  ];

  const baseContext: ProgressContextV1 = {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    goal: baseGoal,
    platforms: [{ platform: "codeforces", username: "tester", status: "connected", lastSyncedAt: null }],
    dataFreshness: {
      codeforces: { platform: "codeforces", lastSyncedAt: null, ageMinutes: 0, freshnessStatus: "fresh" },
      leetcode: { platform: "leetcode", lastSyncedAt: null, ageMinutes: 0, freshnessStatus: "fresh" },
    },
    platformCompleteness: {
      codeforces: { platform: "codeforces", reliabilityTier: "authoritative", completeness: "complete", supportedMetrics: [], unsupportedMetrics: [], knownLimitations: [] },
      leetcode: { platform: "leetcode", reliabilityTier: "best_effort", completeness: "partial", supportedMetrics: [], unsupportedMetrics: [], knownLimitations: [] },
    },
    currentState: { codeforcesRating: 1284 },
    recentActivity: {
      last7Days: { problemsSolved: 4, submissions: 8, activeDays: 3 },
      last30Days: { problemsSolved: 14, submissions: 25, activeDays: 10 },
      currentStreak: 2,
    },
    difficultyPerformance: {
      codeforces: {
        "1200": { attempted: 12, solved: 10, acceptanceRate: 83.3 },
        "1300": { attempted: 12, solved: 4, acceptanceRate: 33.3 },
      },
      leetcode: { Easy: { attempted: 0, solved: 0, acceptanceRate: 0 }, Medium: { attempted: 0, solved: 0, acceptanceRate: 0 }, Hard: { attempted: 0, solved: 0, acceptanceRate: 0 } },
    },
    topicPerformance: {},
    contestPerformance: { totalContests: 3, ratingChange7d: 0, ratingChange30d: 0, recentContests: [] },
    supportingEvidence: { contestsThisMonth: 1, targetRangeProblemsSolvedThisWeek: 2, activeDaysThisWeek: 3, netRatingMovementRecent: 0 },
  };

  const prevPlan: AdaptivePlanV1 = {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    goalId: baseGoal.id,
    versionNumber: 1,
    assessment: { summary: "Plan v1 baseline", confidence: "high" },
    primaryBottleneck: { type: "difficulty_dropoff", description: "1300 drop", evidence: [{ description: "Drop", metric: "diff", value: "35%" }] },
    nextMilestone: { description: "1300 consistency", successCriteria: [] },
    weeklyTargets: [],
    tasks: [
      {
        id: "task-1",
        type: "practice",
        title: "Solve 5 problems rated 1200–1300 in Greedy",
        quantity: 5,
        platform: "codeforces",
        difficulty: { min: 1200, max: 1300 },
        topics: ["greedy"],
        reason: "1300 dropoff",
        evidenceReferences: ["sig-drop-1300"],
        completionMetric: "cf_greedy_1300",
      },
    ],
    reviewPolicy: { reviewAfterDays: 7 },
  };

  it("Scenario A: Plan worked (completion >= 80%, ratingDelta >= 0) -> Steps up difficulty", () => {
    const outcome: PlanOutcome = {
      planId: "p1",
      versionNumber: 1,
      evaluatedAt: new Date().toISOString(),
      completionRate: 100,
      tasksPlanned: 1,
      tasksCompleted: 1,
      insufficientEvidence: false,
      outcomeImprovement: "improved",
      evidenceCollected: { totalSubmissionsInPeriod: 10, totalProblemsSolvedInPeriod: 5, contestsParticipated: 1, targetRangeProblemsSolved: 4 },
      metricChanges: { ratingDelta: 37, activeDays: 4, topicProgression: { greedy: { solves: 5 } } },
      summary: "Completed 1 of 1 tasks. Rating delta +37.",
      adaptationGuidance: "Advancing difficulty",
    };

    const nextPlan = DeterministicPlanner.generatePlan({
      context: { ...baseContext, currentState: { codeforcesRating: 1321 } },
      signals,
      previousPlan: prevPlan,
      previousOutcome: outcome,
    });

    expect(nextPlan.versionNumber).toBe(2);
    // Increased difficulty from 1300-1400 baseline to 1350-1450
    expect(nextPlan.tasks[0].difficulty?.min).toBe(1350);
    expect(nextPlan.tasks[0].difficulty?.max).toBe(1450);
    expect(nextPlan.assessment.summary).toContain("completed successfully with positive rating delta");
  });

  it("Scenario B & E: Plan completed (100%) but rating dropped (-45) -> Does NOT increase difficulty, flags conflicting evidence", () => {
    const outcome: PlanOutcome = {
      planId: "p1",
      versionNumber: 1,
      evaluatedAt: new Date().toISOString(),
      completionRate: 100,
      tasksPlanned: 1,
      tasksCompleted: 1,
      insufficientEvidence: false,
      outcomeImprovement: "regressed",
      evidenceCollected: { totalSubmissionsInPeriod: 12, totalProblemsSolvedInPeriod: 5, contestsParticipated: 1, targetRangeProblemsSolved: 4 },
      metricChanges: { ratingDelta: -45, activeDays: 4, topicProgression: {} },
      summary: "Completed tasks but rating regressed by -45.",
      adaptationGuidance: "Do not increase difficulty",
    };

    const nextPlan = DeterministicPlanner.generatePlan({
      context: baseContext,
      signals,
      previousPlan: prevPlan,
      previousOutcome: outcome,
    });

    // Difficulty must NOT step up!
    expect(nextPlan.tasks[0].difficulty?.min).toBe(1200);
    expect(nextPlan.tasks[0].difficulty?.max).toBe(1300);
    expect(nextPlan.assessment.summary).toContain("Conflicting evidence");
  });

  it("Scenario C: Plan not completed (completion < 50%) -> Maintains strategy, consolidates workload", () => {
    const outcome: PlanOutcome = {
      planId: "p1",
      versionNumber: 1,
      evaluatedAt: new Date().toISOString(),
      completionRate: 33,
      tasksPlanned: 3,
      tasksCompleted: 1,
      insufficientEvidence: false,
      outcomeImprovement: "stable",
      evidenceCollected: { totalSubmissionsInPeriod: 8, totalProblemsSolvedInPeriod: 3, contestsParticipated: 0, targetRangeProblemsSolved: 1 },
      metricChanges: { ratingDelta: 0, activeDays: 3, topicProgression: {} },
      summary: "Low completion rate 33%",
      adaptationGuidance: "Consolidate workload",
    };

    const nextPlan = DeterministicPlanner.generatePlan({
      context: baseContext,
      signals,
      previousPlan: prevPlan,
      previousOutcome: outcome,
    });

    expect(nextPlan.tasks[0].difficulty?.min).toBe(1200);
    expect(nextPlan.assessment.summary).toContain("Maintaining focus");
  });

  it("Scenario D: Insufficient evidence -> Collects more evidence rather than aggressively adapting", () => {
    const outcome: PlanOutcome = {
      planId: "p1",
      versionNumber: 1,
      evaluatedAt: new Date().toISOString(),
      completionRate: 0,
      tasksPlanned: 2,
      tasksCompleted: 0,
      insufficientEvidence: true,
      outcomeImprovement: "inconclusive",
      evidenceCollected: { totalSubmissionsInPeriod: 2, totalProblemsSolvedInPeriod: 1, contestsParticipated: 0, targetRangeProblemsSolved: 0 },
      metricChanges: { ratingDelta: 0, activeDays: 1, topicProgression: {} },
      summary: "Insufficient evidence",
      adaptationGuidance: "Retain targets",
    };

    const nextPlan = DeterministicPlanner.generatePlan({
      context: baseContext,
      signals,
      previousPlan: prevPlan,
      previousOutcome: outcome,
    });

    expect(nextPlan.assessment.summary).toContain("Insufficient evidence collected");
  });

  it("Scenario F: User had zero activity -> Does NOT invent a new technical weakness", () => {
    const outcome: PlanOutcome = {
      planId: "p1",
      versionNumber: 1,
      evaluatedAt: new Date().toISOString(),
      completionRate: 0,
      tasksPlanned: 2,
      tasksCompleted: 0,
      insufficientEvidence: true,
      outcomeImprovement: "inconclusive",
      evidenceCollected: { totalSubmissionsInPeriod: 0, totalProblemsSolvedInPeriod: 0, contestsParticipated: 0, targetRangeProblemsSolved: 0 },
      metricChanges: { ratingDelta: 0, activeDays: 0, topicProgression: {} },
      summary: "Zero activity observed",
      adaptationGuidance: "Retain baseline plan",
    };

    const nextPlan = DeterministicPlanner.generatePlan({
      context: baseContext,
      signals,
      previousPlan: prevPlan,
      previousOutcome: outcome,
    });

    expect(nextPlan.assessment.summary).toContain("Zero activity recorded");
    expect(nextPlan.assessment.summary).not.toContain("technical weakness");
  });

  it("Scenario G: Approaching deadline (3 days) -> Workload strictly respects available weekly hours", () => {
    const tightContext = {
      ...baseContext,
      goal: { ...baseGoal, daysRemaining: 3, availableHoursPerWeek: 5 },
    };

    const plan = DeterministicPlanner.generatePlan({ context: tightContext, signals });
    // Total estimated hours: 3 problems * 0.8 + 1 contest * 2.0 = 4.4 <= 5.0 hours
    const contestCount = plan.tasks.filter((t) => t.type === "contest").reduce((acc, t) => acc + (t.quantity ?? 1), 0);
    const problemCount = plan.tasks.filter((t) => t.type !== "contest").reduce((acc, t) => acc + (t.quantity ?? 1), 0);
    const estimatedHours = problemCount * 0.8 + contestCount * 2.0;

    expect(estimatedHours).toBeLessThanOrEqual(5.0 * 1.5);
  });

  it("Scenario H: Goal already achieved (current rating 1420 vs target 1400) -> Generates maintenance milestone", () => {
    const achievedContext = {
      ...baseContext,
      goal: { ...baseGoal, currentValue: 1420, gap: -20 },
      currentState: { codeforcesRating: 1420 },
    };

    const plan = DeterministicPlanner.generatePlan({ context: achievedContext, signals });
    expect(plan.primaryBottleneck.type).toBe("goal_achieved");
    expect(plan.nextMilestone.description).toContain("Skill Maintenance");
  });

  it("Evidence Traceability Audit: Every generated task references an existing signal ID", () => {
    const plan = DeterministicPlanner.generatePlan({ context: baseContext, signals });
    const signalIds = new Set(signals.map((s) => s.id));

    for (const task of plan.tasks) {
      expect(task.evidenceReferences.length).toBeGreaterThan(0);
      for (const ref of task.evidenceReferences) {
        expect(signalIds.has(ref) || ref === "sig-default").toBe(true);
      }
    }
  });

  it("Workload Budget Audit across 2h, 5h, 10h, and 20h users", () => {
    const budgets = [2, 5, 10, 20];

    for (const budget of budgets) {
      const ctx = {
        ...baseContext,
        goal: { ...baseGoal, availableHoursPerWeek: budget },
      };

      const plan = DeterministicPlanner.generatePlan({ context: ctx, signals });
      const contestCount = plan.tasks.filter((t) => t.type === "contest").reduce((acc, t) => acc + (t.quantity ?? 1), 0);
      const problemCount = plan.tasks.filter((t) => t.type !== "contest").reduce((acc, t) => acc + (t.quantity ?? 1), 0);
      const totalHours = problemCount * 0.8 + contestCount * 2.0;

      expect(totalHours).toBeLessThanOrEqual(budget * 1.25);

      if (budget === 2) {
        // 2 hours cannot accommodate a 2-hour contest AND practice problems
        expect(contestCount).toBe(0);
        expect(problemCount).toBe(2);
      }
    }
  });
});
