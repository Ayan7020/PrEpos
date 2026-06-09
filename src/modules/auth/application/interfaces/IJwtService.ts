import { WorkspaceMembership } from "@/shared/interfaces"; 


export interface AccessTokenPayload {
  userId: string;
  workspaces: WorkspaceMembership[];
}

export interface IJwtService {
  signAccessToken(payload: AccessTokenPayload): string;
  signRefreshToken(payload: { userId: string }): string;
  verifyAccessToken(token: string): AccessTokenPayload | null;
}