import { Logger } from "pino";
import { CreateUserDto, type IAuthRepo, IAuthService } from "./auth.type";
import { BaseLogger, TOKENS } from "@/config";
import { inject, injectable } from "tsyringe";
import { ConflictError } from "@/utils/errors";
import { createHashing } from "./auth.utils";

@injectable()
export class AuthService implements IAuthService {
    private readonly serviceLogger: Logger;
    constructor(
        @inject(TOKENS.AuthRepository) private readonly authRepo: IAuthRepo
    ) {
        this.serviceLogger = BaseLogger.child({
            service: "Auth-Service"
        })
    }

    async CreateUser(data: CreateUserDto) {
        const isEmailExists = await this.authRepo.findByEmail(data.email);
        if (isEmailExists) {
            throw new ConflictError("Email Already Exists")
        }

        const hashPassword = await createHashing(data.password);

        const objCreateUser = {
            ...data,
            password: hashPassword
        };

        return await this.authRepo.createUser(objCreateUser)
    }
}