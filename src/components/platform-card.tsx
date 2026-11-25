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

      setStatusMsg("Platform sync completed successfully.");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err?.message || "Sync failed");
    } finally {
      setSyncing(false);
    }
  }

  async function handleDisconnect() {
    if (!confirm(`Are you sure you want to disconnect ${platform}? Existing historical submissions will be preserved.`)) return;

    try {
      const res = await fetch(`/api/platforms/${platform}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to disconnect platform");
      router.refresh();
    } catch (err: any) {
      alert(err?.message || "Failed to disconnect platform");
    }
  }

  let syncTimeAgo = "Never synced";
  if (lastSyncedAt) {
    try {
      const d = new Date(lastSyncedAt);
      if (!isNaN(d.getTime())) {
        syncTimeAgo = formatDistanceToNow(d, { addSuffix: true });
      }
    } catch {
      syncTimeAgo = "Recently";
    }
  }

  const isAuthoritative = qualityReport?.reliabilityTier === "authoritative";
  const supportedMetrics = qualityReport?.supportedMetrics || [];
  const knownLimitations = qualityReport?.knownLimitations || [];

  return (
    <div className="bg-[#FFFFFF] border border-[#E2E8E3] hover:border-[#CBD5CD] rounded-2xl p-7 sm:p-8 shadow-card space-y-6 transition">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-bold text-[#172923] capitalize tracking-tight">{platform}</h3>
            <span
              className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md border ${
                status === "connected"
                  ? "bg-[#EDF7F2] text-[#145B4D] border-[#C2E5D4]"
                  : status === "syncing"
                  ? "bg-[#E5F1EB] text-[#176B5B] border-[#BCE0D4] animate-pulse"
                  : "bg-[#FDF2F2] text-[#9C3939] border-[#F5C6C6]"
              }`}
            >
              {status}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-[#52665D] font-mono">@{username}</div>
        </div>

        {/* Completeness Badge */}
        <div className="text-right shrink-0">
          <div
            className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full border ${
              isAuthoritative
                ? "bg-[#EDF7F2] text-[#145B4D] border-[#C2E5D4]"
                : "bg-[#FDF8EE] text-[#96601A] border-[#F3DCB1]"
            }`}
          >
            {isAuthoritative ? (
              <ShieldCheck className="w-3.5 h-3.5 text-[#176B5B]" />
            ) : (
              <HelpCircle className="w-3.5 h-3.5 text-[#C58A36]" />
            )}
            <span>
              {isAuthoritative ? "Authoritative Source" : "Best-Effort / Partial"}
            </span>
          </div>
          <div className="text-xs text-[#52665D] font-mono mt-1.5">
            Synced: <span className="text-[#172923] font-medium">{syncTimeAgo}</span>
          </div>
        </div>
      </div>

      {/* Non-destructive Error Banner */}
      {errorMsg && (
        <div className="bg-[#FDF8EE] border border-[#F3DCB1] rounded-xl p-4 text-xs text-[#96601A] space-y-1.5">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="w-4 h-4 text-[#C58A36] shrink-0" />
            <span className="font-mono text-xs uppercase tracking-wider">Sync Notice</span>
          </div>
          <p className="text-xs text-[#96601A] leading-relaxed">
            {platform === "leetcode"
              ? "LeetCode couldn't be refreshed right now. Showing data from your last successful sync."
              : `${platform} sync notice: ${errorMsg}. Previously synced data remains active.`}
          </p>
        </div>
      )}

      {statusMsg && (
        <div className="bg-[#EDF7F2] border border-[#C2E5D4] rounded-xl p-3.5 text-xs text-[#145B4D] flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-[#176B5B] shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Capabilities & Known Limitations */}
      <div className="bg-[#F8FAF7] border border-[#E2E8E3] rounded-xl p-5 text-xs text-[#52665D] space-y-3">
        <div className="font-mono text-xs uppercase tracking-wider font-semibold text-[#172923]">
          Data Completeness Telemetry
        </div>
        <div className="space-y-1.5 text-xs">
          <div>
            <span className="text-[#8E9F97]">Supported Metrics:</span>{" "}
            <span className="text-[#172923] font-mono">
              {supportedMetrics.slice(0, 3).join(", ")}
              {supportedMetrics.length > 3 && ", ..."}
            </span>
          </div>
          {knownLimitations.length > 0 && (
            <div className="text-[#64746C] italic text-xs leading-relaxed">
              Constraint: {knownLimitations[0]}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 bg-[#176B5B] hover:bg-[#115246] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition disabled:opacity-50 cursor-pointer shadow-sm shadow-[#176B5B]/20"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Syncing Telemetry..." : "Sync Now"}</span>
        </button>

        <button
          onClick={handleDisconnect}
          disabled={syncing}
          className="flex items-center gap-1.5 text-[#8E9F97] hover:text-[#C65D5D] hover:bg-[#FDF2F2] text-xs transition px-3 py-2 rounded-lg cursor-pointer font-medium"
        >
          <Trash2 className="w-4 h-4" />
          <span>Disconnect</span>
        </button>
      </div>
    </div>
  );
}
