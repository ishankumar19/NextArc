import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { SyncService } from "@/sync/sync.service";
import { PlatformType } from "@/core/types";
import { isPlatformSupported } from "@/platforms/platform.registry";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ platform: string }> }
) {
  try {
    const { platform } = await context.params;
    const userId = await getActiveUserId();

    if (!isPlatformSupported(platform)) {
      return apiError(`Unsupported platform '${platform}'`, 400, "INVALID_PLATFORM");
    }

    const result = await SyncService.syncPlatform(userId, platform as PlatformType);

    if (!result.success) {
      return apiError(result.error || "Sync failed", 502, "SYNC_FAILED");
    }

    return apiSuccess(result);
  } catch (err: any) {
    return apiError(err?.message || "Sync execution error", 500);
  }
}
