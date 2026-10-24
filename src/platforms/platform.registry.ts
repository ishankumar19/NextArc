import { PlatformType } from "@/core/types";
import { PlatformAdapter } from "./platform.types";
import { codeforcesAdapter } from "./adapters/codeforces.adapter";
import { leetcodeAdapter } from "./adapters/leetcode.adapter";
import { PlatformError } from "@/core/errors";

const adapterRegistry: Record<PlatformType, PlatformAdapter> = {
  codeforces: codeforcesAdapter,
  leetcode: leetcodeAdapter,
};

export function getPlatformAdapter(platform: PlatformType): PlatformAdapter {
  const adapter = adapterRegistry[platform];
  if (!adapter) {
    throw new PlatformError(
      platform,
      `No adapter registered for platform '${platform}'.`,
      "ADAPTER_NOT_FOUND",
      400
    );
  }
  return adapter;
}

export function isPlatformSupported(platform: string): platform is PlatformType {
  return platform in adapterRegistry;
}
