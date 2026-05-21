import { container, type DependencyContainer } from "tsyringe";

import { AuthPrismaRepository } from "./auth.repository";

export const TOKENS = {
    AuthRepository: Symbol("AuthRepository"),
    AuthService: Symbol("AuthService"),
};

export function registerAuthModule(container: DependencyContainer) {
    container.register(TOKENS.AuthRepository, {
        useClass: AuthPrismaRepository
    }); 
}