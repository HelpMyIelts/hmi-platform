import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { AuthUtilsService } from './auth.utils.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse, UserPayload } from '@repo/types';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly googleClient = new OAuth2Client();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authUtilsService: AuthUtilsService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.passwordHash) return null;

    const isPasswordValid = await this.authUtilsService.comparePassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) return null;

    const { passwordHash, ...result } = user;
    return result as User;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);

    if (!user) {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const {
      email,
      password,
      firstName,
      lastName,
      role = 'STUDENT',
    } = registerDto;

    const existingUser = await this.usersService.findByEmail(email);
    this.authUtilsService.checkUserExists(existingUser);

    await this.authUtilsService.validatePasswordStrength(password);
    const hashedPassword = await this.authUtilsService.hashPassword(password);

    const user = await this.usersService.create({
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
      role: role as any,
    });

    this.logger.log(`User registered: ${user.email} with role: ${user.role}`);
    return this.generateTokens(user);
  }

  async googleAuth(idToken: string): Promise<AuthResponse> {
    const clientIds = [
      this.configService.get<string>('GOOGLE_WEB_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_IOS_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_ANDROID_CLIENT_ID'),
    ].filter((id): id is string => Boolean(id));

    if (clientIds.length === 0) {
      throw new InternalServerErrorException(
        'Google sign-in is not configured',
      );
    }

    let payload: {
      sub: string;
      email?: string;
      email_verified?: boolean;
      given_name?: string;
      family_name?: string;
    };

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: clientIds,
      });
      const ticketPayload = ticket.getPayload();
      if (!ticketPayload) {
        throw new Error('Empty Google token payload');
      }
      payload = ticketPayload;
    } catch {
      this.logger.warn('Invalid Google id_token presented for sign-in');
      throw new UnauthorizedException('Invalid Google token');
    }

    if (!payload.email || !payload.email_verified) {
      throw new UnauthorizedException('Google account email not verified');
    }

    let user = await this.usersService.findByGoogleId(payload.sub);

    if (!user) {
      const existingUser = await this.usersService.findByEmail(payload.email);

      if (existingUser) {
        user = await this.usersService.linkGoogleAccount(
          existingUser.id,
          payload.sub,
        );
      } else {
        user = await this.usersService.create({
          email: payload.email,
          googleId: payload.sub,
          firstName: payload.given_name || 'Google',
          lastName: payload.family_name || 'User',
          role: UserRole.STUDENT,
          emailVerified: true,
        });
        this.logger.log(`User registered via Google: ${user.email}`);
      }
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is disabled');
    }

    return this.generateTokens(user);
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<Omit<AuthResponse, 'user'>> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = this.generateJwtTokens(user);
      return tokens;
    } catch (error) {
      this.logger.warn('Invalid refresh token attempt');
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(user: User): AuthResponse {
    const tokens = this.generateJwtTokens(user);

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role as any,
      },
    };
  }

  private generateJwtTokens(user: User) {
    const payload = this.authUtilsService.extractUserPayload(user);
    const refreshTokenExpiry =
      this.configService.get<string>('JWT_REFRESH_EXPIRY') || '7d';

    return {
      access_token: this.jwtService.sign(payload as any),
      refresh_token: this.jwtService.sign(payload as any, {
        expiresIn: refreshTokenExpiry as any,
      }),
    };
  }
}
