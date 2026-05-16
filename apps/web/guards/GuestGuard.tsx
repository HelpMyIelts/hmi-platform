'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '../store';
import { paths } from '../routes/paths';

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(paths.root);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};
