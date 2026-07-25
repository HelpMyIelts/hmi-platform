import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { JwtGuard, RolesGuard } from './guards';
import { CurrentUser, Roles } from './decorators';
import { UserRole, UserPayload, AuthResponse } from '@repo/types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Post('google')
  @ApiOperation({
    summary: 'Sign in or sign up with a Google id_token',
    description:
      'Verifies a Google id_token obtained client-side (Google Sign-In SDK on web or mobile) and returns the same token pair as /auth/login.',
  })
  @ApiResponse({ status: 200, description: 'Google sign-in successful' })
  @ApiResponse({
    status: 401,
    description: 'Invalid or unverified Google token',
  })
  async googleAuth(
    @Body() googleAuthDto: GoogleAuthDto,
  ): Promise<AuthResponse> {
    return this.authService.googleAuth(googleAuthDto.idToken);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Get('me')
  @ApiBearerAuth('access_token')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'Current user info' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(@CurrentUser() user: UserPayload) {
    return {
      id: user.sub,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }

  @Get('admin-only')
  @ApiBearerAuth('access_token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN)
  @ApiOperation({ summary: 'Admin-only endpoint example' })
  @ApiResponse({ status: 200, description: 'Admin access granted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions',
  })
  async adminOnlyEndpoint(@CurrentUser() user: UserPayload) {
    return {
      message: 'This is admin only',
      user: user.email,
    };
  }
}
