import { NextFunction, Router } from "express";
import { generateOpenAPIDocument } from "./registry";
import { swaggerConfig } from "./config";
import { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

let cachedSpec: object | null = null;

function getSpec(): object {
    if (!cachedSpec) {
        cachedSpec = generateOpenAPIDocument();
    }
    return cachedSpec;
}

function prodAuthGuard(req: Request, res: Response, next: NextFunction): void {
    if (!swaggerConfig.requireAuth) return next();

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({ error: "Docs require authentication" });
        return;
    }

    // todo: unable proteected swagger for the prod env
}

export function createSwaggerRouter(): Router {
    const router = Router();
    router.get("/swagger.json", prodAuthGuard, (_req, res) => {
        res.json(getSpec());
    });

    router.use(
        "/",
        prodAuthGuard,
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
            swaggerOptions: {
                url: swaggerConfig.jsonPath,
                persistAuthorization: swaggerConfig.persistAuth,
                displayRequestDuration: true,
                filter: true,
                tryItOutEnabled: true,
                defaultModelsExpandDepth: 1,
                defaultModelExpandDepth: 1,
            },
            customCss: `.swagger-ui .topbar { display: none }`,
            customSiteTitle: "PrEpos API Docs",
        })
    )
    return router;
}