import { container } from "tsyringe";
import { UnauthorizedError } from "../errors";
import { IJwtService } from "../interfaces";
import { SHAREDTOKENS } from "../di"; 

export const validateToken = <T extends Object>(token?: string): T  => {
    const BearerToken = token;
    if (!BearerToken) {
        throw new UnauthorizedError("Token missing")
    }


    const tokenWithoutBearer = BearerToken.split("Bearer")[1];
    if (!tokenWithoutBearer) {
        throw new UnauthorizedError("Invalid Token Format!")
    }

    const jwtService = container.resolve<IJwtService>(SHAREDTOKENS.JwtService); 
    const veiryToken = jwtService.verifyAccessToken<T>(tokenWithoutBearer); 
    if(!veiryToken) {
        throw new UnauthorizedError("Failed to validate the Token")
    }
    return veiryToken;
}