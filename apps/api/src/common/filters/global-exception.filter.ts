import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | string[];
  error?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = 500;
    let message: string | string[] = 'Internal server error';
    let errorType = 'INTERNAL_SERVER_ERROR';

    // Handle HttpException (includes validation errors, auth errors, etc.)
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        const objResponse = exceptionResponse as any;
        message = objResponse.message || exception.message;
        errorType = objResponse.error || this.getErrorType(statusCode);
      } else {
        message = exceptionResponse;
      }
    }
    // Handle validation errors from class-validator
    else if (exception instanceof Error) {
      message = exception.message;
      // Log unexpected errors
      this.logger.error(
        `Unexpected error: ${message}`,
        exception instanceof Error ? exception.stack : '',
      );
    }

    const errorResponse: ErrorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    if (statusCode >= 500) {
      errorResponse.error = errorType;
      this.logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
      );
    }

    response.status(statusCode).json(errorResponse);
  }

  private getErrorType(statusCode: number): string {
    const errorMap: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_SERVER_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE',
    };

    return errorMap[statusCode] || 'UNKNOWN_ERROR';
  }
}
