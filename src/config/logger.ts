import pino from "pino";
import { Env } from "./env";

export const BaseLogger = pino({
    level: Env.isProd ? "info" : "debug",
    base: {
        env: Env.Environment
    },

    timestamp: pino.stdTimeFunctions.isoTime,

    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "password",
            "token",
            "accessToken",
            "refreshToken"
        ],
        censor: "[REDACTED]"
    },

    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res
    },

    ...(Env.isDev && {
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
                singleLine: false
            }
        }
    })
})