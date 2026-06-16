import { Router } from "express";
import { container } from "tsyringe"; 
import { requestSchemaValidator } from "@/presentation/http/middleware/validator"; 
import { WorkspaceController } from "./workspace.controller";
import { CreateWorkspaceSchema } from "./schemas/CreateWorkspaceSchema";

const router = Router();  
const controller = container.resolve(WorkspaceController);

router.post("/create-workspace", requestSchemaValidator(CreateWorkspaceSchema), controller.createWorkspace); 

export default router;