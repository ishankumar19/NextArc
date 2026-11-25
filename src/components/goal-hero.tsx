import { GoalProgressView } from "@/goals/goal.types";
import { format } from "date-fns";
import { ArrowRight, Calendar, Flag, Clock, Target, TrendingUp } from "lucide-react";

interface GoalHeroProps {
  goal: GoalProgressView;
}

export function GoalHero({ goal }: GoalHeroProps) {
  const deadlineDate = new Date(goal.deadline);
  const formattedDeadline = format(deadlineDate, "MMMM d, yyyy");
  const isCodeforces = goal.targetMetric.toLowerCase().includes("codeforces");
  const isLeetcode = goal.targetMetric.toLowerCase().includes("leetcode");

  // Honest pace required (e.g. points/day or solves/week)
  const pacePerDay =
    goal.daysRemaining > 0 && goal.gap > 0
      ? (goal.gap / goal.daysRemaining).toFixed(1)
      : null;

  return (
    <section className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-6 sm:p-7 shadow-subtle relative overflow-hidden">
      {/* Top Meta Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-300 font-semibold">
            Primary Target Focus
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400 capitalize">
            {goal.category.replace(/_/g, " ")}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Deadline:</span>
          <strong className="text-slate-200 font-medium">{formattedDeadline}</strong>
        </div>
      </div>

      {/* Main Title */}
      <div className="mt-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {goal.title}
        </h1>
        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
          <span>Target Metric:</span>
          <span className="font-mono text-slate-300 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
            {goal.targetMetric}
          </span>
          {goal.availableHoursPerWeek && (
            <>
              <span className="text-slate-600">•</span>
              <span>Committed Pace: <strong className="text-slate-300">{goal.availableHoursPerWeek} hrs/week</strong></span>
            </>
          )}
        </div>
      </div>

      {/* Honest Gap Progression Card (Strictly No Artificial Percentages) */}
      <div className="mt-6 bg-[#080A0F]/80 border border-white/[0.06] rounded-lg p-5 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {/* Current Level */}
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Current Rating
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                {goal.currentValue}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {isCodeforces ? "CF" : isLeetcode ? "LC" : "pts"}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Verified from connected platforms
            </div>
          </div>

          {/* Target Level */}
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Goal Target
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-indigo-400 tracking-tight">
                {goal.targetValue}
              </span>
              <span className="text-xs text-indigo-400/70 font-mono">
                {isCodeforces ? "CF" : isLeetcode ? "LC" : "pts"}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Target completion milestone
            </div>
          </div>

          {/* Honest Gap Required */}
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Honest Gap
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
              {goal.gap > 0 ? (
                <span className="text-amber-400">+{goal.gap}</span>
              ) : (
                <span className="text-emerald-400">Achieved</span>
              )}
            </div>
            <div className="text-[11px] text-slate-500">
              {goal.gap > 0 ? (
                <span>{pacePerDay ? `~${pacePerDay} pts/day required` : "Points needed"}</span>
              ) : (
                "Goal achieved"
              )}
            </div>
          </div>

          {/* Time Remaining */}
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Time Remaining</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-200 tracking-tight">
              {goal.daysRemaining}{" "}
              <span className="text-xs font-normal text-slate-400 font-sans">days</span>
            </div>
            <div className="text-[11px] text-slate-500">
              {goal.isOverdue ? (
                <span className="text-rose-400 font-semibold">Overdue window</span>
              ) : (
                "Active planning window"
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
