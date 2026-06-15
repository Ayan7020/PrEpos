
export interface IJwtService {
  signAccessToken<T extends Object>(payload: T): string;
  signRefreshToken(payload: { userId: string }): string;
  verifyAccessToken<T extends Object>(token: string): T | null;
  verifyRefreshToken(token: string): { userId: string } | null;
}