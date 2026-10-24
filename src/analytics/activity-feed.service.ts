import prisma from "@/lib/prisma";
import { PlatformType } from "@/core/types";
import { isToday, isYesterday, isThisWeek, format } from "date-fns";

export type ActivityType = "submission" | "contest";

export interface UnifiedActivityItem {
  id: string;
  type: ActivityType;
  platform: PlatformType;
  title: string;
  verdict?: string; // "ACCEPTED", "WRONG_ANSWER", etc.
  accepted?: boolean;
  difficulty?: string;
  topics: string[];
  contestName?: string;
  oldRating?: number;
  newRating?: number;
  ratingChange?: number;
  timestamp: string; // ISO 8601
  dateGroup: string; // "Today", "Yesterday", "Earlier this week", "Older"
}

export class ActivityFeedService {
  /**
   * Fetches unified, chronological activity from all connected platforms.
   * Merges submissions (accepted & failed) and contest rating changes.
   */
  static async getUnifiedActivity(
    userId: string,
    limit = 30
  ): Promise<UnifiedActivityItem[]> {
    // 1. Fetch recent normalized submissions
    const submissions = await prisma.normalizedSubmission.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
      take: limit,
      select: {
        id: true,
        platform: true,
        problemTitle: true,
        verdict: true,
        accepted: true,
        difficulty: true,
        topics: true,
        timestamp: true,
      },
    });

    // 2. Fetch contest history
    const contests = await prisma.contestHistory.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
      take: limit,
      select: {
        id: true,
        platform: true,
        contestName: true,
        oldRating: true,
        newRating: true,
        ratingChange: true,
        timestamp: true,
      },
    });

    // 3. Map into unified items
    const items: UnifiedActivityItem[] = [];

    for (const sub of submissions) {
      let parsedTopics: string[] = [];
      try {
        parsedTopics = JSON.parse(sub.topics);
      } catch {
        parsedTopics = [];
      }

      items.push({
        id: `sub_${sub.id}`,
        type: "submission",
        platform: sub.platform as PlatformType,
        title: sub.problemTitle,
        verdict: sub.verdict,
        accepted: sub.accepted,
        difficulty: sub.difficulty,
        topics: parsedTopics,
        timestamp: sub.timestamp.toISOString(),
        dateGroup: this.resolveDateGroup(sub.timestamp),
      });
    }

    for (const c of contests) {
      items.push({
        id: `contest_${c.id}`,
        type: "contest",
        platform: c.platform as PlatformType,
        title: c.contestName,
        contestName: c.contestName,
        oldRating: c.oldRating,
        newRating: c.newRating,
        ratingChange: c.ratingChange,
        topics: [],
        timestamp: c.timestamp.toISOString(),
        dateGroup: this.resolveDateGroup(c.timestamp),
      });
    }

    // 4. Sort chronologically descending
    items.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return items.slice(0, limit);
  }

  private static resolveDateGroup(date: Date): string {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    if (isThisWeek(date)) return "Earlier this week";
    return format(date, "MMM d, yyyy");
  }
}
