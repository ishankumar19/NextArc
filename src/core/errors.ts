export class DomainError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code = "DOMAIN_ERROR", statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class PlatformError extends DomainError {
  public readonly platform: string;

  constructor(platform: string, message: string, code = "PLATFORM_ERROR", statusCode = 502) {
    super(`[${platform.toUpperCase()}] ${message}`, code, statusCode);
    this.platform = platform;
  }
}

export class PlatformUserNotFoundError extends PlatformError {
  constructor(platform: string, username: string) {
    super(
      platform,
      `User '${username}' does not exist or has no public profile on ${platform}.`,
      "USER_NOT_FOUND",
      404
    );
  }
}

export class GoalNotFoundError extends DomainError {
  constructor(goalId: string) {
    super(`Goal with id '${goalId}' was not found.`, "GOAL_NOT_FOUND", 404);
  }
}
