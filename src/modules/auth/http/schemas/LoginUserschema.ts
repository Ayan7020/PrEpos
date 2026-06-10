import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod"; 

extendZodWithOpenApi(z);

export const LoginUserSchema = z.object({
    email: z.email().openapi({ example: "test@gmail.com"}),
    password: z.string().openapi({ example: "123456578"})
}); 

export const LoginUserResponse = z.object({
    success: z.boolean().openapi({ example: true }),
    message: z.string().openapi({ example: "Login Successful" }),
    data: z.object({
        accessToken: z.string().openapi({ example: "isedhfgiohf8d3432c" }),
        user: z.object({
            id: z.string().openapi({ example: "53454546" }),
            email: z.email().openapi({ example: "test@gmail.com" }),
        })
    })
}).openapi("LoginUserResponse");