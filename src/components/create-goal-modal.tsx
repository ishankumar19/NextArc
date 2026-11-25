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
        className="flex items-center gap-2 bg-[#176B5B] hover:bg-[#115246] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition shadow-sm shadow-[#176B5B]/20 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Declare Skill Target Goal</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl max-w-md w-full p-7 sm:p-8 shadow-elevated relative space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBEFEA]">
              <div className="flex items-center gap-2.5">
                <Target className="w-5 h-5 text-[#176B5B]" />
                <h3 className="text-base font-bold text-[#172923] tracking-tight">Declare Skill Horizon Goal</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8E9F97] hover:text-[#172923] transition cursor-pointer p-1.5 rounded-lg hover:bg-[#F0F4F1]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-[#FDF2F2] border border-[#F5C6C6] text-[#9C3939] text-xs leading-relaxed">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#172923] block">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#172923] placeholder-[#8E9F97] focus:outline-none focus:border-[#176B5B] font-sans"
                  placeholder="e.g. Reach Codeforces Specialist (1400)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#172923] block">
                    Domain Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#172923] focus:outline-none focus:border-[#176B5B] font-sans"
                  >
                    <option value="competitive_programming">Competitive Programming</option>
                    <option value="dsa">DSA & LeetCode</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#172923] block">
                    Target Metric
                  </label>
                  <select
                    value={targetMetric}
                    onChange={(e) => setTargetMetric(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#172923] focus:outline-none focus:border-[#176B5B] font-mono"
                  >
                    <option value="codeforces_rating">Codeforces Rating</option>
                    <option value="leetcode_solved_medium">LeetCode Mediums</option>
                    <option value="leetcode_solved_total">LeetCode Total Solved</option>
                    <option value="leetcode_solved_hard">LeetCode Hard Solved</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#172923] block">
                    Target Value
                  </label>
                  <input
                    type="number"
                    required
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#172923] placeholder-[#8E9F97] focus:outline-none focus:border-[#176B5B] font-mono"
                    placeholder="1400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#172923] block">
                    Target Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#172923] focus:outline-none focus:border-[#176B5B] font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#172923] block">
                  Available Practice Hours / Week
                </label>
                <input
                  type="number"
                  value={availableHours}
                  onChange={(e) => setAvailableHours(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#172923] placeholder-[#8E9F97] focus:outline-none focus:border-[#176B5B] font-mono"
                  placeholder="10"
                />
                <p className="text-xs text-[#52665D] leading-relaxed pt-0.5">
                  Used by the planning engine to constrain weekly problem workloads.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EBEFEA]">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#52665D] hover:text-[#172923] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#176B5B] hover:bg-[#115246] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm shadow-[#176B5B]/20"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
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
