import { DependencyContainer } from "tsyringe"
import { workspaceToken } from "./workspaceToken";
import { PrismaWorkspaceRepository } from "../infrastructure/persistence/PrismaWorkspaceRepository"; 
import { WorkspaceUseCase } from "../application/workspaceUseCases";
import { CreateWorkSpaceUseCase } from "../application/use-cases";
import { PrismaWorkspaceMemberRepository } from "../infrastructure/persistence/PrismaWorkspaceMemberRepository";
import { AddWorkSpaceMemberUseCase } from "../application/use-cases/AddWorkSpaceMemberUseCase";

export function registerWorkspaceModule(container: DependencyContainer) {
    container.register(workspaceToken.workSpaceRepo, {
        useClass: PrismaWorkspaceRepository
    });

    container.register(workspaceToken.workspaceMemberRepo, {
        useClass: PrismaWorkspaceMemberRepository
    });

    container.register<WorkspaceUseCase>(workspaceToken.WorkspaceUsecase, {
        useFactory: (c) => ({ 
            create: c.resolve(CreateWorkSpaceUseCase),
            members: {
                add: c.resolve(AddWorkSpaceMemberUseCase)
            }
        })
    })
}