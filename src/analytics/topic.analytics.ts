import prisma from "@/lib/prisma";
import { CANONICAL_TOPICS } from "@/normalization/topic.normalizer";
import { subDays, startOfDay } from "date-fns";

export interface TopicMetricStats {
  topic: string;
  attempted: number;
  solved: number;
  acceptanceRate: number; // 0 to 100
  recentSolved: number;
}

export class TopicAnalytics {
  /**
   * Computes deterministic facts for all canonical topics across user practice.
   * Strictly avoids subjective judgements like 'weakness' (reserved for Phase 2 LLM).
   */
  static async computeTopicStats(userId: string): Promise<Record<string, TopicMetricStats>> {
    const thirtyDaysAgo = subDays(startOfDay(new Date()), 30);

    const submissions = await prisma.normalizedSubmission.findMany({
      where: { userId },
      select: {
        problemId: true,
        topics: true,
        accepted: true,
        timestamp: true,
      },
    });

    const topicMap: Record<
      string,
      { attempted: Set<string>; solved: Set<string>; recentSolved: Set<string> }
    > = {};

    // Initialize all canonical topics
    for (const t of CANONICAL_TOPICS) {
      topicMap[t] = {
        attempted: new Set(),
        solved: new Set(),
        recentSolved: new Set(),
      };
    }

    for (const sub of submissions) {
      let topics: string[] = [];
      try {
        topics = JSON.parse(sub.topics);
      } catch {
        topics = [];
      }

      for (const t of topics) {
        if (!topicMap[t]) {
          topicMap[t] = {
            attempted: new Set(),
            solved: new Set(),
            recentSolved: new Set(),
          };
        }

        topicMap[t].attempted.add(sub.problemId);
        if (sub.accepted) {
          topicMap[t].solved.add(sub.problemId);
          if (sub.timestamp >= thirtyDaysAgo) {
            topicMap[t].recentSolved.add(sub.problemId);
          }
        }
      }
    }

    const result: Record<string, TopicMetricStats> = {};

    for (const [topic, sets] of Object.entries(topicMap)) {
      const att = sets.attempted.size;
      const sol = sets.solved.size;
      const rate = att > 0 ? Number(((sol / att) * 100).toFixed(1)) : 0;

      result[topic] = {
        topic,
        attempted: att,
        solved: sol,
        acceptanceRate: rate,
        recentSolved: sets.recentSolved.size,
      };
    }

    return result;
  }
}
