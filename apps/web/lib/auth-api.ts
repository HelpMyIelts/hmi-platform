import { apiPost, apiGet } from './api-client';
import { AuthResponse, LoginRequest, RegisterRequest, UserPayload } from '@repo/types';
import { API_ENDPOINTS } from './config';

/**
 * Register a new user
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  return apiPost<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
}

/**
 * Login with email and password
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  return apiPost<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token: string;
}> {
  return apiPost(API_ENDPOINTS.AUTH.REFRESH, { refresh_token: refreshToken });
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<UserPayload> {
  return apiGet<UserPayload>(API_ENDPOINTS.AUTH.ME);
}

/**
 * Logout (client-side only - clears tokens)
 */
export function logout(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}
