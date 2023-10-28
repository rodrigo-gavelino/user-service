// src/core/application/handlers/signup.handler.ts

import ICommandHandler from '@core/shared/interfaces/command-handler.interface';
import { SignUpCommand } from '../commands/sign-up.command';
import {
  ISignUpUseCase,
  SignUpUseCaseOutput,
} from '../usecases/sign-up/sign-up.usecase.interface';

export class SignUpHandler
  implements ICommandHandler<SignUpCommand, SignUpUseCaseOutput>
{
  constructor(private readonly signupUsecase: ISignUpUseCase) {}

  async handle(command: SignUpCommand): Promise<SignUpUseCaseOutput> {
    return this.signupUsecase.execute({
      name: command.name,
      email: command.email,
      password: command.password,
    });
  }
}
