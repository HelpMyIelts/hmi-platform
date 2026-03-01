import { IsEmail, IsString, IsOptional } from 'class-validator';
import { LoginRequest } from '@repo/types';

export class LoginDto implements LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;
}
