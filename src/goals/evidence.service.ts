import prisma from "@/lib/prisma";
import { subDays, startOfDay, format } from "date-fns";

export interface SupportingEvidenceResult {
  targetRangeProblemsSolvedThisWeek: number;
  targetRangeLabel: string;
  contestsThisMonth: number;
  activeDaysThisWeek: number;
  netRatingMovementRecent: number;
}

export class EvidenceService {
  /**
   * Computes supporting evidence indicators tailored to the user's declared goal.
   */
  static async computeSupportingEvidence(
    userId: string,
    goalId?: string
  ): Promise<SupportingEvidenceResult> {
    const now = new Date();
    const sevenDaysAgo = subDays(startOfDay(now), 7);
    const thirtyDaysAgo = subDays(startOfDay(now), 30);

    // 1. Fetch Goal if provided, or default active goal
    const goal = goalId
      ? await prisma.goal.findUnique({ where: { id: goalId } })
      : await prisma.goal.findFirst({
          where: { userId, status: "active" },
          orderBy: { createdAt: "desc" },
        });

    let targetRangeLabel = "Target Range";
    let isTargetRangeProblem = (sub: {
      platform: string;
      difficulty: string;
      numericDifficulty: number | null;
    }) => false;

    if (goal?.targetMetric === "codeforces_rating") {
      const targetRating = goal.targetValue;
      const lowerBound = Math.max(800, targetRating - 100);
      const upperBound = targetRating;
      targetRangeLabel = `${lowerBound}-${upperBound}`;

      isTargetRangeProblem = (sub) => {
        if (sub.platform !== "codeforces") return false;
        const rating = sub.numericDifficulty ?? parseInt(sub.difficulty, 10);
        return !isNaN(rating) && rating >= lowerBound && rating <= upperBound;
      };
    } else if (goal?.targetMetric === "leetcode_solved_medium") {
      targetRangeLabel = "Medium";
      isTargetRangeProblem = (sub) =>
        sub.platform === "leetcode" && sub.difficulty.toLowerCase() === "medium";
    } else if (goal?.targetMetric === "leetcode_solved_hard") {
      targetRangeLabel = "Hard";
      isTargetRangeProblem = (sub) =>
        sub.platform === "leetcode" && sub.difficulty.toLowerCase() === "hard";
    } else {
      // General default: solved problems in the last 7 days
      targetRangeLabel = "Goal Focus";
      isTargetRangeProblem = () => true;
    }

    // 2. Fetch submissions in the last 7 days
    const recentSubmissions = await prisma.normalizedSubmission.findMany({
      where: {
        userId,
        timestamp: { gte: sevenDaysAgo },
      },
      select: {
        problemId: true,
        platform: true,
        difficulty: true,
        accepted: true,
        timestamp: true,
      },
    });

    const targetRangeSolvedProblems = new Set<string>();
    const activeDates7d = new Set<string>();

    for (const sub of recentSubmissions) {
      activeDates7d.add(format(sub.timestamp, "yyyy-MM-dd"));
      if (sub.accepted) {
        const numeric = parseInt(sub.difficulty, 10);
        if (
          isTargetRangeProblem({
            platform: sub.platform,
            difficulty: sub.difficulty,
            numericDifficulty: isNaN(numeric) ? null : numeric,
          })
        ) {
          targetRangeSolvedProblems.add(sub.problemId);
        }
      }
    }

    // 3. Fetch contest participation and rating changes
    const recentContests = await prisma.contestHistory.findMany({
      where: {
        userId,
        platform: "codeforces",
        timestamp: { gte: thirtyDaysAgo },
      },
      select: {
        ratingChange: true,
        timestamp: true,
      },
    });

    let netRatingMovementRecent = 0;
    for (const c of recentContests) {
      netRatingMovementRecent += c.ratingChange;
    }

    return {
      targetRangeProblemsSolvedThisWeek: targetRangeSolvedProblems.size,
      targetRangeLabel,
      contestsThisMonth: recentContests.length,
      activeDaysThisWeek: activeDates7d.size,
      netRatingMovementRecent,
    };
  }
}
