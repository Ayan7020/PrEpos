import { ROLES } from "@/generated/prisma/enums";
import { Permissions } from "@/shared/types";

export class WorkspaceMember {
  private constructor(
    public readonly id: string,
    public readonly workspaceId: string,
    public name: string,
    public email: string,
    public readonly passwordHash: string,
    public roleId: string,               
    public isActive: boolean,
    public readonly createdAt: Date,
    public readonly role?: ROLES,
    public readonly permissions?: Permissions[]
  ) {}

  static create(
    id: string,
    workspaceId: string,
    name: string,
    email: string,
    passwordHash: string,
    roleId: string,
  ): WorkspaceMember {
    if (!name.trim()) throw new Error("Name is required");
    if (!email.includes("@")) throw new Error("Invalid email");
    return new WorkspaceMember(id, workspaceId, name, email, passwordHash, roleId, true, new Date());
  }

  static reconstitute(
    id: string,
    workspaceId: string,
    name: string,
    email: string,
    passwordHash: string,
    roleId: string,
    isActive: boolean,
    createdAt: Date,
    role?: ROLES,
    permissions?: Permissions[]
  ): WorkspaceMember {
    return new WorkspaceMember(id, workspaceId, name, email, passwordHash, roleId, isActive, createdAt, role, permissions);
  }

  changeRole(newRoleId: string): void {
    this.roleId = newRoleId;
  }

  deactivate(): void {
    if (!this.isActive) throw new Error("Member already inactive");
    this.isActive = false;
  }
}