"use client";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
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
        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition shadow-md shadow-indigo-600/20"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>+ Connect Platform</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Connect Platform</h3>
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
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="codeforces">Codeforces (Authoritative)</option>
                  <option value="leetcode">LeetCode (Best-effort)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Username / Handle
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder={platform === "codeforces" ? "e.g. tourist" : "e.g. neetcode"}
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Must be a valid, public account. It will be verified before connecting.
                </p>
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
                  disabled={loading || !username.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                  <span>Verify & Connect</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
