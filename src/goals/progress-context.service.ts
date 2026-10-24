import prisma from "@/lib/prisma";
import { PlatformType } from "@/core/types";
import { GoalService } from "./goal.service";
import { AnalyticsService } from "@/analytics/analytics.service";
import { EvidenceService } from "./evidence.service";
import { getPlatformQualityReport } from "@/platforms/capabilities";
import {
  DataFreshnessEntry,
  ProgressContextV1,
} from "./progress-context.types";
import { differenceInMinutes } from "date-fns";
import { GoalNotFoundError } from "@/core/errors";

export class ProgressContextService {
  /**
   * Builds the versioned canonical ProgressContextV1 object for a user and goal.
   * This serves as the factual bedrock for Phase 1 dashboards and Phase 2 LLM planning.
   */
  static async getUserProgressContext(
    userId: string,
    goalId?: string
  ): Promise<ProgressContextV1> {
    const now = new Date();

    // 1. Resolve Goal Context
    const goalView = goalId
      ? await GoalService.getGoalById(goalId, userId)
      : (await GoalService.getUserGoals(userId))[0];

    if (!goalView) {
      throw new GoalNotFoundError(goalId || "default");
    }

    // 2. Fetch Connected Platforms
    const connections = await prisma.platformConnection.findMany({
      where: { userId },
    });

    const platformsSummary = connections.map((c) => ({
      platform: c.platform as PlatformType,
      username: c.username,
      status: c.status,
      lastSyncedAt: c.lastSyncedAt ? c.lastSyncedAt.toISOString() : null,
    }));

    // 3. Compute Data Freshness Metadata
    const dataFreshness: Record<PlatformType, DataFreshnessEntry> = {
      codeforces: {
        platform: "codeforces",
        lastSyncedAt: null,
        ageMinutes: null,
        freshnessStatus: "unknown",
      },
      leetcode: {
        platform: "leetcode",
        lastSyncedAt: null,
        ageMinutes: null,
        freshnessStatus: "unknown",
      },
    };

    for (const c of connections) {
      const p = c.platform as PlatformType;
      if (dataFreshness[p]) {
        if (c.lastSyncedAt) {
          const age = differenceInMinutes(now, c.lastSyncedAt);
          dataFreshness[p] = {
            platform: p,
            lastSyncedAt: c.lastSyncedAt.toISOString(),
            ageMinutes: age,
            freshnessStatus: age <= 1440 ? "fresh" : "stale", // fresh if synced within 24h
          };
        }
      }
    }

    // 4. Compute Per-Platform Completeness Quality Report (Amendment 3)
    const platformCompleteness = {
      codeforces: getPlatformQualityReport("codeforces"),
      leetcode: getPlatformQualityReport("leetcode"),
    };

    // 5. Gather Deterministic Facts from Analytics Engine
    const analytics = await AnalyticsService.getUserAnalytics(userId);

    // 6. Gather Supporting Evidence Tailored to Goal
    const evidence = await EvidenceService.computeSupportingEvidence(
      userId,
      goalView.id
    );

    // 7. Resolve Current State Metrics
    const cfConn = connections.find((c) => c.platform === "codeforces");
    const lcConn = connections.find((c) => c.platform === "leetcode");

    let cfProfile: any = null;
    if (cfConn?.profileData) {
      try {
        cfProfile = JSON.parse(cfConn.profileData);
      } catch {}
    }

    let lcProfile: any = null;
    if (lcConn?.profileData) {
      try {
        lcProfile = JSON.parse(lcConn.profileData);
      } catch {}
    }

    const currentState = {
      codeforcesRating:
        analytics.contests.currentRating || cfProfile?.rating || null,
      codeforcesMaxRating:
        analytics.contests.maxRating || cfProfile?.maxRating || null,
      codeforcesRank: cfProfile?.rank || null,
      leetcodeTotalSolved: lcProfile?.totalSolved || null,
      leetcodeEasy: lcProfile?.easySolved || null,
      leetcodeMedium: lcProfile?.mediumSolved || null,
      leetcodeHard: lcProfile?.hardSolved || null,
    };

    // 8. Assemble canonical ProgressContextV1
    return {
      schemaVersion: "1.0.0",
      generatedAt: now.toISOString(),
      dataFreshness,
      platformCompleteness,
      goal: {
        id: goalView.id,
        title: goalView.title,
        category: goalView.category,
        targetMetric: goalView.targetMetric,
        targetValue: goalView.targetValue,
        currentValue: goalView.currentValue,
        initialValue: goalView.initialValue,
        gap: goalView.gap,
        daysRemaining: goalView.daysRemaining,
        isOverdue: goalView.isOverdue,
        startDate: goalView.startDate,
        deadline: goalView.deadline,
        availableHoursPerWeek: goalView.availableHoursPerWeek,
      },
      platforms: platformsSummary,
      currentState,
      recentActivity: {
        last7Days: analytics.activity.last7Days,
        last30Days: analytics.activity.last30Days,
        currentStreak: analytics.activity.currentStreak,
      },
      difficultyPerformance: analytics.difficulty,
      topicPerformance: analytics.topics,
      contestPerformance: {
        totalContests: analytics.contests.totalContests,
        ratingChange7d: analytics.contests.ratingChange7d,
        ratingChange30d: analytics.contests.ratingChange30d,
        recentContests: analytics.contests.recentContests,
      },
      supportingEvidence: {
        targetRangeProblemsSolvedThisWeek:
          evidence.targetRangeProblemsSolvedThisWeek,
        contestsThisMonth: evidence.contestsThisMonth,
        activeDaysThisWeek: evidence.activeDaysThisWeek,
        netRatingMovementRecent: evidence.netRatingMovementRecent,
      },
    };
  }
}
