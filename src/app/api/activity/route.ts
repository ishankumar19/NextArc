import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { ActivityFeedService } from "@/analytics/activity-feed.service";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const userId = await getActiveUserId();
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const items = await ActivityFeedService.getUnifiedActivity(userId, limit);
    return apiSuccess(items);
  } catch (err: any) {
    return apiError(err?.message || "Failed to load activity feed", 500);
  }
}
