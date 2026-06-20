import { commonErrors, jsonBody, jsonResponse, registry } from "@/presentation/http/openapi"; 
import { CreateWorkspaceSchema } from "./schemas";

registry.registerPath({
    method: "post",
    path: "/workspace/create-workspace",
    tags: ["Workspace"],
    summary: "Create a new workspace(EPOS)",
    request: {
        body: jsonBody(CreateWorkspaceSchema),
    },
    responses: {
        200: jsonResponse(CreateWorkspaceSchema,"User registered"),
        ...commonErrors()
    }
});

registry.registerPath({
    method: "post",
    path: "/workspace/add-workspace-member",
    tags: ["Workspace"],
    summary: "Add a member to the workspace",
    request: {
        body: jsonBody(CreateWorkspaceSchema),
    },
    responses: {
        200: jsonResponse(CreateWorkspaceSchema,"User registered"),
        ...commonErrors()
    }
});

 