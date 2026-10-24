import { getActiveUserId } from "@/lib/auth";
import { DifficultyAnalytics } from "@/analytics/difficulty.analytics";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET() {
  try {
    const userId = await getActiveUserId();
    const stats = await DifficultyAnalytics.computeDifficultyStats(userId);
    return apiSuccess(stats);
  } catch (err: any) {
    return apiError(err?.message || "Failed to load difficulty analytics", 500);
  }
}
