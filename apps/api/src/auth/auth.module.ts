import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthUtilsService } from './auth.utils.service';
import { JwtStrategy } from './strategies';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET environment variable is not set');
        }
        return {
          secret,
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRY') ?? '15m',
          },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthUtilsService, JwtStrategy],
  exports: [AuthService, AuthUtilsService],
})
export class AuthModule {}
