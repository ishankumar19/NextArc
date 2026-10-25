import { NextRequest } from "next/server";
import { getActiveUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { apiSuccess, apiError, handleApiError } from "@/lib/api-response";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ platform: string }> }
) {
  try {
    const { platform } = await context.params;
    const userId = await getActiveUserId(req);

    const connection = await prisma.platformConnection.findUnique({
      where: {
        userId_platform: {
          userId,
          platform,
        },
      },
    });

    if (!connection) {
      return apiError(`No connection found for platform '${platform}'`, 404, "NOT_FOUND");
    }

    await prisma.platformConnection.delete({
      where: { id: connection.id },
    });

    return apiSuccess({ disconnected: true, platform });
  } catch (err: any) {
    return handleApiError(err);
  }
}
