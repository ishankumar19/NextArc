import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { ProgressContextService } from "@/goals/progress-context.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { appCache, cacheKey } from "@/lib/cache";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = await getActiveUserId(req);
    const key = cacheKey.progressContext(id);

    const cached = appCache.get<object>(key);
    if (cached) {
      return apiSuccess(cached);
    }

    const progressContext = await ProgressContextService.getUserProgressContext(
      userId,
      id
    );

    // Cache for 120 seconds
    appCache.set(key, progressContext, 120_000);

    return apiSuccess(progressContext);
  } catch (err: any) {
    return handleApiError(err);
  }
}
