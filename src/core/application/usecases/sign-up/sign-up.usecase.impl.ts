// src/core/application/usecases/sign-up/sign-up.use-case.impl.ts

import IUserRepository from '@core/domain/repositories/user.interface.repository';
import Email from '@core/domain/value-objects/email.vo';
import User from '@core/domain/entities/user.entity';
import HashingService from '@core/shared/interfaces/hash-service.interface';
import {
  ISignUpUseCase,
  SignUpUseCaseInput,
  SignUpUseCaseOutput,
} from './sign-up.usecase.interface';
import { Password } from '@core/domain/value-objects/password.vo';

export class SignUpUseCaseImpl implements ISignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const existingUser = await this.userRepository.findByEmail(
      Email.create(input.email),
    );
    if (existingUser) {
      throw new Error('Email already in use.');
    }

    const hashedPassword = await this.hashingService.hash(input.password, 10);
    const passwordVO = await Password.create(hashedPassword);
    const emailVO = Email.create(input.email);

    const user = User.create({
      name: input.name,
      email: emailVO,
      password: passwordVO,
    });

    const createdUser = await this.userRepository.create(user);

    return {
      _id: createdUser.id,
    };
  }
}
