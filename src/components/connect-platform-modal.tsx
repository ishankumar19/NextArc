"use client";

import { useState } from "react";
import { Plus, X, Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export function ConnectPlatformModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [platform, setPlatform] = useState("codeforces");
  const [username, setUsername] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Connect Platform
      const res = await fetch("/api/platforms/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          username: username.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to connect platform");
      }

      // 2. Trigger Initial Sync
      await fetch(`/api/platforms/${platform}/sync`, { method: "POST" });

      setIsOpen(false);
      setUsername("");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to connect platform");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition shadow-sm shadow-indigo-600/30 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Connect Evidence Platform</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-[#0C1017] border border-white/[0.1] rounded-xl max-w-sm w-full p-6 shadow-elevated relative">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Connect Evidence Source</h3>
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
                  Platform Target
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                >
                  <option value="codeforces">Codeforces (Authoritative Contest & Rating Sync)</option>
                  <option value="leetcode">LeetCode (Best-Effort Recent Submissions)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300 block">
                  Handle / Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/[0.08] rounded-md px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  placeholder={platform === "codeforces" ? "e.g. tourist" : "e.g. neetcode"}
                />
                <p className="text-[11px] text-slate-500 leading-relaxed pt-0.5">
                  Account must be publicly visible. Progress will verify the handle against the official API.
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
                  disabled={loading || !username.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-md transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm shadow-indigo-600/30"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{loading ? "Verifying..." : "Verify & Connect"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
