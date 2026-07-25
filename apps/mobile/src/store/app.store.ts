import { Appearance } from 'react-native';
import { asyncStorage } from './async.store';
import { PLAN_TASKS_SEED } from '@/data/plan-seed';
import { AppState, AppStore } from './types';
import { zustandStore } from './zustand.store';

const initialState: AppState = {
  authDone: false,
  onboardingDone: false,
  role: 'student',
  targetBand: 7,
  weakSkills: ['Speaking', 'Writing'],
  notifOn: true,
  remindersOn: true,
  tasks: PLAN_TASKS_SEED,
  darkMode: false,
  themeIsManual: false,
  _hasHydrated: false,
  token: null,
  refreshToken: null,
  user: null,
};

export const useAppStore = zustandStore<AppStore>(
  (set) => ({
    ...initialState,
    setAuthDone: (authDone) => set({ authDone }),
    setOnboardingDone: (onboardingDone) => set({ onboardingDone }),
    setRole: (role) => set({ role }),
    setTargetBand: (targetBand) => set({ targetBand }),
    toggleWeakSkill: (skill) =>
      set((s) => ({
        weakSkills: s.weakSkills.includes(skill)
          ? s.weakSkills.filter((x) => x !== skill)
          : [...s.weakSkills, skill],
      })),
    toggleTask: (day, id) =>
      set((s) => ({
        tasks: {
          ...s.tasks,
          [day]: (s.tasks[day] ?? []).map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        },
      })),
    setNotif: (notifOn) => set({ notifOn }),
    setReminders: (remindersOn) => set({ remindersOn }),
    setDarkMode: (darkMode) => set({ darkMode }),
    setDarkModeManual: (darkMode) => set({ darkMode, themeIsManual: true }),
    setHasHydrated: (_hasHydrated) => set({ _hasHydrated }),
    setAuth: (data) =>
      set({
        authDone: true,
        token: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
      }),
    clearAuth: () => set({ token: null, refreshToken: null, user: null }),
    resetApp: () =>
      set({
        ...initialState,
        darkMode: Appearance.getColorScheme() === 'dark',
        _hasHydrated: true,
      }),
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: 'appStore',
      storage: asyncStorage,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  }
);
