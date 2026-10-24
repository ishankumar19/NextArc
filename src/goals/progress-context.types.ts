import { PlatformType } from "@/core/types";
import { PlatformQualityReport } from "@/platforms/capabilities";

export type FreshnessStatus = "fresh" | "stale" | "unknown";

export interface DataFreshnessEntry {
  platform: PlatformType;
  lastSyncedAt: string | null;
  ageMinutes: number | null;
  freshnessStatus: FreshnessStatus;
}

export interface ProgressGoalContext {
  id: string;
  title: string;
  category: string;
  targetMetric: string;
  targetValue: number;
  currentValue: number;
  initialValue: number;
  gap: number; // target - current (e.g. +116)
  daysRemaining: number;
  isOverdue: boolean;
  startDate: string;
  deadline: string;
  availableHoursPerWeek?: number | null;
}

export interface PlatformConnectionSummary {
  platform: PlatformType;
  username: string;
  status: string;
  lastSyncedAt: string | null;
}

export interface CurrentStateMetrics {
  codeforcesRating?: number | null;
  codeforcesMaxRating?: number | null;
  codeforcesRank?: string | null;
  leetcodeTotalSolved?: number | null;
  leetcodeEasy?: number | null;
  leetcodeMedium?: number | null;
  leetcodeHard?: number | null;
}

export interface ActivityWindow {
  problemsSolved: number;
  submissions: number;
  activeDays: number;
}

export interface RecentActivitySummary {
  last7Days: ActivityWindow;
  last30Days: ActivityWindow;
  currentStreak: number;
}

export interface MetricTierStats {
  attempted: number;
  solved: number;
  acceptanceRate: number; // percentage 0-100
  recentSolved?: number;
}

export interface TopicMetricStats {
  topic: string;
  attempted: number;
  solved: number;
  acceptanceRate: number;
  recentSolved: number;
}

export interface ContestSummary {
  contestId: string;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingChange: number;
  timestamp: string;
}

export interface ContestPerformanceSummary {
  totalContests: number;
  ratingChange7d: number;
  ratingChange30d: number;
  recentContests: ContestSummary[];
}

export interface SupportingEvidenceSummary {
  targetRangeProblemsSolvedThisWeek: number;
  contestsThisMonth: number;
  activeDaysThisWeek: number;
  netRatingMovementRecent: number;
}

/**
 * Version 1 of the canonical ProgressContext object.
 * Bridges deterministic backend facts to the UI (Phase 1) and LLM reasoning (Phase 2).
 */
export interface ProgressContextV1 {
  schemaVersion: "1.0.0";
  generatedAt: string; // ISO 8601

  // Freshness metadata per evidence source
  dataFreshness: Record<PlatformType, DataFreshnessEntry>;

  // Capability & completeness quality report per platform (Amendment 3)
  platformCompleteness: Record<PlatformType, PlatformQualityReport>;

  // Primary Goal Context
  goal: ProgressGoalContext;

  // Connected evidence platforms
  platforms: PlatformConnectionSummary[];

  // Deterministic facts across evidence sources
  currentState: CurrentStateMetrics;
  recentActivity: RecentActivitySummary;
  difficultyPerformance: {
    codeforces: Record<string, MetricTierStats>;
    leetcode: Record<"Easy" | "Medium" | "Hard", MetricTierStats>;
  };
  topicPerformance: Record<string, TopicMetricStats>;
  contestPerformance: ContestPerformanceSummary;
  supportingEvidence: SupportingEvidenceSummary;
}
