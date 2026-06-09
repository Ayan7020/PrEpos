import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const CreateUserSchema = z.object({
    name: z.string().openapi({ example: "Joh Doe" }),
    email: z.email().openapi({ example: "johndoe@gmail.com" }),
    password: z.string().openapi({ example: "12345678" })
});

export const CreateuserResponse = z.object({
    success: z.boolean().openapi({ example: true }),
    message: z.string().openapi({ example: "user created successfully" }),
    data: z.object({
        id: z.string().openapi({ example: "54353534543" })
    })
}).openapi("CreateuserResponse");