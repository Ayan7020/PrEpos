import { app } from "./app";
import { Env } from "./config";
import { showBanner } from "./config/banner";
import "reflect-metadata";

app.listen(Env.PORT, () => {
    if (Env.isDev) {
        showBanner(Env.PORT)
    } 
});

