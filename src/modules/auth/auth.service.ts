import { SignUpCommand } from '@core/application/commands/sign-up.command';
import { SignUpHandler } from '@core/application/handlers/sign-up.handler';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SignUpHandler')
    private readonly signUpHandler: SignUpHandler,
  ) {}

  async signUp(name: string, email: string, password: string): Promise<void> {
    const signUpCommand = new SignUpCommand(name, email, password);
    await this.signUpHandler.handle(signUpCommand);
  }
}
