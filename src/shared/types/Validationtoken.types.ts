import { ROLES } from "@/generated/prisma/enums";
import { Role } from "./authorization.types";
import { Permissions } from "./authorization.types";


export type AccessTokenPayload = {
    type: Role;
    userId: string;
    email: string;
}

export type WorkspaceMemberAccessTokenPayload = {
    workspace_id: string,
    type: ROLES,
    member_id: string,
    role_id: string,
    permissions: Permissions
}