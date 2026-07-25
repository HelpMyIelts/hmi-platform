import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { Text } from './ui/Text';
import { BackChevronIcon } from './ui/icons';

interface AppHeaderProps {
  title: string;
  rightSlot?: React.ReactNode;
}

export function AppHeader({ title, rightSlot }: AppHeaderProps) {
  const Colors = useColors();
  const router = useRouter();
  const showBack = router.canGoBack();

  return (
    <View
      className="flex-row items-center gap-2.5 border-b px-4 pb-3 pt-[18px]"
      style={{ borderBottomColor: Colors.divider }}
    >
      {showBack && (
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-1">
          <BackChevronIcon size={22} color={Colors.text} />
        </Pressable>
      )}
      <Text variant="h2" className="flex-1 text-[22px]">
        {title}
      </Text>
      {rightSlot}
    </View>
  );
}
