import { prisma } from "@/infrastructure/db";
import { WorkSpace } from "../../domain/entities";
import { IWorkSpaceRepository } from "../../domain/repositories";


export class PrismaWorkspaceRepository implements IWorkSpaceRepository {
    async save(data: WorkSpace): Promise<void> {
        prisma.workspace.upsert({
            where: { id: data.id },
            create: {
                id: data.id,
                name: data.name,
                description: data.description,
                location: data.location,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                owner_id: data.owner_id, 
                businessType: "RESTAURANT"
            },
            update: {
                id: data.id,
                name: data.name,
                description: data.description,
                location: data.location,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                owner_id: data.owner_id, 
                // businessType: data.businessType, 
            }
        })
    }
}