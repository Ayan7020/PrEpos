import z from "zod/v3";

export const CreateUserSchema = z.object({
    name: z.string(),
    store_name: z.string(),
    email: z.string().email(),
    password: z.string()
});