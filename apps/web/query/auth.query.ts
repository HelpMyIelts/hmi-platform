import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { login, register, getMe } from '../apis/auth.api';
import { useAuthStore, useErrorStore } from '../store';

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setError = useErrorStore((state) => state.setError);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      toast.success('Logged in successfully');
    },
    onError: (error: any) => {
      setError(error);
      toast.error(error || 'Failed to login');
    },
  });
};

export const useSignup = () => {
  const setError = useErrorStore((state) => state.setError);

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('Account created successfully');
    },
    onError: (error: any) => {
      setError(error);
      toast.error(error || 'Failed to sign up');
    },
  });
};

export const useUser = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: isAuthenticated,
  });
};
