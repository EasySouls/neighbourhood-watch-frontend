import type { SessionResponse, User } from '~/types';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
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

    const baseUrl = useNuxtApp().$config.public.apiBaseUrl;
    const user = await $fetch<{ user: User }>(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      credentials: 'include',
    });
    console.log('user', user);
    if (!user) {
      throw new Error('No user found');
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
