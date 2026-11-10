import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { ActivityFeedService } from "@/analytics/activity-feed.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const userId = await getActiveUserId(req);
    const searchParams = req.nextUrl.searchParams;
    const rawLimit = parseInt(searchParams.get("limit") || "50", 10);
    const limit = Math.min(Math.max(1, Number.isNaN(rawLimit) ? 50 : rawLimit), 100);

    const items = await ActivityFeedService.getUnifiedActivity(userId, limit);
    return apiSuccess(items);
  } catch (err: any) {
    return handleApiError(err);
  }
}
