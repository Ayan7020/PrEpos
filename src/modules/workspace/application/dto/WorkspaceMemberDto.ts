import z from "zod";
import { AddWorkspaceMemberSchema } from "../../http/schemas";

 

export type AddWorkspaceMemberDto = z.infer<typeof AddWorkspaceMemberSchema> & {
    workspace_id: string
};
 