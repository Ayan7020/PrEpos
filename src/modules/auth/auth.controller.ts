import { TOKENS } from "@/config";
import { inject, injectable } from "tsyringe";
import { type IAuthService } from "./auth.type";
import { Request, Response } from "express";
import { ApiResponse } from "@/utils/ApiResponse";

@injectable()
export class AuthController {
    constructor(
        @inject(TOKENS.AuthService)
        private readonly authService: IAuthService
    ) { }

    registerUser = async (req: Request, res: Response) => {
        const userResp = await this.authService.CreateUser(req.body);
        return ApiResponse.success(res,userResp);
    }
}