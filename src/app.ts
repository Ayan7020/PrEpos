import "./container";
import Express from "express";
import { GlobalError } from "./middleware";
import { swaggerConfig } from "./shared/swagger/config";
import { loadAllDocs } from "./shared/swagger/loaders";
import { createSwaggerRouter } from "./shared/swagger/router";
import authRouter from "@auth/http/auth.routes";


export async function createApp() {
    const app = Express();

    app.use(Express.json())
    // app.use(globalRateLimiterPerIp);

    if (swaggerConfig.enabled) {
        await loadAllDocs();
        app.use(swaggerConfig.path, createSwaggerRouter());
    }


    app.use("/api/auth", authRouter);

    // const openapiDocument = generateOpenAPIDocument();
    // app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

    app.use(GlobalError);

    return app
}

