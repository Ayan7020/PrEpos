import "./container";
import Express from "express";
import { GlobalError, globalRateLimiterPerIp } from "./middleware";
import { generateOpenAPIDocument } from "./config/openapi";
import swaggerUi from "swagger-ui-express";
// import { authRouter } from "./modules/auth";

export const app = Express();


// app.use(globalRateLimiterPerIp);


// app.use("/api/auth", authRouter);

// const openapiDocument = generateOpenAPIDocument();
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

// app.use(GlobalError);