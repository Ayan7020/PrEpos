import { User } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { CreateUserDto, IAuthRepo } from "@/modules/auth/auth.type";
import { injectable } from "tsyringe";

@injectable()
export class AuthPrismaRepository implements IAuthRepo {
    async findByEmail(email: string): Promise<User | null> {
        const userData = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        return userData;
    }

    async createUser(data: CreateUserDto): Promise<{ id: string }> {
        const user_id = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name: data.name,
                    store_name: data.store_name,
                    email: data.email,
                    password_hash: data.password
                }
            });
            await tx.user_OutBox.create({
                data: {
                    user_id: user.id,
                    status: "Pending"
                }
            });
            return user.id;
        });

        return {
            id: user_id
        }
    }
}