import { SHAREDTOKENS } from "@/shared/di";
import { UnauthorizedError } from "@/shared/errors";
import { IJwtService } from "@/shared/interfaces";
import { AccessTokenPayload } from "@/shared/types";
import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

export const isWorkspaceOwner = (req: Request, res: Response, next: NextFunction) => {
    const BearerToken = req.headers.authorization;
    if (!BearerToken) {
        throw new UnauthorizedError("Token missing")
    }


    const token = BearerToken.split("Bearer")[1];
    if (!token) {
        throw new UnauthorizedError("Invalid Token Format!")
    }

    const jwtService = container.resolve<IJwtService>(SHAREDTOKENS.JwtService);
    const verifiedToken = jwtService.verifyAccessToken<AccessTokenPayload>(token);

    if(!verifiedToken || verifiedToken.type !== "OWNER") {
        throw new UnauthorizedError("You don't have the permission for the resources")
    }

    next();
}