<script lang="ts" setup>
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  useFirebaseAuth,
} from 'vuefire';
import { ref } from 'vue';

definePageMeta({
  title: 'Sign Up',
  linkTitle: 'Sign Up',
  order: 2,
});

const auth = useFirebaseAuth()!; // only exists on client side

const email = ref('');
const password = ref('');

function signUpWithEmailAndPassword() {
  error.value = null;
  signInWithEmailAndPassword(auth, email.value, password.value).catch(
    (reason) => {
      console.error('Failed signinPopup', reason);
      error.value = reason;
    }
  );
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

<script lang="ts">
export const googleAuthProvider = new GoogleAuthProvider();
</script>

<template>
  <div>
    <UInput v-model="email" label="Email" />
    <UInput v-model="password" label="Password" type="password" />
    <UButton @click="signUpWithEmailAndPassword">Sign Up</UButton>
  </div>
</template>

<style></style>
