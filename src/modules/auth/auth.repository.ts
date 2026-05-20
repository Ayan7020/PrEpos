import { CreateUserDto, IAuthRepo } from "@/modules/auth/auth.type";
import { injectable } from "tsyringe";

@injectable()
export class AuthPrismaRepository implements IAuthRepo {

    async findByEmail(email: string) {
        return null;
    }

    async createUser(data: CreateUserDto) {
        return {
            id: "Something-in-guid"
        };
    }
}