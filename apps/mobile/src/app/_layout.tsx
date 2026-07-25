import '../../global.css';

import { Barlow_400Regular, Barlow_500Medium, Barlow_700Bold } from '@expo-google-fonts/barlow';
import { BarlowCondensed_600SemiBold } from '@expo-google-fonts/barlow-condensed';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useEffect, useRef } from 'react';
import { Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryProvider } from '@/providers/query-provider';
import { useAppStore } from '@/store/app.store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_700Bold,
    BarlowCondensed_600SemiBold,
  });
  const hasHydrated = useAppStore((s) => s._hasHydrated);
  const authDone = useAppStore((s) => s.authDone);
  const onboardingDone = useAppStore((s) => s.onboardingDone);
  const role = useAppStore((s) => s.role);
  const darkMode = useAppStore((s) => s.darkMode);
  const themeIsManual = useAppStore((s) => s.themeIsManual);
  const setDarkMode = useAppStore((s) => s.setDarkMode);
  const { setColorScheme } = useNativeWindColorScheme();
  const didInitSystemTheme = useRef(false);

  const ready = fontsLoaded && hasHydrated;

  // Default to the OS appearance once, on cold start, unless the user has
  // already picked Light/Dark manually in Profile. Deliberately a one-time
  // read (not a live subscription): NativeWind's setColorScheme below writes
  // through to the same Appearance API this would listen on, so a continuous
  // subscription ping-pongs the two effects into an infinite loop.
  useEffect(() => {
    if (ready && !themeIsManual && !didInitSystemTheme.current) {
      didInitSystemTheme.current = true;
      setDarkMode(Appearance.getColorScheme() === 'dark');
    }
  }, [ready, themeIsManual, setDarkMode]);

  useEffect(() => {
    if (ready) {
      setColorScheme(darkMode ? 'dark' : 'light');
      SplashScreen.hideAsync();
    }
  }, [ready, darkMode, setColorScheme]);

  if (!ready) {
    return null;
  }

  return (
    <QueryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!authDone}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Protected guard={authDone && !onboardingDone}>
            <Stack.Screen name="(onboarding)" />
          </Stack.Protected>
          <Stack.Protected guard={authDone && onboardingDone && role === 'student'}>
            <Stack.Screen name="(student)" />
          </Stack.Protected>
          <Stack.Protected guard={authDone && onboardingDone && role === 'consultant'}>
            <Stack.Screen name="(consultant)" />
          </Stack.Protected>
        </Stack>
      </GestureHandlerRootView>
    </QueryProvider>
  );
}
