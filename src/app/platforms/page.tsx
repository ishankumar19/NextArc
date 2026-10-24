import { getActiveUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getPlatformQualityReport } from "@/platforms/capabilities";
import { PlatformType } from "@/core/types";
import { PlatformCard } from "@/components/platform-card";
import { ConnectPlatformModal } from "@/components/connect-platform-modal";
import Link from "next/link";
import { ArrowLeft, Layers, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PlatformsPage() {
  const userId = await getActiveUserId();

  const connections = await prisma.platformConnection.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Connected Practice Platforms
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Platforms serve as evidence sources for your goal. Sync updates your activity facts.
          </p>
        </div>

        <ConnectPlatformModal />
      </header>

      {/* Info Callout */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-semibold text-slate-200">
            Evidence Source Philosophy
          </div>
          <div className="text-slate-400">
            Platforms are treated as raw evidence inputs, not the core product.
            Codeforces provides authoritative rating history, while LeetCode provides best-effort recent activity.
            Failures on one platform never corrupt or block the other.
          </div>
        </div>
      </div>

      {/* Platform Cards List */}
      {connections.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No platforms connected</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Link your Codeforces or LeetCode handle to feed practice evidence toward your goal.
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
