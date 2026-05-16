import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User, UserRole as PrismaUserRole } from '@prisma/client';
import { UserPayload, UserRole } from '@repo/types';

@Injectable()
export class AuthUtilsService {
  constructor(private configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    if (!password || password.trim().length === 0) {
      throw new BadRequestException('Password cannot be empty');
    }
    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS') || 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validatePasswordStrength(password: string): Promise<void> {
    if (!password || password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }
    if (password.length > 50) {
      throw new BadRequestException('Password must be at most 50 characters long');
    }
  }

  checkUserExists(user: User | null): void {
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
  }

  extractUserPayload(user: User): UserPayload {
    return {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as unknown as UserRole,
    };
  }
}
