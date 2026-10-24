import prisma from "@/lib/prisma";
import { subDays, startOfDay } from "date-fns";

export interface ContestHistoryItem {
  contestId: string;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingChange: number;
  timestamp: string;
}

export interface ContestAnalyticsResult {
  currentRating: number;
  maxRating: number;
  totalContests: number;
  ratingChange7d: number;
  ratingChange30d: number;
  recentContests: ContestHistoryItem[];
  ratingTrend: Array<{
    date: string;
    contestName: string;
    rating: number;
    ratingChange: number;
  }>;
}

export class ContestAnalytics {
  /**
   * Computes contest and rating metrics for Codeforces.
   */
  static async computeContestStats(userId: string): Promise<ContestAnalyticsResult> {
    const contests = await prisma.contestHistory.findMany({
      where: { userId, platform: "codeforces" },
      orderBy: { timestamp: "asc" },
    });

    const now = new Date();
    const sevenDaysAgo = subDays(startOfDay(now), 7);
    const thirtyDaysAgo = subDays(startOfDay(now), 30);

    let ratingChange7d = 0;
    let ratingChange30d = 0;
    let maxRating = 0;
    let currentRating = 0;

    const ratingTrend = contests.map((c) => {
      if (c.newRating > maxRating) maxRating = c.newRating;
      currentRating = c.newRating;

      if (c.timestamp >= sevenDaysAgo) {
        ratingChange7d += c.ratingChange;
      }
      if (c.timestamp >= thirtyDaysAgo) {
        ratingChange30d += c.ratingChange;
      }

      return {
        date: c.timestamp.toISOString(),
        contestName: c.contestName,
        rating: c.newRating,
        ratingChange: c.ratingChange,
      };
    });

    // Check profileData fallback if user has rating but no contest rows synced yet
    if (currentRating === 0) {
      const conn = await prisma.platformConnection.findUnique({
        where: { userId_platform: { userId, platform: "codeforces" } },
      });
      if (conn?.profileData) {
        try {
          const profile = JSON.parse(conn.profileData);
          if (profile.rating) currentRating = profile.rating;
          if (profile.maxRating) maxRating = profile.maxRating;
        } catch {}
      }
    }

    const recent = [...contests]
      .reverse()
      .slice(0, 10)
      .map((c) => ({
        contestId: c.contestId,
        contestName: c.contestName,
        rank: c.rank,
        oldRating: c.oldRating,
        newRating: c.newRating,
        ratingChange: c.ratingChange,
        timestamp: c.timestamp.toISOString(),
      }));

    return {
      currentRating,
      maxRating,
      totalContests: contests.length,
      ratingChange7d,
      ratingChange30d,
      recentContests: recent,
      ratingTrend,
    };
  }
}
