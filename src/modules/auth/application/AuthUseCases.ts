import { LoginUserUseCase, RegisterUserUseCase } from "./use-cases";

export type AuthUseCases = {
  register: RegisterUserUseCase
  login: LoginUserUseCase
}