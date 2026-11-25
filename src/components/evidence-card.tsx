import { SupportingEvidenceResult } from "@/goals/evidence.service";
import { CheckCircle2, Trophy, TrendingUp, Calendar, ShieldCheck } from "lucide-react";

interface EvidenceCardProps {
  evidence: SupportingEvidenceResult;
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  return (
    <section className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 shadow-subtle space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
            Weekly Evidence Snapshot
          </h2>
        </div>
        <span className="text-xs text-slate-400">
          Deterministic facts evaluating if practice is moving you toward your goal
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
        {/* Target Range Problems */}
        <div className="bg-[#080A0F] border border-white/[0.08] rounded-xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Target-Range Solves</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white pt-1">
            {evidence.targetRangeProblemsSolvedThisWeek}
          </div>
          <div className="text-xs text-slate-400 truncate">
            Target: <strong className="text-slate-200 font-medium">{evidence.targetRangeLabel}</strong>
          </div>
        </div>

        {/* Active Practice Days */}
        <div className="bg-[#080A0F] border border-white/[0.08] rounded-xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Consistency</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white pt-1">
            {evidence.activeDaysThisWeek}{" "}
            <span className="text-sm font-normal text-slate-500 font-sans">/ 7 days</span>
          </div>
          <div className="text-xs text-slate-400">
            Active days this week
          </div>
        </div>

        {/* Contests Attended */}
        <div className="bg-[#080A0F] border border-white/[0.08] rounded-xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Contest Exposure</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white pt-1">
            {evidence.contestsThisMonth}
          </div>
          <div className="text-xs text-slate-400">
            Rated rounds (last 30d)
          </div>
        </div>

        {/* Net Rating Movement */}
        <div className="bg-[#080A0F] border border-white/[0.08] rounded-xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Net Rating Delta</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono pt-1">
            {evidence.netRatingMovementRecent > 0 ? (
              <span className="text-emerald-400">+{evidence.netRatingMovementRecent}</span>
            ) : evidence.netRatingMovementRecent < 0 ? (
              <span className="text-rose-400">{evidence.netRatingMovementRecent}</span>
            ) : (
              <span className="text-slate-400">0</span>
            )}
          </div>
          <div className="text-xs text-slate-400">
            Verified rating change
          </div>
        </div>
      </div>
    </section>
  );
}
