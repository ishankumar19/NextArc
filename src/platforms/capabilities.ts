import { PlatformType } from "@/core/types";

export type ReliabilityTier = "authoritative" | "best_effort";

export type CompletenessGrade = "complete" | "partial" | "inferred" | "unavailable";

export interface PlatformCapabilities {
  platform: PlatformType;
  reliabilityTier: ReliabilityTier;

  // Granular capability flags
  supportsExactRating: boolean;
  supportsContestHistory: boolean;
  supportsSubmissionTimestamps: boolean;
  supportsExactProblemRating: boolean;
  supportsTopicTags: boolean;
  supportsOfficialPublicAPI: boolean;
  supportsFullSubmissionHistory: boolean;

  // Rate limit and concurrency constraints
  minRequestIntervalMs: number; // e.g. 2000ms for Codeforces
  maxBatchSize: number;
}

export interface PlatformQualityReport {
  platform: PlatformType;
  reliabilityTier: ReliabilityTier;
  completeness: CompletenessGrade;
  lastVerifiedAt?: string;
  supportedMetrics: string[];
  unsupportedMetrics: string[];
  knownLimitations: string[];
}

export const CODEFORCES_CAPABILITIES: Readonly<PlatformCapabilities> = {
  platform: "codeforces",
  reliabilityTier: "authoritative",
  supportsExactRating: true,
  supportsContestHistory: true,
  supportsSubmissionTimestamps: true,
  supportsExactProblemRating: true,
  supportsTopicTags: true,
  supportsOfficialPublicAPI: true,
  supportsFullSubmissionHistory: true,
  minRequestIntervalMs: 2000, // Official 1 req / 2s rate limit
  maxBatchSize: 1000,
};

export const LEETCODE_CAPABILITIES: Readonly<PlatformCapabilities> = {
  platform: "leetcode",
  reliabilityTier: "best_effort",
  supportsExactRating: false, // Contest rating requires private/auth cookies or unofficial scraping
  supportsContestHistory: false,
  supportsSubmissionTimestamps: true, // Only for recent public submissions (up to 20-100)
  supportsExactProblemRating: false, // Only categorical (Easy, Medium, Hard)
  supportsTopicTags: true,
  supportsOfficialPublicAPI: false, // Uses unofficial/public GraphQL endpoint
  supportsFullSubmissionHistory: false, // Limited to recent window
  minRequestIntervalMs: 500,
  maxBatchSize: 50,
};

export const PLATFORM_CAPABILITIES_MAP: Record<PlatformType, PlatformCapabilities> = {
  codeforces: CODEFORCES_CAPABILITIES,
  leetcode: LEETCODE_CAPABILITIES,
};

export function getPlatformQualityReport(platform: string): PlatformQualityReport {
  const norm = (platform || "").toLowerCase();
  const caps = (PLATFORM_CAPABILITIES_MAP as any)[norm] || CODEFORCES_CAPABILITIES;

  if (norm === "codeforces") {
    return {
      platform: "codeforces",
      reliabilityTier: caps.reliabilityTier || "authoritative",
      completeness: "complete",
      supportedMetrics: [
        "codeforces_rating",
        "contest_rank",
        "rating_change",
        "exact_problem_difficulty",
        "full_submission_history",
        "topic_breakdown",
      ],
      unsupportedMetrics: [],
      knownLimitations: [
        "Strict 1 request / 2 seconds API rate limit enforced globally.",
      ],
    };
  }

  // LeetCode or any other platform default
  return {
    platform: (norm === "leetcode" ? "leetcode" : norm) as PlatformType,
    reliabilityTier: caps?.reliabilityTier || "best_effort",
    completeness: "partial",
    supportedMetrics: [
      "leetcode_solved_total",
      "leetcode_solved_easy",
      "leetcode_solved_medium",
      "leetcode_solved_hard",
      "recent_submissions_window",
      "topic_tags",
    ],
    unsupportedMetrics: [
      "contest_rating_progression",
      "historical_contest_deltas",
      "complete_historical_submission_log",
    ],
    knownLimitations: [
      "LeetCode is an unofficial best-effort source.",
      "Only recent submissions (~20-50) are exposed without user session credentials.",
      "Difficulty is categorized as Easy/Medium/Hard, not continuous numeric rating.",
    ],
  };
}
