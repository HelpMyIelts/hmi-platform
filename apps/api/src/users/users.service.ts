import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, UserRole } from '../../generated/prisma/client.js';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { passwordHash, ...userData } = await this.prisma.user.create({
      data: createUserDto,
    });
    return userData as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    });
    return users as unknown as User[];
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const { passwordHash, ...userData } = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return userData as User;
  }

  async remove(id: string): Promise<User> {
    const { passwordHash, ...userData } = await this.prisma.user.delete({
      where: { id },
    });
    return userData as User;
  }
}
