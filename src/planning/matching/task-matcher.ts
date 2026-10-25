import { prisma } from "@/lib/prisma";

export interface MatchResults {
  taskId: string;
  externalTaskId: string;
  previousCompleted: number;
  newCompleted: number;
  targetQuantity: number;
  newMatchesCount: number;
  status: string;
}

export class TaskEvidenceMatcher {
  /**
   * Deterministically matches external normalized activity (submissions, contests)
   * to active plan tasks for a given goal.
   */
  static async matchTasksForGoal(goalId: string): Promise<MatchResults[]> {
    const activePlan = await prisma.plan.findFirst({
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
      },
    });

    if (!activePlan || activePlan.versions.length === 0) {
      return [];
    }

    const currentVersion = activePlan.versions[0];
    const startDate = currentVersion.startDate;
    const targetReviewDate = currentVersion.targetReviewDate;
    const userId = activePlan.userId;
    const results: MatchResults[] = [];

    // Fetch user submissions and contests strictly within the plan active window
    const submissions = await prisma.normalizedSubmission.findMany({
      where: {
        userId,
        timestamp: { gte: startDate, lte: targetReviewDate },
        accepted: true,
      },
      include: {
        problem: true,
      },
      orderBy: { timestamp: "asc" },
    });

    const contests = await prisma.contestHistory.findMany({
      where: {
        userId,
        timestamp: { gte: startDate, lte: targetReviewDate },
      },
      orderBy: { timestamp: "asc" },
    });

    for (const task of currentVersion.tasks) {
      const existingMatchSubIds = new Set(
        task.matches.map((m) => m.submissionId).filter(Boolean) as string[]
      );
      const existingMatchContestIds = new Set(
        task.matches.map((m) => m.contestHistoryId).filter(Boolean) as string[]
      );

      // Unique problem tracking: multiple solves of the same problem do not double-count
      const existingMatchedProblemIds = new Set<string>();
      for (const m of task.matches) {
        if (m.submission?.problemId) {
          existingMatchedProblemIds.add(m.submission.problemId);
        }
      }

      let newlyMatchedCount = 0;

      if (task.type === "practice" || task.type === "review" || task.type === "upsolve") {
        const parsedTopics: string[] = JSON.parse(task.topics || "[]");

        for (const sub of submissions) {
          if (existingMatchSubIds.has(sub.id)) continue;

          // Deduplicate multiple solves of the same problem
          if (existingMatchedProblemIds.has(sub.problemId)) continue;

          // Platform filter
          if (task.platform && task.platform !== "cross_platform" && sub.platform !== task.platform) {
            continue;
          }

          // Difficulty filter
          if (task.minDifficulty !== null && task.minDifficulty !== undefined) {
            const numDiff = sub.problem.numericDifficulty ?? parseInt(sub.difficulty.replace(/\D/g, ""), 10);
            if (isNaN(numDiff) || numDiff < task.minDifficulty) continue;
          }

          if (task.maxDifficulty !== null && task.maxDifficulty !== undefined) {
            const numDiff = sub.problem.numericDifficulty ?? parseInt(sub.difficulty.replace(/\D/g, ""), 10);
            if (isNaN(numDiff) || numDiff > task.maxDifficulty) continue;
          }

          if (task.difficultyTier) {
            if (sub.difficulty.toLowerCase() !== task.difficultyTier.toLowerCase()) continue;
          }

          // Topic filter
          if (parsedTopics.length > 0) {
            const subTopics: string[] = JSON.parse(sub.topics || "[]");
            const hasTopicOverlap = parsedTopics.some((t) => subTopics.includes(t));
            if (!hasTopicOverlap) continue;
          }

          // Match found!
          await prisma.taskEvidenceMatch.upsert({
            where: {
              taskId_submissionId: {
                taskId: task.id,
                submissionId: sub.id,
              },
            },
            create: {
              taskId: task.id,
              submissionId: sub.id,
              matchedAt: new Date(),
              notes: `Matched submission ${sub.problemTitle} (${sub.difficulty})`,
            },
            update: {},
          });

          existingMatchSubIds.add(sub.id);
          existingMatchedProblemIds.add(sub.problemId);
          newlyMatchedCount++;
        }
      } else if (task.type === "contest") {
        for (const contest of contests) {
          if (existingMatchContestIds.has(contest.id)) continue;

          if (task.platform && task.platform !== "cross_platform" && contest.platform !== task.platform) {
            continue;
          }

          // Rated contest check
          const isRated = contest.ratingChange !== 0 || contest.oldRating > 0 || contest.newRating > 0;
          if (!isRated && !task.title.toLowerCase().includes("unrated")) {
            continue;
          }

          // Match found!
          await prisma.taskEvidenceMatch.upsert({
            where: {
              taskId_contestHistoryId: {
                taskId: task.id,
                contestHistoryId: contest.id,
              },
            },
            create: {
              taskId: task.id,
              contestHistoryId: contest.id,
              matchedAt: new Date(),
              notes: `Matched contest ${contest.contestName} (rank ${contest.rank}, delta ${contest.ratingChange})`,
            },
            update: {},
          });

          existingMatchContestIds.add(contest.id);
          newlyMatchedCount++;
        }
      }

      const totalMatches =
        task.type === "contest" ? existingMatchContestIds.size : existingMatchedProblemIds.size;
      const quantityCompleted = Math.min(totalMatches, task.quantity);
      const newStatus =
        quantityCompleted >= task.quantity
          ? "completed"
          : quantityCompleted > 0
          ? "in_progress"
          : "pending";

      // Update task progress in database
      await prisma.planTask.update({
        where: { id: task.id },
        data: {
          quantityCompleted,
          status: newStatus,
        },
      });

      results.push({
        taskId: task.id,
        externalTaskId: task.externalTaskId,
        previousCompleted: task.quantityCompleted,
        newCompleted: quantityCompleted,
        targetQuantity: task.quantity,
        newMatchesCount: newlyMatchedCount,
        status: newStatus,
      });
    }

    return results;
  }
}
