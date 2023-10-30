// src/core/application/handlers/signup.handler.ts

import ICommandHandler from '@core/shared/interfaces/command-handler.interface';
import { SignUpCommand } from '../commands/sign-up.command';
import {
  ISignUpUseCase,
  SignUpUsecaseOutput,
} from '../usecases/sign-up/sign-up.usecase.interface';

export class SignUpHandler
  implements ICommandHandler<SignUpCommand, SignUpUsecaseOutput>
{
  constructor(private readonly signupUsecase: ISignUpUseCase) {}

  async handle(command: SignUpCommand): Promise<SignUpUsecaseOutput> {
    return this.signupUsecase.execute(command);
  }
}
