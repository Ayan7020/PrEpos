import { Permission, Role } from "@/shared/types";

export class WorkSpaceMember {
    private constructor(
        public readonly id: string,
        public readonly user_id: string,
        public readonly workspace_id: string,
        public role: Role,

        public permissions: Permission[],
        public isActive: boolean,
        public readonly joinedAt: Date,
    ) { }


    static create(
        id: string, userId: string, workspaceId: string, role: Role
    ): WorkSpaceMember {
        return new WorkSpaceMember(id, userId, workspaceId, role, [], true, new Date());
    }

    static reconstitute(
        id: string, userId: string, workspaceId: string, role: Role,
        permissions: Permission[], isActive: boolean, joinedAt: Date
    ): WorkSpaceMember {
        return new WorkSpaceMember(id, userId, workspaceId, role, permissions, isActive, joinedAt);
    }

    changeRole(newRole: Role): void {
        if (this.role === "OWNER" && newRole !== "OWNER") {
            throw new Error("Cannot change owner role directly — transfer ownership first");
        }
        this.role = newRole;
    }

    grantPermission(permission: Permission): void {
        if (!this.permissions.includes(permission)) {
            this.permissions.push(permission);
        }
    }

    revokePermission(permission: Permission): void {
        this.permissions = this.permissions.filter((p) => p !== permission);
    }

    deactivate(): void {
        if (!this.isActive) throw new Error("Member already inactive");
        this.isActive = false;
    } 
}