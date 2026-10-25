import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { PlanRepository } from "@/planning/plan.repository";
import { TaskEvidenceMatcher } from "@/planning/matching/task-matcher";
import { AdaptivePlanV1 } from "@/planning/plan.types";

describe("Red-Team 4 & 5: Task Matcher Adversarial Testing", () => {
  let userId: string;
  let goalId: string;
  let planStartTime: Date;
  let planReviewTime: Date;

  beforeEach(async () => {
    // 1. Setup clean user and goal
    const user = await prisma.user.upsert({
      where: { email: "matcher-redteam@example.com" },
      update: {},
      create: { email: "matcher-redteam@example.com", name: "Matcher Redteam" },
    });
    userId = user.id;

    await prisma.plan.deleteMany({ where: { userId } });
    await prisma.normalizedSubmission.deleteMany({ where: { userId } });
    await prisma.contestHistory.deleteMany({ where: { userId } });
    await prisma.goal.deleteMany({ where: { userId } });

    const goal = await prisma.goal.create({
      data: {
        userId,
        title: "CF Specialist",
        category: "competitive_programming",
        targetMetric: "codeforces_rating",
        targetValue: 1400,
        initialValue: 1200,
        availableHoursPerWeek: 10,
        deadline: new Date(Date.now() + 30 * 86400 * 1000),
      },
    });
    goalId = goal.id;

    planStartTime = new Date("2026-10-20T00:00:00.000Z");
    planReviewTime = new Date("2026-10-27T00:00:00.000Z");

    const planData: AdaptivePlanV1 = {
      schemaVersion: "1.0.0",
      generatedAt: planStartTime.toISOString(),
      goalId,
      versionNumber: 1,
      assessment: { summary: "Targeting 1300-1400 Greedy", confidence: "high" },
      primaryBottleneck: {
        type: "difficulty_dropoff",
        description: "1300 drop",
        evidence: [{ description: "Drop", metric: "cf_1300", value: "30%" }],
      },
      nextMilestone: {
        description: "Consistency on 1300",
        successCriteria: [{ criterion: "Solve 5", metric: "cf_solves", targetValue: 5 }],
      },
      weeklyTargets: [],
      tasks: [
        {
          id: "task-greedy-1300-1400",
          type: "practice",
          title: "Solve 5 Codeforces problems rated 1300–1400 in Greedy",
          quantity: 5,
          platform: "codeforces",
          difficulty: { min: 1300, max: 1400 },
          topics: ["greedy"],
          reason: "Targeting 1300 dropoff",
          evidenceReferences: ["sig-drop"],
          completionMetric: "cf_greedy_1300_solves",
        },
        {
          id: "task-rated-contest",
          type: "contest",
          title: "Participate in 1 rated Codeforces contest",
          quantity: 1,
          platform: "codeforces",
          reason: "Contest frequency",
          evidenceReferences: ["sig-contest"],
          completionMetric: "cf_rated_contests",
        },
      ],
      reviewPolicy: { reviewAfterDays: 7 },
    };

    await PlanRepository.createPlan({
      userId,
      goalId,
      planData,
    });
  });

  it("WA -> AC on same problem: only the accepted submission counts (1 unique match)", async () => {
    const prob = await prisma.problem.upsert({
      where: { platform_externalProblemId: { platform: "codeforces", externalProblemId: "prob-wa-ac" } },
      update: {},
      create: {
        platform: "codeforces",
        externalProblemId: "prob-wa-ac",
        title: "Problem WA AC",
        difficulty: "1350",
        numericDifficulty: 1350,
        topics: JSON.stringify(["greedy"]),
        rawTags: "[]",
      },
    });

    // 1. Wrong answer
    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-wa",
        problemId: prob.id,
        problemTitle: prob.title,
        verdict: "WRONG_ANSWER",
        accepted: false,
        difficulty: "1350",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date("2026-10-21T10:00:00.000Z"),
      },
    });

    // 2. Accepted
    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-ac",
        problemId: prob.id,
        problemTitle: prob.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1350",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date("2026-10-21T10:30:00.000Z"),
      },
    });

    const results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    const practiceResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-greedy-1300-1400"));
    expect(practiceResult?.newCompleted).toBe(1);
  });

  it("AC twice on the exact same problem: counts as only 1 problem completed (no duplicate problem count)", async () => {
    const prob = await prisma.problem.upsert({
      where: { platform_externalProblemId: { platform: "codeforces", externalProblemId: "prob-ac-twice" } },
      update: {},
      create: {
        platform: "codeforces",
        externalProblemId: "prob-ac-twice",
        title: "Problem AC Twice",
        difficulty: "1350",
        numericDifficulty: 1350,
        topics: JSON.stringify(["greedy"]),
        rawTags: "[]",
      },
    });

    // First AC
    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-ac-1",
        problemId: prob.id,
        problemTitle: prob.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1350",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date("2026-10-21T12:00:00.000Z"),
      },
    });

    // Second AC on same problem
    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-ac-2",
        problemId: prob.id,
        problemTitle: prob.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1350",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date("2026-10-21T13:00:00.000Z"),
      },
    });

    const results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    const practiceResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-greedy-1300-1400"));
    // Exactly 1 unique problem completed, not 2!
    expect(practiceResult?.newCompleted).toBe(1);
  });

  it("problem solved BEFORE plan started: does NOT match", async () => {
    const prob = await prisma.problem.upsert({
      where: { platform_externalProblemId: { platform: "codeforces", externalProblemId: "prob-before" } },
      update: {},
      create: {
        platform: "codeforces",
        externalProblemId: "prob-before",
        title: "Problem Before Plan",
        difficulty: "1350",
        numericDifficulty: 1350,
        topics: JSON.stringify(["greedy"]),
        rawTags: "[]",
      },
    });

    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-before",
        problemId: prob.id,
        problemTitle: prob.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1350",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date("2026-10-15T00:00:00.000Z"), // 5 days before plan start
      },
    });

    const results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    const practiceResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-greedy-1300-1400"));
    expect(practiceResult?.newCompleted).toBe(0);
  });

  it("problem solved AFTER plan review window: does NOT match", async () => {
    const prob = await prisma.problem.upsert({
      where: { platform_externalProblemId: { platform: "codeforces", externalProblemId: "prob-after" } },
      update: {},
      create: {
        platform: "codeforces",
        externalProblemId: "prob-after",
        title: "Problem After Plan",
        difficulty: "1350",
        numericDifficulty: 1350,
        topics: JSON.stringify(["greedy"]),
        rawTags: "[]",
      },
    });

    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-after",
        problemId: prob.id,
        problemTitle: prob.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1350",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date("2026-11-05T00:00:00.000Z"), // well after review date
      },
    });

    const results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    const practiceResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-greedy-1300-1400"));
    expect(practiceResult?.newCompleted).toBe(0);
  });

  it("difficulty boundary testing: 1299 (rejected), 1300 (accepted), 1400 (accepted), 1401 (rejected)", async () => {
    const ratings = [
      { id: "p-1299", rating: 1299, shouldMatch: false },
      { id: "p-1300", rating: 1300, shouldMatch: true },
      { id: "p-1400", rating: 1400, shouldMatch: true },
      { id: "p-1401", rating: 1401, shouldMatch: false },
    ];

    for (const r of ratings) {
      const prob = await prisma.problem.upsert({
        where: { platform_externalProblemId: { platform: "codeforces", externalProblemId: r.id } },
        update: {},
        create: {
          platform: "codeforces",
          externalProblemId: r.id,
          title: `Problem rated ${r.rating}`,
          difficulty: `${r.rating}`,
          numericDifficulty: r.rating,
          topics: JSON.stringify(["greedy"]),
          rawTags: "[]",
        },
      });

      await prisma.normalizedSubmission.create({
        data: {
          userId,
          platform: "codeforces",
          externalSubmissionId: `sub-${r.id}`,
          problemId: prob.id,
          problemTitle: prob.title,
          verdict: "ACCEPTED",
          accepted: true,
          difficulty: `${r.rating}`,
          topics: JSON.stringify(["greedy"]),
          timestamp: new Date("2026-10-22T00:00:00.000Z"),
        },
      });
    }

    const results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    const practiceResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-greedy-1300-1400"));
    // Exactly 2 problems (1300 and 1400) should match
    expect(practiceResult?.newCompleted).toBe(2);
  });

  it("topic matching: Greedy + Math matches, but pure Math does NOT match", async () => {
    // Greedy + Math
    const probOverlap = await prisma.problem.upsert({
      where: { platform_externalProblemId: { platform: "codeforces", externalProblemId: "p-overlap" } },
      update: {},
      create: {
        platform: "codeforces",
        externalProblemId: "p-overlap",
        title: "Greedy and Math",
        difficulty: "1350",
        numericDifficulty: 1350,
        topics: JSON.stringify(["greedy", "math"]),
        rawTags: "[]",
      },
    });

    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-overlap",
        problemId: probOverlap.id,
        problemTitle: probOverlap.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1350",
        topics: JSON.stringify(["greedy", "math"]),
        timestamp: new Date("2026-10-23T00:00:00.000Z"),
      },
    });

    // Pure Math
    const probNoGreedy = await prisma.problem.upsert({
      where: { platform_externalProblemId: { platform: "codeforces", externalProblemId: "p-no-greedy" } },
      update: {},
      create: {
        platform: "codeforces",
        externalProblemId: "p-no-greedy",
        title: "Pure Math",
        difficulty: "1350",
        numericDifficulty: 1350,
        topics: JSON.stringify(["math"]),
        rawTags: "[]",
      },
    });

    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "codeforces",
        externalSubmissionId: "sub-no-greedy",
        problemId: probNoGreedy.id,
        problemTitle: probNoGreedy.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "1350",
        topics: JSON.stringify(["math"]),
        timestamp: new Date("2026-10-23T01:00:00.000Z"),
      },
    });

    const results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    const practiceResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-greedy-1300-1400"));
    expect(practiceResult?.newCompleted).toBe(1);
  });

  it("platform filtering: LeetCode Medium Greedy does NOT match Codeforces task", async () => {
    const lcProb = await prisma.problem.upsert({
      where: { platform_externalProblemId: { platform: "leetcode", externalProblemId: "lc-greedy" } },
      update: {},
      create: {
        platform: "leetcode",
        externalProblemId: "lc-greedy",
        title: "LeetCode Greedy Medium",
        difficulty: "Medium",
        numericDifficulty: 2,
        topics: JSON.stringify(["greedy"]),
        rawTags: "[]",
      },
    });

    await prisma.normalizedSubmission.create({
      data: {
        userId,
        platform: "leetcode",
        externalSubmissionId: "sub-lc-greedy",
        problemId: lcProb.id,
        problemTitle: lcProb.title,
        verdict: "ACCEPTED",
        accepted: true,
        difficulty: "Medium",
        topics: JSON.stringify(["greedy"]),
        timestamp: new Date("2026-10-22T00:00:00.000Z"),
      },
    });

    const results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    const practiceResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-greedy-1300-1400"));
    expect(practiceResult?.newCompleted).toBe(0);
  });

  it("contest matching: rated contest matches, unrated contest is rejected", async () => {
    // 1. Unrated contest (rating change = 0 and newRating = 0)
    await prisma.contestHistory.create({
      data: {
        userId,
        platform: "codeforces",
        contestId: "c-unrated-1",
        contestName: "Codeforces Testing Round Unrated",
        rank: 500,
        oldRating: 0,
        newRating: 0,
        ratingChange: 0,
        timestamp: new Date("2026-10-22T14:00:00.000Z"),
      },
    });

    let results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    let contestResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-rated-contest"));
    expect(contestResult?.newCompleted).toBe(0);

    // 2. Rated contest (delta = 42)
    await prisma.contestHistory.create({
      data: {
        userId,
        platform: "codeforces",
        contestId: "c-rated-1",
        contestName: "Codeforces Round 990 (Div. 2)",
        rank: 1200,
        oldRating: 1250,
        newRating: 1292,
        ratingChange: 42,
        timestamp: new Date("2026-10-23T14:00:00.000Z"),
      },
    });

    results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    contestResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-rated-contest"));
    expect(contestResult?.newCompleted).toBe(1);

    // Re-running sync: does not double-count
    results = await TaskEvidenceMatcher.matchTasksForGoal(goalId);
    contestResult = results.find((r) => (r.externalTaskId ?? r.taskId).includes("task-rated-contest"));
    expect(contestResult?.newCompleted).toBe(1);
    expect(contestResult?.newMatchesCount).toBe(0);
  });
});
