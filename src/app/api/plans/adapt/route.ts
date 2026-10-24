import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { ProgressContextService } from "@/goals/progress-context.service";
import { SignalEngine } from "@/planning/signals/signal.engine";
import { PlanEvaluator } from "@/planning/evaluation/plan-evaluator";
import { PlannerService } from "@/planning/planner.service";
import { PlanRepository } from "@/planning/plan.repository";
import { AdaptivePlanV1 } from "@/planning/plan.types";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json().catch(() => ({}));
    let goalId = body.goalId;

    if (!goalId) {
      const activeGoal = await GoalService.getActiveGoal(userId);
      if (!activeGoal) {
        return NextResponse.json({ success: false, error: "No active goal found" }, { status: 400 });
      }
      goalId = activeGoal.id;
    }

    const currentPlan = await PlanRepository.getActivePlan(goalId);
    if (!currentPlan || currentPlan.versions.length === 0) {
      return NextResponse.json({ success: false, error: "No active plan to adapt from" }, { status: 400 });
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

    return NextResponse.json({
      success: true,
      plan: updatedPlan,
      outcome,
      adaptedPlanData,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
