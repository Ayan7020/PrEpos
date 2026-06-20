import { registry } from "@/presentation/http/openapi";

export * from "./CreateWorkspaceSchema"; 
export * from "./AddWorkspaceMemberSchema";

import {
    CreateWorkspaceSchema
} from "./CreateWorkspaceSchema";
  

registry.register("CreateWorkspaceSchema",CreateWorkspaceSchema); 