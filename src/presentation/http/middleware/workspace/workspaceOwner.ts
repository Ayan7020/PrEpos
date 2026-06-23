import { validateToken } from "@/shared/authorization";
import { UnauthorizedError } from "@/shared/errors";
import { AccessTokenPayload } from "@/shared/types";
import { Request, Response, NextFunction } from "express";

export const isWorkspaceOwner = (req: Request, res: Response, next: NextFunction) => {

    let tokenPayload = (req as any).tokenPayload as AccessTokenPayload | null;
    if (!tokenPayload) {
        console.log(req.cookies)
        const payload = validateToken<AccessTokenPayload>(req.cookies["accessToken"])
        tokenPayload = payload;
        (req as any).tokenPayload = payload;
    } 

    if (tokenPayload.type !== "OWNER") {
        throw new UnauthorizedError("You don't have the permission for the resources")
    }

    next();
}