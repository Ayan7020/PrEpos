import { type DependencyContainer } from "tsyringe"; 
import { RegisterUserUseCase } from "../application"; 
import { BcryptPasswordHasher, PrismaUserRepository } from "../infrastructure";
import { TOKENS } from "@/config";



export function registerAuthModule(container: DependencyContainer) {
    console.log("Registeration")
    container.register(TOKENS.AuthRepository, {
        useClass: PrismaUserRepository
    }); 

    container.register(TOKENS.PasswordHasher, {
        useClass: BcryptPasswordHasher
    });

    container.register(TOKENS.AuthUseCases, {
        useFactory: (c) => ({
            register: c.resolve(RegisterUserUseCase)
        })
    })
}