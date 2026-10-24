import { getActiveUserId } from "@/lib/auth";
import { ActivityAnalytics } from "@/analytics/activity.analytics";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET() {
  try {
    const userId = await getActiveUserId();
    const stats = await ActivityAnalytics.computeUserActivity(userId);
    return apiSuccess(stats);
  } catch (err: any) {
    return apiError(err?.message || "Failed to load activity analytics", 500);
  }
}
