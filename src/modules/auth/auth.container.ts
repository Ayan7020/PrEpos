import { container, type DependencyContainer } from "tsyringe";

import { AuthPrismaRepository } from "./auth.repository";
import { TOKENS } from "@/config";



export function registerAuthModule(container: DependencyContainer) {
    container.register(TOKENS.AuthRepository, {
        useClass: AuthPrismaRepository
    }); 
}