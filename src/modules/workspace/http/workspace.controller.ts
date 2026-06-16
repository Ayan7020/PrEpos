import { inject, injectable } from "tsyringe";
import { workspaceToken } from "../di";
import { type WorkspaceUseCase } from "../application/workspaceUseCases";
import { Request, Response } from "express";
import { ApiResponse } from "@/presentation/http/helper";


@injectable()
export class WorkspaceController {
    constructor(
        @inject(workspaceToken.WorkspaceUsecase) private readonly workspaceUseCase: WorkspaceUseCase,
    ) { }

    createWorkspace = async (req: Request, res: Response) => { 
        const result = await this.workspaceUseCase.create.execute({
            ...req.body,
            owner_id: (req as any).userId,
        });
        return ApiResponse.success(res, result, "workspace created successfully", 201);
    };

}