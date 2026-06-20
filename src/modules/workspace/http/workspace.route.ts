import { Router } from "express";
import { container } from "tsyringe";
import { requestSchemaValidator } from "@/presentation/http/middleware/validator";
import { WorkspaceController } from "./workspace.controller";
import { AddWorkspaceMemberSchema, CreateWorkspaceSchema } from "./schemas";
import { isWorkspaceOwner } from "@/presentation/http/middleware/workspace";

const router = Router();
const controller = container.resolve(WorkspaceController);

router.post("/create-workspace", isWorkspaceOwner, requestSchemaValidator(CreateWorkspaceSchema), controller.createWorkspace);
router.post("/add-workspace-member", requestSchemaValidator(AddWorkspaceMemberSchema), controller.addWorkspaceMember);


export default router;