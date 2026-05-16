import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { LoginRequest } from '@repo/types';

export class LoginDto implements LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(50, { message: 'Password must be at most 50 characters' })
  password: string;
}
