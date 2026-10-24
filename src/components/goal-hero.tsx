import { GoalProgressView } from "@/goals/goal.types";
import { format } from "date-fns";
import { ArrowRight, Calendar, Flag, Clock } from "lucide-react";

interface GoalHeroProps {
  goal: GoalProgressView;
}

export function GoalHero({ goal }: GoalHeroProps) {
  const deadlineDate = new Date(goal.deadline);
  const formattedDeadline = format(deadlineDate, "MMMM d, yyyy");

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
          <Flag className="w-3.5 h-3.5" />
          <span>Active Goal Focus</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Target Deadline: <strong className="text-slate-300">{formattedDeadline}</strong></span>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {goal.title}
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase font-medium tracking-wide">
          Category: <span className="text-slate-300">{goal.category.replace("_", " ")}</span> • Metric: <span className="text-slate-300">{goal.targetMetric}</span>
        </p>
      </div>

      {/* Dominant Honest Gap Progress - Strictly No Fake 91.7% */}
      <div className="mt-8 bg-slate-950/80 border border-slate-800/80 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Current</div>
              <div className="text-3xl font-bold text-white mt-1">
                {goal.currentValue}
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-slate-600 shrink-0 mt-3" />

            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Target</div>
              <div className="text-3xl font-bold text-indigo-400 mt-1">
                {goal.targetValue}
              </div>
            </div>
          </div>

          <div className="h-12 w-px bg-slate-800 hidden md:block"></div>

          <div className="flex items-center gap-8">
            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Gap Needed</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">
                {goal.gap > 0 ? `+${goal.gap}` : "Achieved"}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>Time Remaining</span>
              </div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">
                {goal.daysRemaining} days
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
