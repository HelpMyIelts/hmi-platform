import axios from 'axios';
import { useAppStore } from '@/store/app.store';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAppStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// apps/api wraps every response in { statusCode, timestamp, path, method, data, message }
// (see ResponseInterceptor in apps/api/src/common/interceptors) — unwrap it here once so
// every apis/*.ts call site can treat response.data as the actual payload.
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message ?? error.message;
    return Promise.reject(message);
  }
);
