import z from "zod";
import { AddWorkspaceMemberSchema, LoginWorkspaceMemberSchema } from "../../http/schemas";

 

export type AddWorkspaceMemberDto = z.infer<typeof AddWorkspaceMemberSchema> & {
    workspace_id: string,
};

export type LoginWorkspaceMemberDto = z.infer<typeof LoginWorkspaceMemberSchema> & {
    workspace_id: string;
}
 