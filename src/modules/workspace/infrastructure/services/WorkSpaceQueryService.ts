import { prisma } from "@/infrastructure/db";
import { IWorkspaceQueryService } from "@/shared/interfaces";
import { WorkSpaceInformation } from "@/shared/types";

export class WorkSpaceQueryService implements IWorkspaceQueryService {
    async getWorkSpaceInformationByUserId(userId: string): Promise<WorkSpaceInformation[]> {
        const workspaces = await prisma.workspace.findMany({
            where: {
                owner_id: userId
            },
            select: {
                id: true,
                name: true
            }
        });
        return workspaces;
    }
}