import { inject, injectable } from "tsyringe";
import { LoginUserDTO } from "../dtos/AuthDTOs";
import { type IUserRepository } from "../../domain/repositories";
import { UnauthorizedError } from "@/shared/errors";  
import { AuthTOKENS } from "../../di"; 
import { OwnerAccessTokenPayload } from "../../types"; 
import { type IPasswordHasher } from "../interfaces";
import { type IJwtService } from "@/shared/interfaces";
import { SHAREDTOKENS } from "@/shared/di";

@injectable()
export class LoginUserUseCase {

    constructor(
        @inject(AuthTOKENS.AuthRepository) private readonly userRepo: IUserRepository,
        @inject(AuthTOKENS.PasswordHasher) private readonly hasher: IPasswordHasher,
        @inject(SHAREDTOKENS.JwtService) private readonly jwtService: IJwtService
    ) { }

    async execute(dto: LoginUserDTO) {
        const user = await this.userRepo.findByEmail(dto.email);
        if (!user) throw new UnauthorizedError("Invalid Credential");

        const ispasswordMatch = await this.hasher.compare(dto.password, user.passwordHash);
        if (!ispasswordMatch) throw new UnauthorizedError("Invalid Credential");


        const access_token = this.jwtService.signAccessToken<OwnerAccessTokenPayload>({
            userId: user.id,
            email: user.email,
            type: "OWNER",
        });

        const refresh_token = this.jwtService.signRefreshToken({
            userId: user.id
        });

        return { access_token, refresh_token, user: { id: user.id, email: user.email } };
    }
}