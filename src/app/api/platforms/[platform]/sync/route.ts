import { NextRequest, NextResponse } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { SyncService } from "@/sync/sync.service";
import { PlatformType } from "@/core/types";
import { isPlatformSupported } from "@/platforms/platform.registry";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-response";
import { applyRateLimit, SYNC_RATE_LIMIT } from "@/lib/rate-limit";
import { acquireDistributedSyncLock, releaseDistributedSyncLock } from "@/lib/sync-lock";
import { enqueueSyncJob, getSyncJobStatus } from "@/lib/sync-queue";
import { appCache } from "@/lib/cache";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ platform: string }> }
) {
  const limited = applyRateLimit(req, SYNC_RATE_LIMIT);
  if (limited) return limited;

  try {
    const { platform } = await context.params;
    const userId = await getActiveUserId(req);

    if (!isPlatformSupported(platform)) {
      return apiError(`Unsupported platform '${platform}'`, 400, "INVALID_PLATFORM");
    }

    const isAsync = req.nextUrl?.searchParams?.get("async") === "true";

    // 1. Asynchronous Background Queue Mode
    if (isAsync) {
      const queueResult = await enqueueSyncJob(userId, platform as PlatformType);
      return NextResponse.json(
        {
          success: true,
          data: {
            jobId: queueResult.jobId,
            status: queueResult.status,
            message: queueResult.queued ? "Sync job queued" : "Sync already active in queue",
          },
        },
        { status: 202 }
      );
    }

    // 2. Synchronous Mode with Distributed Lease Coordination
    const lock = await acquireDistributedSyncLock(userId, platform);
    if (!lock.acquired) {
      return NextResponse.json(
        { success: true, message: "Sync already in progress" },
        { status: 202 }
      );
    }

    try {
      const result = await SyncService.syncPlatform(userId, platform as PlatformType);

      if (!result.success) {
        return apiError(result.error || "Sync failed", 502, "SYNC_FAILED");
      }

      // Invalidate distributed user cache
      appCache.invalidateUser(userId);

      return apiSuccess(result);
    } finally {
      await releaseDistributedSyncLock(userId, platform, lock.token);
    }
  } catch (err: any) {
    return handleApiError(err);
  }
}

/**
 * Polls status for asynchronous background sync jobs.
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ platform: string }> }
) {
  try {
    const userId = await getActiveUserId(req);
    const jobId = req.nextUrl.searchParams.get("jobId");

    if (!jobId) {
      return apiError("Missing 'jobId' query parameter.", 400, "VALIDATION_ERROR");
    }

    // Security check: ensure job belongs to the authenticated user
    if (!jobId.startsWith(`sync:${userId}:`)) {
      return apiError("Job not found.", 404, "NOT_FOUND");
    }

    const jobStatus = await getSyncJobStatus(jobId);
    return apiSuccess(jobStatus);
  } catch (err: any) {
    return handleApiError(err);
  }
}
