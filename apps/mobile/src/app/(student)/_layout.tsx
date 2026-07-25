import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="quiz/[skill]" />
      <Stack.Screen name="speaking" />
      <Stack.Screen name="writing" />
    </Stack>
  );
}
