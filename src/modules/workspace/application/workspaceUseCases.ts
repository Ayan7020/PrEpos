import { CreateWorkSpaceUseCase } from "./use-cases"
import { AddWorkSpaceMemberUseCase } from "./use-cases/AddWorkSpaceMemberUseCase"
import { LoginWorkspaceMemberUseCase } from "./use-cases/LoginWorkspaceMemberUseCase"
 
export type WorkspaceUseCase = {
  create: CreateWorkSpaceUseCase,
  login: LoginWorkspaceMemberUseCase,
  members: {
    add: AddWorkSpaceMemberUseCase
  }
}