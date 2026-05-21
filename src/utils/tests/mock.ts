import { Request, Response, NextFunction } from "express";

export function mockMiddleware() {
    const req = {
        ip: "127.0.0.1",
        body: {},
        params: {},
        query: {},
        headers: {},
    } as Partial<Request>;

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    } as Partial<Response>;

    const next: NextFunction = jest.fn();

    return {
        req: req as Request,
        res: res as Response,
        next,
    };
}

export function MockPrisma() {
    return () => ({
        prisma: {
            $transaction: jest.fn(),
        },
    })
}