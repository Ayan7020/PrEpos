import Express from "express";
import { GlobalError } from "./middleware";


export const app = Express();

app.use(GlobalError)