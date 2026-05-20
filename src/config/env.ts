import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
    quiet: true
});

const schema = z.object({
    PORT: z.string(),
    Environment: z.enum(["development","production"]).default("development")
}) 

const parsed = schema.parse(process.env);

export const Env = {
    ...parsed,
    isProd: parsed.Environment === "production",
    isDev: parsed.Environment === "development"
}