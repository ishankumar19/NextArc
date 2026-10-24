import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { ProgressContextV1 } from "@/goals/progress-context.types";
import { SignalEngine } from "@/planning/signals/signal.engine";
import { DeterministicPlanner } from "@/planning/planner.service";
import { PlanRepository } from "@/planning/plan.repository";
import { TaskEvidenceMatcher } from "@/planning/matching/task-matcher";
import { PlanEvaluator } from "@/planning/evaluation/plan-evaluator";
import { GoalCoachService } from "@/planning/coach/coach.service";

describe("Milestones 8-12: Planner, Persistence, Matching, Evaluation & Adaptation", () => {
  let testUserId: string;
  let testGoalId: string;

  beforeEach(async () => {
    // Setup test user
    const user = await prisma.user.upsert({
      where: { email: "phase2-tester@example.com" },
      update: {},
      create: {
        email: "phase2-tester@example.com",
        name: "Phase 2 Tester",
      },
    });
    testUserId = user.id;

    // Clean previous test plans and goals
    await prisma.plan.deleteMany({ where: { userId: testUserId } });
    await prisma.normalizedSubmission.deleteMany({ where: { userId: testUserId } });
    await prisma.contestHistory.deleteMany({ where: { userId: testUserId } });
    await prisma.goal.deleteMany({ where: { userId: testUserId } });

    // Create active goal
    const goal = await prisma.goal.create({
      data: {
        userId: testUserId,
        title: "Become Codeforces Specialist",
        category: "competitive_programming",
        targetMetric: "codeforces_rating",
        targetValue: 1400,
        initialValue: 1284,
        availableHoursPerWeek: 10,
        deadline: new Date(Date.now() + 30 * 86400 * 1000),
      },
    });
    testGoalId = goal.id;
  });

  it("Milestone 8: DeterministicPlanner generates a schema-compliant plan with reasons and citations", () => {
    const mockContext: Partial<ProgressContextV1> = {
      goal: {
        id: testGoalId,
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
      },
      currentState: { codeforcesRating: 1284 },
      platforms: [{ platform: "codeforces", username: "tester", status: "connected", lastSyncedAt: null }],
      recentActivity: {
        last7Days: { problemsSolved: 4, submissions: 8, activeDays: 3 },
        last30Days: { problemsSolved: 14, submissions: 25, activeDays: 10 },
        currentStreak: 2,
      },
      difficultyPerformance: {
        codeforces: {
          "1200": { attempted: 12, solved: 10, acceptanceRate: 83.3, recentSolved: 4 },
          "1300": { attempted: 12, solved: 4, acceptanceRate: 33.3, recentSolved: 1 },
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
      contestPerformance: {
        totalContests: 3,
        ratingChange7d: 0,
        ratingChange30d: 15,
        recentContests: [],
      },
      supportingEvidence: {
        contestsThisMonth: 1,
        targetRangeProblemsSolvedThisWeek: 2,
        activeDaysThisWeek: 3,
        netRatingMovementRecent: 15,
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
    const plan = DeterministicPlanner.generatePlan({
      context: mockContext as ProgressContextV1,
      signals,
    });

    expect(plan.schemaVersion).toBe("1.0.0");
    expect(plan.goalId).toBe(testGoalId);
    expect(plan.primaryBottleneck.type).toBe("difficulty_dropoff");
    expect(plan.tasks.length).toBeGreaterThan(0);

    for (const task of plan.tasks) {
      expect(task.reason.length).toBeGreaterThan(10);
      expect(task.evidenceReferences.length).toBeGreaterThan(0);
      expect(task.completionMetric).toBeDefined();
    }
  });

  it("Milestone 9: PlanRepository stores and retrieves plan versions and tasks", async () => {
    const mockPlanData = {
      schemaVersion: "1.0.0" as const,
      generatedAt: new Date().toISOString(),
      goalId: testGoalId,
      versionNumber: 1,
      assessment: {
        summary: "Targeting 1300 dropoff",
        confidence: "high" as const,
      },
      primaryBottleneck: {
        type: "difficulty_dropoff",
        description: "1300 dropoff",
        evidence: [{ description: "Dropoff at 1300", metric: "cf_1300", value: "33%" }],
      },
      nextMilestone: {
        description: "Solve 5 1300 problems",
        successCriteria: [{ criterion: "Solve 5", metric: "cf_1300", targetValue: 5 }],
      },
      weeklyTargets: [{ area: "Greedy", targetDescription: "Focus on greedy", expectedEffortHours: 6 }],
      tasks: [
        {
          id: "task-1-1",
          type: "practice" as const,
          title: "Solve 5 problems rated 1300 in Greedy",
          quantity: 5,
          platform: "codeforces",
          difficulty: { min: 1300, max: 1400 },
          topics: ["greedy"],
          reason: "1300 success rate is low",
          evidenceReferences: ["sig-drop"],
          completionMetric: "cf_1300_greedy",
        },
      ],
      reviewPolicy: { reviewAfterDays: 7 },
    };

    const saved = await PlanRepository.createPlan({
      userId: testUserId,
      goalId: testGoalId,
      planData: mockPlanData,
    });

    expect(saved).toBeDefined();
    expect(saved?.status).toBe("active");
    expect(saved?.versions[0].versionNumber).toBe(1);
    expect(saved?.versions[0].tasks.length).toBe(1);
    expect(saved?.versions[0].tasks[0].title).toContain("Solve 5 problems");
  });

  it("Milestone 10: TaskEvidenceMatcher automatically matches external activity to tasks", async () => {
    const planStartDate = new Date(Date.now() - 3600 * 1000); // 1 hour ago

    const mockPlanData = {
      schemaVersion: "1.0.0" as const,
      generatedAt: planStartDate.toISOString(),
      goalId: testGoalId,
      versionNumber: 1,
      assessment: { summary: "Active plan", confidence: "high" as const },
      primaryBottleneck: {
        type: "difficulty_dropoff",
        description: "1300 dropoff",
        evidence: [{ description: "1300 dropoff", metric: "cf_1300", value: "33%" }],
      },
      nextMilestone: {
        description: "Master 1300 problems",
        successCriteria: [{ criterion: "Solve 5", metric: "cf_1300", targetValue: 5 }],
      },
      weeklyTargets: [],
      tasks: [
        {
          id: "task-test-practice",
          type: "practice" as const,
          title: "Solve 3 Codeforces problems rated 1300–1400 in Greedy",
          quantity: 3,
          platform: "codeforces",
          difficulty: { min: 1300, max: 1400 },
          topics: ["greedy"],
          reason: "Practice Greedy at 1300",
          evidenceReferences: ["sig-1"],
          completionMetric: "cf_greedy_1300",
        },
      ],
      reviewPolicy: { reviewAfterDays: 7 },
    };

    await PlanRepository.createPlan({
      userId: testUserId,
      goalId: testGoalId,
      planData: mockPlanData,
    });

    // Create a problem rated 1350 with Greedy
    const problem = await prisma.problem.upsert({
      where: {
        platform_externalProblemId: {
          platform: "codeforces",
          externalProblemId: "1900B",
        },
      },
      update: {},
      create: {
        platform: "codeforces",
        externalProblemId: "1900B",
        title: "Greedy Problem B",
        difficulty: "1350",
        numericDifficulty: 1350,
        topics: JSON.stringify(["greedy", "math"]),
        rawTags: JSON.stringify(["greedy"]),
      },
    });

    // Insert an accepted submission after the plan start date
    await prisma.normalizedSubmission.create({
      data: {
        userId: testUserId,
        platform: "codeforces",
        externalSubmissionId: "sub-match-101",
        problemId: problem.id,
        problemTitle: problem.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1350",
        topics: JSON.stringify(["greedy", "math"]),
        timestamp: new Date(),
      },
    });

    // Run TaskEvidenceMatcher
    const matchResults = await TaskEvidenceMatcher.matchTasksForGoal(testGoalId);
    expect(matchResults.length).toBe(1);
    expect(matchResults[0].newCompleted).toBe(1);
    expect(matchResults[0].status).toBe("in_progress");

    // Fetch plan from repository to verify database update
    const activePlan = await PlanRepository.getActivePlan(testGoalId);
    const updatedTask = activePlan?.versions[0].tasks[0];
    expect(updatedTask?.quantityCompleted).toBe(1);
    expect(updatedTask?.matches.length).toBe(1);

    // Re-running matcher produces 0 new matches (idempotent)
    const secondRun = await TaskEvidenceMatcher.matchTasksForGoal(testGoalId);
    expect(secondRun[0].newMatchesCount).toBe(0);
    expect(secondRun[0].newCompleted).toBe(1);
  });

  it("Milestone 11 & 12: PlanEvaluator computes PlanOutcome and Planner produces adapted Plan v2", async () => {
    const planStartDate = new Date(Date.now() - 24 * 3600 * 1000); // 1 day ago

    const mockPlanData = {
      schemaVersion: "1.0.0" as const,
      generatedAt: planStartDate.toISOString(),
      goalId: testGoalId,
      versionNumber: 1,
      assessment: { summary: "Initial baseline plan", confidence: "high" as const },
      primaryBottleneck: {
        type: "difficulty_dropoff",
        description: "1300 dropoff",
        evidence: [{ description: "Dropoff at 1300", metric: "cf_1300", value: "33%" }],
      },
      nextMilestone: {
        description: "Consistency on 1300",
        successCriteria: [{ criterion: "Solve 1", metric: "cf_1300", targetValue: 1 }],
      },
      weeklyTargets: [],
      tasks: [
        {
          id: "task-v1-1",
          type: "practice" as const,
          title: "Solve 1 Codeforces problem rated 1300–1400 in Greedy",
          quantity: 1,
          platform: "codeforces",
          difficulty: { min: 1300, max: 1400 },
          topics: ["greedy"],
          reason: "Targeting 1300 Greedy",
          evidenceReferences: ["sig-drop"],
          completionMetric: "cf_greedy_1300",
        },
      ],
      reviewPolicy: { reviewAfterDays: 7 },
    };

    const initialPlan = await PlanRepository.createPlan({
      userId: testUserId,
      goalId: testGoalId,
      planData: mockPlanData,
    });

    // Create a problem & accepted submission to achieve 100% completion
    const problem = await prisma.problem.upsert({
      where: {
        platform_externalProblemId: {
          platform: "codeforces",
          externalProblemId: "2000A",
        },
      },
      update: {},
      create: {
        platform: "codeforces",
        externalProblemId: "2000A",
        title: "Greedy Problem A",
        difficulty: "1300",
        numericDifficulty: 1300,
        topics: JSON.stringify(["greedy"]),
        rawTags: JSON.stringify(["greedy"]),
      },
    });

    await prisma.normalizedSubmission.create({
      data: {
        userId: testUserId,
        platform: "codeforces",
        externalSubmissionId: "sub-eval-201",
        problemId: problem.id,
        problemTitle: problem.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1300",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date(),
      },
    });

    // Also add a contest with positive rating movement (+37)
    await prisma.contestHistory.create({
      data: {
        userId: testUserId,
        platform: "codeforces",
        contestId: "c-1001",
        contestName: "Codeforces Round 999 (Div. 2)",
        rank: 950,
        oldRating: 1284,
        newRating: 1321,
        ratingChange: 37,
        timestamp: new Date(),
      },
    });

    // Evaluate Plan
    const outcome = await PlanEvaluator.evaluateGoalPlan(testGoalId);
    expect(outcome).toBeDefined();
    expect(outcome?.completionRate).toBe(100);
    expect(outcome?.metricChanges.ratingDelta).toBe(37);
    expect(outcome?.adaptationGuidance).toContain("Recommend advancing problem difficulty brackets");

    // Milestone 12: Adaptation based on previous plan & outcome
    const mockContext: Partial<ProgressContextV1> = {
      goal: {
        id: testGoalId,
        title: "Become Codeforces Specialist",
        category: "competitive_programming",
        targetMetric: "codeforces_rating",
        targetValue: 1400,
        currentValue: 1321,
        initialValue: 1284,
        gap: 79,
        daysRemaining: 25,
        isOverdue: false,
        startDate: new Date().toISOString(),
        deadline: new Date().toISOString(),
        availableHoursPerWeek: 10,
      },
      currentState: { codeforcesRating: 1321 },
      platforms: [{ platform: "codeforces", username: "tester", status: "connected", lastSyncedAt: null }],
      recentActivity: {
        last7Days: { problemsSolved: 1, submissions: 1, activeDays: 1 },
        last30Days: { problemsSolved: 5, submissions: 8, activeDays: 4 },
        currentStreak: 1,
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
        totalContests: 1,
        ratingChange7d: 37,
        ratingChange30d: 37,
        recentContests: [],
      },
      supportingEvidence: {
        contestsThisMonth: 1,
        targetRangeProblemsSolvedThisWeek: 1,
        activeDaysThisWeek: 1,
        netRatingMovementRecent: 37,
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
    const adaptedPlan = DeterministicPlanner.generatePlan({
      context: mockContext as ProgressContextV1,
      signals,
      previousPlan: mockPlanData,
      previousOutcome: outcome,
    });

    // Verification of Adaptation:
    // With 100% completion, minDiff steps up to 1350 and topic rotates to binary-search!
    expect(adaptedPlan.versionNumber).toBe(2);
    expect(adaptedPlan.tasks[0].difficulty?.min).toBe(1350);
    expect(adaptedPlan.tasks[0].difficulty?.max).toBe(1450);
    expect(adaptedPlan.tasks[0].topics).toContain("binary-search");

    // Persist adapted version
    const updatedPlan = await PlanRepository.createAdaptedVersion(initialPlan!.id, adaptedPlan);
    expect(updatedPlan?.currentVersionNum).toBe(2);
    expect(updatedPlan?.versions[0].versionNumber).toBe(2);
  });

  it("GoalCoachService provides constrained factual answers grounded in evidence", async () => {
    // Generate an initial plan
    const mockPlanData = {
      schemaVersion: "1.0.0" as const,
      generatedAt: new Date().toISOString(),
      goalId: testGoalId,
      versionNumber: 1,
      assessment: { summary: "Focus on 1300 dropoff", confidence: "high" as const },
      primaryBottleneck: {
        type: "difficulty_dropoff",
        description: "1300 dropoff",
        evidence: [{ description: "Dropoff at 1300", metric: "cf_1300", value: "33%" }],
      },
      nextMilestone: {
        description: "Consistency on 1300",
        successCriteria: [{ criterion: "Solve 5", metric: "cf_1300", targetValue: 5 }],
      },
      weeklyTargets: [],
      tasks: [
        {
          id: "task-coach-1",
          type: "practice" as const,
          title: "Solve 5 problems rated 1300 in Greedy",
          quantity: 5,
          platform: "codeforces",
          difficulty: { min: 1300, max: 1400 },
          topics: ["greedy"],
          reason: "1300 dropoff",
          evidenceReferences: ["sig-1"],
          completionMetric: "cf_1300_greedy",
        },
      ],
      reviewPolicy: { reviewAfterDays: 7 },
    };

    await PlanRepository.createPlan({
      userId: testUserId,
      goalId: testGoalId,
      planData: mockPlanData,
    });

    const whyAnswer = await GoalCoachService.askCoach(testUserId, testGoalId, "Why this plan?");
    expect(whyAnswer).toContain("difficulty_dropoff");
    expect(whyAnswer).toContain("1400");

    const workloadAnswer = await GoalCoachService.askCoach(testUserId, testGoalId, "Can I reduce my workload?");
    expect(workloadAnswer).toContain("10 hours per week");
  });
});
