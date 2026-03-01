import { IsEmail, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../../../generated/prisma/client.js';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRole)
  role: UserRole;
}
