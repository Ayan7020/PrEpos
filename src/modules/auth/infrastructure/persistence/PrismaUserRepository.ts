import { injectable } from "tsyringe";
import { prisma } from "@/lib/prisma";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

@injectable()
export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const doc = await prisma.user.findFirst({ where: { email } });
    if (!doc) return null;
    return User.reconstitute(
      doc.id, doc.name, doc.store_name, doc.email,
      doc.password_hash, doc.created_at, doc.is_active
    );
  }

  async save(user: User): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.user.upsert({
        where: { id: user.id },
        create: {
          id: user.id,
          name: user.name,
          store_name: user.storeName,
          email: user.email,
          password_hash: user.passwordHash,
          is_active: user.isActive,
        },
        update: { is_active: user.isActive },
      }); 

      await tx.user_OutBox.create({
        data: { user_id: user.id, status: "Pending" }
      });
    });
  }
}
