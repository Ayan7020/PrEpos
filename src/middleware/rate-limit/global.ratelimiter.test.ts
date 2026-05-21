import { mockMiddleware } from "@/utils/tests";
import { globalLeakyBucket, globalRateLimiterPerIp } from "./global.ratelimiter"

describe('globalRateLimiterPerIp', () => {
    it('should call next() when bucket has capacity', async () => {
        jest.spyOn(globalLeakyBucket, 'consume').mockResolvedValueOnce({} as any);

        const { req, res, next } = mockMiddleware();

        await globalRateLimiterPerIp(req, res, next);
        expect(globalLeakyBucket.consume).toHaveBeenCalledWith(req.ip);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
    })
})  