import { StatusCodes } from "http-status-codes";

class BaseError extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly message: string;

  constructor(name: string, status: number, description: string) {
    super(description);
    this.name = name;
    this.status = status;
    this.message = description;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

// 500 Internal Error
export class APIError extends BaseError {
  constructor(description = "api error") {
    super("api internal error", StatusCodes.INTERNAL_SERVER_ERROR, description);
  }
}

// 400 Validation Error
export class ValidationError extends BaseError {
  constructor(description = "bad request") {
    super("bad request", StatusCodes.BAD_REQUEST, description);
  }
}

// 403 Authorization Error
export class AuthorizationError extends BaseError {
  constructor(description = "access denied") {
    super("access denied", StatusCodes.UNAUTHORIZED, description);
  }
}

// 404 Not Found
export class NotFoundError extends BaseError {
  constructor(description = "not found") {
    super(description, StatusCodes.UNAUTHORIZED, description);
  }
}