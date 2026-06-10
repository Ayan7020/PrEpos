import { WorkSpaceMember } from "../entities";

export interface IWorkSpaceRepository {
    findAllByUserId(user_id: string): Promise<WorkSpaceMember[]>
}