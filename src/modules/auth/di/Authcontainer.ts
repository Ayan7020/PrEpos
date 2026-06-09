import { type DependencyContainer } from "tsyringe"; 
import { RegisterUserUseCase } from "../application";
import { AuthTOKENS } from "./AuthTokens"; 
import { BcryptPasswordHasher, PrismaUserRepository } from "../infrastructure";



export function registerAuthModule(container: DependencyContainer) {

    container.register(AuthTOKENS.AuthRepository, {
        useClass: PrismaUserRepository
    }); 

    container.register(AuthTOKENS.PasswordHasher, {
        useClass: BcryptPasswordHasher
    });

    container.register(AuthTOKENS.AuthUseCases, {
        useFactory: (c) => {
            register: c.resolve(RegisterUserUseCase)
        }
    })
}