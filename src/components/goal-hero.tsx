import { GoalProgressView } from "@/goals/goal.types";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

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
    <section className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-7 sm:p-9 lg:p-10 shadow-card relative overflow-hidden">
      {/* Top Meta Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#EBEFEA]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#176B5B] animate-pulse"></span>
          <span className="text-xs font-mono uppercase tracking-wider text-[#145B4D] font-semibold">
            Primary Target Focus
          </span>
          <span className="text-[#CBD5CD]">•</span>
          <span className="text-xs text-[#52665D] font-medium capitalize">
            {goal.category.replace(/_/g, " ")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#52665D]">
          <Calendar className="w-4 h-4 text-[#8E9F97]" />
          <span>Target Deadline:</span>
          <strong className="text-[#172923] font-semibold">{formattedDeadline}</strong>
        </div>
      </div>

      {/* Main Title & Target Specification */}
      <div className="mt-7 space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172923] tracking-tight">
          {goal.title}
        </h1>
        <div className="flex items-center gap-2.5 pt-1 text-xs text-[#52665D] flex-wrap">
          <span className="text-[#52665D]">Target Metric:</span>
          <span className="font-mono text-xs text-[#172923] bg-[#F0F4F1] px-2.5 py-1 rounded-md border border-[#E2E8E3] font-medium">
            {goal.targetMetric}
          </span>
          {goal.availableHoursPerWeek && (
            <>
              <span className="text-[#CBD5CD]">•</span>
              <span className="text-[#52665D]">
                Pace Commitment: <strong className="text-[#172923] font-semibold">{goal.availableHoursPerWeek} hrs/week</strong>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Honest Gap Progression Barometer (No Artificial Percentages) */}
      <div className="mt-8 bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-6 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-start">
          {/* Current Level */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-[#52665D] font-semibold">
              Current Rating
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-[#172923] tracking-tight">
                {goal.currentValue}
              </span>
              <span className="text-xs text-[#64746C] font-mono font-medium">
                {isCodeforces ? "CF" : isLeetcode ? "LC" : "pts"}
              </span>
            </div>
            <div className="text-xs text-[#64746C] leading-normal">
              Verified from connected platforms
            </div>
          </div>

          {/* Target Level */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-[#52665D] font-semibold">
              Goal Target
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-[#176B5B] tracking-tight">
                {goal.targetValue}
              </span>
              <span className="text-xs text-[#145B4D] font-mono font-medium">
                {isCodeforces ? "CF" : isLeetcode ? "LC" : "pts"}
              </span>
            </div>
            <div className="text-xs text-[#64746C] leading-normal">
              Target milestone
            </div>
          </div>

          {/* Honest Gap Required */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-[#52665D] font-semibold">
              Honest Gap
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono tracking-tight">
                {goal.gap > 0 ? (
                  <span className="text-[#C58A36]">+{goal.gap}</span>
                ) : (
                  <span className="text-[#176B5B]">Achieved</span>
                )}
              </div>
            </div>
            <div className="text-xs text-[#64746C] leading-normal">
              {goal.gap > 0 ? (
                <span>{pacePerDay ? `~${pacePerDay} pts/day required` : "Points needed"}</span>
              ) : (
                "Goal achieved"
              )}
            </div>
          </div>

          {/* Time Remaining */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-[#52665D] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8E9F97]" />
              <span>Time Remaining</span>
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-[#172923] tracking-tight">
                {goal.daysRemaining}{" "}
                <span className="text-sm font-normal text-[#52665D] font-sans">days</span>
              </div>
            </div>
            <div className="text-xs text-[#64746C] leading-normal">
              {goal.isOverdue ? (
                <span className="text-[#C65D5D] font-semibold">Overdue window</span>
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
