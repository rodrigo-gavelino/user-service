import { SignUpHandler } from '@core/application/handlers/sign-up.handler';
import { Inject, Injectable } from '@nestjs/common';
import SignUpDto, { SignUpResponseDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SignUpHandler')
    private readonly signUpHandler: SignUpHandler,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const result = await this.signUpHandler.handle(signUpDto);
    const token = this.jwtService.sign({ _id: result._id });
    return {
      _id: result._id,
      email: result.email,
      token: token,
    };
  }
}
