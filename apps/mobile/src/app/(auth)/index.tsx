import { Image } from 'expo-image';
import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { GoogleButton } from '@/components/ui/GoogleButton';
import { Input } from '@/components/ui/Input';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Text } from '@/components/ui/Text';
import { Screen } from '@/components/screen';
import { useColors } from '@/hooks/use-colors';
import { useLogin, useSignup } from '@/query/auth.query';
import { useAppStore } from '@/store/app.store';

type AuthMode = 'login' | 'signup';

export default function AuthScreen() {
  const Colors = useColors();
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuthDone = useAppStore((s) => s.setAuthDone);
  const setOnboardingDone = useAppStore((s) => s.setOnboardingDone);
  const login = useLogin();
  const signup = useSignup();

  const isLogin = mode === 'login';
  const valid = isLogin
    ? email.length > 3 && password.length >= 8
    : name.length > 1 && email.length > 3 && password.length >= 8;
  const pending = login.isPending || signup.isPending;
  const errorMessage = (isLogin ? login.error : signup.error) as string | null | undefined;

  const submit = () => {
    if (isLogin) {
      login.mutate({ email, password });
    } else {
      const [firstName, ...rest] = name.trim().split(/\s+/);
      const lastName = rest.join(' ') || firstName;
      signup.mutate({ email, password, firstName, lastName });
    }
  };

  const continueWithGoogle = () => {
    setAuthDone(true);
    if (isLogin) setOnboardingDone(true);
  };

  const continueAsGuest = () => {
    setAuthDone(true);
    setOnboardingDone(true);
  };

  return (
    <Screen scroll={false}>
      <View className="items-center gap-2.5 pt-2">
        <Image
          source={require('@/assets/images/helpmyielts-logo.png')}
          style={{ width: 220, height: 147 }}
          contentFit="contain"
        />
        <Text variant="h2">{isLogin ? 'Welcome back' : 'Create your account'}</Text>
      </View>

      <SegmentedControl
        value={mode}
        onChange={setMode}
        options={[
          { label: 'Log in', value: 'login' },
          { label: 'Sign up', value: 'signup' },
        ]}
      />

      <View className="gap-4">
        {!isLogin && <Input label="Full name" placeholder="Alex Kim" value={name} onChangeText={setName} />}
        <Input
          label="Email"
          placeholder="you@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input label="Password" placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />
      </View>

      {errorMessage ? (
        <Text variant="small" color="#c0392b">
          {errorMessage}
        </Text>
      ) : null}

      <Button variant="primary" block disabled={!valid || pending} onPress={submit}>
        {pending ? 'Please wait…' : isLogin ? 'Log in' : 'Create account'}
      </Button>
      <Button variant="ghost" onPress={() => setMode(isLogin ? 'signup' : 'login')}>
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </Button>

      <View className="flex-row items-center gap-3">
        <View className="h-px flex-1" style={{ backgroundColor: Colors.divider }} />
        <Text variant="small" color={Colors.neutral600}>
          or continue with
        </Text>
        <View className="h-px flex-1" style={{ backgroundColor: Colors.divider }} />
      </View>

      <GoogleButton onPress={continueWithGoogle} />

      <View className="flex-1" />

      <Button variant="secondary" block onPress={continueAsGuest}>
        Continue as guest
      </Button>
    </Screen>
  );
}
