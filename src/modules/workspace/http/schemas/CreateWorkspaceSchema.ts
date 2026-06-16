import z from "zod";


export const CreateWorkspaceSchema = z.object({
    name: z.string(),
    description: z.string(),

    location: z.string(), 
    businessType: z.literal(["RETAIL_STORE","RESTAURANT"])
});