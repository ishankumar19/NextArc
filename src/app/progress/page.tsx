import { getActiveUserId } from "@/lib/auth";
import { AnalyticsService } from "@/analytics/analytics.service";
import { GoalService } from "@/goals/goal.service";
import Link from "next/link";
import {
  TrendingUp,
  BarChart2,
  Calendar,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { CF_BINS } from "@/analytics/difficulty.analytics";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const userId = await getActiveUserId();

  const [goals, analytics] = await Promise.all([
    GoalService.getUserGoals(userId),
    AnalyticsService.getUserAnalytics(userId),
  ]);

  const primaryGoal = goals[0];

  return (
    <main className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Detailed Progress Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic facts tracking consistency, difficulty exposure, and topic practice.
          </p>
        </div>

        {primaryGoal && (
          <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-lg text-right">
            <span className="text-[11px] text-slate-400 block uppercase font-medium">Goal Metric</span>
            <span className="text-sm font-bold text-indigo-400">
              {primaryGoal.currentValue} / {primaryGoal.targetValue} ({primaryGoal.gap > 0 ? `+${primaryGoal.gap} needed` : "Achieved"})
            </span>
          </div>
        )}
      </header>

      {/* 1. Codeforces Rating Trajectory */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Codeforces Rating Trajectory
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">
              Current: <strong className="text-white">{analytics.contests.currentRating}</strong>
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Peak: <strong className="text-indigo-400">{analytics.contests.maxRating}</strong>
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Contests: <strong className="text-white">{analytics.contests.totalContests}</strong>
            </span>
          </div>
        </div>

        {analytics.contests.recentContests.length === 0 ? (
          <div className="text-sm text-slate-500 py-6 text-center">
            No rated contest history recorded yet. Contests will appear here as you compete.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-medium">
                  <th className="py-2.5 px-3">Contest</th>
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Rating Change</th>
                  <th className="py-2.5 px-3">New Rating</th>
                  <th className="py-2.5 px-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {analytics.contests.recentContests.map((c) => (
                  <tr key={c.contestId} className="hover:bg-slate-950/40 transition">
                    <td className="py-2.5 px-3 font-medium text-white">{c.contestName}</td>
                    <td className="py-2.5 px-3 text-slate-300">#{c.rank}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`font-semibold ${
                          c.ratingChange >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {c.ratingChange >= 0 ? `+${c.ratingChange}` : c.ratingChange}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-white">{c.newRating}</td>
                    <td className="py-2.5 px-3 text-slate-400 text-right">
                      {new Date(c.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 2. Practice Volume & Consistency */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>7-Day Volume</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-bold text-white">
              {analytics.activity.last7Days.problemsSolved}
              <span className="text-xs font-normal text-slate-400 ml-1">solved</span>
            </div>
            <div className="text-xs text-slate-400">
              {analytics.activity.last7Days.submissions} submissions
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Active on {analytics.activity.last7Days.activeDays} of 7 days
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase">
            <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>30-Day Consistency</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-bold text-white">
              {analytics.activity.last30Days.problemsSolved}
              <span className="text-xs font-normal text-slate-400 ml-1">solved</span>
            </div>
            <div className="text-xs text-slate-400">
              {analytics.activity.last30Days.submissions} submissions
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Active on {analytics.activity.last30Days.activeDays} of 30 days
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Current Streak</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-400">
              {analytics.activity.currentStreak}
              <span className="text-xs font-normal text-slate-400 ml-1">consecutive days</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Total active practice days: {analytics.activity.totalActiveDays}
          </div>
        </div>
      </section>

      {/* 3. Separate Difficulty Distributions: Codeforces vs LeetCode */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Codeforces Difficulty Bins */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Codeforces Difficulty
              </h2>
            </div>
            <span className="text-xs text-slate-500">Native Rating Bins</span>
          </div>

          <div className="space-y-3">
            {CF_BINS.map((bin) => {
              const stat = analytics.difficulty.codeforces[bin];
              const att = stat?.attempted ?? 0;
              const sol = stat?.solved ?? 0;
              const rate = stat?.acceptanceRate ?? 0;

              return (
                <div key={bin} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-white">{bin}</span>
                    <span className="text-slate-400 font-mono">
                      {sol} / {att} ({rate}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, rate)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* LeetCode Difficulty Tiers */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                LeetCode Difficulty
              </h2>
            </div>
            <span className="text-xs text-slate-500">Categorical Tiers</span>
          </div>

          <div className="space-y-5 pt-2">
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
                <div key={tier} className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{tier}</span>
                    <span className="text-xs font-mono font-semibold text-slate-300">
                      {sol} solved {att > 0 ? `(${rate}%)` : ""}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${tierColors[tier]} h-2.5 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(100, rate || 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 4. Factual Topic Mastery Table */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Canonical Topic Distribution
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Factual practice statistics across canonical algorithmic and DSA topics.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-medium">
                <th className="py-2.5 px-3">Canonical Topic</th>
                <th className="py-2.5 px-3 text-center">Attempted</th>
                <th className="py-2.5 px-3 text-center">Solved</th>
                <th className="py-2.5 px-3 text-center">Success Rate</th>
                <th className="py-2.5 px-3 text-right">Recent (30d)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {Object.values(analytics.topics).map((t) => (
                <tr key={t.topic} className="hover:bg-slate-950/40 transition">
                  <td className="py-2.5 px-3 font-semibold text-white capitalize">
                    {t.topic.replace("-", " ")}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-300">
                    {t.attempted}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-white font-bold">
                    {t.solved}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        t.attempted === 0
                          ? "text-slate-500"
                          : t.acceptanceRate >= 60
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {t.attempted > 0 ? `${t.acceptanceRate}%` : "—"}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-400">
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
