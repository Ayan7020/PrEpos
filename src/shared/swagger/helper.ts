import z, { ZodType } from "zod";
import { registry } from "./registry";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z)
export const ErrorResponseSchema = z.object({
    success: z.literal(false).openapi({ example: false }),
    message: z.string().openapi({ example: "Error" }),
    error: z.object({}),
}).openapi("ErrorResponse");

registry.register("ErrorResponse", ErrorResponseSchema);

export function jsonBody(schema: ZodType) {
    return {
        required: true as const,
        content: { "application/json": { schema } },
    };
}

export function jsonResponse(schema: ZodType, description: string) {
    return {
        description,
        content: { "application/json": { schema } },
    };
}


export function commonErrors() {
    return {
        400: jsonResponse(ErrorResponseSchema, "Validation failed"),
        401: jsonResponse(ErrorResponseSchema, "Unauthorized"),
        403: jsonResponse(ErrorResponseSchema, "Forbidden"),
        409: jsonResponse(ErrorResponseSchema, "Conflict"),
        500: jsonResponse(ErrorResponseSchema, "Internal server error"),
    };
}


export function protectedRoute() {
    return [{ BearerAuth: [] }];
}