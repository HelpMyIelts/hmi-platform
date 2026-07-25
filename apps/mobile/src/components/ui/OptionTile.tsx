import { Pressable, View } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { Text } from './Text';

interface OptionTileProps {
  icon: (color: string) => React.ReactNode;
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function OptionTile({ icon, label, selected, onPress }: OptionTileProps) {
  const Colors = useColors();
  const borderColor = selected ? Colors.accent : Colors.divider;
  const backgroundColor = selected ? Colors.accent100 : 'transparent';
  const color = selected ? Colors.accent800 : Colors.text;

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center gap-2 rounded-2xl border px-2 py-4"
      style={{ borderColor, backgroundColor }}
    >
      <View>{icon(color)}</View>
      <Text variant="bodyMedium" className="text-[13px]" color={color}>
        {label}
      </Text>
    </Pressable>
  );
}
