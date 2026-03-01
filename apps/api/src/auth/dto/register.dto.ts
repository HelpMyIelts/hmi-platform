import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { RegisterRequest, UserRole } from '@repo/types';

export class RegisterDto implements RegisterRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRole)
  role: UserRole;
}
