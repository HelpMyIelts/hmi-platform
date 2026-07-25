import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { Screen } from '@/components/screen';
import { Blueprint } from '@/components/ui/Blueprint';
import { Button } from '@/components/ui/Button';
import { CheckIcon, SpeakingIcon, StopIcon } from '@/components/ui/icons';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { SPEAKING_METRICS, SPEAKING_PROMPT, SPEAKING_TIPS } from '@/data/feedback';

const WAVE_BARS = Array.from({ length: 12 }, (_, i) => ({
  height: 8 + (i % 5) * 5,
  duration: 0.6 + (i % 4) * 0.15,
  delay: (i % 6) * 0.08,
}));

function WaveBar({ height, duration, delay }: { height: number; duration: number; delay: number }) {
  const scale = useSharedValue(0.35);

  useEffect(() => {
    scale.value = withDelay(
      delay * 1000,
      withRepeat(withTiming(1, { duration: (duration * 1000) / 2, easing: Easing.inOut(Easing.ease) }), -1, true)
    );
  }, [delay, duration, scale]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scaleY: scale.value }] }));

  return <Animated.View className="w-1 bg-primary" style={[{ height }, animatedStyle]} />;
}

export default function SpeakingScreen() {
  const Colors = useColors();
  const [recording, setRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const toggleRecording = () => {
    if (recording) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setRecording(false);
    } else {
      setRecording(true);
      setRecSeconds(0);
      setRevealed(false);
      timerRef.current = setInterval(() => setRecSeconds((s) => s + 1), 1000);
    }
  };

  const revealFeedback = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setRecording(false);
    setRevealed(true);
  };

  const retry = () => {
    setRevealed(false);
    setRecSeconds(0);
  };

  const min = Math.floor(recSeconds / 60);
  const sec = recSeconds % 60;
  const timeLabel = `${min}:${sec < 10 ? '0' : ''}${sec}`;

  return (
    <Screen title="Speaking">
      <Blueprint className="items-start self-stretch">
        <Card.Kicker>Part 2 cue card</Card.Kicker>
        <Text variant="body" className="mt-1.5 text-sm leading-[22px]">
          {SPEAKING_PROMPT}
        </Text>
      </Blueprint>

      <View className="items-center gap-3.5 py-3">
        {recording && (
          <>
            <View className="h-9 flex-row items-end gap-1">
              {WAVE_BARS.map((bar, i) => (
                <WaveBar key={i} {...bar} />
              ))}
            </View>
            <Text variant="h2" className="text-[22px]">
              {timeLabel}
            </Text>
          </>
        )}
        <Pressable
          onPress={toggleRecording}
          className="h-16 w-16 items-center justify-center rounded-full border-2 border-primary"
          style={{ backgroundColor: recording ? Colors.accent : 'transparent' }}
        >
          {recording ? <StopIcon size={22} color={Colors.bg} /> : <SpeakingIcon size={26} color={Colors.accent700} strokeWidth={1.6} />}
        </Pressable>
        {recording && (
          <Button variant="primary" onPress={revealFeedback}>
            Stop &amp; get feedback
          </Button>
        )}
      </View>

      {revealed && (
        <View className="gap-2.5">
          <Card.Kicker>AI feedback</Card.Kicker>
          {SPEAKING_METRICS.map((m) => (
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
            {SPEAKING_TIPS.map((tip, i) => (
              <View key={i} className="flex-row items-start gap-2">
                <CheckIcon size={15} color={Colors.accent700} strokeWidth={2} />
                <Text variant="small" className="flex-1 text-sm">
                  {tip}
                </Text>
              </View>
            ))}
          </View>
          <Button variant="secondary" block onPress={retry}>
            Try again
          </Button>
          <Button variant="primary" block onPress={() => router.back()}>
            Done
          </Button>
        </View>
      )}
    </Screen>
  );
}
