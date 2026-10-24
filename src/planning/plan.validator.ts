import { AdaptivePlanV1, PlanTask, PlanTaskType } from "./plan.types";

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

const VALID_TASK_TYPES: PlanTaskType[] = ["practice", "contest", "upsolve", "review"];

export class PlanValidator {
  /**
   * Validates an unknown payload against the AdaptivePlanV1 schema.
   * Enforces that every task has reasons and evidence citations.
   */
  static validate(input: unknown): ValidationResult<AdaptivePlanV1> {
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
        });
      }
    }

    // 6. nextMilestone
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

    // 7. weeklyTargets
    if (!Array.isArray(obj.weeklyTargets)) {
      errors.push("weeklyTargets must be an array.");
    }

    // 8. tasks
    if (!Array.isArray(obj.tasks) || obj.tasks.length === 0) {
      errors.push("tasks must be an array with at least one task.");
    } else {
      obj.tasks.forEach((t: any, idx: number) => {
        if (!t || typeof t !== "object") {
          errors.push(`tasks[${idx}] must be an object.`);
          return;
        }

        if (typeof t.id !== "string" || !t.id.trim()) {
          errors.push(`tasks[${idx}].id must be a non-empty string.`);
        }

        if (!VALID_TASK_TYPES.includes(t.type)) {
          errors.push(
            `tasks[${idx}].type '${t.type}' is invalid. Allowed: ${VALID_TASK_TYPES.join(", ")}.`
          );
        }

        if (typeof t.title !== "string" || !t.title.trim()) {
          errors.push(`tasks[${idx}].title must be a non-empty string.`);
        }

        if (t.quantity !== undefined && (typeof t.quantity !== "number" || t.quantity <= 0)) {
          errors.push(`tasks[${idx}].quantity must be a positive number if provided.`);
        }

        // Reason ("Why this?") is mandatory
        if (typeof t.reason !== "string" || !t.reason.trim()) {
          errors.push(`tasks[${idx}].reason is required to explain why this task was assigned.`);
        }

        // Evidence references are mandatory
        if (!Array.isArray(t.evidenceReferences) || t.evidenceReferences.length === 0) {
          errors.push(`tasks[${idx}].evidenceReferences must contain at least one evidence citation.`);
        }

        if (typeof t.completionMetric !== "string" || !t.completionMetric.trim()) {
          errors.push(`tasks[${idx}].completionMetric must be a non-empty string.`);
        }
      });
    }

    // 9. reviewPolicy
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
