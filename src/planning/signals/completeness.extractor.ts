import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ProgressSignal } from "../signals.types";

export class CompletenessSignalExtractor {
  static extract(context: ProgressContextV1): ProgressSignal[] {
    const signals: ProgressSignal[] = [];

    for (const [platform, report] of Object.entries(context.platformCompleteness)) {
      if (report.completeness === "partial") {
        signals.push({
          id: `sig-completeness-${platform}`,
          type: "data_completeness_bound",
          metric: `${platform}_data_completeness`,
          value: "partial",
          confidence: {
            level: "medium",
            source: platform as "codeforces" | "leetcode",
            completeness: "bounded_history",
            sampleSize: context.recentActivity.last30Days.submissions,
            reason: `Platform integration for '${platform}' is best-effort and bounded to recent public activity.`,
          },
          evidence: {
            description: `Integration for ${platform} provides bounded/partial history. Unsupported metrics include: ${report.unsupportedMetrics.join(
              ", "
            )}.`,
            sampleCount: 1,
            metrics: {
              platform,
              reliabilityTier: report.reliabilityTier,
              supportedMetrics: report.supportedMetrics,
              unsupportedMetrics: report.unsupportedMetrics,
              knownLimitations: report.knownLimitations,
            },
            platformSource: platform as "codeforces" | "leetcode",
          },
        });
      }
    }

    return signals;
  }
}
