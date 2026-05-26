import { z } from "zod";
import { registry } from "@/config/openapi";
import { CreateUserSchema } from "./auth.schema";

registry.registerPath({
    method: "post",
    path: "/users/register-user",
    tags: ["Auth"],
    summary: "Register a new user",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateUserSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: "User registered successfully",
            content: {
                "application/json": {
                    schema: z.object({
                        success: z.boolean(),
                        message: z.string(),
                        data: z.object({
                            id: z.string(),
                            email: z.string(),
                        }),
                    }),
                },
            },
        },
    },
});