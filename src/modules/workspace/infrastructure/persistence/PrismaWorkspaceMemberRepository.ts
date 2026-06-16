import { injectable } from "tsyringe";
import { IWorkspaceMemberRepository } from "../../domain/repositories";
import { WorkspaceMember } from "../../domain/entities";
import { prisma } from "@/infrastructure/db";

@injectable()
export class PrismaWorkspaceMemberRepository implements IWorkspaceMemberRepository {
    async save(data: WorkspaceMember[]): Promise<void> {
        data.map(async (d) => {
            await prisma.workspaceMember.upsert({
                where: { id: d.id },
                create: {
                    id: d.id,
                    name: d.name,
                    email: d.email,
                    password_hash: d.passwordHash,
                    is_active: d.isActive,
                    role_id: d.roleId,
                    created_at: d.createdAt,
                    workspace_id: d.workspaceId
                },
                update: { 
                    name: d.name,  
                    is_active: d.isActive,
                    role_id: d.roleId,
                }
            });
        });
    }

}
