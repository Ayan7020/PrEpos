import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
    constructor(
        message = "Bad Request",
        data?: unknown
    ) {
        super(400, message, data);
    }
}


export class TooManyRequestsError extends BaseError {
    constructor(
        message = "Too many request!"
    ) {
        super(429, message);
    }
}
export class UnauthorizedError extends BaseError {
    constructor(
        message = "Unauthorized"
    ) {
        super(401, message);
    }
}

export class ForbiddenError extends BaseError {
    constructor(
        message = "Forbidden"
    ) {
        super(403, message);
    }
}

export class ConflictError extends BaseError {
    constructor(
        message = "Conflict"
    ) {
        super(409, message);
    }
}

export class InternalServerError extends BaseError {
    constructor(
        message = "Internal Server Error"
    ) {
        super(500, message, undefined, false);
    }
}