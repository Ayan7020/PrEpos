import { type DependencyContainer } from "tsyringe";
import { PrismaUserRepository } from "../infrastructure";
import { RegisterUserUseCase } from "../application";
import { AuthTOKENS } from "./AuthTokens";



export function registerAuthModule(container: DependencyContainer) {

    container.register(AuthTOKENS.AuthRepository, {
        useClass: PrismaUserRepository
    }); 

    container.register(AuthTOKENS.AuthUseCases, {
        useFactory: (c) => {
            register: c.resolve(RegisterUserUseCase)
        }
    })
}