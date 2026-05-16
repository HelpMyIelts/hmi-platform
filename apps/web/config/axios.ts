import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const authData = localStorage.getItem('authStore');
      const state = authData ? JSON.parse(authData).state : null;
      if (state && state.token) {
        config.headers['Authorization'] = 'Bearer ' + state.token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // You can add global error handling here
      const message = error.response.data?.message || error.message;
      return Promise.reject(message);
    }
    return Promise.reject(error.message);
  }
);

export default axiosInstance;
