<script lang="ts" setup>
import { getRedirectResult, signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';
import { ref } from 'vue';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

definePageMeta({
  title: 'Sign Up',
  linkTitle: 'Sign Up',
  order: 2,
});

const auth = useFirebaseAuth()!; // only exists on client side

const toast = useToast();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

async function signUpWithEmailAndPassword() {
  error.value = null;
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    error.value = new Error('Email and password are required');
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = new Error('Passwords do not match');
    return;
  }
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      authId: user.uid,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      photoURL: user.photoURL,
    });
    toast.add({
      title: 'Signed up successfully',
      timeout: 3000,
    });
  } catch (reason) {
    console.error('Failed to sign up', reason);
    error.value = reason as Error;
  }
}

// display errors if any
const error = ref<Error | null>(null);

// only on client side
onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason);
    error.value = reason;
  });
});
</script>

<template>
  <div class="p-4 flex flex-col justify-center items-center w-full">
    <h1 class="mt-12 mb-8">Sign Up</h1>

    <div class="flex flex-col gap-4 w-80">
      <UInput
        v-model="firstName"
        :label="$t('firstName')"
        placeholder="Enter your first name"
      />
      <UInput
        v-model="lastName"
        :label="$t('lastName')"
        placeholder="Enter your last name"
      />
      <UInput
        v-model="email"
        :label="$t('email')"
        placeholder="Enter your email"
      />
      <UInput
        v-model="password"
        :label="$t('password')"
        type="password"
        placeholder="Enter your password"
      />
      <UInput
        v-model="confirmPassword"
        :label="$t('confirmPassword')"
        type="password"
        placeholder="Confirm your password"
      />

      <UButton @click="signUpWithEmailAndPassword">Sign Up</UButton>

      <UAlert
        v-if="error"
        color="primary"
        variant="outline"
        :title="error.message"
      />
    </div>

    <div class="mt-8 flex flex-col items-center gap-2">
      <p>You already have an account?</p>
      <NuxtLink to="/login">Login</NuxtLink>
    </div>
  </div>
</template>

<style></style>
