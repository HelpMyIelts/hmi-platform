import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Screen } from '@/components/screen';
import { Tag } from '@/components/ui/Tag';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { STUDENTS } from '@/data/students';

export default function StudentsScreen() {
  const Colors = useColors();
  return (
    <Screen title="Students">
      <Text variant="small" color={Colors.neutral700}>
        {STUDENTS.length} students · sorted by last active
      </Text>
      {STUDENTS.map((stu) => {
        const belowTarget = stu.band < stu.target;
        return (
          <Pressable
            key={stu.id}
            onPress={() => router.push({ pathname: '/students/[id]', params: { id: String(stu.id) } })}
            className="flex-row items-center gap-3 py-1.5"
          >
            <View className="h-[38px] w-[38px] items-center justify-center rounded-full" style={{ backgroundColor: Colors.accent100 }}>
              <Text variant="h3" className="text-[13px]" color={Colors.accent800}>
                {stu.initials}
              </Text>
            </View>
            <View className="flex-1">
              <Text variant="bodyMedium" className="text-sm">
                {stu.name}
              </Text>
              <Text variant="small" className="text-[11px]" color={Colors.neutral600}>
                Active {stu.lastActive}
              </Text>
            </View>
            <Tag variant={belowTarget ? 'accent' : 'neutral'}>{stu.band}</Tag>
          </Pressable>
        );
      })}
    </Screen>
  );
}
