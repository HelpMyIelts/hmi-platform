import { API_TIMEOUT, API_URL, DEBUG } from './config';

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

interface ApiRequestOptions extends RequestInit {
  timeout?: number;
}

// Helper to create timeout promise
const createTimeoutPromise = (ms: number) =>
  new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('API request timeout')), ms),
  );

/**
 * Fetch wrapper with token injection, timeout, and error handling
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  const timeout = options.timeout ?? API_TIMEOUT;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

  if (DEBUG) {
    console.log('[API]', options.method || 'GET', url);
  }

  try {
    // Race between the fetch and timeout
    const response = await Promise.race([
      fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...(options.headers || {}),
        },
      }),
      createTimeoutPromise(timeout),
    ]);

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      let errorData: ApiError;

      if (isJson) {
        errorData = await response.json();
      } else {
        errorData = {
          statusCode: response.status,
          message: response.statusText,
        };
      }

      // Handle token refresh on 401
      if (response.status === 401 && url !== `${API_URL}/auth/refresh`) {
        await handleUnauthorized();
        // Retry the original request with new token
        return apiRequest<T>(endpoint, options);
      }

      if (DEBUG) {
        console.error('[API Error]', response.status, errorData);
      }

      throw errorData;
    }

    const data: T = isJson ? await response.json() : (await response.text() as unknown as T);

    if (DEBUG) {
      console.log('[API Response]', response.status, data);
    }

    return data;
  } catch (error) {
    if (DEBUG) {
      console.error('[API Exception]', error);
    }

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw {
        statusCode: 0,
        message: 'Network error - unable to reach API server',
      } as ApiError;
    }

    throw error;
  }
}

/**
 * Handle 401 Unauthorized - attempt token refresh
 */
async function handleUnauthorized() {
  if (typeof window === 'undefined') return;

  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    // No refresh token, redirect to login
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const { access_token, refresh_token } = await response.json();
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    if (DEBUG) {
      console.log('[Auth] Token refreshed successfully');
    }
  } catch (error) {
    if (DEBUG) {
      console.error('[Auth] Token refresh failed', error);
    }

    // Refresh failed, redirect to login
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}

/**
 * GET request helper
 */
export function apiGet<T>(endpoint: string, options?: RequestInit) {
  return apiRequest<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * POST request helper
 */
export function apiPost<T>(endpoint: string, body?: unknown, options?: RequestInit) {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PUT request helper
 */
export function apiPut<T>(endpoint: string, body?: unknown, options?: RequestInit) {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PATCH request helper
 */
export function apiPatch<T>(endpoint: string, body?: unknown, options?: RequestInit) {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * DELETE request helper
 */
export function apiDelete<T>(endpoint: string, options?: RequestInit) {
  return apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
}
