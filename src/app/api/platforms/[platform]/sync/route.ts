import { NextRequest, NextResponse } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { SyncService } from "@/sync/sync.service";
import { PlatformType } from "@/core/types";
import { isPlatformSupported } from "@/platforms/platform.registry";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-response";
import { applyRateLimit, SYNC_RATE_LIMIT } from "@/lib/rate-limit";
import { acquireSyncLock, releaseSyncLock } from "@/lib/sync-lock";
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

    // Acquire sync lock — prevent concurrent syncs for the same user+platform
    const acquired = acquireSyncLock(userId, platform);
    if (!acquired) {
      return NextResponse.json(
        { message: "Sync already in progress" },
        { status: 202 }
      );
    }

    try {
      const result = await SyncService.syncPlatform(userId, platform as PlatformType);

      if (!result.success) {
        return apiError(result.error || "Sync failed", 502, "SYNC_FAILED");
      }

      // Invalidate user cache on new external data
      appCache.invalidateUser(userId);

      return apiSuccess(result);
    } finally {
      releaseSyncLock(userId, platform);
    }
  } catch (err: any) {
    return handleApiError(err);
  }
}
