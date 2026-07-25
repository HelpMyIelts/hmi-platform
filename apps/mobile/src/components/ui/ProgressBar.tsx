import { View } from 'react-native';
import { cn } from '@/lib/utils';
import { useColors } from '@/hooks/use-colors';

interface ProgressBarProps {
  pct: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  className?: string;
}

export function ProgressBar({ pct, height = 6, trackColor, fillColor, className }: ProgressBarProps) {
  const Colors = useColors();
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <View className={cn('w-full overflow-hidden', className)} style={{ height, backgroundColor: trackColor ?? Colors.neutral200 }}>
      <View className="h-full" style={{ width: `${clamped}%`, backgroundColor: fillColor ?? Colors.accent }} />
    </View>
  );
}
