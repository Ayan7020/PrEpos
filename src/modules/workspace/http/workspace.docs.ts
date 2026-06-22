import { commonErrors, jsonBody, jsonResponse, registry } from "@/presentation/http/openapi";
import { CreateWorkspaceSchema } from "./schemas";
import z from "zod";

registry.registerPath({
    method: "post",
    path: "/workspace/create-workspace",
    tags: ["Workspace"],
    summary: "Create a new workspace(EPOS)",
    request: {
        body: jsonBody(CreateWorkspaceSchema),
    },
    responses: {
        200: jsonResponse(CreateWorkspaceSchema, "User registered"),
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
        200: jsonResponse(CreateWorkspaceSchema, "User registered"),
        ...commonErrors()
    }
});

registry.registerPath({
    method: "post",
    path: "/workspace/{workspace_id}/login",
    tags: ["Workspace"],
    summary: "Login to the specific Workspace(EPOS)",
    request: {
        params: z.object({
            workspace_id: z.string(),
        }),
        body: jsonBody(CreateWorkspaceSchema),
    },
    responses: {
        200: jsonResponse(CreateWorkspaceSchema, "User registered"),
        ...commonErrors()
    }
});

