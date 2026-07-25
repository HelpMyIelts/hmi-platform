import { Pressable, View, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';
import { useColors } from '@/hooks/use-colors';
import { ChevronRightIcon } from './icons';
import { Text } from './Text';

interface CardProps extends ViewProps {
  row?: boolean;
  className?: string;
}

export function Card({ row, className, style, children, ...props }: CardProps) {
  const Colors = useColors();
  return (
    <View
      className={cn('gap-2 rounded-card border p-4', row && 'flex-row items-center gap-4', className)}
      style={[{ borderColor: Colors.divider }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

interface CardRowProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

Card.Row = function CardRow({ icon, title, subtitle, onPress }: CardRowProps) {
  const Colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 rounded-card border p-4 active:opacity-70"
      style={{ borderColor: Colors.divider }}
    >
      {icon}
      <View className="flex-1">
        <Text variant="h3" className="text-[17px]">
          {title}
        </Text>
        <Text variant="small" color={Colors.neutral600}>
          {subtitle}
        </Text>
      </View>
      <ChevronRightIcon size={18} color={Colors.neutral500} />
    </Pressable>
  );
};

Card.Kicker = function CardKicker({ children }: { children: React.ReactNode }) {
  return (
    <Text variant="label" className="text-primary">
      {children}
    </Text>
  );
};
