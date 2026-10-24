"use client";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateGoalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [title, setTitle] = useState("Become Codeforces Specialist");
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
        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition shadow-md shadow-indigo-600/20"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Create Goal</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create Practice Goal</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Become Codeforces Specialist"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="competitive_programming">Competitive Programming</option>
                    <option value="dsa">DSA & LeetCode</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Target Metric
                  </label>
                  <select
                    value={targetMetric}
                    onChange={(e) => setTargetMetric(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="codeforces_rating">Codeforces Rating</option>
                    <option value="leetcode_solved_medium">LeetCode Mediums</option>
                    <option value="leetcode_solved_total">LeetCode Total Solved</option>
                    <option value="leetcode_solved_hard">LeetCode Hard Solved</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Target Value
                  </label>
                  <input
                    type="number"
                    required
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="1400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Target Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Available Hours Per Week (Optional)
                </label>
                <input
                  type="number"
                  value={availableHours}
                  onChange={(e) => setAvailableHours(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="10"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                  <span>Save Goal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
