import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message?: string;
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode || 200;
        const duration = Date.now() - startTime;

        const apiResponse: ApiResponse<T> = {
          statusCode,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          data,
        };

        // Add message for successful operations
        if (statusCode === 201) {
          apiResponse.message = 'Resource created successfully';
        } else if (statusCode === 200 && request.method === 'DELETE') {
          apiResponse.message = 'Resource deleted successfully';
        } else if (statusCode === 200) {
          apiResponse.message = 'Request successful';
        }

        // Log request details in development
        if (process.env.NODE_ENV !== 'production') {
          this.logger.debug(
            `${request.method} ${request.url} - ${statusCode} (${duration}ms)`,
          );
        }

        return apiResponse;
      }),
    );
  }
}
