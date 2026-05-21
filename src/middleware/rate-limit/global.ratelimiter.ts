import { App_settings, BaseLogger } from "@/config";
import { RedisClient } from "@/lib/redis";
import { BaseError, TooManyRequestsError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";

export const globalLeakyBucket = new RateLimiterRedis({
    storeClient: RedisClient,
    keyPrefix: 'global:',
    points: App_settings.Global_bucket_size,
    duration: App_settings.Global_bucket_refill_dur_sec,
    execEvenly: true
});


export const globalRateLimiterPerIp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = `${req.ip}`
        await globalLeakyBucket.consume(key);
        next();
    } catch (error: unknown) {
        if (error instanceof RateLimiterRes) {
            throw new TooManyRequestsError();
        }
        
        BaseLogger.error(error)
        //  redis-down: still access the Application;
        next();
    }
}