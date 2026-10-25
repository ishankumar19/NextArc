import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { DifficultyAnalytics } from "@/analytics/difficulty.analytics";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const userId = await getActiveUserId(req);
    const stats = await DifficultyAnalytics.computeDifficultyStats(userId);
    return apiSuccess(stats);
  } catch (err: any) {
    return handleApiError(err);
  }
}
