import { inject, injectable } from "tsyringe";
import { workspaceToken } from "../di";
import { type WorkspaceUseCase } from "../application/workspaceUseCases";
import { Request, Response } from "express";
import { ApiResponse } from "@/presentation/http/helper";
import { BadRequestError } from "@/shared/errors";
import { AccessTokenPayload } from "@/shared/types";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
};

@injectable()
export class WorkspaceController {
    constructor(
        @inject(workspaceToken.WorkspaceUsecase) private readonly workspaceUseCase: WorkspaceUseCase,
    ) { }

    createWorkspace = async (req: Request, res: Response) => {
        const payload_token = (req as any).tokenPayload as AccessTokenPayload;
        const result = await this.workspaceUseCase.create.execute({
            ...req.body,
            owner_id: payload_token.userId,
        });
        return ApiResponse.success(res, result, "workspace created successfully", 201);
    };

    addWorkspaceMember = async (req: Request, res: Response) => {
        const payload_token = (req as any).tokenPayload as AccessTokenPayload;
        await this.workspaceUseCase.members.add.execute({
            ...req.body,
            workspace_id: payload_token.userId,
        });
        return ApiResponse.success(res, {}, "Member added succesfully", 201);
    }

    LoginWorkspace = async (req: Request, res: Response) => {
        const { workspace_id } = req.params;
        if (!workspace_id || Array.isArray(workspace_id)) {
            throw new BadRequestError();
        }

        const result = await this.workspaceUseCase.login.execute({
            ...req.body,
            workspace_id: workspace_id
        });

        res.cookie("refreshToken", result.refresh_token, COOKIE_OPTIONS);

        return ApiResponse.success(res, {
            accessToken: result.access_token,
            member: result.member
        }, "Login successful", 200);
    }

}