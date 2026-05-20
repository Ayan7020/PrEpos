
export class BaseError extends Error {
    public readonly statusCode: number
    public readonly isOperational: Boolean
    public readonly data?: Record<string, unknown>

    constructor(
        statusCode: number,
        message: string,
        data?: Record<string, unknown>,
        isOperational: Boolean = true
    ) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (data) {
            this.data = data;
        }
        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this);
    }
}