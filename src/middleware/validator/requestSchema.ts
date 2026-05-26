import { handleZodError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express"
import { ZodError, ZodSchema } from "zod/v3"

export const requestSchemaValidator = (bodySchema: ZodSchema) => {
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