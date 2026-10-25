import { AdaptivePlanV1, PlanTask, PlanTaskType } from "./plan.types";

export interface ValidationOptions {
  availableHoursPerWeek?: number;
  validSignalIds?: string[];
  signalConfidenceMap?: Record<string, "high" | "medium" | "low">;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

const VALID_TASK_TYPES: PlanTaskType[] = ["practice", "contest", "upsolve", "review"];

const VALID_PLATFORMS = ["codeforces", "leetcode", "cross_platform"];

const CANONICAL_TOPICS = new Set([
  "arrays",
  "strings",
  "two-pointers",
  "sliding-window",
  "binary-search",
  "prefix-sum",
  "greedy",
  "graphs",
  "trees",
  "dynamic-programming",
  "math",
  "implementation",
]);

const VALID_LEETCODE_TIERS = new Set(["Easy", "Medium", "Hard"]);

export class PlanValidator {
  /**
   * Validates an unknown payload against the AdaptivePlanV1 schema.
   * Deterministically enforces:
   * - Strict structural schema
   * - Difficulty constraints (min <= max, valid ranges, platform-appropriate difficulty)
   * - Canonical topic vocabulary (no invented topics)
   * - Supported platform targets
   * - Positive quantities (no zero/negative quantities)
   * - Workload budgets relative to available hours
   * - Evidence citations and traceability (no orphan references)
   * - Confidence consistency (low-confidence evidence cannot support high-confidence assessment)
   */
  static validate(input: unknown, options?: ValidationOptions): ValidationResult<AdaptivePlanV1> {
    const errors: string[] = [];

    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return { success: false, errors: ["Plan payload must be a non-null object."] };
    }

    const obj = input as Record<string, any>;

    // 1. schemaVersion
    if (obj.schemaVersion !== "1.0.0") {
      errors.push(`Invalid or missing schemaVersion: expected '1.0.0', got '${obj.schemaVersion}'.`);
    }

    // 2. goalId
    if (typeof obj.goalId !== "string" || !obj.goalId.trim()) {
      errors.push("Missing or invalid goalId.");
    }

    // 3. generatedAt
    if (typeof obj.generatedAt !== "string" || isNaN(Date.parse(obj.generatedAt))) {
      errors.push("Missing or invalid generatedAt ISO timestamp.");
    }

    // 4. assessment
    if (!obj.assessment || typeof obj.assessment !== "object") {
      errors.push("Missing assessment block.");
    } else {
      if (typeof obj.assessment.summary !== "string" || !obj.assessment.summary.trim()) {
        errors.push("assessment.summary must be a non-empty string.");
      }
      if (!["high", "medium", "low"].includes(obj.assessment.confidence)) {
        errors.push("assessment.confidence must be 'high', 'medium', or 'low'.");
      }
    }

    // 5. primaryBottleneck
    if (!obj.primaryBottleneck || typeof obj.primaryBottleneck !== "object") {
      errors.push("Missing primaryBottleneck block.");
    } else {
      if (typeof obj.primaryBottleneck.type !== "string" || !obj.primaryBottleneck.type.trim()) {
        errors.push("primaryBottleneck.type must be a non-empty string.");
      }
      if (typeof obj.primaryBottleneck.description !== "string" || !obj.primaryBottleneck.description.trim()) {
        errors.push("primaryBottleneck.description must be a non-empty string.");
      }
      if (!Array.isArray(obj.primaryBottleneck.evidence) || obj.primaryBottleneck.evidence.length === 0) {
        errors.push("primaryBottleneck.evidence must be a non-empty array of evidence references.");
      } else {
        obj.primaryBottleneck.evidence.forEach((ev: any, idx: number) => {
          if (!ev || typeof ev !== "object" || typeof ev.description !== "string" || !ev.description.trim()) {
            errors.push(`primaryBottleneck.evidence[${idx}] must contain a valid description.`);
          }
          if (options?.validSignalIds && ev.signalId) {
            if (!options.validSignalIds.includes(ev.signalId)) {
              errors.push(`primaryBottleneck.evidence[${idx}] references non-existent signal '${ev.signalId}'.`);
            }
          }
        });
      }
    }

