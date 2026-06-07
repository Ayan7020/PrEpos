<<<<<<< HEAD:src/modules/auth/http/schemas/RegisterSchema.ts
import z from "zod";
=======
import { registry } from "@/config/openapi";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);
>>>>>>> b22aa8033c66c8b81ce17a19a00d604a64244ac3:src/modules/auth/auth.schema.ts

export const CreateUserSchema = z.object({
    name: z.string(),
    store_name: z.string(),
    email: z.email(),
    password: z.string()
});

registry.register("CreateUser", CreateUserSchema);