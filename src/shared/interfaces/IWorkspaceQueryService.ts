import { Role } from "../types";

export interface WorkspaceMembership {
  id: string;
  role: Role;
  permissions: string[];
}

export interface IWorkspaceQueryService {
  getMembershipsByUserId(userId: string): Promise<WorkspaceMembership[]>;
}