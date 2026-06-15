import { DependencyContainer } from "tsyringe";
import { SHAREDTOKENS } from "./tokens";
import { JwtService } from "../services/JwtService";


export function registerSharedServices(container: DependencyContainer) {
    container.register(SHAREDTOKENS.JwtService, {
        useClass: JwtService
    });
}