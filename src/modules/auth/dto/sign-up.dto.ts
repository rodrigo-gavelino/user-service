import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class SignUpDto {
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  password: string;
}

class SignUpResponseDto {
  _id: string;
  email: string;
}

export default SignUpDto;
export { SignUpResponseDto };
