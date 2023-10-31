import { SignUpHandler } from '@core/application/handlers/sign-up.handler';
import { Inject, Injectable } from '@nestjs/common';
import SignUpDto, { SignUpResponseDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import IEventDispatcher from '@core/domain/events/@shared/event-dispatcher.interface';
import SendEmailWhenAnUserIsCreatedHandler from '@core/domain/events/user/handler/send-email-when-an-user-is-created.handler';
import UserCreatedEvent from '@core/domain/events/user/user-created.event';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SignUpHandler')
    private readonly signUpHandler: SignUpHandler,
    private readonly jwtService: JwtService,
    @Inject('IEventDispatcher')
    private readonly eventDispatcher: IEventDispatcher,
    @Inject('SendEmailWhenAnUserIsCreatedHandler')
    private readonly emailHandler: SendEmailWhenAnUserIsCreatedHandler,
  ) {
    this.eventDispatcher.register(UserCreatedEvent.name, this.emailHandler);
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const result = await this.signUpHandler.handle(signUpDto);
    const token = this.jwtService.sign({ _id: result._id });

    if (result && token) {
      const event = new UserCreatedEvent({
        id: result._id,
        email: result.email,
        token: token,
      });

      this.eventDispatcher.notify(event);
    }

    return {
      _id: result._id,
      email: result.email,
      token: token,
    };
  }
}
