import { resolveSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PlatformService } from "@/platforms/platform.service";
import { getPlatformQualityReport } from "@/platforms/capabilities";
import { PlatformType } from "@/core/types";
import { PlatformCard } from "@/components/platform-card";
import { ConnectPlatformModal } from "@/components/connect-platform-modal";
import Link from "next/link";
import { ArrowLeft, Layers, ShieldCheck, Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PlatformsPage() {
  const session = await resolveSession();
  if (!session) {
    redirect("/login");
  }
  const userId = session.userId;

  const connections = await PlatformService.getUserConnections(userId);

  return (
    <main className="space-y-7 animate-in fade-in duration-200">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition mb-2 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Evidence Source Integrations
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Platforms serve as raw evidence inputs for your goal. Sync updates your activity facts and feeds adaptive planning.
          </p>
        </div>

        <ConnectPlatformModal />
      </header>

      {/* Evidence Source Philosophy Callout */}
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-subtle">
        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <div className="font-semibold text-slate-200 tracking-tight">
            Evidence Source Philosophy
          </div>
          <div className="text-slate-400 leading-relaxed">
            Platforms are treated as decoupled telemetry sources, not the core product.
            Codeforces provides authoritative rating history and contest deltas, while LeetCode provides best-effort recent activity.
            Transient downtime or rate limits on one platform never corrupt or block your overall progression.
          </div>
        </div>
      </div>

      {/* Platform Cards List */}
      {connections.length === 0 ? (
        <div className="bg-[#0C1017] border border-white/[0.08] rounded-xl p-12 text-center space-y-4 shadow-subtle">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto text-slate-400">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white tracking-tight">No Evidence Platforms Connected</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Link your public Codeforces or LeetCode handle to feed verified practice telemetry toward your skill target.
            </p>
          </div>
          <div className="pt-2">
            <ConnectPlatformModal />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {connections.map((conn) => {
            const p = conn.platform as PlatformType;
            const qualityReport = getPlatformQualityReport(p);

            return (
              <PlatformCard
                key={conn.id}
                platform={conn.platform}
                username={conn.username}
                status={conn.status}
                lastError={conn.lastError}
                lastSyncedAt={conn.lastSyncedAt ? conn.lastSyncedAt.toISOString() : null}
                qualityReport={qualityReport}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
