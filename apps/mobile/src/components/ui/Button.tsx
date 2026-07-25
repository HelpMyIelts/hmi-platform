import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable, ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';
import { useColors } from '@/hooks/use-colors';
import { Text } from './Text';

const buttonVariants = cva('flex-row items-center justify-center gap-1.5 rounded-lg border px-4 py-2', {
  variants: {
    variant: {
      primary: 'bg-primary border-primary',
      secondary: 'bg-transparent',
      ghost: 'border-transparent bg-transparent px-1',
    },
    block: {
      true: 'self-stretch',
      false: '',
    },
    disabled: {
      true: 'opacity-45',
      false: '',
    },
  },
  defaultVariants: { variant: 'primary', block: false, disabled: false },
});

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export function Button({ children, onPress, variant = 'primary', block, disabled, icon, className, style }: ButtonProps) {
  const Colors = useColors();
  const textColor = variant === 'primary' ? Colors.bg : variant === 'ghost' ? Colors.accent : Colors.text;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      className={cn(buttonVariants({ variant, block, disabled }), className)}
      style={[variant === 'secondary' ? { borderColor: Colors.divider } : undefined, style]}
    >
      {icon}
      <Text variant="h3" className="text-[14px]" color={textColor}>
        {children}
      </Text>
    </Pressable>
  );
}
