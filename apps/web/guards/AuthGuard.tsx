'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '../store';
import { paths } from '../routes/paths';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isInitialized } = useAuthStore();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: pathname,
      }).toString();

      const href = `${paths.auth.login}?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, pathname, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};
