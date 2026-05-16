export interface ICreateStoreOptions<T, K> {
  devtoolsEnabled?: boolean;
  persistOptions?: {
    name: string;
    storage?: any;
  };
}

export interface AuthState {
  token: string;
  isAuthenticated: boolean;
  isInitialized: boolean;
  error: any;
}

export interface AuthStore extends AuthState {
  setToken: (token: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setInitialization: (data: Partial<AuthState>) => void;
  clearAuth: () => void;
}

export interface ErrorState {
  error: any;
}

export interface ErrorStore extends ErrorState {
  setError: (error: any) => void;
  clearError: () => void;
}
