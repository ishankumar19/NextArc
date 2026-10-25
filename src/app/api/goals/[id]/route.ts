import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = await getActiveUserId(req);
    const goal = await GoalService.getGoalById(id, userId);

    if (!goal) {
      return apiError(`Goal with id '${id}' not found.`, 404, "NOT_FOUND");
    }

    return apiSuccess(goal);
  } catch (err: any) {
    return handleApiError(err);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = await getActiveUserId(req);
    await GoalService.deleteGoal(id, userId);
    return apiSuccess({ deleted: true });
  } catch (err: any) {
    return handleApiError(err);
  }
}
