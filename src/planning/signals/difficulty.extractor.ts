import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ProgressSignal } from "../signals.types";
import { ConfidenceCalculator } from "./confidence.calculator";

export class DifficultySignalExtractor {
  static extract(context: ProgressContextV1): ProgressSignal[] {
    const signals: ProgressSignal[] = [];

    // 1. Codeforces difficulty drop-off
    const cfBins = context.difficultyPerformance.codeforces;
    const sortedBinKeys = Object.keys(cfBins)
      .map((k) => ({ key: k, numeric: parseInt(k.replace(/\D/g, ""), 10) }))
      .filter((item) => !isNaN(item.numeric))
      .sort((a, b) => a.numeric - b.numeric);

    for (let i = 0; i < sortedBinKeys.length - 1; i++) {
      const lower = sortedBinKeys[i];
      const higher = sortedBinKeys[i + 1];

      const lowerStats = cfBins[lower.key];
      const higherStats = cfBins[higher.key];

      if (!lowerStats || !higherStats) continue;

      // Both need at least 3 attempts to be meaningful
      if (lowerStats.attempted >= 3 && higherStats.attempted >= 3) {
        const rateDiff = lowerStats.acceptanceRate - higherStats.acceptanceRate;

        // Detect sharp dropoff (e.g. 25%+ drop, or higher tier <= 40% while lower is >= 65%)
        if (rateDiff >= 25 || (higherStats.acceptanceRate <= 40 && lowerStats.acceptanceRate >= 65)) {
          const confidence = ConfidenceCalculator.compute({
            source: "codeforces",
            sampleSize: higherStats.attempted,
            completeness: "complete",
          });

          signals.push({
            id: `sig-diff-drop-cf-${higher.numeric}`,
            type: "difficulty_dropoff",
            metric: `codeforces_difficulty_${higher.numeric}`,
            value: `${Math.round(higherStats.acceptanceRate)}%`,
            confidence,
            evidence: {
              description: `Codeforces ${higher.numeric} success rate is ${Math.round(
                higherStats.acceptanceRate
              )}% (${higherStats.solved}/${higherStats.attempted}), dropping from ${Math.round(
                lowerStats.acceptanceRate
              )}% at rating ${lower.numeric}.`,
              sampleCount: higherStats.attempted,
              metrics: {
                platform: "codeforces",
                lowerBin: lower.numeric,
                lowerRate: lowerStats.acceptanceRate,
                higherBin: higher.numeric,
                higherRate: higherStats.acceptanceRate,
                lowerAttempted: lowerStats.attempted,
                higherAttempted: higherStats.attempted,
              },
              platformSource: "codeforces",
            },
          });
        }
      }
    }

    // 2. LeetCode difficulty drop-off (Easy -> Medium, or Medium -> Hard)
    const lcStats = context.difficultyPerformance.leetcode;
    if (lcStats) {
      const tiers: Array<{ name: "Easy" | "Medium" | "Hard"; next?: "Medium" | "Hard" }> = [
        { name: "Easy", next: "Medium" },
        { name: "Medium", next: "Hard" },
      ];

      for (const tier of tiers) {
        if (!tier.next) continue;
        const currentTierStats = lcStats[tier.name];
        const nextTierStats = lcStats[tier.next];

        if (currentTierStats && nextTierStats && currentTierStats.attempted >= 3 && nextTierStats.attempted >= 3) {
          const rateDiff = currentTierStats.acceptanceRate - nextTierStats.acceptanceRate;
          if (rateDiff >= 30 || (nextTierStats.acceptanceRate <= 40 && currentTierStats.acceptanceRate >= 70)) {
            const confidence = ConfidenceCalculator.compute({
              source: "leetcode",
              sampleSize: nextTierStats.attempted,
              completeness: "bounded_history",
            });

            signals.push({
              id: `sig-diff-drop-lc-${tier.next.toLowerCase()}`,
              type: "difficulty_dropoff",
              metric: `leetcode_difficulty_${tier.next.toLowerCase()}`,
              value: `${Math.round(nextTierStats.acceptanceRate)}%`,
              confidence,
              evidence: {
                description: `LeetCode ${tier.next} solve rate is ${Math.round(
                  nextTierStats.acceptanceRate
                )}% (${nextTierStats.solved}/${nextTierStats.attempted}), compared to ${Math.round(
                  currentTierStats.acceptanceRate
                )}% on ${tier.name}.`,
                sampleCount: nextTierStats.attempted,
                metrics: {
                  platform: "leetcode",
                  currentTier: tier.name,
                  currentRate: currentTierStats.acceptanceRate,
                  nextTier: tier.next,
                  nextRate: nextTierStats.acceptanceRate,
                },
                platformSource: "leetcode",
              },
            });
          }
        }
      }
    }

    // 3. Difficulty Stagnation
    // Check if the majority of recent practice is significantly below user's rating / target
    const currentRating = context.currentState.codeforcesRating;
    const targetRating =
      context.goal.targetMetric === "codeforces_rating" ? context.goal.targetValue : null;
    const referenceRating = currentRating || targetRating;

    if (referenceRating && referenceRating >= 1200) {
      let lowDifficultySolves = 0;
      let totalSolvedCounted = 0;
      const lowerThreshold = referenceRating - 200;

      for (const item of sortedBinKeys) {
        const stats = cfBins[item.key];
        if (!stats) continue;
        totalSolvedCounted += stats.solved;
        if (item.numeric <= lowerThreshold) {
          lowDifficultySolves += stats.solved;
        }
      }

      if (totalSolvedCounted >= 10) {
        const lowRatio = lowDifficultySolves / totalSolvedCounted;
        if (lowRatio >= 0.7) {
          const confidence = ConfidenceCalculator.compute({
            source: "codeforces",
            sampleSize: totalSolvedCounted,
            completeness: "complete",
          });

          signals.push({
            id: "sig-diff-stagnation",
            type: "difficulty_stagnation",
            metric: "low_difficulty_practice_ratio",
            value: `${Math.round(lowRatio * 100)}%`,
            confidence,
            evidence: {
              description: `${Math.round(
                lowRatio * 100
              )}% of Codeforces solves (${lowDifficultySolves}/${totalSolvedCounted}) are rated <= ${lowerThreshold} (>=200 points below current/target rating).`,
              sampleCount: totalSolvedCounted,
              metrics: {
                lowDifficultySolves,
                totalSolvedCounted,
                ratio: lowRatio,
                lowerThreshold,
              },
              platformSource: "codeforces",
            },
          });
        }
      }
    }

    return signals;
  }
}
