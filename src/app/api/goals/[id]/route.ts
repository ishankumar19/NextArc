import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = await getActiveUserId();
    const goal = await GoalService.getGoalById(id, userId);

    if (!goal) {
      return apiError(`Goal with id '${id}' not found.`, 404, "NOT_FOUND");
    }

    return apiSuccess(goal);
  } catch (err: any) {
    return apiError(err?.message || "Failed to retrieve goal", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = await getActiveUserId();
    await GoalService.deleteGoal(id, userId);
    return apiSuccess({ deleted: true });
  } catch (err: any) {
    return apiError(err?.message || "Failed to delete goal", 400);
  }
}
