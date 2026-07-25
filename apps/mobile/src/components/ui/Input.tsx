import { useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import { cn } from '@/lib/utils';
import { useColors } from '@/hooks/use-colors';
import { EyeIcon, EyeOffIcon } from './icons';
import { Text } from './Text';

interface InputProps extends TextInputProps {
  label?: string;
  multiline?: boolean;
  className?: string;
}

export function Input({ label, multiline, className, style, secureTextEntry, ...props }: InputProps) {
  const Colors = useColors();
  const [visible, setVisible] = useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <View className="gap-1.5">
      {label && (
        <Text variant="small" color={Colors.neutral700}>
          {label}
        </Text>
      )}
      <View className="justify-center">
        <TextInput
          placeholderTextColor={Colors.neutral500}
          multiline={multiline}
          secureTextEntry={isPassword && !visible}
          className={cn(
            'min-h-11 rounded-lg border px-3 py-2 font-body text-[15px]',
            multiline && 'min-h-40 pt-2',
            isPassword && 'pr-11',
            className
          )}
          textAlignVertical={multiline ? 'top' : undefined}
          style={[{ borderColor: Colors.divider, backgroundColor: Colors.surface, color: Colors.text }, style]}
          {...props}
        />
        {isPassword && (
          <Pressable onPress={() => setVisible((v) => !v)} hitSlop={10} className="absolute right-3">
            {visible ? (
              <EyeIcon size={19} color={Colors.neutral600} />
            ) : (
              <EyeOffIcon size={19} color={Colors.neutral600} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
