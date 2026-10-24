import { PlatformType } from "@/core/types";

export interface PlatformProfile {
  platform: PlatformType;
  username: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  avatarUrl?: string;
}

export interface RawPlatformSubmission {
  id: string; // external platform submission ID
  problemId: string; // external platform problem ID / slug
  problemTitle: string;
  verdict: string; // "OK", "WRONG_ANSWER", "ACCEPTED", etc.
  accepted: boolean;
  language?: string;
  difficulty?: string; // native string, e.g. "1300" or "Medium"
  numericDifficulty?: number;
  rawTags: string[];
  timestamp: Date;
  contestId?: string;
  rawData?: any;
}

export interface RawPlatformContest {
  contestId: string;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingChange: number;
  timestamp: Date;
}

export interface PlatformAdapter {
  readonly platform: PlatformType;

  /**
   * Validates if the username exists and is publicly accessible on the platform.
   */
  validateUser(username: string): Promise<boolean>;

  /**
   * Fetches latest profile stats and rating snapshots.
   */
  getProfile(username: string): Promise<PlatformProfile>;

  /**
   * Fetches raw submissions from the platform, optionally bounded by `since`.
   */
  getSubmissions(
    username: string,
    since?: Date
  ): Promise<RawPlatformSubmission[]>;

  /**
   * Fetches contest history with rating progression (Codeforces, AtCoder, etc.).
   */
  getContestHistory?(
    username: string
  ): Promise<RawPlatformContest[]>;
}
