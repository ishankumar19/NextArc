import { getActiveUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getPlatformQualityReport } from "@/platforms/capabilities";
import { PlatformType } from "@/core/types";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET() {
  try {
    const userId = await getActiveUserId();
    const connections = await prisma.platformConnection.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    const enriched = connections.map((conn) => {
      const p = conn.platform as PlatformType;
      const report = getPlatformQualityReport(p);
      let parsedProfile: any = null;
      if (conn.profileData) {
        try {
          parsedProfile = JSON.parse(conn.profileData);
        } catch {}
      }

      return {
        id: conn.id,
        platform: conn.platform,
        username: conn.username,
        status: conn.status,
        lastError: conn.lastError,
        lastSyncedAt: conn.lastSyncedAt,
        profile: parsedProfile,
        qualityReport: report,
      };
    });

    return apiSuccess(enriched);
  } catch (err: any) {
    return apiError(err?.message || "Failed to retrieve platforms", 500);
  }
}
