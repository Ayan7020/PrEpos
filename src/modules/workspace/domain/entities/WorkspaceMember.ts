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
  ): WorkspaceMember {
    return new WorkspaceMember(id, workspaceId, name, email, passwordHash, roleId, isActive, createdAt);
  }

  changeRole(newRoleId: string): void {
    this.roleId = newRoleId;
  }

  deactivate(): void {
    if (!this.isActive) throw new Error("Member already inactive");
    this.isActive = false;
  }
}