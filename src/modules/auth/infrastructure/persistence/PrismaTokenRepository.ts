import { injectable } from "tsyringe";
import { prisma } from "@/lib/prisma";
import { ITokenRepository } from "../../domain/repositories/ITokenRepository";

@injectable()
export class PrismaTokenRepository implements ITokenRepository {
    async save(userId: string, refreshToken: string, expiresAt: Date): Promise<void> {
        await prisma.refreshToken.create({
            data: {
                user_id: userId,
                token: refreshToken,
                expiresAt: expiresAt
            }
        })
    };

    async findByToken(refreshToken: string): Promise<{ userId: string; expiresAt: Date; } | null> {
        const record = await prisma.refreshToken.findFirst({
            where: { token: refreshToken },
        });
        if (!record) return null;

        return { userId: record.user_id, expiresAt: record.expiresAt };
    };


    async deleteByToken(refreshToken: string): Promise<void> {
        await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    };

    async deleteAllByUserId(userId: string): Promise<void> {
        await prisma.refreshToken.deleteMany({ where: { user_id: userId } });
    };

}
