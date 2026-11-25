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
        className="flex items-center gap-2 bg-[#176B5B] hover:bg-[#115246] text-white text-xs sm:text-sm font-semibold px-4.5 py-2.5 rounded-lg transition shadow-sm shadow-[#176B5B]/20 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Connect Evidence Platform</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl max-w-md w-full p-7 sm:p-8 shadow-elevated relative space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBEFEA]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#176B5B]" />
                <h3 className="text-base font-bold text-[#172923] tracking-tight">Connect Evidence Source</h3>
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
                  Platform Target
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#172923] focus:outline-none focus:border-[#176B5B] font-sans"
                >
                  <option value="codeforces">Codeforces (Authoritative Contest & Rating Sync)</option>
                  <option value="leetcode">LeetCode (Best-Effort Recent Submissions)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#172923] block">
                  Handle / Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#172923] placeholder-[#8E9F97] focus:outline-none focus:border-[#176B5B] font-mono"
                  placeholder={platform === "codeforces" ? "e.g. tourist" : "e.g. neetcode"}
                />
                <p className="text-xs text-[#52665D] leading-relaxed pt-0.5">
                  Account must be publicly visible. Progress will verify the handle against the official API.
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
                  disabled={loading || !username.trim()}
                  className="bg-[#176B5B] hover:bg-[#115246] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm shadow-[#176B5B]/20"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
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
