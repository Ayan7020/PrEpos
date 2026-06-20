import { WorkspaceMember } from "../entities";

export interface IWorkspaceMemberRepository {
    save(member: WorkspaceMember): Promise<void>
}