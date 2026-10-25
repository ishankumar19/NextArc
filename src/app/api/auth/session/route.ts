import { NextRequest, NextResponse } from "next/server";
import { resolveSession } from "@/lib/auth";
import { apiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const session = await resolveSession(req);

  if (!session) {
    return apiError("Unauthenticated. No valid session found.", 401, "UNAUTHENTICATED");
  }

  return NextResponse.json({
    success: true,
    data: {
      user: session.user,
      expires: session.expires.toISOString(),
    },
  });
}
