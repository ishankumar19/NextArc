import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { EvidenceService } from "@/goals/evidence.service";
import { ActivityFeedService } from "@/analytics/activity-feed.service";
import { AnalyticsService } from "@/analytics/analytics.service";
import prisma from "@/lib/prisma";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { applyRateLimit, READ_RATE_LIMIT } from "@/lib/rate-limit";
import { appCache, cacheKey } from "@/lib/cache";

export async function GET(req: NextRequest) {
  const limited = applyRateLimit(req, READ_RATE_LIMIT);
  if (limited) return limited;

  try {
    const userId = await getActiveUserId(req);
    const key = cacheKey.dashboard(userId);

    // Return cached response if available
    const cached = appCache.get<object>(key);
    if (cached) {
      return apiSuccess(cached);
    }

    const [goals, connections, activityFeed, fullAnalytics] = await Promise.all([
      GoalService.getUserGoals(userId),
      prisma.platformConnection.findMany({ where: { userId } }),
      ActivityFeedService.getUnifiedActivity(userId, 10),
      AnalyticsService.getUserAnalytics(userId),
    ]);

    const primaryGoal = goals[0] || null;

    let evidence = null;
    if (primaryGoal) {
      evidence = await EvidenceService.computeSupportingEvidence(
        userId,
        primaryGoal.id
      );
    }

    const payload = {
      primaryGoal,
      allGoals: goals,
      evidence,
      recentActivity: activityFeed,
      practiceSummary: {
        totalSolved: fullAnalytics.activity.totalProblemsSolved,
        activeDays7d: fullAnalytics.activity.last7Days.activeDays,
        currentStreak: fullAnalytics.activity.currentStreak,
        difficulty: fullAnalytics.difficulty,
        topTopics: Object.values(fullAnalytics.topics)
          .filter((t) => t.attempted > 0)
          .sort((a, b) => b.solved - a.solved)
          .slice(0, 5),
      },
      platforms: connections.map((c) => ({
        platform: c.platform,
        username: c.username,
        status: c.status,
        lastSyncedAt: c.lastSyncedAt,
      })),
    };

    // Cache for 60 seconds
    appCache.set(key, payload, 60_000);

    return apiSuccess(payload);
  } catch (err: any) {
    return handleApiError(err);
  }
}
