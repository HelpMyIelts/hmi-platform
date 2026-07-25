import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { CorsConfigService } from './config/cors.config';
import {
  GlobalExceptionFilter,
  LoggerService,
  ResponseInterceptor,
} from './common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger(NestApplication.name);
  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);

  // ── Security ────────────────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: false,
      hsts: {
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true,
        preload: true,
      },
      crossOriginOpenerPolicy: {
        policy: 'same-origin-allow-popups', // Allow popups for OAuth flows
      },
    }),
  );

  // ── CORS ─────────────────────────────────────────────────
  const corsConfigService = new CorsConfigService(configService);
  app.enableCors(corsConfigService.createCorsOptions());

  // ── Body Parser ──────────────────────────────────────────
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // ── Global Pipes ────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ── Global Filters & Interceptors ───────────────────────
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // ── App Configuration ───────────────────────────────────
  app.setGlobalPrefix('api/v1');
  app.disable('etag');

  const port = configService.get<number>('PORT') || 4002;
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';

  // ── Swagger Documentation (Phase 4) ─────────────────────
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('HelpMyIELTS API')
      .setDescription('REST API for HelpMyIELTS platform')
      .setVersion('1.0.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access_token',
      )
      .addTag('Auth', 'Authentication endpoints')
      .addTag('Users', 'User management endpoints')
      .addTag('Tests', 'Test management endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(port, '0.0.0.0');

  logger.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  logger.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
  logger.log(`📝 Environment: ${nodeEnv}`);
  if (nodeEnv !== 'production') {
    logger.log(`📚 Swagger Docs: http://localhost:${port}/api/docs`);
  }
  logger.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
