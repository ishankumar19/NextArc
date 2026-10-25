import { NextResponse } from "next/server";
import { AuthenticationError, AuthorizationError, NotFoundError } from "@/lib/errors";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function apiError(message: string, status = 400, code = "API_ERROR") {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status }
  );
}

export function handleApiError(err: any) {
  if (err instanceof AuthenticationError) {
    return apiError(err.message, err.statusCode, err.code);
  }
  if (err instanceof AuthorizationError) {
    return apiError(err.message, err.statusCode, err.code);
  }
  if (err instanceof NotFoundError) {
    return apiError(err.message, err.statusCode, err.code);
  }
  const statusCode = typeof err?.statusCode === "number" ? err.statusCode : 500;
  const errorCode = err?.code || (statusCode === 400 ? "VALIDATION_ERROR" : "INTERNAL_ERROR");
  return apiError(err?.message || "Internal server error", statusCode, errorCode);
}
