import bcrypt from "bcrypt";
import { App_settings } from "@/config";
import { IPasswordHasher } from "@auth/application/interfaces";
import { injectable } from "tsyringe";

@injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, App_settings.Auth.SaltRounds);
  }
  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
 