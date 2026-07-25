import { Stack } from 'expo-router';

export default function ConsultantLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="students/[id]" />
    </Stack>
  );
}
