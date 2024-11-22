<script lang="ts" setup>
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInAnonymously,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import {
  useCurrentUser,
  useFirebaseAuth,
  useIsCurrentUserLoaded,
} from 'vuefire';
import { ref, onMounted } from 'vue';

definePageMeta({
  title: 'Login',
  linkTitle: 'Login',
  order: 2,
});

const auth = useFirebaseAuth()!; // only exists on client side
const user = useCurrentUser();
const isUserLoaded = useIsCurrentUserLoaded();

function signinRedirect() {
  signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinRedirect', reason);
    error.value = reason;
  });
}

function signinPopup() {
  error.value = null;
  signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinPopup', reason);
    error.value = reason;
  });
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

const route = useRoute();
const toast = useToast();

onMounted(() => {
  if (route.query.redirect) {
    toast.add({
      title: 'Please login to access ' + route.query.redirect,
      timeout: 1500,
    });
  }
});
</script>

<script lang="ts">
export const googleAuthProvider = new GoogleAuthProvider();
</script>

<template>
  <main>
    <h2>Login</h2>

    <ClientOnly>
      <p v-if="!isUserLoaded">Loading</p>
    </ClientOnly>

    <template v-if="user">
      <div class="flex">
        You are currently logged in as:
        <NuxtImg
          v-if="user.photoURL"
          class="avatar"
          :src="user.photoURL"
          referrerpolicy="no-referrer"
        />
        <strong
          >{{ user.isAnonymous ? '🥸' : '' }} {{ user.displayName }}.</strong
        >
      </div>

      <UButton @click="signOut(auth)">Logout</UButton>
    </template>

    <template v-else>
      <div class="w-80">
        <UButton @click="signinRedirect()"
          >SignIn with Google (redirect)</UButton
        >
        <UButton @click="signinPopup()">SignIn with Google (popup)</UButton>
        <UButton @click="signInAnonymously(auth)">SignIn Anonymously</UButton>
      </div>
    </template>

    <UAlert v-if="error" :title="error.message" />
    <div v-else-if="route.query.redirect" class="message-box">
      <p>
        Please login to access <code>{{ route.query.redirect }}</code
        >.
      </p>
    </div>

    <div>
      <p>Don't have an account?</p>
      <NuxtLink to="/signup">Sign up</NuxtLink>
    </div>
  </main>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.links {
  margin-top: 15px;
  text-align: center;
}

.links a {
  margin: 0 10px;
  color: #007bff;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style>
