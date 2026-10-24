import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getPlatformAdapter, isPlatformSupported } from "@/platforms/platform.registry";
import { apiSuccess, apiError } from "@/lib/api-response";
import { PlatformType } from "@/core/types";

export async function POST(req: NextRequest) {
  try {
    const userId = await getActiveUserId();
    const body = await req.json();
    const { platform, username } = body;

    if (!platform || !username) {
      return apiError("Both platform and username are required.", 400, "VALIDATION_ERROR");
    }

    if (!isPlatformSupported(platform)) {
      return apiError(`Platform '${platform}' is not supported yet.`, 400, "UNSUPPORTED_PLATFORM");
    }

    const cleanUsername = String(username).trim();
    const adapter = getPlatformAdapter(platform as PlatformType);

    // Validate handle exists on the platform
    const isValid = await adapter.validateUser(cleanUsername);
    if (!isValid) {
      return apiError(
        `User '${cleanUsername}' was not found or is not publicly accessible on ${platform}.`,
        404,
        "HANDLE_NOT_FOUND"
      );
    }

    // Upsert PlatformConnection
    const connection = await prisma.platformConnection.upsert({
      where: {
        userId_platform: {
          userId,
          platform,
        },
      },
      update: {
        username: cleanUsername,
        status: "connected",
        lastError: null,
      },
      create: {
        userId,
        platform,
        username: cleanUsername,
        status: "connected",
      },
    });

    return apiSuccess(connection, 201);
  } catch (err: any) {
    return apiError(err?.message || "Failed to connect platform", 400);
  }
}
