import { inject, injectable } from "tsyringe";
import { LoginWorkspaceMemberDto } from "../dto/WorkspaceMemberDto";
import { workspaceToken } from "../../di";
import { type IWorkspaceMemberRepository } from "../../domain/repositories";
import { ConflictError, UnauthorizedError } from "@/shared/errors";
import { SHAREDTOKENS } from "@/shared/di";
import { type IJwtService, type IPasswordHasher } from "@/shared/interfaces";
import { WorkspaceMemberAccessTokenPayload } from "@/shared/types";

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
            throw new ConflictError("Member not found")
        }

        const isPasswordMatch = await this.hasher.compare(dto.password,workspaceMember.passwordHash);
        if(!isPasswordMatch) {
            throw new ConflictError("Incorrect Password")
        }

        if (!workspaceMember.role || !workspaceMember.permissions || workspaceMember.permissions.length === 0) {
            throw new UnauthorizedError("Member does not have valid role or permissions assigned");
        }

        const access_token = this.JwtService.signAccessToken<WorkspaceMemberAccessTokenPayload>({
            workspace_id: workspaceMember.workspaceId,
            type: workspaceMember.role,
            member_id: workspaceMember.id,
            role_id: workspaceMember.roleId,
            permissions: workspaceMember.permissions
        });

        const refresh_token = this.JwtService.signRefreshToken({  
            userId: workspaceMember.id
        });

        return {
            access_token,
            refresh_token,
            member: {
                id: workspaceMember.id,
                name: workspaceMember.name,
                email: workspaceMember.email,
                role: workspaceMember.role
            }
        };
    }
}