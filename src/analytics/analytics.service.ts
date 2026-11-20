import { ActivityAnalytics, ActivityStats } from "./activity.analytics";
import { DifficultyAnalytics, DifficultyAnalyticsResult } from "./difficulty.analytics";
import { TopicAnalytics, TopicMetricStats } from "./topic.analytics";
import { ContestAnalytics, ContestAnalyticsResult } from "./contest.analytics";
import { appCache, singleFlight } from "@/lib/cache";

export interface FullAnalyticsSummary {
  activity: ActivityStats;
  difficulty: DifficultyAnalyticsResult;
  topics: Record<string, TopicMetricStats>;
  contests: ContestAnalyticsResult;
}

export class AnalyticsService {
  /**
   * Computes all deterministic analytics for a user in parallel with 30s single-flight caching.
   */
  static async getUserAnalytics(userId: string): Promise<FullAnalyticsSummary> {
    const cacheKey = `analytics:${userId}`;
    const cached = await appCache.getAsync<FullAnalyticsSummary>(cacheKey);
    if (cached) return cached;

    return singleFlight(cacheKey, async () => {
      const doubleCheck = await appCache.getAsync<FullAnalyticsSummary>(cacheKey);
      if (doubleCheck) return doubleCheck;

      const [activity, difficulty, topics, contests] = await Promise.all([
        ActivityAnalytics.computeUserActivity(userId),
        DifficultyAnalytics.computeDifficultyStats(userId),
        TopicAnalytics.computeTopicStats(userId),
        ContestAnalytics.computeContestStats(userId),
      ]);

      const result = {
        activity,
        difficulty,
        topics,
        contests,
      };

      await appCache.setAsync(cacheKey, result, 30);
      return result;
    });
  }
}
