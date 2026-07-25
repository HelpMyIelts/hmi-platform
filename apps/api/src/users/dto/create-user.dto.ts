import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  passwordHash?: string;

  @IsString()
  @IsOptional()
  googleId?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;
}
