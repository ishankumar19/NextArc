type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  durationMs?: number;
  userId?: string;
  statusCode?: number;
  [key: string]: unknown;
}

const isDev = process.env.NODE_ENV !== "production";

function emit(entry: LogEntry): void {
  if (isDev) {
    const prefix = `[${entry.level.toUpperCase()}]`;
    const context = entry.context ? ` [${entry.context}]` : "";
    const duration = entry.durationMs !== undefined ? ` (${entry.durationMs}ms)` : "";
    const status = entry.statusCode !== undefined ? ` HTTP ${entry.statusCode}` : "";
    const user = entry.userId ? ` user=${entry.userId}` : "";
    console[entry.level === "debug" ? "debug" : entry.level === "info" ? "info" : entry.level === "warn" ? "warn" : "error"](
      `${prefix}${context}${user}${status}${duration} ${entry.message}`
    );
  } else {
    // JSON structured logging for production
    process.stdout.write(JSON.stringify(entry) + "\n");
  }
}

export function logRequest(
  method: string,
  path: string,
  userId: string | null,
  durationMs: number,
  statusCode: number
): void {
  emit({
    level: statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info",
    message: `${method} ${path}`,
    timestamp: new Date().toISOString(),
    context: "http",
    userId: userId ?? undefined,
    durationMs,
    statusCode,
  });
}

export function logError(
  context: string,
  error: unknown,
  metadata?: Record<string, unknown>
): void {
  emit({
    level: "error",
    message: error instanceof Error ? error.message : String(error),
    timestamp: new Date().toISOString(),
    context,
    ...(metadata ?? {}),
  });
}

export function logInfo(
  context: string,
  message: string,
  metadata?: Record<string, unknown>
): void {
  emit({
    level: "info",
    message,
    timestamp: new Date().toISOString(),
    context,
    ...(metadata ?? {}),
  });
}

export function logWarn(
  context: string,
  message: string,
  metadata?: Record<string, unknown>
): void {
  emit({
    level: "warn",
    message,
    timestamp: new Date().toISOString(),
    context,
    ...(metadata ?? {}),
  });
}
