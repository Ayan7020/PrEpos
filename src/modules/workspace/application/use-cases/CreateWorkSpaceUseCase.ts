import { inject } from "tsyringe";
import { workspaceToken } from "../../di";
import { type IWorkSpaceRepository } from "../../domain/repositories";
import { WorkSpace } from "../../domain/entities";
import { CreateWorkspaceDto, CreateWorkspaceResultDto } from "../dto/WorkspaceDto"; 
import { v4 as uuid } from "uuid"
import { BadRequestError } from "@/shared/errors";

export class CreateWorkSpaceUseCase {
    constructor(
        @inject(workspaceToken.workSpaceRepo) private readonly workspaceRepo: IWorkSpaceRepository
    ){}

    async execute(dto: CreateWorkspaceDto): Promise<CreateWorkspaceResultDto> {

        if(!dto.owner_id) {
            throw new BadRequestError()
        }

        const workspace = WorkSpace.register(
            uuid(),
            dto.name,
            dto.description,
            dto.businessType,
            dto.location,
            dto.owner_id
        )

        await this.workspaceRepo.save(workspace);

        return {
            workspace_id: workspace.id
        }
    }
}