import { registry } from "@/config/openapi";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const CreateUserSchema = z.object({
    name: z.string(),
    store_name: z.string(),
    email: z.email(),
    password: z.string()
});

registry.register("CreateUser", CreateUserSchema);