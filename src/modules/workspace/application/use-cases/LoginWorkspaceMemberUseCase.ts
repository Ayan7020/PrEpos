import { inject, injectable } from "tsyringe";
import { LoginWorkspaceMemberDto } from "../dto/WorkspaceMemberDto";
import { workspaceToken } from "../../di";
import { type IWorkspaceMemberRepository } from "../../domain/repositories";
import { UnauthorizedError } from "@/shared/errors";
import { SHAREDTOKENS } from "@/shared/di";
import { type IJwtService, type IPasswordHasher } from "@/shared/interfaces";


@injectable()
export class LoginWorkspaceMemberUseCase {
    constructor(
        @inject(workspaceToken.workspaceMemberRepo) private readonly workspaceMemberRepo: IWorkspaceMemberRepository,
        @inject(SHAREDTOKENS.HasherService) private readonly hasher: IPasswordHasher,
        @inject(SHAREDTOKENS.JwtService) private readonly JwtService: IJwtService
    ) {}

    async execute(dto: LoginWorkspaceMemberDto) {
        const workspaceMember = await this.workspaceMemberRepo.findByEmailByWorspace(dto.workspace_id,dto.email);
        if(!workspaceMember) {
            throw new UnauthorizedError("Member not found")
        }

        const isPasswordMatch = await this.hasher.compare(dto.password,workspaceMember.passwordHash);
        if(!isPasswordMatch) {
            throw new UnauthorizedError("Incorrect Password")
        }

        this.JwtService.signAccessToken({
            
        });
        this.JwtService.signRefreshToken({  
            userId: ""
        });

    }
}