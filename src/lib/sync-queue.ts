import { Queue, Worker, Job } from "bullmq";
import { getRedisClient } from "./redis";
import { SyncService, SyncResult } from "@/sync/sync.service";
import { PlatformType } from "@/core/types";
import { appCache } from "./cache";

export const SYNC_QUEUE_NAME = "platform-sync-queue";

export interface SyncJobData {
  userId: string;
  platform: PlatformType;
  enqueuedAt: number;
}

// In-memory job status map for local dev / tests when Redis daemon is not active
const inMemoryJobs = new Map<
  string,
  {
    id: string;
    status: "queued" | "active" | "completed" | "failed";
    progress: number;
    result?: SyncResult;
    error?: string;
  }
>();

let bullQueue: Queue | null = null;

function getBullQueue(): Queue | null {
  const redis = getRedisClient();
  if (!redis.isClusterEnabled()) {
    // In-memory fallback
    return null;
  }

  if (!bullQueue && process.env.REDIS_URL) {
    try {
      bullQueue = new Queue(SYNC_QUEUE_NAME, {
        connection: {
          url: process.env.REDIS_URL,
        },
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 3000,
          },
          removeOnComplete: 100,
          removeOnFail: 200,
        },
      });
    } catch {
      bullQueue = null;
    }
  }

  return bullQueue;
}

/**
 * Enqueues a platform synchronization job.
 * Enforces per-(user, platform) job deduplication.
 */
export async function enqueueSyncJob(
  userId: string,
  platform: PlatformType
): Promise<{ jobId: string; status: string; queued: boolean }> {
  const jobId = `sync:${userId}:${platform}`;
  const queue = getBullQueue();

  if (queue) {
    // BullMQ persistent distributed queue
    try {
      const existingJob = await queue.getJob(jobId);
      if (existingJob) {
        const state = await existingJob.getState();
        if (state === "active" || state === "waiting" || state === "delayed") {
          return { jobId, status: state, queued: false };
        }
      }

      const job = await queue.add(
        "sync-platform",
        { userId, platform, enqueuedAt: Date.now() },
        { jobId }
      );

      return { jobId: job.id || jobId, status: "queued", queued: true };
    } catch (err) {
      console.warn("[SyncQueue] BullMQ enqueue error, falling back to in-process execution:", err);
    }
  }

  // Graceful in-process asynchronous execution (local dev / offline test mode)
  const existing = inMemoryJobs.get(jobId);
  if (existing && (existing.status === "queued" || existing.status === "active")) {
    return { jobId, status: existing.status, queued: false };
  }

  const jobRecord: {
    id: string;
    status: "queued" | "active" | "completed" | "failed";
    progress: number;
    result?: SyncResult;
    error?: string;
  } = {
    id: jobId,
    status: "queued",
    progress: 0,
  };
  inMemoryJobs.set(jobId, jobRecord);

  // Execute asynchronously
  setTimeout(async () => {
    jobRecord.status = "active";
    jobRecord.progress = 25;
    try {
      const result = await SyncService.syncPlatform(userId, platform);
      jobRecord.status = result.success ? "completed" : "failed";
      jobRecord.result = result;
      jobRecord.progress = 100;
      if (result.success) {
        appCache.invalidateUser(userId);
      }
    } catch (err: any) {
      jobRecord.status = "failed";
      jobRecord.error = err?.message || "Sync execution failed";
      jobRecord.progress = 100;
    }
  }, 10);

  return { jobId, status: "queued", queued: true };
}

/**
 * Retrieves the current status and progress of a sync job.
 */
export async function getSyncJobStatus(jobId: string): Promise<{
  id: string;
  status: "queued" | "active" | "completed" | "failed" | "not_found";
  progress?: number;
  result?: SyncResult;
  error?: string;
}> {
  const queue = getBullQueue();

  if (queue) {
    try {
      const job = await queue.getJob(jobId);
      if (job) {
        const state = await job.getState();
        const statusMap: Record<string, "queued" | "active" | "completed" | "failed"> = {
          waiting: "queued",
          delayed: "queued",
          active: "active",
          completed: "completed",
          failed: "failed",
        };
        return {
          id: jobId,
          status: statusMap[state] || "queued",
          progress: job.progress as number,
          result: job.returnvalue as SyncResult,
          error: job.failedReason,
        };
      }
    } catch {}
  }

  const local = inMemoryJobs.get(jobId);
  if (local) {
    return local;
  }

  return { id: jobId, status: "not_found" };
}
