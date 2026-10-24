import prisma from "@/lib/prisma";
import { GoalService } from "@/goals/goal.service";
import Link from "next/link";
import { Target, Flag, Layers, ShieldCheck } from "lucide-react";

export default async function HomePage() {
  // Query seeded user or fallback
  const user = await prisma.user.findFirst({
    where: { email: "demo@progress.dev" },
  });

  const goals = user ? await GoalService.getUserGoals(user.id) : [];
  const connections = user
    ? await prisma.platformConnection.findMany({
        where: { userId: user.id },
      })
    : [];

  const primaryGoal = goals[0];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <header className="border-b border-slate-800 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
              Phase 1 • Milestone 1 Foundation
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
            Goal Progression Platform
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Evidence-first, goal-adaptive progression for Competitive Programming & DSA
          </p>
        </div>
      </header>

      {/* Goal Hero Card (Step 2 Implementation) */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Target className="w-48 h-48 text-indigo-400" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
            <Flag className="w-4 h-4" />
            <span>Primary Active Goal</span>
          </div>

          {primaryGoal ? (
            <div className="mt-4 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {primaryGoal.title}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-slate-400 text-sm">
                  <span>Target Metric: <strong className="text-slate-200">{primaryGoal.targetMetric}</strong></span>
                  <span>•</span>
                  <span>Category: <strong className="text-slate-200">{primaryGoal.category}</strong></span>
                </div>
              </div>

              {/* Strict Honest Progress Display - No Fake 91.7% */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                  <div className="text-xs text-slate-400 uppercase font-medium">Current</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {primaryGoal.currentValue}
                  </div>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                  <div className="text-xs text-slate-400 uppercase font-medium">Target</div>
                  <div className="text-2xl font-bold text-indigo-400 mt-1">
                    {primaryGoal.targetValue}
                  </div>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                  <div className="text-xs text-slate-400 uppercase font-medium">Gap Needed</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">
                    {primaryGoal.gap > 0 ? `+${primaryGoal.gap}` : "Achieved"}
                  </div>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                  <div className="text-xs text-slate-400 uppercase font-medium">Days Remaining</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">
                    {primaryGoal.daysRemaining} days
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-slate-400">
              No goal seeded yet. Run database seed to initialize.
            </div>
          )}
        </div>
      </section>

      {/* Connected Platforms System (Step 3 Implementation) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Connected Evidence Platforms</span>
          </div>
          <span className="text-xs text-slate-500">Generic Adapter Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((conn) => (
            <div
              key={conn.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white capitalize">{conn.platform}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    {conn.status}
                  </span>
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  @{conn.username}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Status</span>
                <span className="text-xs text-slate-300 font-medium">
                  {conn.lastSyncedAt ? "Active Link" : "Pending Sync"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
