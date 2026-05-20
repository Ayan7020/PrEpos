import z from "zod";
import { CreateUserSchema } from "./auth.schema";

export type CreateUserDto = z.infer<typeof CreateUserSchema>

export interface IAuthService {
    CreateUser(data: CreateUserDto): Promise<{ id: string }>
}

export interface IAuthRepo {
    findByEmail(email: string): Promise<CreateUserDto | null>;

    createUser(data: CreateUserDto): Promise<{ id: string }>;
}