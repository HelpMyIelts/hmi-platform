import { Pressable, PressableProps } from 'react-native';
import { cn } from '@/lib/utils';
import { useColors } from '@/hooks/use-colors';

interface ChipProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
}

export function Chip({ children, className, style, ...props }: ChipProps) {
  const Colors = useColors();
  return (
    <Pressable
      className={cn('items-center justify-center rounded-lg border', className)}
      style={(state) => [{ borderColor: Colors.divider }, typeof style === 'function' ? style(state) : style]}
      {...props}
    >
      {children}
    </Pressable>
  );
}