    // 6. Confidence Consistency Check
    if (obj.assessment?.confidence === "high" && options?.signalConfidenceMap && obj.primaryBottleneck?.evidence) {
      const citedSignals: string[] = obj.primaryBottleneck.evidence
        .map((e: any) => e.signalId)
        .filter(Boolean);

      if (citedSignals.length > 0) {
        const confidences = citedSignals.map((id) => options.signalConfidenceMap![id]);
        const allLow = confidences.every((c) => c === "low");
        if (allLow) {
          errors.push("Assessment confidence cannot be 'high' when primary bottleneck relies solely on low-confidence evidence.");
        }
      }
    }

    // 7. nextMilestone
    if (!obj.nextMilestone || typeof obj.nextMilestone !== "object") {
      errors.push("Missing nextMilestone block.");
    } else {
      if (typeof obj.nextMilestone.description !== "string" || !obj.nextMilestone.description.trim()) {
        errors.push("nextMilestone.description must be a non-empty string.");
      }
      if (!Array.isArray(obj.nextMilestone.successCriteria) || obj.nextMilestone.successCriteria.length === 0) {
        errors.push("nextMilestone.successCriteria must be a non-empty array.");
      } else {
        obj.nextMilestone.successCriteria.forEach((sc: any, idx: number) => {
          if (!sc || typeof sc !== "object" || typeof sc.criterion !== "string" || !sc.criterion.trim()) {
            errors.push(`nextMilestone.successCriteria[${idx}] must have a non-empty criterion.`);
          }
          if (typeof sc.metric !== "string" || !sc.metric.trim()) {
            errors.push(`nextMilestone.successCriteria[${idx}] must have a non-empty metric.`);
          }
        });
      }
    }

    // 8. weeklyTargets
    if (!Array.isArray(obj.weeklyTargets)) {
      errors.push("weeklyTargets must be an array.");
    }

