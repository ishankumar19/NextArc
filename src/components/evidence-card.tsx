import { SupportingEvidenceResult } from "@/goals/evidence.service";
import { CheckCircle2, Trophy, TrendingUp, Calendar, ShieldCheck } from "lucide-react";

interface EvidenceCardProps {
  evidence: SupportingEvidenceResult;
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  return (
    <section className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-7 sm:p-9 shadow-card space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EBEFEA]">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#176B5B]" />
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#172923] font-semibold">
            Weekly Evidence Snapshot
          </h2>
        </div>
        <span className="text-xs text-[#52665D]">
          Deterministic facts evaluating if practice is moving you toward your goal
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
        {/* Target Range Problems */}
        <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#52665D] font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#176B5B]" />
            <span>Target-Range Solves</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#172923] pt-1">
            {evidence.targetRangeProblemsSolvedThisWeek}
          </div>
          <div className="text-xs text-[#52665D] truncate">
            Target: <strong className="text-[#172923] font-semibold">{evidence.targetRangeLabel}</strong>
          </div>
        </div>

        {/* Active Practice Days */}
        <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#52665D] font-medium">
            <Calendar className="w-4 h-4 text-[#176B5B]" />
            <span>Consistency</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#172923] pt-1">
            {evidence.activeDaysThisWeek}{" "}
            <span className="text-sm font-normal text-[#8E9F97] font-sans">/ 7 days</span>
          </div>
          <div className="text-xs text-[#52665D]">
            Active days this week
          </div>
        </div>

        {/* Contests Attended */}
        <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#52665D] font-medium">
            <Trophy className="w-4 h-4 text-[#C58A36]" />
            <span>Contest Exposure</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#172923] pt-1">
            {evidence.contestsThisMonth}
          </div>
          <div className="text-xs text-[#52665D]">
            Rated rounds (last 30d)
          </div>
        </div>

        {/* Net Rating Movement */}
        <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#52665D] font-medium">
            <TrendingUp className="w-4 h-4 text-[#176B5B]" />
            <span>Net Rating Delta</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono pt-1">
            {evidence.netRatingMovementRecent > 0 ? (
              <span className="text-[#176B5B]">+{evidence.netRatingMovementRecent}</span>
            ) : evidence.netRatingMovementRecent < 0 ? (
              <span className="text-[#C65D5D]">{evidence.netRatingMovementRecent}</span>
            ) : (
              <span className="text-[#52665D]">0</span>
            )}
          </div>
          <div className="text-xs text-[#52665D]">
            Verified rating change
          </div>
        </div>
      </div>
    </section>
  );
}
