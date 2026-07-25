import { router } from 'expo-router';

export function navigateToSkill(skill: string) {
  if (skill === 'Writing') {
    router.push('/writing');
  } else if (skill === 'Speaking') {
    router.push('/speaking');
  } else {
    router.push({ pathname: '/quiz/[skill]', params: { skill } });
  }
}
