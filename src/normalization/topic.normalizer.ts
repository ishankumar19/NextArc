import { PlatformType } from "@/core/types";

/**
 * Canonical topic taxonomy slugs as specified in Step 7:
 * - arrays
 * - strings
 * - two-pointers
 * - sliding-window
 * - binary-search
 * - prefix-sum
 * - greedy
 * - graphs
 * - trees
 * - dynamic-programming
 * - math
 * - implementation
 */
export const CANONICAL_TOPICS = [
  "arrays",
  "strings",
  "two-pointers",
  "sliding-window",
  "binary-search",
  "prefix-sum",
  "greedy",
  "graphs",
  "trees",
  "dynamic-programming",
  "math",
  "implementation",
] as const;

export type CanonicalTopicSlug = (typeof CANONICAL_TOPICS)[number];

// Direct mapping dictionary from lowercase normalized strings to canonical topic slugs
const CODEFORCES_TAG_MAP: Record<string, CanonicalTopicSlug> = {
  "two pointers": "two-pointers",
  "two-pointers": "two-pointers",
  "binary search": "binary-search",
  "binary-search": "binary-search",
  "greedy": "greedy",
  "dp": "dynamic-programming",
  "dynamic programming": "dynamic-programming",
  "dynamic-programming": "dynamic-programming",
  "math": "math",
  "number theory": "math",
  "combinatorics": "math",
  "probabilities": "math",
  "geometry": "math",
  "graphs": "graphs",
  "dfs and similar": "graphs",
  "shortest paths": "graphs",
  "graph matchings": "graphs",
  "flows": "graphs",
  "trees": "trees",
  "strings": "strings",
  "string suffix structures": "strings",
  "implementation": "implementation",
  "brute force": "implementation",
  "data structures": "arrays",
  "sortings": "arrays",
  "constructive algorithms": "greedy",
  "bitmasks": "math",
  "dsu": "graphs",
  "divide and conquer": "binary-search",
};

const LEETCODE_TAG_MAP: Record<string, CanonicalTopicSlug> = {
  "array": "arrays",
  "arrays": "arrays",
  "string": "strings",
  "strings": "strings",
  "string matching": "strings",
  "two pointers": "two-pointers",
  "two-pointers": "two-pointers",
  "sliding window": "sliding-window",
  "sliding-window": "sliding-window",
  "binary search": "binary-search",
  "binary-search": "binary-search",
  "prefix sum": "prefix-sum",
  "prefix-sum": "prefix-sum",
  "greedy": "greedy",
  "graph": "graphs",
  "graphs": "graphs",
  "depth-first search": "graphs",
  "breadth-first search": "graphs",
  "shortest path": "graphs",
  "union find": "graphs",
  "topological sort": "graphs",
  "tree": "trees",
  "trees": "trees",
  "binary tree": "trees",
  "binary search tree": "trees",
  "dynamic programming": "dynamic-programming",
  "dynamic-programming": "dynamic-programming",
  "math": "math",
  "number theory": "math",
  "combinatorics": "math",
  "simulation": "implementation",
  "sorting": "arrays",
  "matrix": "arrays",
  "hash table": "arrays",
  "bit manipulation": "math",
  "divide and conquer": "binary-search",
  "recursion": "dynamic-programming",
};

/**
 * Normalizes raw platform tags into canonical taxonomy slugs.
 * Also preserves clean kebab-case slugs for unmapped tags so information is never discarded.
 */
export function normalizeTopic(platform: PlatformType, rawTag: string): string {
  const cleaned = rawTag.trim().toLowerCase();

  if (platform === "codeforces") {
    if (CODEFORCES_TAG_MAP[cleaned]) {
      return CODEFORCES_TAG_MAP[cleaned];
    }
  } else if (platform === "leetcode") {
    if (LEETCODE_TAG_MAP[cleaned]) {
      return LEETCODE_TAG_MAP[cleaned];
    }
  }

  // Fallback slugification
  const slug = cleaned.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "general";
}

/**
 * Normalizes a list of raw platform tags, returning deduplicated canonical slugs.
 */
export function normalizeTopics(platform: PlatformType, rawTags: string[]): string[] {
  if (!rawTags || !Array.isArray(rawTags)) return [];

  const canonicalSet = new Set<string>();

  for (const tag of rawTags) {
    if (!tag || typeof tag !== "string") continue;
    const normalized = normalizeTopic(platform, tag);
    if (normalized) {
      canonicalSet.add(normalized);
    }
  }

  return Array.from(canonicalSet);
}
