import { WorkspaceMember } from "../entities";

export interface IWorkspaceMemberRepository {
    save(member: WorkspaceMember): Promise<void>
    findByEmailByWorspace(workspace_id: string,email: string): Promise<WorkspaceMember | null>
}