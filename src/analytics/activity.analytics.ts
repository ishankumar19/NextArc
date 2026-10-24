import prisma from "@/lib/prisma";
import { subDays, startOfDay, format } from "date-fns";

export interface ActivityStats {
  totalProblemsSolved: number;
  totalProblemsAttempted: number;
  totalAcceptedSubmissions: number;
  totalFailedSubmissions: number;
  last7Days: {
    problemsSolved: number;
    submissions: number;
    activeDays: number;
  };
  last30Days: {
    problemsSolved: number;
    submissions: number;
    activeDays: number;
  };
  totalActiveDays: number;
  currentStreak: number;
}

export class ActivityAnalytics {
  /**
   * Computes deterministic activity metrics from user submissions.
   */
  static async computeUserActivity(userId: string): Promise<ActivityStats> {
    const allSubmissions = await prisma.normalizedSubmission.findMany({
      where: { userId },
      select: {
        problemId: true,
        accepted: true,
        timestamp: true,
      },
      orderBy: { timestamp: "desc" },
    });

    const now = new Date();
    const sevenDaysAgo = subDays(startOfDay(now), 7);
    const thirtyDaysAgo = subDays(startOfDay(now), 30);

    // Track unique solved and attempted problems
    const solvedProblemIds = new Set<string>();
    const attemptedProblemIds = new Set<string>();

    const solved7d = new Set<string>();
    const solved30d = new Set<string>();

    let totalAccepted = 0;
    let totalFailed = 0;
    let submissions7d = 0;
    let submissions30d = 0;

    const activeDatesAll = new Set<string>();
    const activeDates7d = new Set<string>();
    const activeDates30d = new Set<string>();

    for (const sub of allSubmissions) {
      attemptedProblemIds.add(sub.problemId);
      const dateKey = format(sub.timestamp, "yyyy-MM-dd");
      activeDatesAll.add(dateKey);

      if (sub.accepted) {
        totalAccepted++;
        solvedProblemIds.add(sub.problemId);
      } else {
        totalFailed++;
      }

      if (sub.timestamp >= sevenDaysAgo) {
        submissions7d++;
        activeDates7d.add(dateKey);
        if (sub.accepted) solved7d.add(sub.problemId);
      }

      if (sub.timestamp >= thirtyDaysAgo) {
        submissions30d++;
        activeDates30d.add(dateKey);
        if (sub.accepted) solved30d.add(sub.problemId);
      }
    }

    // Calculate current streak in consecutive days ending today or yesterday
    const currentStreak = this.calculateStreak(activeDatesAll);

    return {
      totalProblemsSolved: solvedProblemIds.size,
      totalProblemsAttempted: attemptedProblemIds.size,
      totalAcceptedSubmissions: totalAccepted,
      totalFailedSubmissions: totalFailed,
      last7Days: {
        problemsSolved: solved7d.size,
        submissions: submissions7d,
        activeDays: activeDates7d.size,
      },
      last30Days: {
        problemsSolved: solved30d.size,
        submissions: submissions30d,
        activeDays: activeDates30d.size,
      },
      totalActiveDays: activeDatesAll.size,
      currentStreak,
    };
  }

  /**
   * Calculates consecutive active days ending on today or yesterday.
   */
  private static calculateStreak(activeDates: Set<string>): number {
    if (activeDates.size === 0) return 0;

    let streak = 0;
    let checkDate = new Date();
    const todayKey = format(checkDate, "yyyy-MM-dd");

    // If no activity today, check if yesterday was active
    if (!activeDates.has(todayKey)) {
      checkDate = subDays(checkDate, 1);
      const yesterdayKey = format(checkDate, "yyyy-MM-dd");
      if (!activeDates.has(yesterdayKey)) {
        return 0;
      }
    }

    // Count backwards day by day
    while (activeDates.has(format(checkDate, "yyyy-MM-dd"))) {
      streak++;
      checkDate = subDays(checkDate, 1);
    }

    return streak;
  }
}
