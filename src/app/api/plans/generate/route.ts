import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { ProgressContextService } from "@/goals/progress-context.service";
import { SignalEngine } from "@/planning/signals/signal.engine";
import { PlannerService } from "@/planning/planner.service";
import { PlanRepository } from "@/planning/plan.repository";
import { assertGoalOwnership } from "@/lib/authorization";
import { apiSuccess, handleApiError, apiError } from "@/lib/api-response";
import { appCache } from "@/lib/cache";

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
      // Assert goal belongs to the authenticated user
      await assertGoalOwnership(goalId, userId);
    }

    // 1. Generate Context
    const context = await ProgressContextService.generateContext(userId, goalId);

    // 2. Extract Deterministic Signals
    const signals = SignalEngine.extractSignals(context);

    // 3. Generate Plan
    const planData = await PlannerService.generatePlan({
      context,
      signals,
    });

    // 4. Persist Plan
    const savedPlan = await PlanRepository.createPlan({
      userId,
      goalId,
      planData,
    });

    // Invalidate cached goal context and user dashboard
    appCache.invalidateGoal(goalId, userId);

    return apiSuccess({
      plan: savedPlan,
      signals,
    }, 201);
  } catch (err: any) {
    return handleApiError(err);
  }
}
