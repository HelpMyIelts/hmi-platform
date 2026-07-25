import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Screen } from '@/components/screen';
import { Blueprint } from '@/components/ui/Blueprint';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChevronRightIcon } from '@/components/ui/icons';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { atRiskStudents, cohortAverage, moduleBars } from '@/data/students';

export default function ReportsScreen() {
  const Colors = useColors();
  return (
    <Screen title="Reports">
      <Blueprint className="self-stretch">
        <Card.Kicker>Cohort average band</Card.Kicker>
        <Text variant="h2" className="text-[44px]" color={Colors.accent800}>
          {cohortAverage}
        </Text>
      </Blueprint>

      <View>
        <Card.Kicker>Module performance (avg.)</Card.Kicker>
        <View className="mt-2.5 gap-2.5">
          {moduleBars.map((m) => (
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
        </View>
      </View>

      <View>
        <Card.Kicker>Needs attention</Card.Kicker>
        <View className="mt-2 gap-2">
          {atRiskStudents.map((stu) => (
            <Pressable
              key={stu.id}
              onPress={() => router.push({ pathname: '/students/[id]', params: { id: String(stu.id) } })}
              className="flex-row items-center gap-3 rounded-card border p-3"
              style={{ borderColor: Colors.divider }}
            >
              <View className="flex-1">
                <Text variant="bodyMedium" className="text-[13px]">
                  {stu.name}
                </Text>
                <Text variant="small" className="text-[11px]" color={Colors.neutral600}>
                  {stu.band} vs target {stu.target}
                </Text>
              </View>
              <ChevronRightIcon size={16} color={Colors.neutral500} />
            </Pressable>
          ))}
        </View>
      </View>

      <Button variant="secondary" block>
        Export report
      </Button>
    </Screen>
  );
}
