import {
  PlatformAdapter,
  PlatformProfile,
  RawPlatformSubmission,
} from "../platform.types";
import { PlatformError, PlatformUserNotFoundError } from "@/core/errors";

export class LeetCodeAdapter implements PlatformAdapter {
  readonly platform = "leetcode" as const;
  private readonly graphqlEndpoint = "https://leetcode.com/graphql";

  // In-memory cache for problem metadata (tags & difficulty) to minimize external requests
  private problemMetaCache = new Map<
    string,
    { difficulty: string; tags: string[] }
  >();

  /**
   * Helper to perform GraphQL requests against LeetCode's public endpoint.
   */
  private async executeGraphQL<T>(
    query: string,
    variables: Record<string, any>
  ): Promise<T> {
    try {
      const response = await fetch(this.graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "ProgressPlatform/1.0 (SkillProgressionTracker)",
          Referer: "https://leetcode.com",
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new PlatformError(
          "leetcode",
          `HTTP ${response.status}: ${response.statusText}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const json = (await response.json()) as any;
      if (json.errors && json.errors.length > 0) {
        const msg = json.errors[0]?.message || "GraphQL query error";
        if (msg.toLowerCase().includes("does not exist") || msg.toLowerCase().includes("not found")) {
          throw new PlatformUserNotFoundError("leetcode", variables.username || "user");
        }
        throw new PlatformError("leetcode", msg);
      }

      return json.data as T;
    } catch (err: any) {
      if (err instanceof PlatformError) throw err;
      throw new PlatformError(
        "leetcode",
        `Network or connection failure: ${err?.message || "Unknown error"}`,
        "NETWORK_ERROR",
        503
      );
    }
  }

  /**
   * Validates if the username exists on LeetCode.
   */
  async validateUser(username: string): Promise<boolean> {
    try {
      const cleanUsername = username.trim();
      if (!cleanUsername) return false;

      const query = `
        query checkUser($username: String!) {
          matchedUser(username: $username) {
            username
          }
        }
      `;

      const data = await this.executeGraphQL<{ matchedUser: { username: string } | null }>(
        query,
        { username: cleanUsername }
      );

      return Boolean(data?.matchedUser?.username);
    } catch {
      return false;
    }
  }

  /**
   * Fetches user profile stats: Total, Easy, Medium, and Hard solved counts.
   */
  async getProfile(username: string): Promise<PlatformProfile> {
    const cleanUsername = username.trim();
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
            userAvatar
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `;

    const data = await this.executeGraphQL<{
      matchedUser: {
        username: string;
        profile: { ranking: number; userAvatar: string };
        submitStatsGlobal: {
          acSubmissionNum: Array<{
            difficulty: string;
            count: number;
            submissions: number;
          }>;
        };
      } | null;
    }>(query, { username: cleanUsername });

    if (!data?.matchedUser) {
      throw new PlatformUserNotFoundError("leetcode", username);
    }

    const counts = data.matchedUser.submitStatsGlobal.acSubmissionNum || [];
    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    for (const c of counts) {
      const diff = c.difficulty.toLowerCase();
      if (diff === "all") totalSolved = c.count;
      else if (diff === "easy") easySolved = c.count;
      else if (diff === "medium") mediumSolved = c.count;
      else if (diff === "hard") hardSolved = c.count;
    }

    return {
      platform: "leetcode",
      username: data.matchedUser.username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      avatarUrl: data.matchedUser.profile?.userAvatar,
      rank: data.matchedUser.profile?.ranking ? `#${data.matchedUser.profile.ranking}` : undefined,
    };
  }

  /**
   * Fetches recent submissions where publicly available.
   * Note: As documented in Amendment 3, LeetCode provides a limited recent window (~20-50).
   */
  async getSubmissions(
    username: string,
    since?: Date
  ): Promise<RawPlatformSubmission[]> {
    const cleanUsername = username.trim();
    const query = `
      query getRecentSubmissions($username: String!) {
        recentSubmissionList(username: $username, limit: 50) {
          title
          titleSlug
          timestamp
          statusDisplay
          lang
        }
      }
    `;

    const data = await this.executeGraphQL<{
      recentSubmissionList: Array<{
        title: string;
        titleSlug: string;
        timestamp: string;
        statusDisplay: string;
        lang: string;
      }> | null;
    }>(query, { username: cleanUsername });

    const list = data?.recentSubmissionList || [];
    const sinceTimestamp = since ? Math.floor(since.getTime() / 1000) : 0;
    const rawSubmissions: RawPlatformSubmission[] = [];

    for (const sub of list) {
      const ts = parseInt(sub.timestamp, 10);
      if (sinceTimestamp > 0 && ts < sinceTimestamp) {
        continue;
      }

      // Generate a deterministic submission id combining problem slug and timestamp
      const submissionId = `lc_${sub.titleSlug}_${sub.timestamp}`;
      const isAccepted = sub.statusDisplay === "Accepted";

      rawSubmissions.push({
        id: submissionId,
        problemId: sub.titleSlug,
        problemTitle: sub.title,
        verdict: sub.statusDisplay || "Submitted",
        accepted: isAccepted,
        language: sub.lang,
        difficulty: "Medium", // Baseline estimate until problem detail is fetched/cached
        numericDifficulty: 2,
        rawTags: [],
        timestamp: new Date(ts * 1000),
      });
    }

    return rawSubmissions;
  }

  /**
   * Helper to fetch tags and difficulty for a specific problem title slug.
   */
  async getProblemMetadata(
    titleSlug: string
  ): Promise<{ difficulty: string; tags: string[] }> {
    if (this.problemMetaCache.has(titleSlug)) {
      return this.problemMetaCache.get(titleSlug)!;
    }

    try {
      const query = `
        query getQuestionDetail($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            difficulty
            topicTags {
              name
              slug
            }
          }
        }
      `;

      const data = await this.executeGraphQL<{
        question: {
          difficulty: string;
          topicTags: Array<{ name: string; slug: string }>;
        } | null;
      }>(query, { titleSlug });

      if (data?.question) {
        const meta = {
          difficulty: data.question.difficulty || "Medium",
          tags: data.question.topicTags.map((t) => t.name),
        };
        this.problemMetaCache.set(titleSlug, meta);
        return meta;
      }
    } catch {
      // Fallback on error
    }

    return { difficulty: "Medium", tags: [] };
  }
}

export const leetcodeAdapter = new LeetCodeAdapter();
