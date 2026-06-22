import jwt from "jsonwebtoken"; 
import { App_settings, Env } from "@/config";
import { IJwtService } from "../interfaces";

export class JwtService implements IJwtService {
    signAccessToken<T extends Object>(payload: T): string {
        return jwt.sign(payload, Env.AccessTokenSecret, {
            expiresIn: `${App_settings.Auth.access_token_life_minutes}m`
        })
    }
    signRefreshToken(payload: { userId: string; }): string {
        return jwt.sign(payload, Env.RefreshTokenSecret, {
            expiresIn: `${App_settings.Auth.refresh_token_life_days}d`
        });

    }
    verifyAccessToken<T extends Object>(token: string): T | null {
        try {  
            return jwt.verify(token.trim(), Env.AccessTokenSecret) as T;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    verifyRefreshToken(token: string): { userId: string; } | null {
        try {
            return jwt.verify(token, Env.RefreshTokenSecret) as {
                userId: string;
            };
        } catch {
            return null;
        }
    }
}