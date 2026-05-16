// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';

export const API_TIMEOUT =
  parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10);

export const DEBUG = process.env.NEXT_PUBLIC_DEBUG === 'true';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/auth/register`,
    LOGIN: `${API_URL}/auth/login`,
    REFRESH: `${API_URL}/auth/refresh`,
    ME: `${API_URL}/auth/me`,
  },
  USERS: {
    PROFILE: `${API_URL}/users/profile`,
  },
  TESTS: {
    LIST: `${API_URL}/tests`,
    DETAIL: (id: string) => `${API_URL}/tests/${id}`,
  },
} as const;

if (DEBUG) {
  console.log('API Configuration:', { API_URL, API_TIMEOUT });
}
