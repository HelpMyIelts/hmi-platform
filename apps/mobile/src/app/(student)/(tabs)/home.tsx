import { View } from 'react-native';
import { Screen } from '@/components/screen';
import { StreakBadge } from '@/components/streak-badge';
import { Blueprint } from '@/components/ui/Blueprint';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tag } from '@/components/ui/Tag';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { MINUTES_PRACTICED, PREDICTED_BAND, STREAK_DAYS, WEEKLY_GOAL_PCT } from '@/data/constants';
import { navigateToSkill } from '@/lib/navigate-skill';
import { useAppStore } from '@/store/app.store';

export default function HomeScreen() {
  const Colors = useColors();
  const targetBand = useAppStore((s) => s.targetBand);
  const weakSkills = useAppStore((s) => s.weakSkills);

  const gap = targetBand - PREDICTED_BAND;
  const bandGapNote = gap <= 0 ? 'goal reached!' : `${gap.toFixed(1).replace(/\.0$/, '')} to go`;
  const recommended = weakSkills[0] ?? 'Speaking';

  return (
    <Screen title="Home" rightSlot={<StreakBadge days={STREAK_DAYS} />}>
      <Text variant="body" color={Colors.neutral700}>
        Good to see you again — keep the streak going.
      </Text>

      <Blueprint className="self-stretch gap-1">
        <Card.Kicker>Predicted band score</Card.Kicker>
        <Text variant="statLg" color={Colors.accent800}>
          {PREDICTED_BAND}
        </Text>
        <Text variant="small" color={Colors.neutral600}>
          Target: {targetBand} · {bandGapNote}
        </Text>
      </Blueprint>

      <Card>
        <Card.Kicker>Today&apos;s focus</Card.Kicker>
        <Text variant="h3" className="text-[17px]">
          {recommended} practice
        </Text>
        <Text variant="small" color={Colors.neutral700} className="opacity-80">
          A quick session focused on {recommended.toLowerCase()} — your current weak spot.
        </Text>
        <Button variant="primary" block onPress={() => navigateToSkill(recommended)}>
          Start now
        </Button>
      </Card>

      <View className="flex-row gap-4">
        <Card className="flex-1">
          <Card.Kicker>Weekly goal</Card.Kicker>
          <Text variant="h2" className="text-2xl">
            {WEEKLY_GOAL_PCT}%
          </Text>
          <ProgressBar pct={WEEKLY_GOAL_PCT} />
        </Card>
        <Card className="flex-1">
          <Card.Kicker>Minutes / day</Card.Kicker>
          <Text variant="h2" className="text-2xl">
            {MINUTES_PRACTICED}
          </Text>
          <Text variant="small" color={Colors.neutral600} className="text-[11px]">
            avg. this week
          </Text>
        </Card>
      </View>

      {weakSkills.length > 0 && (
        <View>
          <Card.Kicker>Your weak skills</Card.Kicker>
          <View className="mt-2 flex-row flex-wrap gap-1.5">
            {weakSkills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </View>
        </View>
      )}
    </Screen>
  );
}
