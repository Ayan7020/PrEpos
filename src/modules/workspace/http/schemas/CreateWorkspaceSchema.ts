import { CURRENCY } from "@/generated/prisma/enums";
import z from "zod";


export const CreateWorkspaceSchema = z.object({
    name: z.string(),
    description: z.string(),

    location: z.string(),
    currency: z.literal(["INR","GBP"]),
    businessType: z.literal(["RETAIL_STORE","RESTAURANT"])
});