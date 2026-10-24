import { prisma } from "@/lib/prisma";
import { TaskEvidenceMatcher } from "../matching/task-matcher";
import { PlanOutcome } from "./evaluation.types";

export class PlanEvaluator {
  /**
   * Deterministically evaluates an active plan against observed evidence.
   */
  static async evaluateGoalPlan(goalId: string): Promise<PlanOutcome | null> {
    // 1. Sync & match recent evidence to tasks first
    await TaskEvidenceMatcher.matchTasksForGoal(goalId);

    // 2. Fetch active plan
    const plan = await prisma.plan.findFirst({
      where: { goalId, status: "active" },
      include: {
        goal: true,
        versions: {
          orderBy: { versionNumber: "desc" },
          take: 1,
          include: {
            tasks: {
              include: {
                matches: true,
              },
            },
          },
        },
      },
    });

    if (!plan || plan.versions.length === 0) {
      return null;
    }

    const currentVersion = plan.versions[0];
    const startDate = currentVersion.startDate;
    const now = new Date();
    const tasks = currentVersion.tasks;

    const tasksPlanned = tasks.length;
    const tasksCompleted = tasks.filter((t) => t.quantityCompleted >= t.quantity).length;
    const completionRate = tasksPlanned > 0 ? Math.round((tasksCompleted / tasksPlanned) * 100) : 0;

    // Fetch user submissions in period
    const submissionsInPeriod = await prisma.normalizedSubmission.findMany({
      where: {
        userId: plan.userId,
        timestamp: { gte: startDate, lte: now },
      },
    });

    const acceptedSubs = submissionsInPeriod.filter((s) => s.accepted);
    const uniqueSolvedProblemIds = new Set(acceptedSubs.map((s) => s.problemId));

    // Fetch contests in period
    const contestsInPeriod = await prisma.contestHistory.findMany({
      where: {
        userId: plan.userId,
        timestamp: { gte: startDate, lte: now },
      },
      orderBy: { timestamp: "asc" },
    });

    const contestsParticipated = contestsInPeriod.length;

    // Rating delta during period
    let ratingDelta = 0;
    if (contestsInPeriod.length > 0) {
      ratingDelta = contestsInPeriod.reduce((sum, c) => sum + c.ratingChange, 0);
    }

    // Active calendar days
    const activeCalendarDays = new Set(
      submissionsInPeriod.map((s) => s.timestamp.toISOString().split("T")[0])
    ).size;

    // Topic progression
    const topicProgression: Record<string, { solves: number }> = {};
    for (const sub of acceptedSubs) {
      const topics: string[] = JSON.parse(sub.topics || "[]");
      for (const t of topics) {
        if (!topicProgression[t]) topicProgression[t] = { solves: 0 };
        topicProgression[t].solves++;
      }
    }

    const insufficientEvidence = uniqueSolvedProblemIds.size < 3 && contestsParticipated === 0;

    // Determine deterministic adaptation guidance
    let summary = `Completed ${tasksCompleted} of ${tasksPlanned} planned tasks (${completionRate}%).`;
    let adaptationGuidance = "";

    if (insufficientEvidence) {
      adaptationGuidance =
        "Insufficient practice evidence collected during this plan window. Recommend keeping targets or slightly reducing volume to establish consistency.";
    } else if (completionRate >= 80 && ratingDelta >= 0) {
      adaptationGuidance =
        "High task completion with positive or stable rating movement. Recommend advancing problem difficulty brackets and shifting focus to remaining bottlenecks.";
    } else if (completionRate < 50) {
      adaptationGuidance =
        "Low task completion observed. Workload may be too heavy relative to available practice hours. Recommend consolidating targets.";
    } else {
      adaptationGuidance =
        "Moderate completion observed. Maintain primary focus area while reinforcing under-practiced topics.";
    }

    const outcome: PlanOutcome = {
      planId: plan.id,
      versionNumber: currentVersion.versionNumber,
      evaluatedAt: now.toISOString(),
      completionRate,
      tasksPlanned,
      tasksCompleted,
      insufficientEvidence,
      evidenceCollected: {
        totalSubmissionsInPeriod: submissionsInPeriod.length,
        totalProblemsSolvedInPeriod: uniqueSolvedProblemIds.size,
        contestsParticipated,
        targetRangeProblemsSolved: acceptedSubs.filter((s) => {
          const rating = parseInt(s.difficulty.replace(/\D/g, ""), 10);
          return !isNaN(rating) && rating >= (plan.goal.targetValue - 100);
        }).length,
      },
      metricChanges: {
        ratingDelta,
        activeDays: activeCalendarDays,
        topicProgression,
      },
      summary,
      adaptationGuidance,
    };

    // Persist evaluation
    await prisma.planEvaluation.create({
      data: {
        planId: plan.id,
        evaluatedVersionNum: currentVersion.versionNumber,
        completionRate,
        tasksPlanned,
        tasksCompleted,
        ratingChange: ratingDelta,
        outcomeData: JSON.stringify(outcome),
        evaluatedAt: now,
      },
    });

    return outcome;
  }
}
