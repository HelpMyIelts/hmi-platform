import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: Request, res: Response, next: Function) {
    const startTime = Date.now();
    const requestId = uuidv4();
    const { method, path, ip } = req;

    // Attach requestId to request for use in handlers
    (req as any).requestId = requestId;

    // Get user info if available
    const userId = (req as any).user?.sub || null;

    // Log request (skip health checks)
    if (!path.includes('health')) {
      this.logger.debug(`Request: ${method} ${path}`, {
        requestId,
        userId,
        method,
        path,
      });
    }

    // Intercept response.end to log response
    const originalEnd = res.end;

    res.end = function (...args: any[]) {
      const duration = Date.now() - startTime;
      const { statusCode } = res;

      // Skip health checks and static files
      if (!path.includes('health') && !path.includes('.')) {
        this.logger.logHttpRequest(method, path, statusCode, duration, {
          requestId,
          userId,
        });
      }

      return originalEnd.apply(res, args);
    }.bind(this);

    next();
  }
}
