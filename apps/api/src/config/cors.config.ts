import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class CorsConfigService {
  constructor(private configService: ConfigService) {}

  createCorsOptions(): CorsOptions {
    const nodeEnv = this.configService.get<string>('NODE_ENV') || 'development';
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    // Define allowed origins based on environment
    const allowedOrigins = this.getAllowedOrigins(nodeEnv, frontendUrl);

    return {
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'X-API-Key',
      ],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      maxAge: 3600, // 1 hour
      optionsSuccessStatus: 200,
    };
  }

  private getAllowedOrigins(
    nodeEnv: string,
    frontendUrl?: string,
  ): (string | RegExp)[] | boolean {
    if (nodeEnv === 'production') {
      // Production: only allow specified frontend URL
      if (!frontendUrl) {
        console.warn('FRONTEND_URL not set in production - CORS may be restrictive');
        return [];
      }
      return [frontendUrl];
    }

    if (nodeEnv === 'staging') {
      // Staging: allow staging and production URLs
      return [
        'https://staging.helpmyielts.com',
        'https://helpmyielts.com',
        'http://localhost:4000',
        'http://localhost:3000',
      ];
    }

    // Development: allow localhost and common dev URLs
    return [
      /^http:\/\/localhost:\d+$/,
      /^http:\/\/127\.0\.0\.1:\d+$/,
      'http://localhost:4000',
      'http://localhost:3000',
      'http://localhost:3001',
    ];
  }
}
