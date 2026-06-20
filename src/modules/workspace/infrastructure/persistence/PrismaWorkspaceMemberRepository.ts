import { injectable } from "tsyringe";
import { IWorkspaceMemberRepository } from "../../domain/repositories";
import { WorkspaceMember } from "../../domain/entities";
import { prisma } from "@/infrastructure/db";

@injectable()
export class PrismaWorkspaceMemberRepository implements IWorkspaceMemberRepository {
    async save(data: WorkspaceMember): Promise<void> {
        await prisma.workspaceMember.upsert({
            where: { id: data.id },
            create: {
                id: data.id,
                name: data.name,
                email: data.email,
                password_hash: data.passwordHash,
                is_active: data.isActive,
                role_id: data.roleId,
                created_at: data.createdAt,
                workspace_id: data.workspaceId
            },
            update: {
                name: data.name,
                is_active: data.isActive,
                role_id: data.roleId,
            }
        });
    }

}
