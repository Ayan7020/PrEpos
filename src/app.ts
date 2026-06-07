import Express from "express";
import { GlobalError, globalRateLimiterPerIp } from "./middleware";
<<<<<<< HEAD
import "./container";
=======
import { generateOpenAPIDocument } from "./config/openapi";
import swaggerUi from "swagger-ui-express";
import { authRouter } from "./modules/auth";
>>>>>>> b22aa8033c66c8b81ce17a19a00d604a64244ac3

export const app = Express();


app.use(globalRateLimiterPerIp);


app.use("/api", authRouter);

const openapiDocument = generateOpenAPIDocument();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.use(GlobalError);