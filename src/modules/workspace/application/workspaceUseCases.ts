import { CreateWorkSpaceUseCase } from "./use-cases"
import { AddWorkSpaceMemberUseCase } from "./use-cases/AddWorkSpaceMemberUseCase"
 
export type WorkspaceUseCase = {
  create: CreateWorkSpaceUseCase,
  members: {
    add: AddWorkSpaceMemberUseCase
  }
}