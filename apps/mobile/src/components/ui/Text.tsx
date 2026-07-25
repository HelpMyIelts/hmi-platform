import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cn } from '@/lib/utils';
import { useColors } from '@/hooks/use-colors';

export type TextVariant =
  | 'body'
  | 'bodyMedium'
  | 'small'
  | 'label'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'stat'
  | 'statLg';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  className?: string;
}

const variantClasses: Record<TextVariant, string> = {
  body: 'font-body text-[15px] leading-[22px]',
  bodyMedium: 'font-body-medium text-[15px] leading-[22px]',
  small: 'font-body text-[13px] leading-[18px]',
  label: 'font-body text-[11px] tracking-widest uppercase',
  h1: 'font-heading text-[28px] leading-[32px]',
  h2: 'font-heading text-[24px] leading-[28px]',
  h3: 'font-heading text-[20px] leading-[24px]',
  stat: 'font-heading text-[36px] leading-[40px]',
  statLg: 'font-heading text-[52px] leading-[56px]',
};

export function Text({ variant = 'body', color, className, style, ...props }: TextProps) {
  const Colors = useColors();
  return (
    <RNText
      className={cn(variantClasses[variant], className)}
      style={[{ color: color ?? Colors.text }, style]}
      {...props}
    />
  );
}
