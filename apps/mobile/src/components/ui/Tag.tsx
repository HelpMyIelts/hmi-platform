import { View } from 'react-native';
import { cn } from '@/lib/utils';
import { useColors } from '@/hooks/use-colors';
import { Text } from './Text';

export type TagVariant = 'accent' | 'neutral';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
}

export function Tag({ children, variant = 'accent' }: TagProps) {
  const Colors = useColors();
  return (
    <View
      className={cn('self-start rounded-tag px-2.5 py-0.5')}
      style={{ backgroundColor: variant === 'accent' ? Colors.accent100 : Colors.neutral100 }}
    >
      <Text variant="small" className="text-[11px]" color={variant === 'accent' ? Colors.accent800 : Colors.neutral800}>
        {children}
      </Text>
    </View>
  );
}
