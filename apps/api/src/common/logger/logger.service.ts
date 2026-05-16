import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface LogContext {
  userId?: string;
  requestId?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  duration?: number;
}

@Injectable()
export class LoggerService {
  private nodeEnv: string;

  constructor(private configService: ConfigService) {
    this.nodeEnv = this.configService.get<string>('NODE_ENV') || 'development';
  }

  /**
   * Log general information
   */
  info(message: string, context?: LogContext) {
    const logMessage = this.formatMessage(message, context);
    if (this.nodeEnv === 'production') {
      console.log(JSON.stringify(logMessage));
    } else {
      console.log(logMessage);
    }
  }

  /**
   * Log warnings
   */
  warn(message: string, context?: LogContext) {
    const logMessage = this.formatMessage(message, context);
    if (this.nodeEnv === 'production') {
      console.warn(JSON.stringify(logMessage));
    } else {
      console.warn(logMessage);
    }
  }

  /**
   * Log errors
   */
  error(message: string, error?: any, context?: LogContext) {
    const logMessage = this.formatMessage(message, context);
    const errorData = {
      ...logMessage,
      error: {
        message: error?.message,
        stack: error?.stack,
        code: error?.code,
      },
    };

    if (this.nodeEnv === 'production') {
      console.error(JSON.stringify(errorData));
    } else {
      console.error(errorData);
    }
  }

  /**
   * Log debug information (dev only)
   */
  log(message: string, context?: LogContext) {
    if (this.nodeEnv === 'development') {
      const logMessage = this.formatMessage(message, context);
      console.log(logMessage);
    }
  }

  /**
   * Log debug information (dev only)
   */
  debug(message: string, context?: LogContext) {
    if (this.nodeEnv === 'development') {
      const logMessage = this.formatMessage(message, context);
      console.debug(logMessage);
    }
  }

  /**
   * Log HTTP requests
   */
  logHttpRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    context?: LogContext,
  ) {
    this.info(`${method} ${path} [${statusCode}]`, {
      ...context,
      method,
      path,
      statusCode,
      duration,
    });
  }

  /**
   * Log database queries (dev only)
   */
  logQuery(query: string, duration: number, params?: any[]) {
    if (this.nodeEnv === 'development') {
      this.debug(`Query executed in ${duration}ms`, {
        path: `DB: ${query.substring(0, 50)}...`,
      });
    }
  }

  /**
   * Format log message with timestamp
   */
  private formatMessage(message: string, context?: LogContext) {
    return {
      timestamp: new Date().toISOString(),
      message,
      context,
    };
  }
}
