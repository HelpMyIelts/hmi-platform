import { View } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { Text } from './ui/Text';
import { FlameIcon } from './ui/icons';

export function StreakBadge({ days }: { days: number }) {
  const Colors = useColors();
  return (
    <View className="flex-row items-center gap-1">
      <FlameIcon size={16} color={Colors.accent700} />
      <Text variant="bodyMedium" className="text-[13px]" color={Colors.accent700}>
        {days}
      </Text>
    </View>
  );
}
