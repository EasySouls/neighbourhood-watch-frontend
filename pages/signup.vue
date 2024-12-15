<script lang="ts" setup>
import { ref } from 'vue';
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({
  title: 'Sign Up',
  linkTitle: 'Sign Up',
  order: 2,
});

const router = useRouter();
const toast = useToast();

const schema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

type Schema = z.infer<typeof schema>;

const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

async function signUpWithEmailAndPassword(event: FormSubmitEvent<Schema>) {
  error.value = null;
  const { firstName, lastName, email, password, confirmPassword } = event.data;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    error.value = new Error('Email and password are required');
    return;
  }
  if (password !== confirmPassword) {
    error.value = new Error('Passwords do not match');
    return;
  }
  try {
    const res = await $fetch<Response>(
      'https://localhost:7250/api/identity/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        }),
        credentials: 'include',
      }
    );
    console.log(res);
    if (!res.ok) {
      const json = await res.json();
      throw new Error(JSON.stringify(json) || 'Failed to sign up');
    }
    toast.add({
      title: 'Signed up successfully! Log in to continue',
      timeout: 3000,
    });
    router.push('/login');
  } catch (reason) {
    console.error('Failed to sign up', reason);
    error.value = reason as Error;
  }
}

// display errors if any
const error = ref<Error | null>(null);
</script>

<template>
  <div class="p-4 flex flex-col justify-center items-center w-full">
    <h1 class="mt-12 mb-8">Sign Up</h1>

    <UForm
      :schema="schema"
      :state="state"
      class="flex flex-col gap-4 w-80"
      @submit="signUpWithEmailAndPassword"
    >
      <UFormGroup :label="$t('firstName')" name="firstName">
        <UInput v-model="state.firstName" placeholder="Enter your first name" />
      </UFormGroup>

      <UFormGroup :label="$t('lastName')" name="lastName">
        <UInput v-model="state.lastName" placeholder="Enter your last name" />
      </UFormGroup>

      <UFormGroup :label="$t('email')" name="email">
        <UInput v-model="state.email" placeholder="Enter your email" />
      </UFormGroup>

      <UFormGroup :label="$t('password')" name="password">
        <UInput
          v-model="state.password"
          type="password"
          placeholder="Enter your password"
        />
      </UFormGroup>

      <UFormGroup :label="$t('confirmPassword')" name="confirmPassword">
        <UInput
          v-model="state.confirmPassword"
          type="password"
          placeholder="Confirm your password"
        />
      </UFormGroup>

      <UButton type="submit">Sign Up</UButton>

      <UAlert
        v-if="error"
        color="primary"
        variant="outline"
        :title="error.message"
      />
    </UForm>

    <div class="mt-8 flex flex-col items-center gap-2">
      <p>You already have an account?</p>
      <NuxtLink to="/login">Login</NuxtLink>
    </div>
  </div>
</template>

<style></style>
