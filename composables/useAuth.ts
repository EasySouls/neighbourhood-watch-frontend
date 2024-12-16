import type { Session, SessionResponse } from '~/types';

export const useAuth = () => {};

export async function signUpWithEmail(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const res = await $fetch<SessionResponse>('/api/identity/register', {
      method: 'POST',
      baseURL: useNuxtApp().$config.public.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        firstName,
        lastName,
        email,
        password,
      },
    });

    // TODO - We are only getting the session here, we should also get the user

    if (res) {
      useState('session').value = res;
      await useRouter().push('/');
    }
  } catch (e) {
    console.error(e);
  }
}
