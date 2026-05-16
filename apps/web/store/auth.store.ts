import { zustandStore } from './zustand.store';
import { localStore } from './local.store';
import { AuthState, AuthStore } from '../interfaces';

const initialStore: AuthState = {
  token: '',
  isAuthenticated: false,
  isInitialized: false,
  error: null,
};

export const useAuthStore = zustandStore<AuthStore>(
  (set) => ({
    ...initialStore,
    setToken: (token) =>
      set({
        token,
        isAuthenticated: !!token,
      }),
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    setInitialization: (data) =>
      set({
        ...data,
      }),
    clearAuth: () => {
      set(initialStore);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authStore');
      }
    },
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: 'authStore',
      storage: localStore as any,
    },
  }
);
