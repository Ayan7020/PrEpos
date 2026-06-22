import z from "zod";


export const LoginWorkspaceMemberSchema = z.object({
    email: z.email(),
    password: z.string()
});