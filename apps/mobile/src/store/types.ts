import type { AuthResponse, AuthenticatedUser } from '@repo/types';

export interface ICreateStoreOptions<T, K> {
  devtoolsEnabled?: boolean;
  persistOptions?: {
    name: string;
    storage?: K;
    onRehydrateStorage?: (state: T) => void | ((state?: T, error?: unknown) => void);
  };
}

export type Role = 'student' | 'consultant';

export interface PlanTask {
  id: number;
  label: string;
  done: boolean;
}

export type PlanTasks = Record<number, PlanTask[]>;

export interface AppState {
  authDone: boolean;
  onboardingDone: boolean;
  role: Role;
  targetBand: number;
  weakSkills: string[];
  notifOn: boolean;
  remindersOn: boolean;
  tasks: PlanTasks;
  darkMode: boolean;
  themeIsManual: boolean;
  _hasHydrated: boolean;
  token: string | null;
  refreshToken: string | null;
  user: AuthenticatedUser | null;
}

export interface AppStore extends AppState {
  setAuthDone: (done: boolean) => void;
  setOnboardingDone: (done: boolean) => void;
  setRole: (role: Role) => void;
  setTargetBand: (band: number) => void;
  toggleWeakSkill: (skill: string) => void;
  toggleTask: (day: number, id: number) => void;
  setNotif: (on: boolean) => void;
  setReminders: (on: boolean) => void;
  setDarkMode: (dark: boolean) => void;
  setDarkModeManual: (dark: boolean) => void;
  setHasHydrated: (hydrated: boolean) => void;
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
  resetApp: () => void;
}
