import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Screen } from '@/components/screen';
import { PlusIcon, CheckIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { DAYS } from '@/data/constants';
import { useAppStore } from '@/store/app.store';

export default function PlanScreen() {
  const Colors = useColors();
  const [selectedDay, setSelectedDay] = useState(2);
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);

  const dayTasks = tasks[selectedDay] ?? [];

  return (
    <Screen title="Plan">
      <View className="flex-row gap-1.5">
        {DAYS.map((name, i) => {
          const selected = i === selectedDay;
          return (
            <Chip
              key={name}
              onPress={() => setSelectedDay(i)}
              className="flex-1 flex-col gap-1 py-2"
              style={{
                borderColor: selected ? Colors.accent : Colors.divider,
                backgroundColor: selected ? Colors.accent100 : 'transparent',
              }}
            >
              <Text variant="label" className="text-[10px]" color={selected ? Colors.accent800 : Colors.text}>
                {name}
              </Text>
              <Text variant="h3" className="text-[15px]" color={selected ? Colors.accent800 : Colors.text}>
                {(tasks[i] ?? []).length}
              </Text>
            </Chip>
          );
        })}
      </View>

      <View className="gap-2">
        {dayTasks.length === 0 ? (
          <Text variant="small" color={Colors.neutral600}>
            No sessions scheduled — enjoy the rest day.
          </Text>
        ) : (
          dayTasks.map((task) => (
            <Pressable
              key={task.id}
              onPress={() => toggleTask(selectedDay, task.id)}
              className="flex-row items-center gap-3 rounded-card border p-3 active:opacity-70"
              style={{ borderColor: Colors.divider }}
            >
              <View
                className="h-5 w-5 items-center justify-center rounded-[5px] border-[1.5px]"
                style={{ borderColor: task.done ? Colors.accent : Colors.divider, backgroundColor: task.done ? Colors.accent : 'transparent' }}
              >
                {task.done && <CheckIcon size={13} color={Colors.bg} strokeWidth={2.4} />}
              </View>
              <Text variant="body" className={`flex-1 text-sm ${task.done ? 'line-through' : ''}`}>
                {task.label}
              </Text>
            </Pressable>
          ))
        )}
      </View>

      <Button variant="secondary" block icon={<PlusIcon size={15} color={Colors.text} />}>
        Add study session
      </Button>
    </Screen>
  );
}
