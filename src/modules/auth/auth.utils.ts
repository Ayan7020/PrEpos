import { App_settings } from "@/config";
import bcrypt from "bcrypt";
import { RateLimiterRedis } from "rate-limiter-flexible";

export const createHashing = async (plain_text: string) => {
    return await bcrypt.hash(plain_text, App_settings.Auth.SaltRounds);
}

export const validateHashing = async (plain_text: string, compare_string: string) => {
    return await bcrypt.compare(plain_text, compare_string);
}


export const authRateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'auth',
    points: App_settings.Auth.Rate_limit_attempts,            
    duration: App_settings.Auth.Rate_limit_per_sec,       
    blockDuration: App_settings.Auth.rate_limit_block_duration_sec,  
});