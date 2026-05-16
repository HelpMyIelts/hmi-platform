import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './config/env.validation';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerService } from './common/logger/logger.service';

@Module({
  imports: [
    // ── Config ──────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
    }),

    // ── Modules ──────────────────────────────────────────
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
