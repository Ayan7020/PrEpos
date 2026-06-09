import { App_settings, Env } from "@/config";
import Redis from "ioredis";

export const RedisClient = new Redis({
    host: Env.REDIS_HOST,
    port: Env.REDIS_PORT,

    password: Env.REDIS_PASSWORD,
    maxRetriesPerRequest: App_settings.Redis.maxRetriesPerRequest,

    retryStrategy(times) {
        return Math.min(times * App_settings.Redis.exPonentialRetryDelaySec, App_settings.Redis.exPonentialRetryDelaySecMax);
    },

    enableReadyCheck: true,
    lazyConnect: false
})

