import z from "zod"; 

export const CreateUserSchema = z.object({
    name: z.string(),
    store_name: z.string(),
    email: z.email(),
    password: z.string()
}); 