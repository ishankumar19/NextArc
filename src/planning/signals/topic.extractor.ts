import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ProgressSignal } from "../signals.types";
import { ConfidenceCalculator } from "./confidence.calculator";

const CORE_DSA_TOPICS = [
  "greedy",
  "dynamic-programming",
  "graphs",
  "trees",
  "binary-search",
  "two-pointers",
  "sliding-window",
  "math",
];

export class TopicSignalExtractor {
  static extract(context: ProgressContextV1): ProgressSignal[] {
    const signals: ProgressSignal[] = [];
    const topics = context.topicPerformance;
    const total30dSolves = context.recentActivity.last30Days.problemsSolved;

    // Calculate total solved across all recorded topics
    let totalTopicSolves = 0;
    for (const stats of Object.values(topics)) {
      totalTopicSolves += stats.solved;
    }

    // Determine platform source for topics
    const hasCodeforces = context.platforms.some(
      (p) => p.platform === "codeforces" && p.status === "connected"
    );
    const hasLeetCode = context.platforms.some(
      (p) => p.platform === "leetcode" && p.status === "connected"
    );
    const topicSource =
      hasCodeforces && hasLeetCode
        ? "cross_platform"
        : hasLeetCode
        ? "leetcode"
        : "codeforces";

    // 1. Underexposed Topics (among core DSA topics)
    if (total30dSolves >= 8 || totalTopicSolves >= 15) {
      for (const coreTopic of CORE_DSA_TOPICS) {
        const stats = topics[coreTopic];
        const recentSolved = stats ? stats.recentSolved : 0;
        const totalSolved = stats ? stats.solved : 0;

        if (recentSolved <= 2 && total30dSolves >= 8) {
          const confidence = ConfidenceCalculator.compute({
            source: topicSource,
            sampleSize: total30dSolves,
            completeness: topicSource === "codeforces" ? "complete" : "bounded_history",
          });

          signals.push({
            id: `sig-topic-underexposed-${coreTopic}`,
            type: "underexposed_topic",
            metric: `topic_exposure_${coreTopic}`,
            value: `${recentSolved} recent solves`,
            confidence,
            evidence: {
              description: `Only ${recentSolved} problems solved in topic '${coreTopic}' in the last 30 days (${totalSolved} total), while total 30-day activity is ${total30dSolves} solves.`,
              sampleCount: total30dSolves,
              metrics: {
                topic: coreTopic,
                recentSolved,
                totalSolved,
                total30dSolves,
              },
              platformSource: topicSource,
            },
          });
        }
      }
    }

    // 2. Overexposed Topics (single topic dominates practice)
    if (totalTopicSolves >= 15) {
      for (const [topicSlug, stats] of Object.entries(topics)) {
        const ratio = stats.solved / totalTopicSolves;
        if (ratio >= 0.5) {
          const confidence = ConfidenceCalculator.compute({
            source: topicSource,
            sampleSize: totalTopicSolves,
            completeness: topicSource === "codeforces" ? "complete" : "bounded_history",
          });

          signals.push({
            id: `sig-topic-overexposed-${topicSlug}`,
            type: "overexposed_topic",
            metric: `topic_dominance_${topicSlug}`,
            value: `${Math.round(ratio * 100)}%`,
            confidence,
            evidence: {
              description: `Topic '${topicSlug}' accounts for ${Math.round(
                ratio * 100
              )}% of all problem solves (${stats.solved}/${totalTopicSolves}).`,
              sampleCount: totalTopicSolves,
              metrics: {
                topic: topicSlug,
                solved: stats.solved,
                totalTopicSolves,
                ratio,
              },
              platformSource: topicSource,
            },
          });
        }
      }
    }

    // 3. Topic Weakness (multiple attempts with low acceptance rate)
    for (const [topicSlug, stats] of Object.entries(topics)) {
      if (stats.attempted >= 5 && stats.acceptanceRate <= 40) {
        const confidence = ConfidenceCalculator.compute({
          source: topicSource,
          sampleSize: stats.attempted,
          completeness: topicSource === "codeforces" ? "complete" : "bounded_history",
        });

        signals.push({
          id: `sig-topic-weakness-${topicSlug}`,
          type: "topic_weakness",
          metric: `topic_acceptance_${topicSlug}`,
          value: `${Math.round(stats.acceptanceRate)}%`,
          confidence,
          evidence: {
            description: `Topic '${topicSlug}' acceptance rate is ${Math.round(
              stats.acceptanceRate
            )}% (${stats.solved} solved out of ${stats.attempted} attempted).`,
            sampleCount: stats.attempted,
            metrics: {
              topic: topicSlug,
              attempted: stats.attempted,
              solved: stats.solved,
              acceptanceRate: stats.acceptanceRate,
            },
            platformSource: topicSource,
          },
        });
      }
    }

    return signals;
  }
}
