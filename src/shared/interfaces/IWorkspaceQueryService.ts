import { WorkSpaceInformation } from "../types";


export interface IWorkspaceQueryService {
  getWorkSpaceInformationByUserId(userId: string): Promise<WorkSpaceInformation[]>;
}