import { useMutation, useQuery } from '@tanstack/react-query';
import type { LoginRequest, RegisterRequest } from '@repo/types';
import { getMe, login, register } from '@/apis/auth.api';
import { useAppStore } from '@/store/app.store';

export const useLogin = () => {
  const setAuth = useAppStore((s) => s.setAuth);
  const setOnboardingDone = useAppStore((s) => s.setOnboardingDone);

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data) => {
      setAuth(data);
      setOnboardingDone(true);
    },
  });
};

export const useSignup = () => {
  const setAuth = useAppStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (data) => {
      setAuth(data);
    },
  });
};

export const useMe = () => {
  const token = useAppStore((s) => s.token);

  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !!token,
  });
};
