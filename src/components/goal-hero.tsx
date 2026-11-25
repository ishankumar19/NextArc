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
    <section className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 lg:p-10 shadow-card relative overflow-hidden">
      {/* Top Meta Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold">
            Primary Target Focus
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400 font-medium capitalize">
            {goal.category.replace(/_/g, " ")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span>Target Deadline:</span>
          <strong className="text-slate-200 font-medium">{formattedDeadline}</strong>
        </div>
      </div>

      {/* Main Title & Target Specification */}
      <div className="mt-7 space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          {goal.title}
        </h1>
        <div className="flex items-center gap-2.5 pt-1 text-xs text-slate-400 flex-wrap">
          <span className="text-slate-400">Target Metric:</span>
          <span className="font-mono text-xs text-slate-200 bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/[0.08] font-medium">
            {goal.targetMetric}
          </span>
          {goal.availableHoursPerWeek && (
            <>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">
                Pace Commitment: <strong className="text-slate-200 font-medium">{goal.availableHoursPerWeek} hrs/week</strong>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Honest Gap Progression Card (Strictly No Artificial Percentages) */}
      <div className="mt-8 bg-[#080A0F] border border-white/[0.08] rounded-xl p-6 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-start">
          {/* Current Level */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Current Rating
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white tracking-tight">
                {goal.currentValue}
              </span>
              <span className="text-xs text-slate-400 font-mono font-medium">
                {isCodeforces ? "CF" : isLeetcode ? "LC" : "pts"}
              </span>
            </div>
            <div className="text-xs text-slate-500 leading-normal">
              Verified from connected platforms
            </div>
          </div>

          {/* Target Level */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Goal Target
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-indigo-400 tracking-tight">
                {goal.targetValue}
              </span>
              <span className="text-xs text-indigo-400/80 font-mono font-medium">
                {isCodeforces ? "CF" : isLeetcode ? "LC" : "pts"}
              </span>
            </div>
            <div className="text-xs text-slate-500 leading-normal">
              Target completion milestone
            </div>
          </div>

          {/* Honest Gap Required */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Honest Gap
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono tracking-tight">
                {goal.gap > 0 ? (
                  <span className="text-amber-400">+{goal.gap}</span>
                ) : (
                  <span className="text-emerald-400">Achieved</span>
                )}
              </div>
            </div>
            <div className="text-xs text-slate-500 leading-normal">
              {goal.gap > 0 ? (
                <span>{pacePerDay ? `~${pacePerDay} pts/day required` : "Points needed"}</span>
              ) : (
                "Goal achieved"
              )}
            </div>
          </div>

          {/* Time Remaining */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Time Remaining</span>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-slate-200 tracking-tight">
                {goal.daysRemaining}{" "}
                <span className="text-sm font-normal text-slate-400 font-sans">days</span>
              </div>
            </div>
            <div className="text-xs text-slate-500 leading-normal">
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
