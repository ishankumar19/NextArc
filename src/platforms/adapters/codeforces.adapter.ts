import {
  PlatformAdapter,
  PlatformProfile,
  RawPlatformContest,
  RawPlatformSubmission,
} from "../platform.types";
import { codeforcesThrottler, SharedPlatformThrottler } from "../throttler";
import { PlatformError, PlatformUserNotFoundError } from "@/core/errors";

interface CFUserInfoResponse {
  status: "OK" | "FAILED";
  comment?: string;
  result?: Array<{
    handle: string;
    rating?: number;
    maxRating?: number;
    rank?: string;
    maxRank?: string;
    avatar?: string;
    titlePhoto?: string;
  }>;
}

interface CFUserStatusResponse {
  status: "OK" | "FAILED";
  comment?: string;
  result?: Array<{
    id: number;
    contestId?: number;
    creationTimeSeconds: number;
    problem: {
      contestId?: number;
      index: string;
      name: string;
      type: string;
      rating?: number;
      tags: string[];
    };
    programmingLanguage: string;
    verdict?: string; // "OK", "WRONG_ANSWER", etc.
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
  }>;
}

interface CFUserRatingResponse {
  status: "OK" | "FAILED";
  comment?: string;
  result?: Array<{
    contestId: number;
    contestName: string;
    handle: string;
    rank: number;
    ratingUpdateTimeSeconds: number;
    oldRating: number;
    newRating: number;
  }>;
}

export class CodeforcesAdapter implements PlatformAdapter {
  readonly platform = "codeforces" as const;
  private readonly baseUrl = "https://codeforces.com/api";
  private throttler: SharedPlatformThrottler;

  constructor(throttler: SharedPlatformThrottler = codeforcesThrottler) {
    this.throttler = throttler;
  }

  /**
   * Internal fetcher wrapped strictly in the global codeforcesThrottler
   * to guarantee <= 1 request / 2000ms.
   */
  private async throttledFetch<T>(endpoint: string): Promise<T> {
    return this.throttler.enqueue(async () => {
      const url = `${this.baseUrl}/${endpoint}`;
      let response: Response;

      try {
        response = await fetch(url, {
          headers: {
            "User-Agent": "ProgressPlatform/1.0 (SkillProgressionTracker)",
            Accept: "application/json",
          },
          signal: AbortSignal.timeout(15000),
        });
      } catch (err: any) {
        if (err.name === "TimeoutError" || err.name === "AbortError") {
          throw new PlatformError(
            "codeforces",
            `Request to Codeforces timed out after 15000ms: ${endpoint}`,
            "TIMEOUT",
            504
          );
        }
        throw new PlatformError(
          "codeforces",
          `Network connection error: ${err.message}`,
          "NETWORK_ERROR"
        );
      }

      if (!response.ok) {
        if (response.status === 404 || response.status === 400) {
          const body = (await response.json().catch(() => ({}))) as any;
          if (body?.comment && body.comment.toLowerCase().includes("not found")) {
            throw new PlatformUserNotFoundError("codeforces", endpoint);
          }
        }
        throw new PlatformError(
          "codeforces",
          `HTTP ${response.status}: ${response.statusText}`,
          "HTTP_ERROR",
          response.status
        );
      }

      const data = (await response.json()) as any;
      if (data.status !== "OK") {
        if (data.comment && data.comment.toLowerCase().includes("not found")) {
          throw new PlatformUserNotFoundError("codeforces", data.comment);
        }
        throw new PlatformError("codeforces", data.comment || "API status not OK");
      }

      return data as T;
    });
  }

  /**
   * Validates if the Codeforces handle exists.
   */
  async validateUser(username: string): Promise<boolean> {
    try {
      const cleanUsername = username.trim();
      if (!cleanUsername) return false;
      const res = await this.throttledFetch<CFUserInfoResponse>(
        `user.info?handles=${encodeURIComponent(cleanUsername)}`
      );
      return Boolean(res.result && res.result.length > 0);
    } catch (err) {
      if (err instanceof PlatformUserNotFoundError) {
        return false;
      }
      // On network failure or rate limit in test environment, don't crash
      return false;
    }
  }

  /**
   * Fetches the user profile and current rating details.
   */
  async getProfile(username: string): Promise<PlatformProfile> {
    const cleanUsername = username.trim();
    const res = await this.throttledFetch<CFUserInfoResponse>(
      `user.info?handles=${encodeURIComponent(cleanUsername)}`
    );

    const user = res.result?.[0];
    if (!user) {
      throw new PlatformUserNotFoundError("codeforces", username);
    }

    return {
      platform: "codeforces",
      username: user.handle,
      rating: user.rating ?? 0,
      maxRating: user.maxRating ?? 0,
      rank: user.rank ?? "unrated",
      maxRank: user.maxRank ?? "unrated",
      avatarUrl: user.avatar || user.titlePhoto,
    };
  }

  /**
   * Fetches submission history, optionally bounded by since date.
   */
  async getSubmissions(
    username: string,
    since?: Date
  ): Promise<RawPlatformSubmission[]> {
    const cleanUsername = username.trim();
    // Fetch up to 1000 most recent submissions
    const res = await this.throttledFetch<CFUserStatusResponse>(
      `user.status?handle=${encodeURIComponent(cleanUsername)}&from=1&count=1000`
    );

    const list = res.result || [];
    const sinceTimestamp = since ? Math.floor(since.getTime() / 1000) : 0;

    const rawSubmissions: RawPlatformSubmission[] = [];

    for (const sub of list) {
      if (sinceTimestamp > 0 && sub.creationTimeSeconds < sinceTimestamp) {
        continue;
      }

      const problemId = sub.problem.contestId
        ? `${sub.problem.contestId}${sub.problem.index}`
        : `${sub.problem.index}_${sub.problem.name.replace(/\s+/g, "_")}`;

      rawSubmissions.push({
        id: String(sub.id),
        problemId: problemId,
        problemTitle: sub.problem.name,
        verdict: sub.verdict || "TESTING",
        accepted: sub.verdict === "OK",
        language: sub.programmingLanguage,
        difficulty: sub.problem.rating ? String(sub.problem.rating) : "Unrated",
        numericDifficulty: sub.problem.rating,
        rawTags: sub.problem.tags || [],
        timestamp: new Date(sub.creationTimeSeconds * 1000),
        contestId: sub.contestId ? String(sub.contestId) : undefined,
        rawData: {
          testset: sub.testset,
          passedTestCount: sub.passedTestCount,
          timeConsumedMillis: sub.timeConsumedMillis,
          memoryConsumedBytes: sub.memoryConsumedBytes,
        },
      });
    }

    return rawSubmissions;
  }

  /**
   * Fetches rating history and contest deltas.
   */
  async getContestHistory(username: string): Promise<RawPlatformContest[]> {
    const cleanUsername = username.trim();
    const res = await this.throttledFetch<CFUserRatingResponse>(
      `user.rating?handle=${encodeURIComponent(cleanUsername)}`
    );

    const list = res.result || [];

    return list.map((c) => ({
      contestId: String(c.contestId),
      contestName: c.contestName,
      rank: c.rank,
      oldRating: c.oldRating,
      newRating: c.newRating,
      ratingChange: c.newRating - c.oldRating,
      timestamp: new Date(c.ratingUpdateTimeSeconds * 1000),
    }));
  }
}

export const codeforcesAdapter = new CodeforcesAdapter();
