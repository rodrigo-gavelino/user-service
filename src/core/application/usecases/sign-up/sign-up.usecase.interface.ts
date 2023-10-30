// src/core/application/usecases/sign-up/sign-up.use-case.interface.ts

import IUsecase from '@core/shared/application/usercase.interface';

export interface SignUpUsecaseInput {
  name: string;
  email: string;
  password: string;
}

export interface SignUpUsecaseOutput {
  _id: string;
  email: string;
}

export interface ISignUpUseCase
  extends IUsecase<SignUpUsecaseInput, SignUpUsecaseOutput> {
  execute(input: SignUpUsecaseInput): Promise<SignUpUsecaseOutput>;
}
