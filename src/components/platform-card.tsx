"use client";

import { useState } from "react";
import { PlatformQualityReport } from "@/platforms/capabilities";
import { RefreshCw, Trash2, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

interface PlatformCardProps {
  platform: string;
  username: string;
  status: string;
  lastError: string | null;
  lastSyncedAt: string | null;
  qualityReport: PlatformQualityReport;
}

export function PlatformCard({
  platform,
  username,
  status,
  lastError,
  lastSyncedAt,
  qualityReport,
}: PlatformCardProps) {
  const [syncing, setSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(lastError);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const router = useRouter();

  async function handleSync() {
    setSyncing(true);
    setErrorMsg(null);
    setStatusMsg(null);

    try {
      const res = await fetch(`/api/platforms/${platform}/sync`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Sync failed");
      }

      setStatusMsg("Sync completed successfully.");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err?.message || "Sync failed");
    } finally {
      setSyncing(false);
    }
  }

  async function handleDisconnect() {
    if (!confirm(`Are you sure you want to disconnect ${platform}?`)) return;

    try {
      const res = await fetch(`/api/platforms/${platform}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to disconnect platform");
      router.refresh();
    } catch (err: any) {
      alert(err?.message || "Failed to disconnect platform");
    }
  }

  const syncTimeAgo = lastSyncedAt
    ? `${formatDistanceToNow(new Date(lastSyncedAt), { addSuffix: true })}`
    : "Never synced";

  const isAuthoritative = qualityReport.reliabilityTier === "authoritative";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white capitalize">{platform}</h3>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                status === "connected"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : status === "syncing"
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-pulse"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}
            >
              {status}
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">@{username}</div>
        </div>

        {/* Completeness Badge */}
        <div className="text-right">
          <div
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
              isAuthoritative
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
            }`}
          >
            {isAuthoritative ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>
              {isAuthoritative ? "Authoritative Source" : "Best-Effort / Partial"}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Last synced: <span className="text-slate-400 font-medium">{syncTimeAgo}</span>
          </div>
        </div>
      </div>

      {/* Non-destructive Error Banner */}
      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 text-xs text-rose-300 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Sync Alert</span>
          </div>
          <p className="text-[11px] text-rose-400/90 pl-5.5">
            {platform === "leetcode"
              ? "LeetCode couldn't be refreshed. Showing data from your last successful sync."
              : `${platform} sync failed: ${errorMsg}. Previously synced data remains available.`}
          </p>
        </div>
      )}

      {statusMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5 text-xs text-emerald-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Capabilities & Known Limitations */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5 text-xs text-slate-400 space-y-2">
        <div className="font-semibold text-slate-300">Data Completeness Profile</div>
        <div className="space-y-1 text-[11px]">
          <div>
            <span className="text-slate-500">Supported Metrics:</span>{" "}
            <span className="text-slate-300">
              {qualityReport.supportedMetrics.slice(0, 3).join(", ")}
              {qualityReport.supportedMetrics.length > 3 && ", ..."}
            </span>
          </div>
          {qualityReport.knownLimitations.length > 0 && (
            <div className="text-slate-500 italic">
              Note: {qualityReport.knownLimitations[0]}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Syncing..." : "Sync Now"}</span>
        </button>

        <button
          onClick={handleDisconnect}
          disabled={syncing}
          className="flex items-center gap-1 text-slate-400 hover:text-rose-400 text-xs transition px-2 py-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Disconnect</span>
        </button>
      </div>
    </div>
  );
}
