import { injectable } from "tsyringe";
import { IWorkspaceMemberRepository } from "../../domain/repositories";
import { WorkspaceMember } from "../../domain/entities";
import { prisma } from "@/infrastructure/db";
import { Permissions } from "@/shared/types";
import { PERMISSIONS } from "@/shared/authorization/permissions";
import { ROLES } from "@/generated/prisma/enums";

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

    async findByEmailByWorspace(workspace_id: string, email: string): Promise<WorkspaceMember | null> {
        const doc = await prisma.workspaceMember.findFirst({
            where: {
                workspace_id,
                email
            },
            include: {
                role: {
                    include: {
                        rolesPermissions: {
                            include: {
                                permission: true
                            }
                        }
                    }
                }
            }
        });

        if (!doc) return null;

        const permissions: Permissions[] = [];
        for (const rp of doc.role.rolesPermissions) {
            const dbPermissionName = rp.permission.name;
            const permissionKey = Object.keys(PERMISSIONS).find(
                key => PERMISSIONS[key as keyof typeof PERMISSIONS] === dbPermissionName
            ) as Permissions | undefined;
            if (permissionKey) {
                permissions.push(permissionKey);
            }
        }

        return WorkspaceMember.reconstitute(
            doc.id,
            doc.workspace_id,
            doc.name,
            doc.email,
            doc.password_hash,
            doc.role_id,
            doc.is_active,
            doc.created_at,
            doc.role.name as ROLES,
            permissions
        );
    }
}
