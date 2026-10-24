import { PlatformType } from "@/core/types";
import {
  ConfidenceLevel,
  DataCompletenessTier,
  EvidenceConfidence,
} from "../signals.types";

export interface ComputeConfidenceParams {
  source: PlatformType | "cross_platform";
  sampleSize: number;
  completeness?: DataCompletenessTier;
  reason?: string;
}

export class ConfidenceCalculator {
  /**
   * Deterministically calculates EvidenceConfidence for a signal.
   *
   * Crucial Guardrail:
   * Never let limited recent LeetCode submissions produce high-confidence historical conclusions.
   */
  static compute(params: ComputeConfidenceParams): EvidenceConfidence {
    const { source, sampleSize } = params;

    let completeness: DataCompletenessTier = params.completeness ?? "complete";

    if (source === "leetcode") {
      // LeetCode public submissions are fundamentally bounded to recent windows
      completeness = completeness === "partial" ? "partial" : "bounded_history";
    }

    let level: ConfidenceLevel = "low";
    let calculatedReason = params.reason;

    if (sampleSize < 3) {
      level = "low";
      if (!calculatedReason) {
        calculatedReason = `Sample size of ${sampleSize} is too small to draw reliable conclusions.`;
      }
    } else if (sampleSize < 10) {
      level = "medium";
      if (!calculatedReason) {
        calculatedReason = `Sample size of ${sampleSize} provides moderate evidence.`;
      }
    } else {
      // 10 or more samples
      if (source === "leetcode" || completeness === "bounded_history" || completeness === "partial") {
        // Capped at medium because LeetCode history is bounded
        level = "medium";
        if (!calculatedReason) {
          calculatedReason = `Sample size of ${sampleSize} is bounded by LeetCode public window limits.`;
        }
      } else {
        level = "high";
        if (!calculatedReason) {
          calculatedReason = `Authoritative dataset with ${sampleSize} samples.`;
        }
      }
    }

    return {
      level,
      source,
      completeness,
      sampleSize,
      reason: calculatedReason,
    };
  }
}
