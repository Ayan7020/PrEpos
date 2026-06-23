import { inject, injectable } from "tsyringe"; 
import { Request, Response } from "express";
import { ApiResponse } from "@/presentation/http/helper/ApiResponse";  
import { type AuthUseCases } from "../application/AuthUseCases"; 
import { AuthTOKENS } from "../di";

const COOKIE_OPTIONS = {
  httpOnly: true,       
  secure: process.env.NODE_ENV === "production",   
  sameSite: "strict" as const,   
  maxAge: 7 * 24 * 60 * 60 * 1000,   
  path: "/",
};

@injectable()
export class AuthController {
  constructor(
    @inject(AuthTOKENS.AuthUseCases)
    private readonly authUseCase: AuthUseCases,
  ) {}

  registerUser = async (req: Request, res: Response) => {
    const result = await this.authUseCase.register.execute(req.body);
    return ApiResponse.success(res, result,"user created successfully",201);
  };

  loginUser = async (req: Request,res: Response) => {
    const result = await this.authUseCase.login.execute(req.body);

    res.cookie("accessToken",result.access_token, COOKIE_OPTIONS);
    res.cookie("refreshToken",result.refresh_token, COOKIE_OPTIONS);

    return ApiResponse.success(res,{
      user: result.user
    },"Login Successful")
  }
}