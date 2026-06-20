import z from "zod";


export const AddWorkspaceMemberSchema = z.object({
    name: z.string(),
    email: z.email(),

    password: z.string(), 
    role: z.enum(["Manager","Cashier"])
});