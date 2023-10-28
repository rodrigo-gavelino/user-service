// src/core/application/usecases/sign-up/sign-up.use-case.interface.ts

import IUsecase from '@core/shared/interfaces/usercase';

export interface SignUpUseCaseInput {
  name: string;
  email: string;
  password: string;
}

export interface SignUpUseCaseOutput {
  _id: string;
}

export interface ISignUpUseCase
  extends IUsecase<SignUpUseCaseInput, SignUpUseCaseOutput> {
  execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput>;
}
