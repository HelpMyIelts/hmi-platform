import { Colors, DarkColors } from '@/constants/theme';
import { useAppStore } from '@/store/app.store';

export function useColors() {
  const darkMode = useAppStore((s) => s.darkMode);
  return darkMode ? DarkColors : Colors;
}
