import prisma from "@/lib/prisma";
import { appCache, singleFlight } from "@/lib/cache";

export class PlatformService {
  /**
   * Fetches user's platform connections with 30s single-flight caching
   * to eliminate latency during dashboard and platform tab switching.
   */
  static async getUserConnections(userId: string) {
    const cacheKey = `platforms:${userId}`;
    const cached = await appCache.getAsync<any[]>(cacheKey);
    if (cached) return cached;

    return singleFlight(cacheKey, async () => {
      const doubleCheck = await appCache.getAsync<any[]>(cacheKey);
      if (doubleCheck) return doubleCheck;

      const connections = await prisma.platformConnection.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" },
      });

      await appCache.setAsync(cacheKey, connections, 30 * 1000);
      return connections;
    });
  }

  /**
   * Invalidates cached platform connections for a user.
   */
  static invalidateUserConnections(userId: string) {
    appCache.delete(`platforms:${userId}`);
    appCache.deleteAsync(`platforms:${userId}`).catch(() => {});
  }
}
