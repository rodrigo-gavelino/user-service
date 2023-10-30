// src/core/application/usecases/sign-up/sign-up.use-case.impl.ts

import IUserRepository from '@core/domain/repositories/user.interface.repository';
import Email, { InvalidEmailError } from '@core/domain/value-objects/email.vo';
import User from '@core/domain/entities/user.entity';
import HashingService from '@core/shared/interfaces/hash-service.interface';
import {
  ISignUpUseCase,
  SignUpUsecaseInput,
  SignUpUsecaseOutput,
} from './sign-up.usecase.interface';
import { Password } from '@core/domain/value-objects/password.vo';

export class SignUpUseCaseImpl implements ISignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(input: SignUpUsecaseInput): Promise<SignUpUsecaseOutput> {
    const existingUser = await this.userRepository.findByEmail(
      Email.create(input.email),
    );
    if (existingUser) {
      throw new InvalidEmailError('Email already in use.');
    }

    const passwordVO = await Password.create(input.password);
    const hashedPassword = await this.hashingService.hash(passwordVO.value, 10);
    const password = Password.create(hashedPassword);
    const emailVO = Email.create(input.email);

    const user = User.create({
      name: input.name,
      email: emailVO,
      password: password,
    });

    const createdUser = await this.userRepository.create(user);

    return {
      _id: createdUser.id,
      email: createdUser.email.value,
    };
  }
}
