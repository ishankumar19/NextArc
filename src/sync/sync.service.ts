import prisma from "@/lib/prisma";
import { PlatformType } from "@/core/types";
import { getPlatformAdapter } from "@/platforms/platform.registry";
import { normalizeSubmission } from "@/normalization/submission.normalizer";
import { IngestionService } from "@/normalization/ingestion.service";
import { PlatformError } from "@/core/errors";

export interface SyncResult {
  platform: PlatformType;
  success: boolean;
  submissionsCount: number;
  contestsCount: number;
  error?: string;
}

export class SyncService {
  /**
   * Synchronizes activity and profile data for a specific connected platform.
   * If sync fails, previously ingested data is preserved and the connection status is set to 'error'.
   */
  static async syncPlatform(
    userId: string,
    platform: PlatformType
  ): Promise<SyncResult> {
    const connection = await prisma.platformConnection.findUnique({
      where: {
        userId_platform: {
          userId,
          platform,
        },
      },
    });

    if (!connection) {
      throw new PlatformError(
        platform,
        `No connection found for user ${userId} on platform ${platform}`,
        "CONNECTION_NOT_FOUND",
        404
      );
    }

    // Set connection status to syncing
    await prisma.platformConnection.update({
      where: { id: connection.id },
      data: { status: "syncing" },
    });

    try {
      const adapter = getPlatformAdapter(platform);

      // 1. Fetch Profile Snapshot
      const profile = await adapter.getProfile(connection.username);

      // 2. Fetch Submissions (bounded by lastSyncedAt for delta sync)
      const rawSubmissions = await adapter.getSubmissions(
        connection.username,
        connection.lastSyncedAt ?? undefined
      );

      // 3. Normalize Submissions
      const normalizedSubmissions = rawSubmissions.map((raw) =>
        normalizeSubmission(userId, platform, raw)
      );

      // 4. Fetch Contests (if platform supports contest history e.g. Codeforces)
      let rawContests: any[] = [];
      if (adapter.getContestHistory) {
        rawContests = await adapter.getContestHistory(connection.username);
      }

      // 5. Ingest into database idempotently
      const contestsToIngest = rawContests.map((c) => ({
        userId,
        platform,
        contest: c,
      }));

      const ingestionResult = await IngestionService.ingestBatch(
        normalizedSubmissions,
        contestsToIngest
      );

      // 6. Update platform connection snapshot and sync timestamp
      await prisma.platformConnection.update({
        where: { id: connection.id },
        data: {
          status: "connected",
          lastSyncedAt: new Date(),
          lastError: null,
          profileData: JSON.stringify(profile),
        },
      });

      return {
        platform,
        success: true,
        submissionsCount: ingestionResult.submissionsUpserted,
        contestsCount: ingestionResult.contestsUpserted,
      };
    } catch (err: any) {
      const errorMessage = err?.message || "Sync encountered an unexpected error.";

      // Record error state WITHOUT deleting any previous data
      await prisma.platformConnection.update({
        where: { id: connection.id },
        data: {
          status: "error",
          lastError: errorMessage,
        },
      });

      return {
        platform,
        success: false,
        submissionsCount: 0,
        contestsCount: 0,
        error: errorMessage,
      };
    }
  }

  /**
   * Synchronizes all platforms connected to a user.
   * Uses allSettled to ensure failure of one platform never blocks another.
   */
  static async syncAllPlatforms(userId: string): Promise<SyncResult[]> {
    const connections = await prisma.platformConnection.findMany({
      where: { userId },
    });

    const syncPromises = connections.map((conn) =>
      this.syncPlatform(userId, conn.platform as PlatformType)
    );

    const settled = await Promise.allSettled(syncPromises);

    return settled.map((res, index) => {
      if (res.status === "fulfilled") {
        return res.value;
      }
      return {
        platform: connections[index].platform as PlatformType,
        success: false,
        submissionsCount: 0,
        contestsCount: 0,
        error: res.reason?.message || "Platform sync failed",
      };
    });
  }
}
