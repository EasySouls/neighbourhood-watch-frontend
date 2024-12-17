import type { SessionResponse } from '~/types';

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
