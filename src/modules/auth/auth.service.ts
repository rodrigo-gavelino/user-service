import { SignUpHandler } from '@core/application/handlers/sign-up.handler';
import { Inject, Injectable } from '@nestjs/common';
import SignUpDto, { SignUpResponseDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SignUpHandler')
    private readonly signUpHandler: SignUpHandler,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const result = await this.signUpHandler.handle(signUpDto);
    return {
      _id: result._id,
      email: result.email,
    };
  }
}
