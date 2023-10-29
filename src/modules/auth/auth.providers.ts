import { SignUpHandler } from '@core/application/handlers/sign-up.handler';
import { SignUpUseCaseImpl } from '@core/application/usecases/sign-up/sign-up.usecase.impl';
import { ISignUpUseCase } from '@core/application/usecases/sign-up/sign-up.usecase.interface';
import IUserRepository from '@core/domain/repositories/user.interface.repository';
import { UserRepository } from '@core/infrastructure/database/repositories/user.repository';
import { UserDocument } from '@core/infrastructure/database/schemas/user.schema';
import IHashingService from '@core/shared/interfaces/hash-service.interface';
import HashingServiceImpl from '@core/shared/utils/hash-service.impl';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const REPOSITORIES = {
  USER_REPOSITORY: {
    provide: 'UserRepository',
    useExisting: UserRepository,
  },
  USER_REPOSITORY_IMPL: {
    provide: UserRepository,
    useFactory: (userModel: Model<UserDocument>) => {
      return new UserRepository(userModel);
    },
    inject: [getModelToken('User')],
  },
};

export const USECASES = {
  SIGN_UP_USECASE: {
    provide: 'SignUpUseCase',
    useFactory: (
      userRepository: IUserRepository,
      hashingService: IHashingService,
    ) => new SignUpUseCaseImpl(userRepository, hashingService),
    inject: [REPOSITORIES.USER_REPOSITORY.provide, 'HashingService'],
  },
};

export const SERVICES = {
  HASHING_SERVICE: {
    provide: 'HashingService',
    useFactory: () => new HashingServiceImpl(bcrypt),
  },
};

export const HASHING_SERVICE_PROVIDER = {
  provide: 'HashingService',
  useClass: HashingServiceImpl,
};

export const HANDLERS = {
  SIGN_UP_HANDLER: {
    provide: 'SignUpHandler',
    useFactory: (signupUsecase: ISignUpUseCase) =>
      new SignUpHandler(signupUsecase),
    inject: [USECASES.SIGN_UP_USECASE.provide], // Isso se refere ao SignUpUseCase fornecido anteriormente.
  },
};

export const AUTH_PROVIDERS = {
  REPOSITORIES, // Não esqueça de importar isso do arquivo anterior
  USECASES,
  HASHING_SERVICE_PROVIDER,
  HANDLERS,
  SERVICES,
};
