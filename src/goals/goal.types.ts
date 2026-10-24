import { GoalCategory, GoalMetric, GoalStatus } from "@/core/types";

export interface CreateGoalDTO {
  userId: string;
  title: string;
  category: GoalCategory;
  targetMetric: GoalMetric;
  targetValue: number;
  initialValue?: number;
  startDate?: Date;
  deadline: Date;
  availableHoursPerWeek?: number;
}

export interface UpdateGoalDTO {
  title?: string;
  targetValue?: number;
  deadline?: Date;
  availableHoursPerWeek?: number;
  status?: GoalStatus;
}

export interface GoalProgressView {
  id: string;
  userId: string;
  title: string;
  category: string;
  targetMetric: string;
  targetValue: number;
  initialValue: number;
  currentValue: number;
  gap: number; // e.g. +116
  daysRemaining: number;
  isOverdue: boolean;
  status: string;
  startDate: string;
  deadline: string;
  availableHoursPerWeek?: number | null;
}
