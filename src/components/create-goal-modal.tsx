"use client";

import { useState } from "react";
import { Plus, X, Loader2, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateGoalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [title, setTitle] = useState("Reach Codeforces Specialist (1400)");
  const [category, setCategory] = useState("competitive_programming");
  const [targetMetric, setTargetMetric] = useState("codeforces_rating");
  const [targetValue, setTargetValue] = useState("1400");
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 37 * 86400000).toISOString().split("T")[0]
  );
  const [availableHours, setAvailableHours] = useState("10");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          targetMetric,
          targetValue: Number(targetValue),
          deadline,
          availableHoursPerWeek: availableHours ? Number(availableHours) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to create goal");
      }

      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to create goal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm shadow-indigo-600/30 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Declare Skill Target Goal</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-[#0C1017] border border-white/[0.1] rounded-xl max-w-md w-full p-6 shadow-elevated relative">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Declare Skill Horizon Goal</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer p-1 rounded hover:bg-white/[0.04]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300 block">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
                  placeholder="e.g. Reach Codeforces Specialist (1400)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 block">
                    Domain Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#080A0F] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
                  >
                    <option value="competitive_programming">Competitive Programming</option>
                    <option value="dsa">DSA & LeetCode</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 block">
                    Target Metric
                  </label>
                  <select
                    value={targetMetric}
                    onChange={(e) => setTargetMetric(e.target.value)}
                    className="w-full bg-[#080A0F] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                  >
                    <option value="codeforces_rating">Codeforces Rating</option>
                    <option value="leetcode_solved_medium">LeetCode Mediums</option>
                    <option value="leetcode_solved_total">LeetCode Total Solved</option>
                    <option value="leetcode_solved_hard">LeetCode Hard Solved</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 block">
                    Target Value
                  </label>
                  <input
                    type="number"
                    required
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    className="w-full bg-[#080A0F] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                    placeholder="1400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 block">
                    Target Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-[#080A0F] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300 block">
                  Available Practice Hours / Week
                </label>
                <input
                  type="number"
                  value={availableHours}
                  onChange={(e) => setAvailableHours(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  placeholder="10"
                />
                <p className="text-[11px] text-slate-500">
                  Used by the planning engine to constrain weekly problem workloads.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-md transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm shadow-indigo-600/30"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Target Goal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
