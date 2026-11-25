import { resolveSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AnalyticsService } from "@/analytics/analytics.service";
import { GoalService } from "@/goals/goal.service";
import { RatingTrajectoryChart } from "@/components/rating-trajectory-chart";
import { ActivityHeatmap } from "@/components/activity-heatmap";
import Link from "next/link";
import {
  TrendingUp,
  BarChart2,
  Calendar,
  Layers,
  ArrowLeft,
  Flame,
  Award,
  Zap,
} from "lucide-react";
import { CF_BINS } from "@/analytics/difficulty.analytics";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const session = await resolveSession();
  if (!session) {
    redirect("/login");
  }
  const userId = session.userId;

  const [goals, analytics] = await Promise.all([
    GoalService.getUserGoals(userId).catch(() => []),
    AnalyticsService.getUserAnalytics(userId),
  ]);

  const primaryGoal = goals[0];

  return (
    <main className="space-y-10 sm:space-y-12 animate-in fade-in duration-200">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-white/[0.08]">
        <div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition mb-2.5 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Skill &amp; Progress Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
            Deterministic telemetry measuring consistency, rating trajectory, difficulty ceiling, and topic mastery.
          </p>
        </div>

        {primaryGoal && (
          <div className="bg-[#0C1017] border border-white/[0.08] px-5 py-3 rounded-xl text-right shadow-subtle shrink-0">
            <span className="text-xs font-mono text-slate-400 block uppercase font-semibold">Active Goal Focus</span>
            <span className="text-base font-bold font-mono text-indigo-400">
              {primaryGoal.currentValue} / {primaryGoal.targetValue}{" "}
              <span className="text-xs font-normal text-amber-300">
                ({primaryGoal.gap > 0 ? `+${primaryGoal.gap} needed` : "Achieved"})
              </span>
            </span>
          </div>
        )}
      </header>

      {/* 1. Practice Volume & Consistency Metric Banners */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
        <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-subtle space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="font-mono uppercase text-xs tracking-wider text-slate-200 font-semibold">
              7-Day Volume
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              {analytics.activity.last7Days.problemsSolved}
              <span className="text-xs font-normal text-slate-500 font-sans ml-2">solved</span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {analytics.activity.last7Days.submissions} subs
            </div>
          </div>
          <div className="text-xs text-slate-400 pt-1">
            Active on {analytics.activity.last7Days.activeDays} of 7 days
          </div>
        </div>

        <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-subtle space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <BarChart2 className="w-4 h-4 text-indigo-400" />
            <span className="font-mono uppercase text-xs tracking-wider text-slate-200 font-semibold">
              30-Day Consistency
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              {analytics.activity.last30Days.problemsSolved}
              <span className="text-xs font-normal text-slate-500 font-sans ml-2">solved</span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {analytics.activity.last30Days.submissions} subs
            </div>
          </div>
          <div className="text-xs text-slate-400 pt-1">
            Active on {analytics.activity.last30Days.activeDays} of 30 days
          </div>
        </div>

        <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-subtle space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="font-mono uppercase text-xs tracking-wider text-slate-200 font-semibold">
              Current Streak
            </span>
          </div>
          <div className="mt-2">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400">
              {analytics.activity.currentStreak}
              <span className="text-sm font-normal text-slate-400 font-sans ml-2">consecutive days</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 pt-1">
            Total active practice days: {analytics.activity.totalActiveDays}
          </div>
        </div>
      </section>

      {/* 2. Official Codeforces Rating Trajectory */}
      <section className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 space-y-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Codeforces Rating Trajectory Curve
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono flex-wrap">
            <span className="text-slate-400">
              Current: <strong className="text-white">{analytics.contests.currentRating}</strong>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">
              Peak: <strong className="text-indigo-400">{analytics.contests.maxRating}</strong>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">
              Rated Contests: <strong className="text-white">{analytics.contests.totalContests}</strong>
            </span>
          </div>
        </div>

        <RatingTrajectoryChart
          contests={analytics.contests.recentContests}
          currentRating={analytics.contests.currentRating}
          maxRating={analytics.contests.maxRating}
        />
      </section>

      {/* 3. 16-Week Activity Heatmap */}
      <ActivityHeatmap
        dailyCounts={analytics.activity.dailyCounts}
        totalActiveDays={analytics.activity.totalActiveDays}
        currentStreak={analytics.activity.currentStreak}
        contestDates={analytics.contests.recentContests.map((c) => c.timestamp)}
      />

      {/* 4. Separate Difficulty Distributions: Codeforces vs LeetCode */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Codeforces Difficulty Bins */}
        <section className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 space-y-6 shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
                Codeforces Difficulty Drop-off Bins
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Native Rating</span>
          </div>

          <div className="space-y-4">
            {CF_BINS.map((bin) => {
              const stat = analytics.difficulty.codeforces[bin];
              const att = stat?.attempted ?? 0;
              const sol = stat?.solved ?? 0;
              const rate = stat?.acceptanceRate ?? 0;

              return (
                <div key={bin} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-slate-200">{bin}</span>
                    <span className="text-slate-400 font-mono text-xs">
                      {sol} / {att} ({rate}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#080A0F] rounded-full h-2 overflow-hidden border border-white/[0.06]">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, rate)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* LeetCode Difficulty Tiers */}
        <section className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 space-y-6 shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
                LeetCode Categorical Tiers
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Tier Distribution</span>
          </div>

          <div className="space-y-5 pt-1">
            {(["Easy", "Medium", "Hard"] as const).map((tier) => {
              const stat = analytics.difficulty.leetcode[tier];
              const att = stat?.attempted ?? 0;
              const sol = stat?.solved ?? 0;
              const rate = stat?.acceptanceRate ?? 0;

              const tierColors = {
                Easy: "bg-emerald-500",
                Medium: "bg-amber-500",
                Hard: "bg-rose-500",
              };

              return (
                <div key={tier} className="bg-[#080A0F] p-5 rounded-xl border border-white/[0.08] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white font-mono uppercase">{tier}</span>
                    <span className="text-xs font-mono font-semibold text-slate-200">
                      {sol} solved {att > 0 ? `(${rate}%)` : ""}
                    </span>
                  </div>
                  <div className="w-full bg-[#121721] rounded-full h-2 overflow-hidden">
                    <div
                      className={`${tierColors[tier]} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(100, rate || 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 5. Canonical Topic Mastery Table */}
      <section className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 space-y-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Canonical Topic Skill Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Factual practice statistics across canonical algorithmic and data structure domains.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#080A0F]">
              <tr className="border-b border-white/[0.08] text-slate-300 text-xs font-mono uppercase font-semibold">
                <th className="py-3.5 px-4 sm:px-5">Topic Domain</th>
                <th className="py-3.5 px-4 sm:px-5 text-center">Attempted</th>
                <th className="py-3.5 px-4 sm:px-5 text-center">Solved</th>
                <th className="py-3.5 px-4 sm:px-5 text-center">Accuracy</th>
                <th className="py-3.5 px-4 sm:px-5 text-right">Recent (30d)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] bg-[#0C1017]">
              {Object.values(analytics.topics).map((t) => (
                <tr key={t.topic} className="hover:bg-white/[0.03] transition">
                  <td className="py-3.5 px-4 sm:px-5 font-medium text-white capitalize font-mono text-xs">
                    {t.topic.replace(/-/g, " ")}
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-center font-mono text-slate-400 text-xs">
                    {t.attempted}
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-center font-mono text-slate-100 font-bold text-xs">
                    {t.solved}
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-center font-mono">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                        t.attempted === 0
                          ? "text-slate-500 border-transparent"
                          : t.acceptanceRate >= 60
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/25"
                      }`}
                    >
                      {t.attempted > 0 ? `${t.acceptanceRate}%` : "—"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-right font-mono text-slate-400 text-xs">
                    {t.recentSolved}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
