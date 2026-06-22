import { Env } from "@/config";
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

export const registry = new OpenAPIRegistry();
 
registry.registerComponent("securitySchemes", "BearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
});

export function generateOpenAPIDocument() {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "PrEpos System API",
            version: "1.0.0",
            description: "Electronic Point of Sale System",
        },

        servers: [
            {
                url: `${Env.HOST}:${Env.PORT}/api`,
                description: Env.Environment,
            }
        ],

        tags: [
            { name: "Auth", description: "Authentication endpoints" },
            { name: "Workspace", description: "Workspace management" },
        ],

        security: [
            {
                BearerAuth: [],
            }
        ],
    })
}

