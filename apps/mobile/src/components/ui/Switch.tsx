import { Switch as RNSwitch } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Switch({ value, onValueChange }: SwitchProps) {
  const Colors = useColors();
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: Colors.neutral300, true: Colors.accent }}
      thumbColor={Colors.white}
    />
  );
}
