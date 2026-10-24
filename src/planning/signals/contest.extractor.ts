import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ProgressSignal } from "../signals.types";
import { ConfidenceCalculator } from "./confidence.calculator";

export class ContestSignalExtractor {
  static extract(context: ProgressContextV1): ProgressSignal[] {
    const signals: ProgressSignal[] = [];
    const contestPerf = context.contestPerformance;
    const isCpGoal =
      context.goal.category === "competitive_programming" ||
      context.goal.targetMetric.includes("rating");

    // 1. Contest Frequency
    if (isCpGoal) {
      const contestsThisMonth = context.supportingEvidence.contestsThisMonth;
      if (contestsThisMonth <= 1) {
        const confidence = ConfidenceCalculator.compute({
          source: "codeforces",
          sampleSize: contestPerf.totalContests,
          completeness: "complete",
        });

        signals.push({
          id: "sig-contest-low-frequency",
          type: "low_contest_frequency",
          metric: "contests_in_30_days",
          value: `${contestsThisMonth} contest${contestsThisMonth === 1 ? "" : "s"} in 30 days`,
          confidence,
          evidence: {
            description: `Only ${contestsThisMonth} rated contest${
              contestsThisMonth === 1 ? "" : "s"
            } participated in over the last 30 days, while pursuing a rating-based goal.`,
            sampleCount: contestsThisMonth,
            metrics: {
              contestsThisMonth,
              totalContestsLifetime: contestPerf.totalContests,
              targetMetric: context.goal.targetMetric,
            },
            platformSource: "codeforces",
          },
        });
      }
    }

    // 2. Rating Trends (based on recent contests)
    const recent = contestPerf.recentContests;
    if (recent && recent.length >= 2) {
      // Net change across recent contests (up to 5)
      const windowContests = recent.slice(0, 5);
      const netChange = windowContests.reduce((acc, c) => acc + c.ratingChange, 0);
      const sampleSize = windowContests.length;

      const confidence = ConfidenceCalculator.compute({
        source: "codeforces",
        sampleSize,
        completeness: "complete",
      });

      // Positive rating trend
      if (netChange >= 30) {
        signals.push({
          id: "sig-contest-trend-positive",
          type: "positive_rating_trend",
          metric: "recent_contests_net_rating_change",
          value: `+${netChange}`,
          confidence,
          evidence: {
            description: `+${netChange} rating movement over the last ${sampleSize} contests.`,
            sampleCount: sampleSize,
            metrics: {
              netChange,
              contestsEvaluated: sampleSize,
              contestDetails: windowContests.map((c) => ({
                id: c.contestId,
                name: c.contestName,
                delta: c.ratingChange,
                rank: c.rank,
              })),
            },
            platformSource: "codeforces",
          },
        });
      } else if (netChange <= -30) {
        signals.push({
          id: "sig-contest-trend-negative",
          type: "negative_rating_trend",
          metric: "recent_contests_net_rating_change",
          value: `${netChange}`,
          confidence,
          evidence: {
            description: `${netChange} rating movement over the last ${sampleSize} contests.`,
            sampleCount: sampleSize,
            metrics: {
              netChange,
              contestsEvaluated: sampleSize,
              contestDetails: windowContests.map((c) => ({
                id: c.contestId,
                name: c.contestName,
                delta: c.ratingChange,
                rank: c.rank,
              })),
            },
            platformSource: "codeforces",
          },
        });
      }

      // Volatile rating trend (alternating large swings e.g. std dev or max-min >= 70)
      if (sampleSize >= 3) {
        const changes = windowContests.map((c) => c.ratingChange);
        const maxDelta = Math.max(...changes);
        const minDelta = Math.min(...changes);
        if (maxDelta - minDelta >= 80) {
          signals.push({
            id: "sig-contest-trend-volatile",
            type: "volatile_rating_trend",
            metric: "recent_contests_rating_volatility",
            value: `spread_${maxDelta - minDelta}`,
            confidence,
            evidence: {
              description: `High contest volatility observed with a ${
                maxDelta - minDelta
              } point swing between best (+${maxDelta}) and worst (${minDelta}) performance across recent contests.`,
              sampleCount: sampleSize,
              metrics: {
                maxDelta,
                minDelta,
                spread: maxDelta - minDelta,
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
