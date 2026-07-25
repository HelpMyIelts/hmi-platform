import { Screen } from '@/components/screen';
import { Card } from '@/components/ui/Card';
import {
  GrammarIcon,
  ListeningIcon,
  ReadingIcon,
  SpeakingIcon,
  VocabularyIcon,
  WritingIcon,
} from '@/components/ui/icons';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { navigateToSkill } from '@/lib/navigate-skill';

const ROWS = [
  { skill: 'Listening', subtitle: '3 questions · 5 min', Icon: ListeningIcon },
  { skill: 'Reading', subtitle: '3 questions · 8 min', Icon: ReadingIcon },
  { skill: 'Writing', subtitle: 'Task 2 essay · AI feedback', Icon: WritingIcon },
  { skill: 'Speaking', subtitle: 'Part 2 cue card · AI feedback', Icon: SpeakingIcon },
  { skill: 'Vocabulary', subtitle: '3 questions · flashcards', Icon: VocabularyIcon },
  { skill: 'Grammar', subtitle: '3 questions · drills', Icon: GrammarIcon },
] as const;

export default function PracticeScreen() {
  const Colors = useColors();
  return (
    <Screen title="Practice">
      <Text variant="small" color={Colors.neutral700} style={{ marginBottom: -8 }}>
        Choose a skill to practice — each session ends with instant feedback.
      </Text>
      {ROWS.map(({ skill, subtitle, Icon }) => (
        <Card.Row
          key={skill}
          title={skill}
          subtitle={subtitle}
          icon={<Icon size={26} color={Colors.accent700} strokeWidth={1.5} />}
          onPress={() => navigateToSkill(skill)}
        />
      ))}
    </Screen>
  );
}
