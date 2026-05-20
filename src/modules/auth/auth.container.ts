import { container } from "tsyringe";

import { AuthPrismaRepository } from "./auth.repository";

export const TOKENS = {
    AuthRepository: Symbol("AuthRepository"),
    AuthService: Symbol("AuthService"),
};

if (!container.isRegistered(TOKENS.AuthRepository)) {
    container.register(
        TOKENS.AuthRepository,
        {
            useClass: AuthPrismaRepository
        }
    );
}