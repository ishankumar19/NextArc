import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { TopicAnalytics } from "@/analytics/topic.analytics";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const userId = await getActiveUserId(req);
    const stats = await TopicAnalytics.computeTopicStats(userId);
    return apiSuccess(stats);
  } catch (err: any) {
    return handleApiError(err);
  }
}
