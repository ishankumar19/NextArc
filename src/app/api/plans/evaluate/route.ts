import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { PlanEvaluator } from "@/planning/evaluation/plan-evaluator";
import { assertGoalOwnership } from "@/lib/authorization";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId(req);
    const body = await req.json().catch(() => ({}));
    let goalId = body.goalId;

    if (!goalId) {
      const activeGoal = await GoalService.getActiveGoal(userId);
      if (!activeGoal) {
        return apiError("No active goal found.", 400, "NO_ACTIVE_GOAL");
      }
      goalId = activeGoal.id;
    } else {
      await assertGoalOwnership(goalId, userId);
    }

    const outcome = await PlanEvaluator.evaluateGoalPlan(goalId);

    if (!outcome) {
      return apiError("No active plan to evaluate.", 404, "NOT_FOUND");
    }

    return apiSuccess({
      outcome,
    });
  } catch (err: any) {
    return handleApiError(err);
  }
}
