import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { TopicAnalytics } from "@/analytics/topic.analytics";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const userId = await getActiveUserId(req);
    const stats = await TopicAnalytics.computeTopicStats(userId);
    return apiSuccess(stats);
  } catch (err: any) {
    return apiError(err?.message || "Failed to load topic analytics", 500);
  }
}
