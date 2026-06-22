import { validateToken } from "@/shared/authorization"
import { ForbiddenError, UnauthorizedError } from "@/shared/errors"
import { Permissions, WorkspaceMemberAccessTokenPayload } from "@/shared/types"
import { Request, Response, NextFunction } from "express"

export const permissionValidator = (requiredPermission: Permissions) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let tokenPayload = (req as any).tokenPayload as WorkspaceMemberAccessTokenPayload | null;
        if(!tokenPayload) {
            const payload = validateToken<WorkspaceMemberAccessTokenPayload>(req.headers.authorization) 
            tokenPayload = payload;
            (req as any).tokenPayload  = payload;
        }

        if(tokenPayload.permissions !== requiredPermission) {
            throw new ForbiddenError("You do not have the authority for this resources.")
        } 
        next();
    }

}