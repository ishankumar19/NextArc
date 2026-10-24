import { getActiveUserId } from "@/lib/auth";
import { TopicAnalytics } from "@/analytics/topic.analytics";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET() {
  try {
    const userId = await getActiveUserId();
    const stats = await TopicAnalytics.computeTopicStats(userId);
    return apiSuccess(stats);
  } catch (err: any) {
    return apiError(err?.message || "Failed to load topic analytics", 500);
  }
}
