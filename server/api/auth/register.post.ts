import { sendError } from 'h3';
import type { SessionResponse, User } from '~/types';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { firstName, lastName, email, password } = body;
  console.log(body);

  const baseUrl = useRuntimeConfig().public.apiBaseUrl;
  console.log('baseUrl', baseUrl);

  try {
    const res = await $fetch<Response>(`${baseUrl}/api/auth/exists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return sendError(
        event,
        createError({
          statusCode: res.status,
          statusMessage: 'Failed to check if user exists',
        })
      );
    }

    const userExists = await res.json();
    if (userExists.exists) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'User already exists' })
      );
    }

    const sessionResponse = await $fetch<SessionResponse>(
      '/api/identity/register',
      {
        method: 'POST',
        baseURL: baseUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        body: { firstName, lastName, email, password },
      }
    );

    setCookie(event, 'auth_token', sessionResponse.accessToken, {
      path: '/',
      httpOnly: true,
    });

    const userResponse = await $fetch<{ user: User }>('/api/auth/me', {
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${sessionResponse.accessToken}`,
      },
    });

    return { user: userResponse.user };
  } catch (e) {
    console.error(e);
    return sendError(event, createError({ statusCode: 500 }));
  }
});
