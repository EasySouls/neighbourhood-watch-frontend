import type { SessionResponse, User } from '~/types';

export const useAuthCookie = () => useCookie('session');

export async function useUser(): Promise<User | null> {
  const authCookie = useAuthCookie().value;
  const user = useState<User | null>('user');

  if (authCookie && !user.value) {
    const apiUrl = useNuxtApp().$config.public.apiBaseUrl;
    const { data } = await useFetch<User>(`${apiUrl}/api/auth/me`, {
      headers: useRequestHeaders(['cookie']),
    });

    user.value = data.value;
  }

  return user.value;
}

export async function fetchUserData(): Promise<User | null> {
  try {
    const baseUrl = useNuxtApp().$config.public.apiBaseUrl;

    const authTokenCookie = useCookie('session').value;
    const sessionState = useState<SessionResponse | null>('session');

    const session = sessionState.value;

    console.log('session', session);
    console.log('authTokenCookie', authTokenCookie);

    const bearerToken = authTokenCookie || session?.accessToken;
    console.log('bearerToken', bearerToken);
    if (!bearerToken) {
      throw new Error('No auth token found');
    }

    const userRes = await $fetch<{ user: User }>(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      credentials: 'include',
    });

    if (!userRes) {
      throw new Error('No user found');
    }

    return userRes.user;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return null;
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const baseUrl = useNuxtApp().$config.public.apiBaseUrl;

    const loginResponse = await $fetch<SessionResponse>(
      `${baseUrl}/api/identity/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include',
      }
    );

    if (loginResponse == null || !loginResponse.accessToken) {
      throw new Error('No access token found');
    }

    console.log('loginResponse', loginResponse);

    useCookie('session').value = loginResponse.accessToken;
    useState('session').value = loginResponse;
  } catch (e) {
    console.error(e);
  }
}

export async function signUpWithEmail(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const baseUrl = useNuxtApp().$config.public.apiBaseUrl;

    const userExistsRes = await $fetch<{ exists: boolean }>(
      `${baseUrl}/api/auth/exists`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    console.log('userExistsRes', userExistsRes);

    if (userExistsRes.exists) {
      throw new Error('User already exists');
    }

    const registerRes = await $fetch<Response>(
      `${baseUrl}/api/identity/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      }
    );

    if (!registerRes.ok) {
      throw new Error('Failed to register');
    }
  } catch (e) {
    console.error(e);
  }
}

export async function signOut() {
  const apiUrl = useNuxtApp().$config.public.apiBaseUrl;
  const authCookie = useAuthCookie().value;
  if (!authCookie) {
    return;
  }

  await useFetch(`${apiUrl}/api/auth/logout`, {
    headers: useRequestHeaders(['cookie']),
  });

  useState('user').value = null;
  useCookie('session').value = null;

  await useRouter().push('/login');
}
