import { PlatformType } from "@/core/types";

export type SignalType =
  | "difficulty_dropoff"
  | "difficulty_stagnation"
  | "underexposed_topic"
  | "overexposed_topic"
  | "topic_weakness"
  | "positive_rating_trend"
  | "negative_rating_trend"
  | "volatile_rating_trend"
  | "low_contest_frequency"
  | "data_completeness_bound";

export type ConfidenceLevel = "high" | "medium" | "low";

export type DataCompletenessTier = "complete" | "bounded_history" | "partial";

export interface EvidenceConfidence {
  level: ConfidenceLevel;
  source: PlatformType | "cross_platform";
  completeness: DataCompletenessTier;
  sampleSize: number;
  reason?: string;
}

export interface ProgressSignalEvidence {
  description: string;
  sampleCount: number;
  metrics: Record<string, unknown>;
  platformSource?: PlatformType | "cross_platform";
}

export interface ProgressSignal {
  id: string;
  type: SignalType;
  metric: string;
  value: number | string;
  confidence: EvidenceConfidence;
  evidence: ProgressSignalEvidence;
}
