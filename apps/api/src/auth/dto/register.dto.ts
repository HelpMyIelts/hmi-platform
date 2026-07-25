import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { RegisterRequest, UserRole } from '@repo/types';

export class RegisterDto implements RegisterRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(50, { message: 'Password must be at most 50 characters' })
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
