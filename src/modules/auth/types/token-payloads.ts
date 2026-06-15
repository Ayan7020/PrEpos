import { Role } from "@/shared/types";

export type OwnerAccessTokenPayload = {
    type: Role;
    userId: string;
    email: string;
} 