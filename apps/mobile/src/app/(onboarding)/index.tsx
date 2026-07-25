import { Image } from 'expo-image';
import { useState } from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/screen';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Text } from '@/components/ui/Text';
import { BAND_VALUES, SKILLS } from '@/data/constants';
import { useColors } from '@/hooks/use-colors';
import { useAppStore } from '@/store/app.store';

export default function OnboardingScreen() {
  const Colors = useColors();
  const [step, setStep] = useState(0);
  const targetBand = useAppStore((s) => s.targetBand);
  const setTargetBand = useAppStore((s) => s.setTargetBand);
  const weakSkills = useAppStore((s) => s.weakSkills);
  const toggleWeakSkill = useAppStore((s) => s.toggleWeakSkill);
  const setRole = useAppStore((s) => s.setRole);
  const setOnboardingDone = useAppStore((s) => s.setOnboardingDone);

  const skipToConsultant = () => {
    setRole('consultant');
    setOnboardingDone(true);
  };

  return (
    <Screen scroll={false}>
      {step === 0 && (
        <View className="flex-1 items-center justify-center gap-3.5">
          <Image
            source={require('@/assets/images/helpmyielts-logo.png')}
            style={{ width: 260, height: 173 }}
            contentFit="contain"
          />
          <Text variant="small" color={Colors.neutral700} className="max-w-[260px] text-center leading-5">
            Your coach for Listening, Reading, Writing and Speaking — with AI feedback and a predicted band score.
          </Text>
          <Button variant="primary" block onPress={() => setStep(1)} className="mt-2">
            Get started
          </Button>
          <Button variant="ghost" onPress={skipToConsultant}>
            I&apos;m a teacher / consultant
          </Button>
        </View>
      )}

      {step === 1 && (
        <View className="flex-1 gap-[22px]">
          <View>
            <Text variant="label" color={Colors.accent}>
              Step 1 of 2
            </Text>
            <Text variant="h2" className="mb-1.5 mt-2">
              Your target band?
            </Text>
            <Text variant="small" color={Colors.neutral700}>
              We&apos;ll tailor your daily plan around this goal.
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {BAND_VALUES.map((b) => {
              const selected = targetBand === b;
              return (
                <Chip
                  key={b}
                  onPress={() => setTargetBand(b)}
                  className="min-w-[52px] py-2.5"
                  style={{
                    borderColor: selected ? Colors.accent : Colors.divider,
                    backgroundColor: selected ? Colors.accent : 'transparent',
                  }}
                >
                  <Text variant="h3" className="text-[15px]" color={selected ? Colors.bg : Colors.text}>
                    {b}
                  </Text>
                </Chip>
              );
            })}
          </View>
          <View className="flex-1" />
          <Button variant="primary" block onPress={() => setStep(2)}>
            Continue
          </Button>
        </View>
      )}

      {step === 2 && (
        <View className="flex-1 gap-[22px]">
          <View>
            <Text variant="label" color={Colors.accent}>
              Step 2 of 2
            </Text>
            <Text variant="h2" className="mb-1.5 mt-2">
              Which skills need work?
            </Text>
            <Text variant="small" color={Colors.neutral700}>
              Pick as many as apply — we&apos;ll prioritize these first.
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {SKILLS.map((skill) => {
              const selected = weakSkills.includes(skill);
              return (
                <Chip
                  key={skill}
                  onPress={() => toggleWeakSkill(skill)}
                  className="px-3.5 py-2"
                  style={{
                    borderColor: selected ? Colors.accent : Colors.divider,
                    backgroundColor: selected ? Colors.accent100 : 'transparent',
                  }}
                >
                  <Text variant="small" color={selected ? Colors.accent800 : Colors.text}>
                    {skill}
                  </Text>
                </Chip>
              );
            })}
          </View>
          <View className="flex-1" />
          <Button variant="primary" block onPress={() => setOnboardingDone(true)}>
            Start practicing
          </Button>
        </View>
      )}
    </Screen>
  );
}
