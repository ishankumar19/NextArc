import { resolveSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PlatformService } from "@/platforms/platform.service";
import { getPlatformQualityReport } from "@/platforms/capabilities";
import { PlatformType } from "@/core/types";
import { PlatformCard } from "@/components/platform-card";
import { ConnectPlatformModal } from "@/components/connect-platform-modal";
import Link from "next/link";
import { ArrowLeft, Layers, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PlatformsPage() {
  const session = await resolveSession();
  if (!session) {
    redirect("/login");
  }
  const userId = session.userId;

  let connections: any[] = [];
  try {
    connections = await PlatformService.getUserConnections(userId);
  } catch (err) {
    console.error("[PlatformsPage] Failed to fetch user connections:", err);
  }

  return (
    <main className="space-y-10 sm:space-y-12 animate-in fade-in duration-200">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-[#E2E8E3]">
        <div>
          <Link
            href="/"
            className="text-xs text-[#52665D] hover:text-[#172923] flex items-center gap-1.5 transition mb-2.5 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172923] tracking-tight">
            Evidence Source Integrations
          </h1>
          <p className="text-xs sm:text-sm text-[#52665D] mt-1 max-w-xl leading-relaxed">
            Platforms serve as raw evidence inputs for your goal. Sync updates your activity facts and feeds adaptive planning.
          </p>
        </div>

        <ConnectPlatformModal />
      </header>

      {/* Evidence Source Philosophy Callout */}
      <div className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-6 sm:p-7 flex items-start gap-4 shadow-card">
        <div className="w-8 h-8 rounded-lg bg-[#E5F1EB] border border-[#BCE0D4] text-[#176B5B] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm space-y-1.5">
          <div className="font-semibold text-[#172923] tracking-tight text-sm sm:text-base">
            Evidence Source Philosophy
          </div>
          <div className="text-[#52665D] leading-relaxed">
            Platforms are treated as decoupled telemetry sources, not the core product.
            Codeforces provides authoritative rating history and contest deltas, while LeetCode provides best-effort recent activity.
            Transient downtime or rate limits on one platform never corrupt or block your overall progression.
          </div>
        </div>
      </div>

      {/* Platform Cards List */}
      {!connections || connections.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E2E8E3] rounded-2xl p-12 sm:p-16 text-center space-y-5 shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-[#E5F1EB] border border-[#BCE0D4] flex items-center justify-center mx-auto text-[#176B5B]">
            <Layers className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#172923] tracking-tight">No Evidence Platforms Connected</h3>
            <p className="text-xs sm:text-sm text-[#52665D] max-w-md mx-auto leading-relaxed">
              Link your public Codeforces or LeetCode handle to feed verified practice telemetry toward your skill target.
            </p>
          </div>
          <div className="pt-2">
            <ConnectPlatformModal />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {connections.map((conn) => {
            const qualityReport = getPlatformQualityReport(conn.platform);

            let syncIso: string | null = null;
            if (conn.lastSyncedAt) {
              if (typeof conn.lastSyncedAt === "string") {
                syncIso = conn.lastSyncedAt;
              } else if (conn.lastSyncedAt instanceof Date && !isNaN(conn.lastSyncedAt.getTime())) {
                syncIso = conn.lastSyncedAt.toISOString();
              } else {
                try {
                  const d = new Date(conn.lastSyncedAt);
                  if (!isNaN(d.getTime())) syncIso = d.toISOString();
                } catch {}
              }
            }

            return (
              <PlatformCard
                key={conn.id || conn.platform}
                platform={conn.platform}
                username={conn.username}
                status={conn.status || "connected"}
                lastError={conn.lastError || null}
                lastSyncedAt={syncIso}
                qualityReport={qualityReport}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
