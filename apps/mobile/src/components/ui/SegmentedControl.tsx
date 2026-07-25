import { Pressable, View } from 'react-native';
import { cn } from '@/lib/utils';
import { useColors } from '@/hooks/use-colors';
import { Text } from './Text';

interface SegmentedControlProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  const Colors = useColors();
  return (
    <View className="flex-row overflow-hidden rounded-lg border" style={{ borderColor: Colors.divider }}>
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className={cn('flex-1 items-center justify-center px-3 py-2.5', active && 'bg-primary')}
            style={i > 0 ? { borderLeftWidth: 1, borderLeftColor: Colors.divider } : undefined}
          >
            <Text variant="small" color={active ? Colors.bg : Colors.text}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
