import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { GoalService } from "@/goals/goal.service";
import { GoalCoachService } from "@/planning/coach/coach.service";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json().catch(() => ({}));
    const question = body.question;
    let goalId = body.goalId;

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json({ success: false, error: "Question is required" }, { status: 400 });
    }

    if (!goalId) {
      const activeGoal = await GoalService.getActiveGoal(userId);
      if (!activeGoal) {
        return NextResponse.json({ success: false, error: "No active goal found" }, { status: 400 });
      }
      goalId = activeGoal.id;
    }

    const answer = await GoalCoachService.askCoach(userId, goalId, question.trim());

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
