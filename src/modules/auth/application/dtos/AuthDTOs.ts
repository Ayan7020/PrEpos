import { z } from "zod";
import { CreateUserSchema } from "../../http/Authschema";

export type RegisterUserDTO = z.infer<typeof CreateUserSchema>;
export interface RegisterResultDTO {
  id: string;
}