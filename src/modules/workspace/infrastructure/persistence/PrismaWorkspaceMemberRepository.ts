import { injectable } from "tsyringe";
import { prisma } from "@/infrastructure/db";
import { IWorkSpaceRepository } from "../../domain/repositories";
import { WorkSpaceMember } from "../../domain/entities";

@injectable()
export class PrismaWorkspaceMemberRepository implements IWorkSpaceRepository {
    async findAllByUserId(user_id: string): Promise<WorkSpaceMember[]> {
        const docs = await prisma.workSpaceMember.findMany({
            where: {
                user_id: user_id
            } 
        });

        prisma.rolesPermissions.findMany({
            where: {
                
            }
        });
        return docs.map((d) => this.constructWorkSpaceMemberEntity(d))
    }

    private constructWorkSpaceMemberEntity(doc: any): WorkSpaceMember {
        return WorkSpaceMember.reconstitute(
            doc.id,
            doc.user_id,
            doc.workspace_id,
            doc.role,
            doc.permissions.map((p: any) => p.permission),
            doc.is_active,
            doc.joined_at,
        );
    }

}
