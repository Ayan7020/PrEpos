import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { App_settings } from "./settings";


export const registry = new OpenAPIRegistry();

export function generateOpenAPIDocument() {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: '3.0.0',
        info: {
            title: App_settings.appName,
            version: "1.0.0"
        },

        servers: [{ url: '/api' }]
    })
}