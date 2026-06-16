import { WorkSpace } from "../entities";

export interface IWorkSpaceRepository {
    save(data: WorkSpace): Promise<void>
}