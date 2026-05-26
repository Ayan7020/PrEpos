import { ZodError } from "zod/v3";
import { BadRequestError } from "./CustomError";


export const handleZodError = (error: ZodError) => {
    const formattedError = error.errors.map((err) => {
        return {
            field: err.path.join("."),
            message: err.message,
            code: err.code
        }
    });

    throw new BadRequestError("Validation Failed", formattedError)
}