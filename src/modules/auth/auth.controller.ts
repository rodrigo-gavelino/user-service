import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUpDto, { SignUpResponseDto } from './dto/sign-up.dto';

import { SignUpExceptionsFilter } from './exception-filters/sign-up-exceptions-filter';

@Controller('auth')
@UseFilters(new SignUpExceptionsFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const result = await this.authService.signUp(signUpDto);
    return result;
  }
}
