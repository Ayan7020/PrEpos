import z from "zod";
import { CreateUserSchema } from "./auth.schema";
import { User } from "@/generated/prisma/client";

export type CreateUserDto = z.infer<typeof CreateUserSchema>

export type createUserResponse = {
    id: string
}

export interface IAuthService {
    CreateUser(data: CreateUserDto): Promise<createUserResponse>
}

export interface IAuthRepo {
    findByEmail(email: string): Promise<User | null>;

    createUser(data: CreateUserDto): Promise<createUserResponse>;
}