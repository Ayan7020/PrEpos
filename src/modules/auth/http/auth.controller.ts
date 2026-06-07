import { inject, injectable } from "tsyringe"; 
import { Request, Response } from "express";
import { ApiResponse } from "@/utils/ApiResponse"; 
import { AuthTOKENS } from "../di";
import { type AuthUseCases } from "../application/AuthUseCases";

@injectable()
export class AuthController {
  constructor(
    @inject(AuthTOKENS.AuthUseCases)
    private readonly authUseCase: AuthUseCases,
  ) {}

  registerUser = async (req: Request, res: Response) => {
    const result = await this.authUseCase.register.execute(req.body);
    return ApiResponse.success(res, result);
  };
}