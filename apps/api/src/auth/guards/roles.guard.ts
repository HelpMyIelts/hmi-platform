import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@repo/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        `Insufficient permissions. Required roles: ${requiredRoles.join(', ')}`
      );
    }

    return true;
  }
}
