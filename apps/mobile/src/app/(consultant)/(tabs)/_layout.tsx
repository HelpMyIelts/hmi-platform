import { Tabs } from 'expo-router';
import { useColors } from '@/hooks/use-colors';
import { PlanIcon, ProfileIcon, ReportsIcon, StudentsIcon } from '@/components/ui/icons';

export default function ConsultantTabsLayout() {
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
        name="students"
        options={{ title: 'Students', tabBarIcon: ({ color }) => <StudentsIcon size={20} color={color as string} /> }}
      />
      <Tabs.Screen
        name="reports"
        options={{ title: 'Reports', tabBarIcon: ({ color }) => <ReportsIcon size={20} color={color as string} /> }}
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
