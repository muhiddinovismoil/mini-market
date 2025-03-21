import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
