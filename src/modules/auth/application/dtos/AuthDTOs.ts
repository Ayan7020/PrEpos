import { z } from "zod";
import { CreateUserSchema } from "../../http/schemas";
import { LoginUserSchema } from "../../http/schemas/LoginUserschema";

export type RegisterUserDTO = z.infer<typeof CreateUserSchema>;
export interface RegisterResultDTO {
  id: string;
}

export type LoginUserDTO = z.infer<typeof LoginUserSchema>