import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/screen';
import { Blueprint } from '@/components/ui/Blueprint';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/Input';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { WRITING_METRICS, WRITING_PROMPT, WRITING_TIPS } from '@/data/feedback';

export default function WritingScreen() {
  const Colors = useColors();
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const disabled = wordCount < 50;

  return (
    <Screen title="Writing">
      <Blueprint className="items-start self-stretch">
        <Card.Kicker>Task 2</Card.Kicker>
        <Text variant="body" className="mt-1.5 text-sm leading-[22px]">
          {WRITING_PROMPT}
        </Text>
      </Blueprint>

      <Input
        multiline
        placeholder="Write your essay here (min. 50 words)…"
        value={text}
        onChangeText={setText}
      />
      <Text variant="small" color={Colors.neutral600}>
        {wordCount} words
      </Text>

      <Button variant="primary" block disabled={disabled} onPress={() => setRevealed(true)}>
        Get AI feedback
      </Button>

      {revealed && (
        <View className="gap-2.5">
          <Card.Kicker>AI feedback</Card.Kicker>
          {WRITING_METRICS.map((m) => (
            <View key={m.label}>
              <View className="mb-1 flex-row justify-between">
                <Text variant="small" className="text-xs">
                  {m.label}
                </Text>
                <Text variant="small" className="text-xs" color={Colors.neutral600}>
                  {m.value}
                </Text>
              </View>
              <ProgressBar pct={m.pct} />
            </View>
          ))}
          <View className="mt-1.5 gap-1.5">
            {WRITING_TIPS.map((tip, i) => (
              <View key={i} className="flex-row items-start gap-2">
                <CheckIcon size={15} color={Colors.accent700} strokeWidth={2} />
                <Text variant="small" className="flex-1 text-sm">
                  {tip}
                </Text>
              </View>
            ))}
          </View>
          <Button variant="primary" block onPress={() => router.back()}>
            Done
          </Button>
        </View>
      )}
    </Screen>
  );
}
