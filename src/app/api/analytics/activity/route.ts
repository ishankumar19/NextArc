import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { ActivityAnalytics } from "@/analytics/activity.analytics";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const userId = await getActiveUserId(req);
    const stats = await ActivityAnalytics.computeUserActivity(userId);
    return apiSuccess(stats);
  } catch (err: any) {
    return apiError(err?.message || "Failed to load activity analytics", 500);
  }
}
