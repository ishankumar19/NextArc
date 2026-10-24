import { ActivityAnalytics, ActivityStats } from "./activity.analytics";
import { DifficultyAnalytics, DifficultyAnalyticsResult } from "./difficulty.analytics";
import { TopicAnalytics, TopicMetricStats } from "./topic.analytics";
import { ContestAnalytics, ContestAnalyticsResult } from "./contest.analytics";

export interface FullAnalyticsSummary {
  activity: ActivityStats;
  difficulty: DifficultyAnalyticsResult;
  topics: Record<string, TopicMetricStats>;
  contests: ContestAnalyticsResult;
}

export class AnalyticsService {
  /**
   * Computes all deterministic analytics for a user in parallel.
   */
  static async getUserAnalytics(userId: string): Promise<FullAnalyticsSummary> {
    const [activity, difficulty, topics, contests] = await Promise.all([
      ActivityAnalytics.computeUserActivity(userId),
      DifficultyAnalytics.computeDifficultyStats(userId),
      TopicAnalytics.computeTopicStats(userId),
      ContestAnalytics.computeContestStats(userId),
    ]);

    return {
      activity,
      difficulty,
      topics,
      contests,
    };
  }
}
