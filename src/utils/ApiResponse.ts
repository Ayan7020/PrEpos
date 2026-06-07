import { Response } from "express"

export interface ApiResponseType<T> {
    success: boolean;
    data: T;
    message: string;
}

export class ApiResponse {
    static success(res: Response,
        data: Object,
        message = "Success",
        statusCode = 200
    ) {
        return res.status(statusCode).json({
            success: true,
            message,
            data: data
        });
    }

    static successResponse<T>( 
        success = true,
        message: string,
        data: T
    ) {
        return {
            success,
            message,
            data
        }
    }

    static error(res: Response,
        statusCode: number,
        data?: unknown,
        message = "Error"
    ) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(data !== undefined && { data: data })
        });
    }
}