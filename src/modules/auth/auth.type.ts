import z from "zod";
import { CreateUserSchema } from "./auth.schema";
import { User } from "@/generated/prisma/client";

export type CreateUserDto = z.infer<typeof CreateUserSchema>

export interface IAuthService {
    CreateUser(data: CreateUserDto): Promise<{ id: string }>
}

export interface IAuthRepo {
    findByEmail(email: string): Promise<User | null>;

    createUser(data: CreateUserDto): Promise<{ id: string }>;
}