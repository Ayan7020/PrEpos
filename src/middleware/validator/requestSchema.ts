import { handleZodError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express"
import { ZodError, ZodType } from "zod"

export const requestSchemaValidator = (bodySchema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = bodySchema.parse(req.body);
            next();
        } catch (error: unknown) {
            if(error instanceof ZodError) {
                throw handleZodError(error);
            }

            throw error;
        }
    }

}