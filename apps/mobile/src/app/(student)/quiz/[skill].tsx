import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Screen } from '@/components/screen';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { QUESTIONS, QuizSkill } from '@/data/questions';

export default function QuizScreen() {
  const Colors = useColors();
  const { skill } = useLocalSearchParams<{ skill: string }>();
  const quizSkill = skill as QuizSkill;
  const questions = QUESTIONS[quizSkill] ?? [];

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const question = questions[qIndex];

  const selectOption = (idx: number) => {
    if (selected != null) return;
    setSelected(idx);
    if (idx === question.answer) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (qIndex + 1 < total) {
      setQIndex((i) => i + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  const retry = () => {
    setQIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setDone(false);
  };

  const resultNote =
    correctCount === total
      ? 'Excellent! Your accuracy on this skill is trending well above your target band.'
      : correctCount >= total / 2
        ? 'Solid effort — a bit more practice here will help lift your predicted band.'
        : "This skill needs more focus. We've added extra sessions to your study plan.";

  return (
    <Screen title={quizSkill}>
      {!done ? (
        <View className="gap-4">
          <ProgressBar pct={((qIndex + 1) / total) * 100} />
          <Text variant="small" color={Colors.neutral600}>
            Question {qIndex + 1} of {total}
          </Text>
          <Text variant="body" className="text-base leading-6">
            {question.q}
          </Text>
          <View className="gap-2">
            {question.options.map((text, idx) => {
              const answered = selected != null;
              const isCorrect = idx === question.answer;
              const isPicked = idx === selected;
              let borderColor: string = Colors.divider;
              let bgColor: string = Colors.surface;
              let textColor: string = Colors.text;
              if (answered && isCorrect) {
                borderColor = Colors.accent;
                bgColor = Colors.accent100;
                textColor = Colors.accent800;
              } else if (answered && isPicked) {
                borderColor = Colors.neutral500;
                bgColor = Colors.neutral200;
                textColor = Colors.neutral700;
              }
              return (
                <Pressable
                  key={idx}
                  onPress={() => selectOption(idx)}
                  className="rounded-lg border p-3"
                  style={{ borderColor, backgroundColor: bgColor }}
                >
                  <Text variant="body" className="text-sm" color={textColor}>
                    {text}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {selected != null && (
            <Button variant="primary" block onPress={next}>
              {qIndex + 1 < total ? 'Next question' : 'See results'}
            </Button>
          )}
        </View>
      ) : (
        <View className="items-center gap-3 py-5">
          <Text variant="label" color={Colors.accent}>
            Session complete
          </Text>
          <Text variant="stat" color={Colors.accent800}>
            {correctCount}/{total}
          </Text>
          <Text variant="small" color={Colors.neutral700} className="max-w-[260px] text-center">
            {resultNote}
          </Text>
          <Button variant="secondary" block onPress={retry}>
            Practice again
          </Button>
          <Button variant="primary" block onPress={() => router.back()}>
            Back to Practice
          </Button>
        </View>
      )}
    </Screen>
  );
}
