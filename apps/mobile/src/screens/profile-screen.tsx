import { Pressable, View } from 'react-native';
import { Screen } from '@/components/screen';
import { Button } from '@/components/ui/Button';
import { ChevronRightIcon, LogoutIcon, MoonIcon, ProfileIcon, StudentsIcon, SunIcon } from '@/components/ui/icons';
import { OptionTile } from '@/components/ui/OptionTile';
import { Switch } from '@/components/ui/Switch';
import { Text } from '@/components/ui/Text';
import { useColors } from '@/hooks/use-colors';
import { useAppStore } from '@/store/app.store';

export default function ProfileScreen() {
  const Colors = useColors();
  const role = useAppStore((s) => s.role);
  const setRole = useAppStore((s) => s.setRole);
  const targetBand = useAppStore((s) => s.targetBand);
  const notifOn = useAppStore((s) => s.notifOn);
  const setNotif = useAppStore((s) => s.setNotif);
  const remindersOn = useAppStore((s) => s.remindersOn);
  const setReminders = useAppStore((s) => s.setReminders);
  const darkMode = useAppStore((s) => s.darkMode);
  const setDarkModeManual = useAppStore((s) => s.setDarkModeManual);
  const resetApp = useAppStore((s) => s.resetApp);

  const initials = 'AK';

  return (
    <Screen title="Profile">
      <View className="flex-row items-center gap-3.5">
        <View className="h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: Colors.accent100 }}>
          <Text variant="h3" color={Colors.accent800}>
            {initials}
          </Text>
        </View>
        <View>
          <Text variant="h3" className="text-lg">
            Alex Kim
          </Text>
          <Text variant="small" color={Colors.neutral600}>
            alex.kim@example.com
          </Text>
        </View>
      </View>

      {role === 'student' && (
        <View>
          <Text variant="label" color={Colors.accent}>
            Target band
          </Text>
          <Text variant="h2" color={Colors.accent800} className="mt-1">
            {targetBand}
          </Text>
        </View>
      )}

      <View className="h-px" style={{ backgroundColor: Colors.divider }} />

      <View className="gap-0.5">
        <View className="flex-row items-center justify-between py-2.5">
          <Text variant="body" className="text-sm">
            Notifications
          </Text>
          <Switch value={notifOn} onValueChange={setNotif} />
        </View>
        <View className="flex-row items-center justify-between py-2.5">
          <Text variant="body" className="text-sm">
            Study reminders
          </Text>
          <Switch value={remindersOn} onValueChange={setReminders} />
        </View>
      </View>

      <View className="h-px" style={{ backgroundColor: Colors.divider }} />

      <View>
        <Text variant="label" color={Colors.accent}>
          Appearance
        </Text>
        <View className="mt-2.5 flex-row gap-2.5">
          <OptionTile
            label="Light"
            selected={!darkMode}
            onPress={() => setDarkModeManual(false)}
            icon={(color) => <SunIcon size={22} color={color} />}
          />
          <OptionTile
            label="Dark"
            selected={darkMode}
            onPress={() => setDarkModeManual(true)}
            icon={(color) => <MoonIcon size={22} color={color} />}
          />
        </View>
      </View>

      <View className="h-px" style={{ backgroundColor: Colors.divider }} />

      <View>
        <Text variant="label" color={Colors.accent}>
          I am a
        </Text>
        <View className="mt-2.5 flex-row gap-2.5">
          <OptionTile
            label="Student"
            selected={role === 'student'}
            onPress={() => setRole('student')}
            icon={(color) => <ProfileIcon size={22} color={color} />}
          />
          <OptionTile
            label="Consultant"
            selected={role === 'consultant'}
            onPress={() => setRole('consultant')}
            icon={(color) => <StudentsIcon size={22} color={color} />}
          />
        </View>
      </View>

      <View className="h-px" style={{ backgroundColor: Colors.divider }} />

      <Pressable className="flex-row items-center justify-between py-2.5">
        <Text variant="body" className="text-sm" color={Colors.accent}>
          Help &amp; support
        </Text>
        <ChevronRightIcon size={16} color={Colors.text} />
      </Pressable>
      <Button
        variant="secondary"
        block
        icon={<LogoutIcon size={15} color={Colors.text} />}
        onPress={resetApp}
      >
        Log out
      </Button>
    </Screen>
  );
}
