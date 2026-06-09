import { createApp } from "./app";
import { BaseLogger, Env } from "./config";
import { showBanner } from "./config/banner"; 


async function bootstrap() {
    const app = await createApp();
    app.listen(Env.PORT, () => {
        if (Env.isDev) {
            showBanner(Env.PORT)
        } 
    });
}

bootstrap().catch(console.error);
