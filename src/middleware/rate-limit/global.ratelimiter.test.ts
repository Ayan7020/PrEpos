import { mockMiddleware } from "@/utils/tests";
import { globalLeakyBucket, globalRateLimiterPerIp } from "./global.ratelimiter"
import { RateLimiterRes } from "rate-limiter-flexible";
import { TooManyRequestsError } from "@/utils/errors";

describe('globalRateLimiterPerIp', () => {
    it('should call next() when bucket has capacity', async () => {
        jest.spyOn(globalLeakyBucket, 'consume').mockResolvedValueOnce({} as any);

        const { req, res, next } = mockMiddleware();

        await globalRateLimiterPerIp(req, res, next);
        expect(globalLeakyBucket.consume).toHaveBeenCalledWith(req.ip);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should call next(TooManyRequestsError) when queue overflows', async () => {
        jest.spyOn(globalLeakyBucket, 'consume').mockRejectedValueOnce(new RateLimiterRes());

        const { req, res, next } = mockMiddleware();

        await expect(globalRateLimiterPerIp(req, res, next)).rejects.toBeInstanceOf(TooManyRequestsError);
    });

    it("should still call next() when Redis is down", async () => {
        jest.spyOn(globalLeakyBucket, "consume").mockRejectedValueOnce(new Error("Redis Connection Failed!"));

        const { req, res, next } = mockMiddleware();
        await globalRateLimiterPerIp(req, res, next);
        expect(next).toHaveBeenCalled();
    });
})  