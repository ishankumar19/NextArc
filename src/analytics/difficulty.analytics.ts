import prisma from "@/lib/prisma";
import { subDays, startOfDay } from "date-fns";

export interface DifficultyTierStats {
  tier: string;
  attempted: number;
  solved: number;
  acceptanceRate: number; // 0 to 100
  recentSolved: number; // last 30 days
}

export interface DifficultyAnalyticsResult {
  codeforces: Record<string, DifficultyTierStats>;
  leetcode: Record<"Easy" | "Medium" | "Hard", DifficultyTierStats>;
}

export const CF_BINS = ["800", "900", "1000", "1100", "1200", "1300", "1400", "1500+"] as const;

export class DifficultyAnalytics {
  /**
   * Computes difficulty performance metrics for Codeforces and LeetCode separately.
   */
  static async computeDifficultyStats(userId: string): Promise<DifficultyAnalyticsResult> {
    const thirtyDaysAgo = subDays(startOfDay(new Date()), 30);

    const submissions = await prisma.normalizedSubmission.findMany({
      where: { userId },
      select: {
        platform: true,
        problemId: true,
        difficulty: true,
        accepted: true,
        timestamp: true,
      },
    });

    // Initialize CF Bins
    const cfBins: Record<string, { attempted: Set<string>; solved: Set<string>; recentSolved: Set<string> }> = {};
    for (const b of CF_BINS) {
      cfBins[b] = { attempted: new Set(), solved: new Set(), recentSolved: new Set() };
    }

    // Initialize LC Tiers
    const lcTiers: Record<"Easy" | "Medium" | "Hard", { attempted: Set<string>; solved: Set<string>; recentSolved: Set<string> }> = {
      Easy: { attempted: new Set(), solved: new Set(), recentSolved: new Set() },
      Medium: { attempted: new Set(), solved: new Set(), recentSolved: new Set() },
      Hard: { attempted: new Set(), solved: new Set(), recentSolved: new Set() },
    };

    for (const sub of submissions) {
      if (sub.platform === "codeforces") {
        const rating = parseInt(sub.difficulty, 10);
        if (!isNaN(rating)) {
          let binKey = "800";
          if (rating >= 1500) binKey = "1500+";
          else if (rating >= 1400) binKey = "1400";
          else if (rating >= 1300) binKey = "1300";
          else if (rating >= 1200) binKey = "1200";
          else if (rating >= 1100) binKey = "1100";
          else if (rating >= 1000) binKey = "1000";
          else if (rating >= 900) binKey = "900";
          else binKey = "800";

          cfBins[binKey].attempted.add(sub.problemId);
          if (sub.accepted) {
            cfBins[binKey].solved.add(sub.problemId);
            if (sub.timestamp >= thirtyDaysAgo) {
              cfBins[binKey].recentSolved.add(sub.problemId);
            }
          }
        }
      } else if (sub.platform === "leetcode") {
        const tier = sub.difficulty as "Easy" | "Medium" | "Hard";
        if (lcTiers[tier]) {
          lcTiers[tier].attempted.add(sub.problemId);
          if (sub.accepted) {
            lcTiers[tier].solved.add(sub.problemId);
            if (sub.timestamp >= thirtyDaysAgo) {
              lcTiers[tier].recentSolved.add(sub.problemId);
            }
          }
        }
      }
    }

    // Map Codeforces results
    const cfResult: Record<string, DifficultyTierStats> = {};
    for (const b of CF_BINS) {
      const att = cfBins[b].attempted.size;
      const sol = cfBins[b].solved.size;
      const rate = att > 0 ? Number(((sol / att) * 100).toFixed(1)) : 0;
      cfResult[b] = {
        tier: b,
        attempted: att,
        solved: sol,
        acceptanceRate: rate,
        recentSolved: cfBins[b].recentSolved.size,
      };
    }

    // Check if LeetCode connection profile data has aggregate solved numbers
    const lcConn = await prisma.platformConnection.findUnique({
      where: { userId_platform: { userId, platform: "leetcode" } },
    });
    let lcProfileStats: any = null;
    if (lcConn?.profileData) {
      try {
        lcProfileStats = JSON.parse(lcConn.profileData);
      } catch {}
    }

    // Map LeetCode results
    const lcResult: Record<"Easy" | "Medium" | "Hard", DifficultyTierStats> = {
      Easy: {
        tier: "Easy",
        attempted: Math.max(lcTiers.Easy.attempted.size, lcProfileStats?.easySolved ?? 0),
        solved: Math.max(lcTiers.Easy.solved.size, lcProfileStats?.easySolved ?? 0),
        acceptanceRate:
          lcTiers.Easy.attempted.size > 0
            ? Number(((lcTiers.Easy.solved.size / lcTiers.Easy.attempted.size) * 100).toFixed(1))
            : (lcProfileStats?.easySolved ? 100 : 0),
        recentSolved: lcTiers.Easy.recentSolved.size,
      },
      Medium: {
        tier: "Medium",
        attempted: Math.max(lcTiers.Medium.attempted.size, lcProfileStats?.mediumSolved ?? 0),
        solved: Math.max(lcTiers.Medium.solved.size, lcProfileStats?.mediumSolved ?? 0),
        acceptanceRate:
          lcTiers.Medium.attempted.size > 0
            ? Number(((lcTiers.Medium.solved.size / lcTiers.Medium.attempted.size) * 100).toFixed(1))
            : (lcProfileStats?.mediumSolved ? 100 : 0),
        recentSolved: lcTiers.Medium.recentSolved.size,
      },
      Hard: {
        tier: "Hard",
        attempted: Math.max(lcTiers.Hard.attempted.size, lcProfileStats?.hardSolved ?? 0),
        solved: Math.max(lcTiers.Hard.solved.size, lcProfileStats?.hardSolved ?? 0),
        acceptanceRate:
          lcTiers.Hard.attempted.size > 0
            ? Number(((lcTiers.Hard.solved.size / lcTiers.Hard.attempted.size) * 100).toFixed(1))
            : (lcProfileStats?.hardSolved ? 100 : 0),
        recentSolved: lcTiers.Hard.recentSolved.size,
      },
    };

    return {
      codeforces: cfResult,
      leetcode: lcResult,
    };
  }
}
