import { inject, injectable } from "tsyringe";
import { AddWorkspaceMemberDto } from "../dto/WorkspaceMemberDto";
import { BadRequestError } from "@/shared/errors";
import { WorkspaceMember } from "../../domain/entities";
import { v4 as uuid } from "uuid";
import { ROLES } from "@/shared/authorization";
import { SHAREDTOKENS } from "@/shared/di";
import { type IPasswordHasher } from "@/shared/interfaces";
import { workspaceToken } from "../../di";
import { type IWorkspaceMemberRepository } from "../../domain/repositories";

@injectable()
export class AddWorkSpaceMemberUseCase {
    constructor( 
        @inject(SHAREDTOKENS.HasherService) private readonly hasherService: IPasswordHasher,
        @inject(workspaceToken.workspaceMemberRepo) private readonly workspaceMemberRepo: IWorkspaceMemberRepository
    ){}

    async execute(dto: AddWorkspaceMemberDto): Promise<void> {
        if(!dto.workspace_id) {
            throw new BadRequestError()
        }

        const password_hash = await this.hasherService.hash(dto.password);
        const workspaceMember = WorkspaceMember.create(
            uuid(),
            dto.workspace_id,
            dto.name,
            dto.email,
            password_hash,
            "ss"
        );
        
        await this.workspaceMemberRepo.save(workspaceMember);
    }
}