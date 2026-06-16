import "./container";
import Express from "express";
import { GlobalError } from "@/presentation/http/middleware";
import { swaggerConfig,loadAllDocs, createSwaggerRouter } from "@/presentation/http/openapi";  
import authRouter from "@auth/http/auth.routes";
import workspaceRouter from "@workspace/http/workspace.route";


export async function createApp() {
    const app = Express();

    app.use(Express.json())
    // app.use(globalRateLimiterPerIp);

    if (swaggerConfig.enabled) {
        await loadAllDocs();
        app.use(swaggerConfig.path, createSwaggerRouter());
    }


    app.use("/api/auth", authRouter);
    app.use("/api/workspace", workspaceRouter);
 

    app.use(GlobalError);

    return app
}

