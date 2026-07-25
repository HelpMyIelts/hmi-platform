import { ScrollView, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/use-colors';
import { AppHeader } from './app-header';

interface ScreenProps {
  title?: string;
  rightSlot?: React.ReactNode;
  scroll?: boolean;
  children: React.ReactNode;
  contentStyle?: ViewStyle;
}

export function Screen({ title, rightSlot, scroll = true, children, contentStyle }: ScreenProps) {
  const Colors = useColors();
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: Colors.bg }} edges={['top', 'left', 'right']}>
      {title !== undefined && <AppHeader title={title} rightSlot={rightSlot} />}
      {scroll ? (
        <ScrollView className="flex-1" contentContainerClassName="gap-4 p-4" contentContainerStyle={contentStyle}>
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1 gap-4 p-4" style={contentStyle}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
