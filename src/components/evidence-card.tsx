import { SupportingEvidenceResult } from "@/goals/evidence.service";
import { Zap, CheckCircle2, Trophy, TrendingUp, Calendar } from "lucide-react";

interface EvidenceCardProps {
  evidence: SupportingEvidenceResult;
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            This Week's Evidence
          </h2>
        </div>
        <span className="text-xs text-slate-400">
          Is your current practice moving you toward your goal?
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
        {/* Target Range Problems */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Target-Range Solved</span>
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {evidence.targetRangeProblemsSolvedThisWeek}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Zone: <strong className="text-slate-400">{evidence.targetRangeLabel}</strong>
          </div>
        </div>

        {/* Active Practice Days */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Days</span>
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {evidence.activeDaysThisWeek} <span className="text-sm font-normal text-slate-500">/ 7</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Consistency this week
          </div>
        </div>

        {/* Contests Attended */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Contests Attended</span>
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {evidence.contestsThisMonth}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Recent competitive exposure
          </div>
        </div>

        {/* Net Rating Movement */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Rating Movement</span>
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {evidence.netRatingMovementRecent >= 0
              ? `+${evidence.netRatingMovementRecent}`
              : evidence.netRatingMovementRecent}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Net delta from contests
          </div>
        </div>
      </div>
    </section>
  );
}
