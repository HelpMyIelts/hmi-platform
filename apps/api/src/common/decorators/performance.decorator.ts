import { Logger } from '@nestjs/common';

/**
 * Decorator to measure and log method execution time
 * Usage: @Performance() async myMethod() { ... }
 */
export const Performance = () => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const logger = new Logger(`Performance[${target.constructor.name}.${propertyKey}]`);

    descriptor.value = async function (...args: any[]) {
      const startTime = performance.now();

      try {
        const result = await originalMethod.apply(this, args);
        const duration = performance.now() - startTime;

        if (duration > 1000) {
          // Warn if slower than 1 second
          logger.warn(
            `${propertyKey} took ${duration.toFixed(2)}ms (slow)`,
          );
        } else if (duration > 100) {
          // Debug if slower than 100ms
          logger.debug(
            `${propertyKey} took ${duration.toFixed(2)}ms`,
          );
        }

        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        logger.error(
          `${propertyKey} failed after ${duration.toFixed(2)}ms`,
          error instanceof Error ? error.message : String(error),
        );
        throw error;
      }
    };

    return descriptor;
  };
};