    // 9. tasks
    if (!Array.isArray(obj.tasks) || obj.tasks.length === 0) {
      errors.push("tasks must be an array with at least one task.");
    } else {
      const seenTaskIds = new Set<string>();
      let estimatedWeeklyHours = 0;

      obj.tasks.forEach((t: any, idx: number) => {
        if (!t || typeof t !== "object") {
          errors.push(`tasks[${idx}] must be an object.`);
          return;
        }

        // Unique Task IDs
        if (typeof t.id !== "string" || !t.id.trim()) {
          errors.push(`tasks[${idx}].id must be a non-empty string.`);
        } else if (seenTaskIds.has(t.id)) {
          errors.push(`tasks[${idx}].id '${t.id}' is duplicated. Task IDs must be unique.`);
        } else {
          seenTaskIds.add(t.id);
        }

        // Valid Task Types
        if (!VALID_TASK_TYPES.includes(t.type)) {
          errors.push(
            `tasks[${idx}].type '${t.type}' is invalid. Allowed: ${VALID_TASK_TYPES.join(", ")}.`
          );
        }

        if (typeof t.title !== "string" || !t.title.trim()) {
          errors.push(`tasks[${idx}].title must be a non-empty string.`);
        }

        // Platform validation
        if (t.platform !== undefined && t.platform !== null) {
          if (!VALID_PLATFORMS.includes(t.platform)) {
            errors.push(
              `tasks[${idx}].platform '${t.platform}' is unsupported. Allowed: ${VALID_PLATFORMS.join(", ")}.`
            );
          }
        }

        // Quantity validation (positive non-zero integer)
        if (t.quantity !== undefined) {
          if (typeof t.quantity !== "number" || !Number.isInteger(t.quantity) || t.quantity <= 0) {
            errors.push(`tasks[${idx}].quantity must be a positive number greater than 0.`);
          }
        }

        const taskQty = t.quantity ?? 1;
        if (t.type === "contest") {
          estimatedWeeklyHours += taskQty * 2.0; // ~2 hours per contest
        } else {
          estimatedWeeklyHours += taskQty * 0.8; // ~48 minutes per problem
        }

        // Difficulty constraints
        if (t.difficulty) {
          if (typeof t.difficulty !== "object") {
            errors.push(`tasks[${idx}].difficulty must be an object.`);
          } else {
            const { min, max, tier } = t.difficulty;

            if (min !== undefined && (typeof min !== "number" || min < 800 || min > 3500)) {
              errors.push(`tasks[${idx}].difficulty.min '${min}' is invalid. Codeforces ratings must be between 800 and 3500.`);
            }

            if (max !== undefined && (typeof max !== "number" || max < 800 || max > 3500)) {
              errors.push(`tasks[${idx}].difficulty.max '${max}' is invalid. Codeforces ratings must be between 800 and 3500.`);
            }

            if (min !== undefined && max !== undefined && min > max) {
              errors.push(`tasks[${idx}].difficulty min (${min}) cannot be greater than max (${max}).`);
            }

            // Cross-platform difficulty rule
            if (t.platform === "leetcode") {
              if (min !== undefined || max !== undefined) {
                errors.push(`tasks[${idx}]: Numeric rating difficulties cannot be assigned to LeetCode tasks. Use tier ('Easy', 'Medium', 'Hard').`);
              }
              if (tier !== undefined && !VALID_LEETCODE_TIERS.has(tier)) {
                errors.push(`tasks[${idx}].difficulty.tier '${tier}' is invalid for LeetCode. Allowed: Easy, Medium, Hard.`);
              }
            }

            if (t.platform === "codeforces" && tier !== undefined) {
              errors.push(`tasks[${idx}]: Categorical difficulty tiers ('${tier}') cannot be assigned to Codeforces tasks. Use numeric min/max rating.`);
            }
          }
        }

        // Topic validation
        if (t.topics !== undefined) {
          if (!Array.isArray(t.topics)) {
            errors.push(`tasks[${idx}].topics must be an array of canonical topic slugs.`);
          } else {
            for (const topic of t.topics) {
              if (!CANONICAL_TOPICS.has(topic)) {
                errors.push(
                  `tasks[${idx}].topics contains unknown topic '${topic}'. Only canonical topics are permitted.`
                );
              }
            }
          }
        }

        // Reason ("Why this?") is mandatory
        if (typeof t.reason !== "string" || !t.reason.trim()) {
          errors.push(`tasks[${idx}].reason is required to explain why this task was assigned.`);
        }

        // Evidence references are mandatory
        if (!Array.isArray(t.evidenceReferences) || t.evidenceReferences.length === 0) {
          errors.push(`tasks[${idx}].evidenceReferences must contain at least one evidence citation.`);
        } else if (options?.validSignalIds) {
          for (const refId of t.evidenceReferences) {
            if (!options.validSignalIds.includes(refId)) {
              errors.push(`tasks[${idx}].evidenceReferences cites non-existent signal '${refId}'.`);
            }
          }
        }

        if (typeof t.completionMetric !== "string" || !t.completionMetric.trim()) {
          errors.push(`tasks[${idx}].completionMetric must be a non-empty string.`);
        }
      });

      // Workload budget check
      if (options?.availableHoursPerWeek !== undefined) {
        const maxAllowed = options.availableHoursPerWeek * 1.5;
        if (estimatedWeeklyHours > maxAllowed) {
          errors.push(
            `Total estimated workload (${Math.round(estimatedWeeklyHours)} hours) exceeds available weekly budget (${options.availableHoursPerWeek} hours).`
          );
        }
      }
    }

    // 10. reviewPolicy
    if (!obj.reviewPolicy || typeof obj.reviewPolicy !== "object") {
      errors.push("Missing reviewPolicy block.");
    } else {
      const hasDays = typeof obj.reviewPolicy.reviewAfterDays === "number" && obj.reviewPolicy.reviewAfterDays > 0;
      const hasEvents = typeof obj.reviewPolicy.reviewAfterEvents === "number" && obj.reviewPolicy.reviewAfterEvents > 0;
      if (!hasDays && !hasEvents) {
        errors.push("reviewPolicy must specify positive reviewAfterDays or reviewAfterEvents.");
      }
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    return {
      success: true,
      data: obj as AdaptivePlanV1,
    };
  }
}
