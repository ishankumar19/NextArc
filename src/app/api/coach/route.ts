import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { GoalCoachService } from "@/planning/coach/coach.service";
import { assertGoalOwnership } from "@/lib/authorization";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId(req);
    const body = await req.json().catch(() => ({}));
    const question = body.question;
    let goalId = body.goalId;

    if (!question || typeof question !== "string" || !question.trim()) {
      return apiError("Question is required.", 400, "MISSING_QUESTION");
    }

    if (question.length > 500) {
      return apiError("Question cannot exceed 500 characters.", 400, "QUESTION_TOO_LONG");
    }

    if (!goalId) {
      const activeGoal = await GoalService.getActiveGoal(userId);
      if (!activeGoal) {
        return apiError("No active goal found.", 400, "NO_ACTIVE_GOAL");
      }
      goalId = activeGoal.id;
    } else {
      await assertGoalOwnership(goalId, userId);
    }

    const answer = await GoalCoachService.askCoach(userId, goalId, question.trim());

    return apiSuccess({
      answer,
    });
  } catch (err: any) {
    return handleApiError(err);
  }
}
