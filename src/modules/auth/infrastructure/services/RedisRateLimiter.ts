import { RateLimiterRedis } from "rate-limiter-flexible";
import { App_settings } from "@/config";
import { IRateLimiter } from "@auth/application/interfaces";
import { injectable } from "tsyringe"; 
import { RedisClient } from "@/infrastructure/cache";

@injectable()
export class RedisRateLimiter implements IRateLimiter {
  private limiter: RateLimiterRedis;

  constructor() {
    this.limiter = new RateLimiterRedis({
      storeClient: RedisClient,
      keyPrefix: "auth",
      points: App_settings.Auth.Rate_limit_attempts,
      duration: App_settings.Auth.Rate_limit_per_sec,
      blockDuration: App_settings.Auth.rate_limit_block_duration_sec,
    });
  }

  async consume(key: string): Promise<void> {
    await this.limiter.consume(key);  
  }
}