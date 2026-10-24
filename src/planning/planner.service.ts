import { ProgressContextV1 } from "@/goals/progress-context.types";
import { ProgressSignal } from "./signals.types";
import { AdaptivePlanV1, PlanTask } from "./plan.types";
import { PlanValidator } from "./plan.validator";
import { PlanOutcome } from "./evaluation/evaluation.types";
import { buildPlannerSystemPrompt, buildPlannerUserMessage } from "./prompts/planner-prompt";

export interface GeneratePlanParams {
  context: ProgressContextV1;
  signals: ProgressSignal[];
  previousPlan?: AdaptivePlanV1 | null;
  previousOutcome?: PlanOutcome | null;
}

export class DeterministicPlanner {
  /**
   * Deterministically generates a compliant AdaptivePlanV1 from signals and context.
   * Also performs deterministic adaptation when a previousPlan and previousOutcome are present.
   */
  static generatePlan(params: GeneratePlanParams): AdaptivePlanV1 {
    const { context, signals, previousPlan, previousOutcome } = params;
    const now = new Date();
    const versionNumber = (previousPlan?.versionNumber ?? 0) + 1;
    const availableHours = context.goal.availableHoursPerWeek ?? 10;

    // 1. Identify primary bottleneck from signals
    const dropoffSignal = signals.find((s) => s.type === "difficulty_dropoff");
    const underexposedTopicSignal = signals.find((s) => s.type === "underexposed_topic");
    const lowContestSignal = signals.find((s) => s.type === "low_contest_frequency");

    let bottleneckType = "difficulty_dropoff";
    let bottleneckDesc = "Performance drop-off at boundary difficulty bracket.";
    const evidenceRefs: Array<{ signalId: string; description: string; metric: string; value: string | number }> = [];

    if (dropoffSignal) {
      bottleneckType = "difficulty_dropoff";
      bottleneckDesc = dropoffSignal.evidence.description;
      evidenceRefs.push({
        signalId: dropoffSignal.id,
        description: dropoffSignal.evidence.description,
        metric: dropoffSignal.metric,
        value: dropoffSignal.value,
      });
    } else if (underexposedTopicSignal) {
      bottleneckType = "underexposed_topic";
      bottleneckDesc = underexposedTopicSignal.evidence.description;
      evidenceRefs.push({
        signalId: underexposedTopicSignal.id,
        description: underexposedTopicSignal.evidence.description,
        metric: underexposedTopicSignal.metric,
        value: underexposedTopicSignal.value,
      });
    } else {
      bottleneckType = "stagnation";
      bottleneckDesc = "Practice volume is heavily concentrated on problems below stretch difficulty.";
      evidenceRefs.push({
        signalId: "sig-default",
        description: "Practice distribution lacks targeted exposure in current target range.",
        metric: "goal_gap",
        value: context.goal.gap,
      });
    }

    // 2. Determine target difficulty and topics (incorporating adaptation if available)
    let minDiff = 1300;
    let maxDiff = 1400;
    let practiceTopic = "greedy";

    if (context.goal.targetMetric === "codeforces_rating") {
      const currentRating = context.currentState.codeforcesRating || context.goal.currentValue || 1200;
      minDiff = Math.max(800, Math.floor(currentRating / 100) * 100);
      maxDiff = minDiff + 100;
    }

    // ADAPTATION LOGIC:
    // If previous plan had high completion and positive rating change, step up difficulty!
    if (previousOutcome && previousOutcome.completionRate >= 80) {
      minDiff += 50;
      maxDiff += 50;
      practiceTopic = "binary-search"; // Rotate to next unmastered topic
    } else if (previousOutcome && previousOutcome.completionRate < 50) {
      // Reduce difficulty or volume if previous plan was too hard
      minDiff = Math.max(800, minDiff - 50);
      maxDiff = Math.max(900, maxDiff - 50);
    }

    // 3. Scale workload to available weekly hours
    const problemBudget = Math.max(3, Math.min(15, Math.floor((availableHours - 2) * 1.2)));

    // 4. Construct Tasks with "Why This?" reasons & evidence citations
    const tasks: PlanTask[] = [
      {
        id: `task-${versionNumber}-1`,
        type: "practice",
        title: `Solve ${Math.min(5, problemBudget)} Codeforces problems rated ${minDiff}–${maxDiff} in ${practiceTopic}`,
        quantity: Math.min(5, problemBudget),
        platform: "codeforces",
        difficulty: { min: minDiff, max: maxDiff },
        topics: [practiceTopic],
        reason: dropoffSignal
          ? `Your success rate at rating ${minDiff} drops significantly, and '${practiceTopic}' has limited recent exposure.`
          : `Targeted problem set designed to establish consistency at ${minDiff}-${maxDiff}.`,
        evidenceReferences: evidenceRefs.map((e) => e.signalId),
        completionMetric: `cf_${minDiff}_${practiceTopic}_solves`,
      },
      {
        id: `task-${versionNumber}-2`,
        type: "practice",
        title: `Solve ${Math.max(2, Math.floor(problemBudget / 2))} problems focusing on Two Pointers / Binary Search`,
        quantity: Math.max(2, Math.floor(problemBudget / 2)),
        platform: "codeforces",
        difficulty: { min: minDiff, max: maxDiff },
        topics: ["two-pointers", "binary-search"],
        reason: "Reinforces foundational problem patterns that appear frequently alongside current stretch difficulty.",
        evidenceReferences: [evidenceRefs[0]?.signalId ?? "sig-default"],
        completionMetric: "cf_two_pointers_binary_search_solves",
      },
    ];

    if (context.goal.category === "competitive_programming" || context.goal.targetMetric.includes("rating")) {
      tasks.push({
        id: `task-${versionNumber}-3`,
        type: "contest",
        title: "Participate in 1 official rated Codeforces contest",
        quantity: 1,
        platform: "codeforces",
        reason: lowContestSignal
          ? "You have only 1 or fewer rated contests in the last 30 days. Rating movement requires contest participation."
          : "Regular contest practice evaluates progress under real-time constraints.",
        evidenceReferences: [lowContestSignal?.id ?? evidenceRefs[0]?.signalId ?? "sig-default"],
        completionMetric: "cf_rated_contests",
      });
    }

    const plan: AdaptivePlanV1 = {
      schemaVersion: "1.0.0",
      generatedAt: now.toISOString(),
      goalId: context.goal.id,
      versionNumber,
      assessment: {
        summary: previousOutcome
          ? `Adapted plan v${versionNumber}: ${previousOutcome.adaptationGuidance}`
          : `Initial baseline plan addressing key bottleneck in ${bottleneckType}.`,
        confidence: evidenceRefs.length > 0 ? "high" : "medium",
      },
      primaryBottleneck: {
        type: bottleneckType,
        description: bottleneckDesc,
        evidence: evidenceRefs,
      },
      nextMilestone: {
        description: `Achieve consistent >=60% solve rate on ${minDiff}-rated problems.`,
        successCriteria: [
          {
            criterion: `Solve at least ${Math.min(5, problemBudget)} problems rated ${minDiff}-${maxDiff}`,
            metric: `cf_${minDiff}_solves`,
            targetValue: Math.min(5, problemBudget),
          },
        ],
      },
      weeklyTargets: [
        {
          area: `${practiceTopic.toUpperCase()} & ${minDiff} Difficulty`,
          targetDescription: `Targeted practice on ${minDiff}-${maxDiff} problems within available ${availableHours} weekly hours.`,
          expectedEffortHours: Math.min(availableHours, 8),
        },
      ],
      tasks,
      reviewPolicy: {
        reviewAfterDays: 7,
        reviewAfterEvents: 2,
      },
    };

    const validation = PlanValidator.validate(plan);
    if (!validation.success) {
      throw new Error(`Generated plan failed validation: ${validation.errors?.join(", ")}`);
    }

    return plan;
  }
}

