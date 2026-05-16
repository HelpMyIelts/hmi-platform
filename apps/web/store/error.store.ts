import { zustandStore } from './zustand.store';
import { ErrorStore } from '../interfaces';

export const useErrorStore = zustandStore<ErrorStore>(
  (set) => ({
    error: null,
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
  }),
  {
    devtoolsEnabled: true,
  }
);
