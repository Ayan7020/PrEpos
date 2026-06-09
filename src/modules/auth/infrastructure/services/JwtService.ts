import jwt from "jsonwebtoken";
import { AccessTokenPayload, IJwtService } from "../../application/interfaces";
import { App_settings, Env } from "@/config";

export class JwtService implements IJwtService {
    signAccessToken(payload: AccessTokenPayload): string {
        return jwt.sign(payload, Env.AccessTokenSecret, {
            expiresIn: `${App_settings.Auth.access_token_life_minutes}m`
        })
    }
    signRefreshToken(payload: { userId: string; }): string {
        return jwt.sign(payload, Env.RefreshTokenSecret, {
            expiresIn: `${App_settings.Auth.refresh_token_life_days}d`
        });

    }
    verifyAccessToken(token: string): AccessTokenPayload | null {
        try {
            return jwt.verify(token, Env.AccessTokenSecret) as AccessTokenPayload;
        } catch {
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