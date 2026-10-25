import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { PlanRepository } from "@/planning/plan.repository";
import { TaskEvidenceMatcher } from "@/planning/matching/task-matcher";
import { apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const userId = await getCurrentUserId(req);
    const activeGoal = await GoalService.getActiveGoal(userId);

    if (!activeGoal) {
      return apiSuccess({ plan: null, goal: null, message: "No active goal found" });
    }

    // Refresh matching against latest activity for authenticated user's goal
    await TaskEvidenceMatcher.matchTasksForGoal(activeGoal.id);

    const plan = await PlanRepository.getActivePlan(activeGoal.id);

    return apiSuccess({
      plan,
      goal: activeGoal,
    });
  } catch (err: any) {
    return handleApiError(err);
  }
}
