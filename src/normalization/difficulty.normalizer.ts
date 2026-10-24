import { PlatformType } from "@/core/types";

export interface NormalizedDifficulty {
  nativeDifficulty: string; // e.g. "1300", "800", "Easy", "Medium", "Hard"
  numericDifficulty: number | null; // For CF: 1300. For LC: 1 (Easy), 2 (Medium), 3 (Hard)
}

/**
 * Normalizes difficulty representation without equating different platform systems.
 * Strictly preserves native coordinates.
 */
export function normalizeDifficulty(
  platform: PlatformType,
  rawDifficulty: string | number | undefined | null
): NormalizedDifficulty {
  if (platform === "codeforces") {
    if (rawDifficulty === undefined || rawDifficulty === null) {
      return {
        nativeDifficulty: "Unrated",
        numericDifficulty: null,
      };
    }

    const num =
      typeof rawDifficulty === "number"
        ? rawDifficulty
        : parseInt(String(rawDifficulty), 10);

    if (isNaN(num)) {
      return {
        nativeDifficulty: String(rawDifficulty),
        numericDifficulty: null,
      };
    }

    return {
      nativeDifficulty: String(num),
      numericDifficulty: num,
    };
  }

  if (platform === "leetcode") {
    const str = String(rawDifficulty || "").trim();
    const lower = str.toLowerCase();

    if (lower === "easy") {
      return {
        nativeDifficulty: "Easy",
        numericDifficulty: 1,
      };
    }
    if (lower === "medium") {
      return {
        nativeDifficulty: "Medium",
        numericDifficulty: 2,
      };
    }
    if (lower === "hard") {
      return {
        nativeDifficulty: "Hard",
        numericDifficulty: 3,
      };
    }

    return {
      nativeDifficulty: str || "Unknown",
      numericDifficulty: null,
    };
  }

  return {
    nativeDifficulty: String(rawDifficulty || "Unknown"),
    numericDifficulty: null,
  };
}
