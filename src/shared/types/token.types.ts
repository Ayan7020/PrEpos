import { Role } from "./authorization.types";

export type AccessTokenPayload = {
    type: Role;
    userId: string;
    email: string;
} 