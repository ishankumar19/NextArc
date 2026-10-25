export class AuthenticationError extends Error {
  public readonly statusCode = 401;
  public readonly code = "UNAUTHENTICATED";

  constructor(message = "Authentication required. Please sign in.") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  public readonly statusCode = 403;
  public readonly code = "FORBIDDEN";

  constructor(message = "You do not have permission to access this resource.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends Error {
  public readonly statusCode = 404;
  public readonly code = "NOT_FOUND";

  constructor(message = "Resource not found.") {
    super(message);
    this.name = "NotFoundError";
  }
}
