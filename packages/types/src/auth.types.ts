import { UserRole } from "./enums";

// Auth Request/Response DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: AuthenticatedUser;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

// JWT Payload
export interface UserPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Authenticated User (without sensitive fields)
export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
