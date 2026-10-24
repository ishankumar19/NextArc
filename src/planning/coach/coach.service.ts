import { prisma } from "@/lib/prisma";
import { ProgressContextService } from "@/goals/progress-context.service";
import { PlanRepository } from "../plan.repository";

export class GoalCoachService {
  /**
   * Provides answers strictly constrained to the user's Goal, ProgressContext, Current Plan, and Evidence.
   */
  static async askCoach(userId: string, goalId: string, question: string): Promise<string> {
    const qLower = question.toLowerCase();

    // 1. Gather domain context
    const context = await ProgressContextService.generateContext(userId, goalId);
    const plan = await PlanRepository.getActivePlan(goalId);
    const activeVersion = plan?.versions[0];
    const latestEvaluation = plan?.evaluations[0];

    // If API key is present, invoke bounded LLM
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        const systemPrompt = `You are a strict Goal Coach assistant for a Competitive Programming & DSA progression platform.
Your ONLY role is to answer questions directly grounded in the provided user context (Goal, ProgressContext, Current Plan, and Evidence).

CRITICAL CONSTRAINTS:
1. ONLY discuss information present in the user's Goal, ProgressContext, Active Plan, and Evidence.
2. DO NOT provide general coding tutorials, generic study advice, or discuss topics outside this user's specific evidence.
3. Every answer must reference specific metrics, difficulties, topics, or plan tasks from the context.
4. Keep answers concise, factual, and encouraging.`;

        const userContextText = JSON.stringify({
          goal: context.goal,
          currentState: context.currentState,
          recentActivity: context.recentActivity,
          activePlan: activeVersion
            ? {
                summary: activeVersion.summary,
                bottleneck: activeVersion.bottleneckType,
                tasks: activeVersion.tasks.map((t: any) => ({
                  title: t.title,
                  progress: `${t.quantityCompleted}/${t.quantity}`,
                  reason: t.reason,
                })),
              }
            : null,
          latestEvaluation: latestEvaluation ? JSON.parse(latestEvaluation.outcomeData) : null,
          question,
        });

        if (process.env.GEMINI_API_KEY) {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nContext:\n${userContextText}` }] }],
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return text.trim();
          }
        }
      } catch (e) {
        console.warn("LLM Coach query failed, falling back to deterministic answers:", e);
      }
    }

    // Deterministic factual responses constrained to context
    if (qLower.includes("why") && (qLower.includes("plan") || qLower.includes("practicing") || qLower.includes("1300") || qLower.includes("greedy"))) {
      if (!activeVersion) {
        return "You currently do not have an active plan generated. Generate a plan from your dashboard to address your target bottleneck.";
      }
      return `Your current plan focuses on '${activeVersion.bottleneckType}'. Specifically, ${activeVersion.summary}. Tasks are designed with targeted difficulty and topic constraints to move you toward your goal target (${context.goal.targetMetric} = ${context.goal.targetValue}).`;
    }

    if (qLower.includes("improving") || qLower.includes("progress")) {
      const rating = context.currentState.codeforcesRating;
      const target = context.goal.targetValue;
      const solved7d = context.recentActivity.last7Days.problemsSolved;
      const contests = context.contestPerformance.totalContests;
      const ratingChange = context.contestPerformance.ratingChange30d;

      return `In the last 7 days, you solved ${solved7d} problems with an active streak of ${context.recentActivity.currentStreak} days. Your rating change over recent contests is ${ratingChange >= 0 ? `+${ratingChange}` : ratingChange} (Current: ${rating ?? "unrated"} vs Target: ${target}).`;
    }

    if (qLower.includes("reduce") || qLower.includes("workload") || qLower.includes("time")) {
      const hours = context.goal.availableHoursPerWeek ?? 10;
      return `Your current plan is sized for ${hours} hours per week. If your schedule has changed, you can update your available weekly hours in your Goal settings, and your next adapted plan will adjust problem quantities accordingly.`;
    }

    return `Based on your evidence, your primary target is ${context.goal.title} (${context.goal.targetMetric} = ${context.goal.targetValue}, gap of ${context.goal.gap}). Your active plan has ${activeVersion?.tasks.length ?? 0} tasks targeted at your primary bottleneck.`;
  }
}
