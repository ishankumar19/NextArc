/**
 * Dedicated Background Worker Process for Platform Synchronization
 * Runs as a separate process in production containers, isolated from Next.js web instances.
 */
import { Worker, Job } from "bullmq";
import { SYNC_QUEUE_NAME, SyncJobData } from "../src/lib/sync-queue";
import { SyncService } from "../src/sync/sync.service";
import { appCache } from "../src/lib/cache";
import prisma from "../src/lib/prisma";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

console.log("==========================================================");
console.log("       PROGRESS — BACKGROUND PLATFORM SYNC WORKER         ");
console.log("==========================================================");
console.log(`[Config] Connecting to Redis at: ${redisUrl}`);
console.log(`[Config] Listening on queue: ${SYNC_QUEUE_NAME}`);

const worker = new Worker<SyncJobData>(
  SYNC_QUEUE_NAME,
  async (job: Job<SyncJobData>) => {
    const { userId, platform } = job.data;
    console.log(`[Job ${job.id}] Started sync for user ${userId} on ${platform}`);

    await job.updateProgress(20);

    const result = await SyncService.syncPlatform(userId, platform);
    await job.updateProgress(80);

    if (result.success) {
      // Invalidate distributed user cache
      appCache.invalidateUser(userId);
      console.log(`[Job ${job.id}] Completed successfully: ${result.submissionsCount} submissions ingested.`);
    } else {
      console.warn(`[Job ${job.id}] Sync completed with upstream error: ${result.error}`);
    }

    await job.updateProgress(100);
    return result;
  },
  {
    connection: {
      url: redisUrl,
    },
    concurrency: 4, // Max 4 concurrent platform syncs per worker container
    limiter: {
      max: 10,
      duration: 1000,
    },
  }
);

worker.on("ready", () => {
  console.log(" ✓ Sync Worker is online and waiting for jobs.");
});

worker.on("failed", (job, err) => {
  console.error(` ✗ Job ${job?.id} failed:`, err.message);
});

async function shutdown() {
  console.log("\n[Shutdown] Stopping sync worker gracefully...");
  await worker.close();
  await prisma.$disconnect();
  console.log(" ✓ Sync worker terminated cleanly.");
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
