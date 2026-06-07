export interface IJwtService {
  sign(payload: { userId: string; role: string }): string;
  verify(token: string): { userId: string; role: string } | null;
}