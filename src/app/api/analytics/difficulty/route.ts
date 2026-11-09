import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { DifficultyAnalytics } from "@/analytics/difficulty.analytics";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { applyRateLimit, READ_RATE_LIMIT } from "@/lib/rate-limit";
import { appCache } from "@/lib/cache";

export async function GET(req: NextRequest) {
  const limited = applyRateLimit(req, READ_RATE_LIMIT);
  if (limited) return limited;

  try {
    const userId = await getActiveUserId(req);
    const key = `analytics:difficulty:${userId}`;

    const cached = appCache.get<object>(key);
    if (cached) {
      return apiSuccess(cached);
    }

    const stats = await DifficultyAnalytics.computeDifficultyStats(userId);

    // Cache for 300 seconds
    appCache.set(key, stats, 300_000);

    return apiSuccess(stats);
  } catch (err: any) {
    return handleApiError(err);
  }
}
