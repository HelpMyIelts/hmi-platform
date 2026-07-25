import { Pressable } from 'react-native';
import { useAppStore } from '@/store/app.store';
import { GoogleIcon } from './icons';
import { Text } from './Text';

interface GoogleButtonProps {
  label?: string;
  onPress?: () => void;
}

export function GoogleButton({ label = 'Continue with Google', onPress }: GoogleButtonProps) {
  const darkMode = useAppStore((s) => s.darkMode);
  const bg = darkMode ? '#131314' : '#ffffff';
  const border = darkMode ? '#8e918f' : '#dadce0';
  const textColor = darkMode ? '#e3e3e3' : '#1f1f1f';

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center gap-3 self-stretch rounded-lg border py-2.5"
      style={{ backgroundColor: bg, borderColor: border }}
    >
      <GoogleIcon size={18} />
      <Text variant="bodyMedium" className="text-sm" color={textColor}>
        {label}
      </Text>
    </Pressable>
  );
}
