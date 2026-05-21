import { BaseLogger } from "@/config";
import { ApiResponse } from "@/utils/ApiResponse";
import { BaseError } from "@/utils/errors";
import { NextFunction, Request,Response } from "express";

export const GlobalError = (err: Error,req: Request,res: Response,next: NextFunction) => {
    if(err instanceof BaseError) {
        return ApiResponse.error(res,err.statusCode,err.data,err.message)
    }
    BaseLogger.error(err);
    return ApiResponse.error(res,500,undefined,"Internal Server Error")
}