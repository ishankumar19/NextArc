import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { ProgressContextService } from "@/goals/progress-context.service";
import { SignalEngine } from "@/planning/signals/signal.engine";
import { PlanEvaluator } from "@/planning/evaluation/plan-evaluator";
import { PlannerService } from "@/planning/planner.service";
import { PlanRepository } from "@/planning/plan.repository";
import { AdaptivePlanV1 } from "@/planning/plan.types";
import { assertGoalOwnership } from "@/lib/authorization";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-response";
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
      await assertGoalOwnership(goalId, userId);
    }

    const currentPlan = await PlanRepository.getActivePlan(goalId);
    if (!currentPlan || currentPlan.versions.length === 0) {
      return apiError("No active plan to adapt from.", 400, "NO_ACTIVE_PLAN");
    }

    const currentVersion = currentPlan.versions[0];
    const previousPlanData: AdaptivePlanV1 = JSON.parse(currentVersion.planData);

    // 1. Evaluate current plan
    const outcome = await PlanEvaluator.evaluateGoalPlan(goalId);

    // 2. Generate updated ProgressContext & Signals
    const context = await ProgressContextService.generateContext(userId, goalId);
    const signals = SignalEngine.extractSignals(context);

    // 3. Generate Adapted Plan
    const adaptedPlanData = await PlannerService.generatePlan({
      context,
      signals,
      previousPlan: previousPlanData,
      previousOutcome: outcome,
    });

    // 4. Save Version N+1
    const updatedPlan = await PlanRepository.createAdaptedVersion(currentPlan.id, adaptedPlanData);

    // Invalidate cached goal and dashboard
    appCache.invalidateGoal(goalId, userId);

    return apiSuccess({
      plan: updatedPlan,
      signals,
      evaluation: outcome,
    });
  } catch (err: any) {
    return handleApiError(err);
  }
}
