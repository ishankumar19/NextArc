import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ProgressSignal } from "../signals.types";
import { DifficultySignalExtractor } from "./difficulty.extractor";
import { TopicSignalExtractor } from "./topic.extractor";
import { ContestSignalExtractor } from "./contest.extractor";
import { CompletenessSignalExtractor } from "./completeness.extractor";

export class SignalEngine {
  /**
   * Deterministically extracts factual ProgressSignals from ProgressContextV1.
   * Signals describe facts; they never prescribe actions.
   */
  static extractSignals(context: ProgressContextV1): ProgressSignal[] {
    const rawSignals: ProgressSignal[] = [
      ...DifficultySignalExtractor.extract(context),
      ...TopicSignalExtractor.extract(context),
      ...ContestSignalExtractor.extract(context),
      ...CompletenessSignalExtractor.extract(context),
    ];

    // Priority ordering:
    // 1. Signals directly tied to the primary goal target metric
    // 2. High confidence > Medium confidence > Low confidence
    const goalMetric = context.goal.targetMetric;

    return rawSignals.sort((a, b) => {
      const aMatchesGoal = a.metric.includes(goalMetric) || (goalMetric.includes("rating") && a.type.includes("rating"));
      const bMatchesGoal = b.metric.includes(goalMetric) || (goalMetric.includes("rating") && b.type.includes("rating"));

      if (aMatchesGoal && !bMatchesGoal) return -1;
      if (!aMatchesGoal && bMatchesGoal) return 1;

      const confidenceRank: Record<string, number> = { high: 3, medium: 2, low: 1 };
      const rankDiff = (confidenceRank[b.confidence.level] || 0) - (confidenceRank[a.confidence.level] || 0);
      if (rankDiff !== 0) return rankDiff;

      return a.id.localeCompare(b.id);
    });
  }
}
