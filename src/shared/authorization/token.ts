import { container } from "tsyringe";
import { UnauthorizedError } from "../errors";
import { IJwtService } from "../interfaces";
import { SHAREDTOKENS } from "../di"; 

export const validateToken = <T extends Object>(token?: string): T  => { 
    if (!token || typeof token === "undefined") {
        throw new UnauthorizedError("You are not allowed to view the resources")
    }
 

    const jwtService = container.resolve<IJwtService>(SHAREDTOKENS.JwtService); 
    const veiryToken = jwtService.verifyAccessToken<T>(token); 
    if(!veiryToken) {
        throw new UnauthorizedError("Failed to validate the Token")
    }
    return veiryToken;
}