import { inject } from "tsyringe";
import { LoginUserDTO } from "../dtos/AuthDTOs";
import { type IUserRepository } from "../../domain/repositories/IUserRepository";
import { UnauthorizedError } from "@/shared/errors";
import { type IJwtService, type IPasswordHasher } from "../interfaces"; 
import { type IWorkspaceQueryService } from "@/shared/interfaces";
import { AuthTOKENS } from "../../di";
import { SHAREDTOKENS } from "@/shared/di";

export class LoginUserUseCase {

    constructor(
        @inject(AuthTOKENS.AuthRepository) private readonly userRepo: IUserRepository,
        @inject(AuthTOKENS.PasswordHasher) private readonly hasher: IPasswordHasher,
        @inject(AuthTOKENS.JwtService) private readonly jwtService: IJwtService,
        @inject(SHAREDTOKENS.WorkspaceQueryService) private readonly workSpaceQueryService: IWorkspaceQueryService
    ) { }

    async execute(dto: LoginUserDTO) {
        const user = await this.userRepo.findByEmail(dto.email);
        if (!user) throw new UnauthorizedError("Invalid Credential");

        const ispasswordMatch = await this.hasher.compare(dto.password, user.passwordHash);
        if (!ispasswordMatch) throw new UnauthorizedError("Invalid Credential");

        const workspace_membership = await this.workSpaceQueryService.getMembershipsByUserId(user.id);

        const access_token = this.jwtService.signAccessToken({
            userId: user.id,
            workspaces: workspace_membership
        });

        const refresh_token = this.jwtService.signRefreshToken({
            userId: user.id
        });

        return { access_token, refresh_token, user: { id: user.id, email: user.email } };
    }
}