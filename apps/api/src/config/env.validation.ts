import { plainToInstance } from 'class-transformer';
import { IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRY: string;

  @IsString()
  @IsOptional()
  NODE_ENV: string;

  @IsString()
  @IsOptional()
  FRONTEND_URL: string;

  @IsString()
  @IsOptional()
  BCRYPT_SALT_ROUNDS: string;

  @IsString()
  @IsOptional()
  GOOGLE_WEB_CLIENT_ID: string;

  @IsString()
  @IsOptional()
  GOOGLE_IOS_CLIENT_ID: string;

  @IsString()
  @IsOptional()
  GOOGLE_ANDROID_CLIENT_ID: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
