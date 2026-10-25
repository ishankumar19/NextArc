import { describe, it, expect } from "vitest";
import { PlanValidator } from "@/planning/plan.validator";
import { AdaptivePlanV1 } from "@/planning/plan.types";

describe("Red-Team 2: Plan Validator Adversarial Testing", () => {
  const validBasePlan: AdaptivePlanV1 = {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    goalId: "goal-redteam",
    versionNumber: 1,
    assessment: {
      summary: "Baseline evaluation of rating bottleneck at 1300 bracket.",
      confidence: "medium",
    },
    primaryBottleneck: {
      type: "difficulty_dropoff",
      description: "Dropoff at 1300 CF bracket.",
      evidence: [
        {
          signalId: "sig-cf-1300-drop",
          description: "Success rate drops to 33% at 1300 rating.",
          metric: "codeforces_difficulty_1300",
          value: "33%",
        },
      ],
    },
    nextMilestone: {
      description: "Consistency on 1300 problems",
      successCriteria: [
        { criterion: "Solve 4 problems rated 1300-1400", metric: "cf_1300_solves", targetValue: 4 },
      ],
    },
    weeklyTargets: [
      { area: "Greedy 1300", targetDescription: "Focus on greedy patterns", expectedEffortHours: 4 },
    ],
    tasks: [
      {
        id: "task-1",
        type: "practice",
        title: "Solve 4 Codeforces problems rated 1300–1400 in Greedy",
        quantity: 4,
        platform: "codeforces",
        difficulty: { min: 1300, max: 1400 },
        topics: ["greedy"],
        reason: "1300 solve rate is currently 33% across 6 attempts.",
        evidenceReferences: ["sig-cf-1300-drop"],
        completionMetric: "cf_1300_greedy_solves",
      },
    ],
    reviewPolicy: { reviewAfterDays: 7 },
  };

  const validSignals = ["sig-cf-1300-drop", "sig-contest-freq"];

  it("passes validation on fully compliant baseline plan", () => {
    const res = PlanValidator.validate(validBasePlan, {
      availableHoursPerWeek: 10,
      validSignalIds: validSignals,
    });
    expect(res.success).toBe(true);
  });

  it("rejects task without evidence citations", () => {
    const bad = {
      ...validBasePlan,
      tasks: [{ ...validBasePlan.tasks[0], evidenceReferences: [] }],
    };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("evidenceReferences must contain at least one evidence citation"))).toBe(true);
  });

  it("rejects task citing non-existent signal reference", () => {
    const bad = {
      ...validBasePlan,
      tasks: [{ ...validBasePlan.tasks[0], evidenceReferences: ["hallucinated-sig-999"] }],
    };
    const res = PlanValidator.validate(bad, { validSignalIds: validSignals });
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("cites non-existent signal 'hallucinated-sig-999'"))).toBe(true);
  });

  it("rejects invented rating out of range (e.g. 500 or 4500)", () => {
    const bad = {
      ...validBasePlan,
      tasks: [{ ...validBasePlan.tasks[0], difficulty: { min: 500, max: 1400 } }],
    };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("ratings must be between 800 and 3500"))).toBe(true);
  });

  it("rejects invented non-canonical topic (e.g. 'quantum-computing')", () => {
    const bad = {
      ...validBasePlan,
      tasks: [{ ...validBasePlan.tasks[0], topics: ["quantum-computing"] }],
    };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("unknown topic 'quantum-computing'"))).toBe(true);
  });

  it("rejects unsupported platform (e.g. 'hackerrank')", () => {
    const bad = {
      ...validBasePlan,
      tasks: [{ ...validBasePlan.tasks[0], platform: "hackerrank" }],
    };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("platform 'hackerrank' is unsupported"))).toBe(true);
  });

  it("rejects numeric CF difficulty assigned to LeetCode task", () => {
    const bad = {
      ...validBasePlan,
      tasks: [
        {
          ...validBasePlan.tasks[0],
          platform: "leetcode",
          difficulty: { min: 1400, max: 1500 },
        },
      ],
    };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("Numeric rating difficulties cannot be assigned to LeetCode tasks"))).toBe(true);
  });

  it("rejects negative quantity", () => {
    const bad = {
      ...validBasePlan,
      tasks: [{ ...validBasePlan.tasks[0], quantity: -5 }],
    };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("quantity must be a positive number"))).toBe(true);
  });

  it("rejects zero quantity", () => {
    const bad = {
      ...validBasePlan,
      tasks: [{ ...validBasePlan.tasks[0], quantity: 0 }],
    };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("quantity must be a positive number"))).toBe(true);
  });

  it("rejects impossible difficulty range where min > max", () => {
    const bad = {
      ...validBasePlan,
      tasks: [{ ...validBasePlan.tasks[0], difficulty: { min: 1600, max: 1400 } }],
    };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("min (1600) cannot be greater than max (1400)"))).toBe(true);
  });

  it("rejects workload severely exceeding availableHoursPerWeek", () => {
    // 25 problems * 0.8 hrs = 20 hours, for a user with only 5 hours available
    const bad = {
      ...validBasePlan,
      tasks: [{ ...validBasePlan.tasks[0], quantity: 25 }],
    };
    const res = PlanValidator.validate(bad, { availableHoursPerWeek: 5 });
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("exceeds available weekly budget"))).toBe(true);
  });

  it("rejects duplicate task IDs within the same plan", () => {
    const bad = {
      ...validBasePlan,
      tasks: [
        { ...validBasePlan.tasks[0], id: "task-dup" },
        { ...validBasePlan.tasks[0], id: "task-dup", title: "Second task" },
      ],
    };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("Task IDs must be unique"))).toBe(true);
  });

  it("rejects plan with empty task array", () => {
    const bad = { ...validBasePlan, tasks: [] };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("tasks must be an array with at least one task"))).toBe(true);
  });

  it("rejects malformed schemaVersion", () => {
    const bad = { ...validBasePlan, schemaVersion: "invalid.version" };
    const res = PlanValidator.validate(bad);
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("schemaVersion"))).toBe(true);
  });

  it("rejects low-confidence evidence presented as high-confidence assessment", () => {
    const bad = {
      ...validBasePlan,
      assessment: { summary: "Super confident assertion", confidence: "high" as const },
      primaryBottleneck: {
        type: "difficulty_dropoff",
        description: "Dropoff based on 1 attempt",
        evidence: [{ signalId: "sig-low-conf-1", description: "Only 1 attempt", metric: "diff", value: "0%" }],
      },
      tasks: [
        {
          ...validBasePlan.tasks[0],
          evidenceReferences: ["sig-low-conf-1"],
        },
      ],
    };
    const res = PlanValidator.validate(bad, {
      validSignalIds: ["sig-low-conf-1"],
      signalConfidenceMap: { "sig-low-conf-1": "low" },
    });
    expect(res.success).toBe(false);
    expect(res.errors?.some((e) => e.includes("Assessment confidence cannot be 'high' when primary bottleneck relies solely on low-confidence evidence"))).toBe(true);
  });
});
