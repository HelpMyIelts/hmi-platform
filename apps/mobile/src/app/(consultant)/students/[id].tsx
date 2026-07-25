import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Screen } from '@/components/screen';
import { Blueprint } from '@/components/ui/Blueprint';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MessageIcon } from '@/components/ui/icons';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { bandBarsFor, STUDENT_ACTIVITY, STUDENTS } from '@/data/students';

export default function StudentDetailScreen() {
  const Colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const student = STUDENTS.find((s) => String(s.id) === id) ?? STUDENTS[0];
  const bars = bandBarsFor(student.skills);

  return (
    <Screen title="Student">
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: Colors.accent100 }}>
          <Text variant="h3" className="text-base" color={Colors.accent800}>
            {student.initials}
          </Text>
        </View>
        <View>
          <Text variant="h3" className="text-lg">
            {student.name}
          </Text>
          <Text variant="small" color={Colors.neutral600}>
            Target band {student.target}
          </Text>
        </View>
      </View>

      <Blueprint className="self-stretch">
        <Card.Kicker>Predicted band</Card.Kicker>
        <Text variant="h1" className="text-4xl" color={Colors.accent800}>
          {student.band}
        </Text>
      </Blueprint>

      <View>
        <Card.Kicker>Skill breakdown</Card.Kicker>
        <View className="mt-2.5 gap-2.5">
          {bars.map((b) => (
            <View key={b.label}>
              <View className="mb-1 flex-row justify-between">
                <Text variant="small" className="text-xs">
                  {b.label}
                </Text>
                <Text variant="small" className="text-xs" color={Colors.neutral600}>
                  {b.value}
                </Text>
              </View>
              <ProgressBar pct={b.pct} />
            </View>
          ))}
        </View>
      </View>

      <View>
        <Card.Kicker>Recent activity</Card.Kicker>
        <View className="mt-2 gap-1.5">
          {STUDENT_ACTIVITY.map((a, i) => (
            <View key={i} className="flex-row justify-between border-b py-2" style={{ borderBottomColor: Colors.divider }}>
              <Text variant="small" className="text-sm">
                {a.label}
              </Text>
              <Text variant="small" className="text-sm" color={Colors.neutral600}>
                {a.when}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Button variant="secondary" block icon={<MessageIcon size={15} color={Colors.text} />}>
        Message student
      </Button>
    </Screen>
  );
}
