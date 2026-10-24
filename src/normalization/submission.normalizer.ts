import { PlatformType } from "@/core/types";
import { RawPlatformSubmission } from "@/platforms/platform.types";
import { normalizeTopics } from "./topic.normalizer";
import { normalizeDifficulty } from "./difficulty.normalizer";

export interface NormalizedSubmissionData {
  userId: string;
  platform: PlatformType;
  externalSubmissionId: string;
  problemId: string;
  problemTitle: string;
  verdict: string;
  accepted: boolean;
  language?: string;
  difficulty: string;
  numericDifficulty: number | null;
  topics: string[]; // JSON-serializable canonical topic slugs
  rawTags: string[]; // JSON-serializable raw original tags
  timestamp: Date;
  contestId?: string;
  rawData?: any;
}

export function standardizeVerdict(platform: PlatformType, rawVerdict: string): {
  verdict: string;
  accepted: boolean;
} {
  const v = String(rawVerdict || "").trim().toUpperCase();

  if (v === "OK" || v === "ACCEPTED") {
    return { verdict: "ACCEPTED", accepted: true };
  }
  if (v.includes("WRONG")) {
    return { verdict: "WRONG_ANSWER", accepted: false };
  }
  if (v.includes("TIME_LIMIT") || v.includes("TIME LIMIT")) {
    return { verdict: "TIME_LIMIT_EXCEEDED", accepted: false };
  }
  if (v.includes("MEMORY_LIMIT") || v.includes("MEMORY LIMIT")) {
    return { verdict: "MEMORY_LIMIT_EXCEEDED", accepted: false };
  }
  if (v.includes("COMPIL") || v.includes("COMPILE ERROR")) {
    return { verdict: "COMPILATION_ERROR", accepted: false };
  }
  if (v.includes("RUNTIME") || v.includes("RUNTIME ERROR")) {
    return { verdict: "RUNTIME_ERROR", accepted: false };
  }

  return { verdict: v || "FAILED", accepted: false };
}

/**
 * Normalizes raw platform submissions into the canonical internal submission model.
 */
export function normalizeSubmission(
  userId: string,
  platform: PlatformType,
  raw: RawPlatformSubmission
): NormalizedSubmissionData {
  const { verdict, accepted } = standardizeVerdict(platform, raw.verdict);
  const diff = normalizeDifficulty(platform, raw.numericDifficulty ?? raw.difficulty);
  const canonicalTopics = normalizeTopics(platform, raw.rawTags || []);

  return {
    userId,
    platform,
    externalSubmissionId: String(raw.id),
    problemId: String(raw.problemId),
    problemTitle: raw.problemTitle || String(raw.problemId),
    verdict,
    accepted: raw.accepted !== undefined ? raw.accepted : accepted,
    language: raw.language,
    difficulty: diff.nativeDifficulty,
    numericDifficulty: diff.numericDifficulty,
    topics: canonicalTopics,
    rawTags: raw.rawTags || [],
    timestamp: new Date(raw.timestamp),
    contestId: raw.contestId ? String(raw.contestId) : undefined,
    rawData: raw.rawData,
  };
}
