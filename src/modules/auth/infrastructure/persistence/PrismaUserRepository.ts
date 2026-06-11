import { injectable } from "tsyringe";
import { prisma } from "@/infrastructure/db";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "@auth/domain/entities";

@injectable()
export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const doc = await prisma.user.findFirst({ where: { email } });
    if (!doc) return null;
    return User.reconstitute(
      doc.id, doc.name, doc.email,
      doc.password_hash, doc.created_at
    );
  }

  async save(user: User): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.user.upsert({
        where: { id: user.id },
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
          password_hash: user.passwordHash
        },
        update: {},
      });

      // await tx.outboxEvent.create({
      //   data: { 

      //    }
      // });
    });
  }
}
