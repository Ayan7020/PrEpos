import { DependencyContainer } from "tsyringe";
import { SHAREDTOKENS } from "./tokens";
import { JwtService } from "../services/JwtService";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasherService";


export function registerSharedServices(container: DependencyContainer) {
    container.register(SHAREDTOKENS.JwtService, {
        useClass: JwtService
    });
    container.register(SHAREDTOKENS.HasherService, {
        useClass: BcryptPasswordHasher
    });
}