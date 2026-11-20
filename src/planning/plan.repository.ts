import { prisma } from "@/lib/prisma";
import { AdaptivePlanV1, PlanTask as DomainPlanTask } from "./plan.types";
import { getDailyProblemForCriteria } from "./problems/problem-catalog";

export interface CreatePlanParams {
  userId: string;
  goalId: string;
  planData: AdaptivePlanV1;
}

export class PlanRepository {
  /**
   * Persists a newly generated plan as Version 1 for a goal.
   * If an active plan already exists for this goal, marks it as superseded.
   */
  static async createPlan(params: CreatePlanParams) {
    const { userId, goalId, planData } = params;

    return prisma.$transaction(async (tx) => {
      // Mark any prior active plan as superseded
      await tx.plan.updateMany({
        where: { goalId, status: "active" },
        data: { status: "superseded" },
      });

      const startDate = new Date(planData.generatedAt);
      const targetReviewDate = new Date(startDate);
      const reviewDays = planData.reviewPolicy.reviewAfterDays ?? 7;
      targetReviewDate.setDate(targetReviewDate.getDate() + reviewDays);

      // Create new Plan
      const plan = await tx.plan.create({
        data: {
          userId,
          goalId,
          status: "active",
          currentVersionNum: 1,
        },
      });

      // Create PlanVersion 1
      const version = await tx.planVersion.create({
        data: {
          planId: plan.id,
          versionNumber: 1,
          schemaVersion: planData.schemaVersion,
          summary: planData.assessment.summary,
          milestoneTitle: planData.nextMilestone.description,
          bottleneckType: planData.primaryBottleneck.type,
          planData: JSON.stringify(planData),
          startDate,
          targetReviewDate,
        },
      });

      // Create PlanTask entries
      for (const t of planData.tasks) {
        await tx.planTask.create({
          data: {
            planVersionId: version.id,
            externalTaskId: t.id,
            type: t.type,
            title: t.title,
            quantity: t.quantity ?? 1,
            quantityCompleted: 0,
            platform: t.platform ?? null,
            minDifficulty: t.difficulty?.min ?? null,
            maxDifficulty: t.difficulty?.max ?? null,
            difficultyTier: t.difficulty?.tier ?? null,
            topics: JSON.stringify(t.topics ?? []),
            reason: t.reason,
            evidenceReferences: JSON.stringify(t.evidenceReferences ?? []),
            completionMetric: t.completionMetric,
            status: "pending",
          },
        });
      }

      return this.getActivePlan(goalId, tx);
    });
  }

  /**
   * Adds an adapted version (v2, v3, etc.) to an existing plan lineage.
   */
  static async createAdaptedVersion(planId: string, planData: AdaptivePlanV1) {
    return prisma.$transaction(async (tx) => {
      const plan = await tx.plan.findUniqueOrThrow({ where: { id: planId } });
      const nextVersionNum = plan.currentVersionNum + 1;

      const startDate = new Date(planData.generatedAt);
      const targetReviewDate = new Date(startDate);
      const reviewDays = planData.reviewPolicy.reviewAfterDays ?? 7;
      targetReviewDate.setDate(targetReviewDate.getDate() + reviewDays);

      await tx.plan.update({
        where: { id: planId },
        data: { currentVersionNum: nextVersionNum, updatedAt: new Date() },
      });

      const version = await tx.planVersion.create({
        data: {
          planId: plan.id,
          versionNumber: nextVersionNum,
          schemaVersion: planData.schemaVersion,
          summary: planData.assessment.summary,
          milestoneTitle: planData.nextMilestone.description,
          bottleneckType: planData.primaryBottleneck.type,
          planData: JSON.stringify(planData),
          startDate,
          targetReviewDate,
        },
      });

      for (const t of planData.tasks) {
        await tx.planTask.create({
          data: {
            planVersionId: version.id,
            externalTaskId: t.id,
            type: t.type,
            title: t.title,
            quantity: t.quantity ?? 1,
            quantityCompleted: 0,
            platform: t.platform ?? null,
            minDifficulty: t.difficulty?.min ?? null,
            maxDifficulty: t.difficulty?.max ?? null,
            difficultyTier: t.difficulty?.tier ?? null,
            topics: JSON.stringify(t.topics ?? []),
            reason: t.reason,
            evidenceReferences: JSON.stringify(t.evidenceReferences ?? []),
            completionMetric: t.completionMetric,
            status: "pending",
          },
        });
      }

      return this.getActivePlan(plan.goalId, tx);
    });
  }

  /**
   * Retrieves the current active plan for a goal with its current version and tasks.
   */
  static async getActivePlan(goalId: string, client: any = prisma) {
    const plan = await client.plan.findFirst({
      where: { goalId, status: "active" },
      include: {
        versions: {
          orderBy: { versionNumber: "desc" },
          take: 1,
          include: {
            tasks: {
              include: {
                matches: {
                  include: {
                    submission: true,
                    contestHistory: true,
                  },
                },
              },
            },
          },
        },
        evaluations: {
          orderBy: { evaluatedAt: "desc" },
        },
      },
    });

    if (plan?.versions?.[0]?.tasks) {
      const today = new Date();
      for (const task of plan.versions[0].tasks) {
        if (task.type === "practice" || task.type === "review" || task.type === "upsolve") {
          let parsedTopics: string[] = [];
          try {
            parsedTopics = JSON.parse(task.topics);
          } catch {}

          const todayProblem = getDailyProblemForCriteria(
            task.platform || "codeforces",
            task.minDifficulty ?? undefined,
            task.maxDifficulty ?? undefined,
            parsedTopics,
            today
          );

          if (todayProblem) {
            (task as any).problemId = todayProblem.id;
            (task as any).problemName = `${todayProblem.id} - ${todayProblem.name}`;
            (task as any).problemUrl = todayProblem.url;
            (task as any).problemRating = todayProblem.rating;
            (task as any).dailyDate = today.toISOString().slice(0, 10);
            (task as any).title = `Solve: ${todayProblem.id} - ${todayProblem.name} (CF ${todayProblem.rating} • ${parsedTopics[0] || todayProblem.topics[0] || "practice"})`;
          }
        }
      }
    }

    return plan;
  }

  /**
   * Retrieves the full plan history including all versions and evaluations.
   */
  static async getPlanHistory(goalId: string) {
    return prisma.plan.findMany({
      where: { goalId },
      orderBy: { createdAt: "desc" },
      include: {
        versions: {
          orderBy: { versionNumber: "asc" },
          include: {
            tasks: {
              include: {
                matches: true,
              },
            },
          },
        },
        evaluations: {
          orderBy: { evaluatedAt: "desc" },
        },
      },
    });
  }
}
