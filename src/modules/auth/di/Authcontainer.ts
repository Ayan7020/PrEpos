import { type DependencyContainer } from "tsyringe"; 
import { LoginUserUseCase, RegisterUserUseCase } from "../application"; 
import { BcryptPasswordHasher, JwtService, PrismaUserRepository } from "../infrastructure"; 
import { AuthTOKENS } from "./AuthTokens";
import { AuthUseCases } from "../application/AuthUseCases";


export function registerAuthModule(container: DependencyContainer) { 
    container.register(AuthTOKENS.AuthRepository, {
        useClass: PrismaUserRepository
    }); 

    container.register(AuthTOKENS.PasswordHasher, {
        useClass: BcryptPasswordHasher
    });

    container.register(AuthTOKENS.JwtService, {
        useClass: JwtService
    })

    container.register<AuthUseCases>(AuthTOKENS.AuthUseCases, {
        useFactory: (c) => ({
            register: c.resolve(RegisterUserUseCase),
            login: c.resolve(LoginUserUseCase)
        })
    })
}