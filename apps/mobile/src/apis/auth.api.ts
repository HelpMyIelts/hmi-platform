import type { AuthenticatedUser, AuthResponse, LoginRequest, RegisterRequest } from '@repo/types';
import { apiClient } from '@/lib/api-client';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const getMe = async (): Promise<AuthenticatedUser> => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
