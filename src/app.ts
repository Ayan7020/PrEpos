import Express from "express";
import { GlobalError, globalRateLimiterPerIp } from "./middleware";
import "./container";

export const app = Express();


app.use(globalRateLimiterPerIp);

app.use(GlobalError);