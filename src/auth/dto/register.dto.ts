import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsPhoneNumber('UZ', { message: 'Invalid Uzbekistan phone number' })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
