import { Tabs } from 'expo-router';
import { useColors } from '@/hooks/use-colors';
import { HomeIcon, PlanIcon, ProfileIcon, ReadingIcon } from '@/components/ui/icons';

export default function StudentTabsLayout() {
  const Colors = useColors();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.accent700,
        tabBarInactiveTintColor: Colors.neutral500,
        tabBarStyle: { borderTopColor: Colors.divider, backgroundColor: Colors.bg },
        tabBarLabelStyle: { fontSize: 10.5 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Home', tabBarIcon: ({ color }) => <HomeIcon size={20} color={color as string} /> }}
      />
      <Tabs.Screen
        name="practice"
        options={{ title: 'Practice', tabBarIcon: ({ color }) => <ReadingIcon size={20} color={color as string} strokeWidth={1.6} /> }}
      />
      <Tabs.Screen
        name="plan"
        options={{ title: 'Plan', tabBarIcon: ({ color }) => <PlanIcon size={20} color={color as string} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color }) => <ProfileIcon size={20} color={color as string} /> }}
      />
    </Tabs>
  );
}
