import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';
import { useColors } from '@/hooks/use-colors';

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function Corner({ position, color }: { position: 'tl' | 'tr' | 'bl' | 'br'; color: string }) {
  const posClass = {
    tl: '-top-1.5 -left-1.5',
    tr: '-top-1.5 -right-1.5',
    bl: '-bottom-1.5 -left-1.5',
    br: '-bottom-1.5 -right-1.5',
  }[position];
  return (
    <View className={cn('absolute h-[11px] w-[11px]', posClass)}>
      <View className="absolute left-[5px] top-0 h-[11px] w-px" style={{ backgroundColor: color }} />
      <View className="absolute left-0 top-[5px] h-px w-[11px]" style={{ backgroundColor: color }} />
    </View>
  );
}

export function Blueprint({ children, className, style, ...props }: ViewProps & { className?: string }) {
  const Colors = useColors();
  const cornerColor = hexToRgba(Colors.text, 0.55);
  return (
    <View className={cn('items-center border p-6', className)} style={[{ borderColor: Colors.divider }, style]} {...props}>
      <Corner position="tl" color={cornerColor} />
      <Corner position="tr" color={cornerColor} />
      <Corner position="bl" color={cornerColor} />
      <Corner position="br" color={cornerColor} />
      {children}
    </View>
  );
}
