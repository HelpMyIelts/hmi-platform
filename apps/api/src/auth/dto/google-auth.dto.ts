import { IsString } from 'class-validator';
import { GoogleAuthRequest } from '@repo/types';

export class GoogleAuthDto implements GoogleAuthRequest {
  @IsString()
  idToken: string;
}
