import { injectable } from "tsyringe"; 
import { IWorkspaceMemberRepository } from "../../domain/repositories"; 
import { WorkSpaceMember } from "../../domain/entities";
import { prisma } from "@/infrastructure/db";

@injectable()
export class PrismaWorkspaceMemberRepository implements IWorkspaceMemberRepository {
    async save(data: WorkSpaceMember[]): Promise<void> {
        data.map(async (d) => {
            await prisma.workspaceMember.upsert({
                where: { id: d.id},
                create: {
                    email: d.
                }
            })
        })
    }

}
