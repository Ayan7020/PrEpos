import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
    quiet: true
});

const schema = z.object({
    PORT: z.string(),
    Environment: z.enum(["development", "production", "testing"]).default("development"),
    HOST: z.string().default("http://localhost"),

    REDIS_HOST: z.string(),
    REDIS_PORT: z.string(),
    REDIS_PASSWORD: z.string(),


    AccessTokenSecret: z.string(),
    RefreshTokenSecret: z.string()
})

const parsed = schema.parse(process.env);  

export const Env = {
    ...parsed,
    REDIS_PORT: Number(parsed.REDIS_PORT),
    isProd: parsed.Environment === "production",
    isDev: parsed.Environment === "development",
    isTest: parsed.Environment === "testing"
}