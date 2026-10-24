import prisma from "@/lib/prisma";
import { NormalizedSubmissionData } from "./submission.normalizer";
import { RawPlatformContest } from "@/platforms/platform.types";
import { PlatformType } from "@/core/types";

export interface IngestionResult {
  problemsUpserted: number;
  submissionsUpserted: number;
  contestsUpserted: number;
}

export class IngestionService {
  /**
   * Idempotently upserts a problem definition into the database.
   */
  static async upsertProblem(
    platform: PlatformType,
    externalProblemId: string,
    title: string,
    difficulty: string,
    numericDifficulty: number | null,
    canonicalTopics: string[],
    rawTags: string[]
  ) {
    return prisma.problem.upsert({
      where: {
        platform_externalProblemId: {
          platform,
          externalProblemId,
        },
      },
      update: {
        title,
        difficulty,
        numericDifficulty,
        topics: JSON.stringify(canonicalTopics),
        rawTags: JSON.stringify(rawTags),
      },
      create: {
        platform,
        externalProblemId,
        title,
        difficulty,
        numericDifficulty,
        topics: JSON.stringify(canonicalTopics),
        rawTags: JSON.stringify(rawTags),
      },
    });
  }

  /**
   * Idempotently upserts a normalized submission using the defensive unique key
   * [userId, platform, externalSubmissionId].
   */
  static async upsertSubmission(data: NormalizedSubmissionData) {
    // Ensure the problem exists first
    const problem = await this.upsertProblem(
      data.platform,
      data.problemId,
      data.problemTitle,
      data.difficulty,
      data.numericDifficulty,
      data.topics,
      data.rawTags
    );

    return prisma.normalizedSubmission.upsert({
      where: {
        userId_platform_externalSubmissionId: {
          userId: data.userId,
          platform: data.platform,
          externalSubmissionId: data.externalSubmissionId,
        },
      },
      update: {
        problemId: problem.id,
        problemTitle: data.problemTitle,
        verdict: data.verdict,
        accepted: data.accepted,
        language: data.language,
        difficulty: data.difficulty,
        topics: JSON.stringify(data.topics),
        timestamp: data.timestamp,
        contestId: data.contestId,
        rawData: data.rawData ? JSON.stringify(data.rawData) : null,
      },
      create: {
        userId: data.userId,
        platform: data.platform,
        externalSubmissionId: data.externalSubmissionId,
        problemId: problem.id,
        problemTitle: data.problemTitle,
        verdict: data.verdict,
        accepted: data.accepted,
        language: data.language,
        difficulty: data.difficulty,
        topics: JSON.stringify(data.topics),
        timestamp: data.timestamp,
        contestId: data.contestId,
        rawData: data.rawData ? JSON.stringify(data.rawData) : null,
      },
    });
  }

  /**
   * Idempotently upserts contest history records.
   */
  static async upsertContest(
    userId: string,
    platform: PlatformType,
    contest: RawPlatformContest
  ) {
    return prisma.contestHistory.upsert({
      where: {
        userId_platform_contestId: {
          userId,
          platform,
          contestId: String(contest.contestId),
        },
      },
      update: {
        contestName: contest.contestName,
        rank: contest.rank,
        oldRating: contest.oldRating,
        newRating: contest.newRating,
        ratingChange: contest.ratingChange,
        timestamp: contest.timestamp,
      },
      create: {
        userId,
        platform,
        contestId: String(contest.contestId),
        contestName: contest.contestName,
        rank: contest.rank,
        oldRating: contest.oldRating,
        newRating: contest.newRating,
        ratingChange: contest.ratingChange,
        timestamp: contest.timestamp,
      },
    });
  }

  /**
   * Ingests a collection of normalized submissions and contests for a user.
   */
  static async ingestBatch(
    submissions: NormalizedSubmissionData[],
    contests: { userId: string; platform: PlatformType; contest: RawPlatformContest }[] = []
  ): Promise<IngestionResult> {
    let submissionsUpserted = 0;
    let contestsUpserted = 0;

    for (const sub of submissions) {
      await this.upsertSubmission(sub);
      submissionsUpserted++;
    }

    for (const c of contests) {
      await this.upsertContest(c.userId, c.platform, c.contest);
      contestsUpserted++;
    }

    return {
      problemsUpserted: submissionsUpserted,
      submissionsUpserted,
      contestsUpserted,
    };
  }
}
