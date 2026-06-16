import { v4 as uuid } from "uuid";
import { inject, injectable } from "tsyringe"; 
import { type IUserRepository } from "../../domain/repositories/IUserRepository";
import { type IPasswordHasher } from "../interfaces/IPasswordHasher";
import { User } from "../../domain/entities/User";
import { RegisterUserDTO, RegisterResultDTO } from "../dtos/AuthDTOs";
import { ConflictError } from "@/shared/errors"; 
import { AuthTOKENS } from "../../di"; 

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject(AuthTOKENS.AuthRepository) private readonly userRepo: IUserRepository,
    @inject(AuthTOKENS.PasswordHasher) private readonly hasher: IPasswordHasher,
  ) {}

  async execute(dto: RegisterUserDTO): Promise<RegisterResultDTO> { 

    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) throw new ConflictError("Email Already Exists");

    
    const passwordHash = await this.hasher.hash(dto.password);

    const user = User.register(uuid(), dto.name, dto.email, passwordHash); 

    await this.userRepo.save(user);

    return { id: user.id };
  }
}