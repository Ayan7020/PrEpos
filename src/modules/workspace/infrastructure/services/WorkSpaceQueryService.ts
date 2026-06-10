import { IWorkspaceQueryService, WorkspaceMembership } from "@/shared/interfaces";


export class WorkSpaceQueryService implements IWorkspaceQueryService {
    getMembershipsByUserId(userId: string): Promise<WorkspaceMembership[]> {
        
    }
}