export class PlannerService {
  /**
   * Generates or adapts an AdaptivePlanV1 using LLM reasoning (when API key is present)
   * or the DeterministicPlanner fallback.
   */
  static async generatePlan(params: GeneratePlanParams): Promise<AdaptivePlanV1> {
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Deterministic reasoning engine
      return DeterministicPlanner.generatePlan(params);
    }

    try {
      // Attempt LLM structured generation
      const systemPrompt = buildPlannerSystemPrompt();
      const userMessage = buildPlannerUserMessage(params);

      let rawOutput = "";

      if (process.env.GEMINI_API_KEY) {
        // Google Gemini API call
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                { role: "user", parts: [{ text: `${systemPrompt}\n\nContext:\n${userMessage}` }] },
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Gemini API returned status ${response.status}`);
        }

        const data = await response.json();
        rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      } else if (process.env.OPENAI_API_KEY) {
        // OpenAI API call
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userMessage },
            ],
            temperature: 0.2,
          }),
        });

        if (!response.ok) {
          throw new Error(`OpenAI API returned status ${response.status}`);
        }

        const data = await response.json();
        rawOutput = data.choices?.[0]?.message?.content ?? "";
      }

      const parsed = JSON.parse(rawOutput);
      const validation = PlanValidator.validate(parsed);

      if (validation.success && validation.data) {
        return validation.data;
      }

      console.warn("LLM output failed validation, falling back to DeterministicPlanner:", validation.errors);
      return DeterministicPlanner.generatePlan(params);
    } catch (err) {
      console.warn("LLM API call failed, safely falling back to DeterministicPlanner:", err);
      return DeterministicPlanner.generatePlan(params);
    }
  }
}
