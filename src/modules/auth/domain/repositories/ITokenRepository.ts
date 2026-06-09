export interface ITokenRepository {
  save(userId: string, refreshToken: string, expiresAt: Date): Promise<void>;
  findByToken(refreshToken: string): Promise<{ userId: string; expiresAt: Date } | null>;
  deleteByToken(refreshToken: string): Promise<void>;
  deleteAllByUserId(userId: string): Promise<void>;  
}