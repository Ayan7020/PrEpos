import z from "zod";
import { CreateWorkspaceSchema } from "@workspace/http/schemas";

export type CreateWorkspaceDto = z.infer<typeof CreateWorkspaceSchema> & {
    owner_id: string
};

export type CreateWorkspaceResultDto = {
    workspace_id: string
}