import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { ProgressContextService } from "@/goals/progress-context.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = await getActiveUserId(req);
    const progressContext = await ProgressContextService.getUserProgressContext(
      userId,
      id
    );
    return apiSuccess(progressContext);
  } catch (err: any) {
    return handleApiError(err);
  }
}
