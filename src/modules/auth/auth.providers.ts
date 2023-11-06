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
import { KafkaMessagingService } from '@core/infrastructure/messaging/kafka-messaging.service';
import SendEmailWhenAnUserIsCreatedHandler from '@core/domain/events/user/handler/send-email-when-an-user-is-created.handler';
import UserCreatedEvent from '@core/domain/events/user/user-created.event';
import EventDispatcher from '@core/domain/events/event-dispatcher';
import { RabbitMQMessagingService } from '@core/infrastructure/messaging/rabbit-mq-messaging.service';

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
  KAFKA_MESSAGING_SERVICE: {
    provide: 'KafkaMessagingService',
    useFactory: () => new KafkaMessagingService(['kafka:9092']),
  },
  RABBITMQ_MESSAGING_SERVICE: {
    provide: 'RabbitMQMessagingService',
    useFactory: () =>
      new RabbitMQMessagingService(['amqp://user:password@rabbitmq:5672']),
  },
};

export const HANDLERS = {
  SIGN_UP_HANDLER: {
    provide: 'SignUpHandler',
    useFactory: (signupUsecase: ISignUpUseCase) =>
      new SignUpHandler(signupUsecase),
    inject: [USECASES.SIGN_UP_USECASE.provide],
  },
  SEND_EMAIL_HANDLER: {
    provide: 'SendEmailWhenAnUserIsCreatedHandler',
    useFactory: (rabbitMqService: RabbitMQMessagingService) =>
      new SendEmailWhenAnUserIsCreatedHandler(rabbitMqService),
    inject: [SERVICES.RABBITMQ_MESSAGING_SERVICE.provide],
  },
};

export const EVENTS = {
  EVENT_DISPATCHER: {
    provide: 'IEventDispatcher',
    useClass: EventDispatcher,
  },

  USER_CREATED_EVENT: {
    provide: 'UserCreatedEvent',
    useFactory: (event: any) => new UserCreatedEvent(event),
  },
};

export const AUTH_PROVIDERS = {
  REPOSITORIES,
  USECASES,
  HANDLERS,
  SERVICES,
  EVENTS,
};
