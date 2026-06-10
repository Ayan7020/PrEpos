import { Env } from "@/config";

type SwaggerConfig = {
  enabled: boolean;
  path: string;
  jsonPath: string;
  persistAuth: boolean;
  requireAuth: boolean;
};


const configs: Record<string, SwaggerConfig> = {
  development: {
    enabled: true,
    path: "/docs",
    jsonPath: "/docs/swagger.json",
    persistAuth: true,
    requireAuth: false,     
  },
  test: {
    enabled: false,        
    path: "/docs",
    jsonPath: "/docs/swagger.json",
    persistAuth: false,
    requireAuth: false,
  },
  production: {
    enabled: true,
    path: "/docs",
    jsonPath: "/docs/swagger.json",
    persistAuth: true,
    requireAuth: true,      
  },
};

export const swaggerConfig: SwaggerConfig =  configs[Env.Environment] ?? configs.development!