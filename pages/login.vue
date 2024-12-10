<script lang="ts" setup>
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {
  useCurrentUser,
  useFirebaseAuth,
  useIsCurrentUserLoaded,
} from 'vuefire';
import { ref, onMounted } from 'vue';
import { doc, getFirestore, setDoc } from '@firebase/firestore';

useHead({
  title: 'Login',
});

definePageMeta({
  title: 'Login',
  linkTitle: 'Login',
  order: 0,
});

const auth = useFirebaseAuth()!; // only exists on client side
const user = useCurrentUser();
const isUserLoaded = useIsCurrentUserLoaded();

const toast = useToast();

const email = ref('');
const password = ref('');

function loginWithEmailAndPassword() {
  error.value = null;

  if (!email.value || !password.value) {
    error.value = new Error('Email and password are required');
    return;
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      navigateTo('/');
      toast.add({
        title: 'Logged in successfully',
        timeout: 3000,
      });
    })
    .catch((reason) => {
      toast.add({
        title: 'Failed to login',
        description: reason.message,
        timeout: 3000,
      });
      console.error('Failed signInWithEmailAndPassword', reason);
      error.value = reason;
    });
}

async function signinPopup() {
  error.value = null;
  try {
    const { user } = await signInWithPopup(auth, googleAuthProvider);
    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);
    const firstName = user.displayName?.split(' ')[0];
    const lastName = user.displayName?.split(' ')[1];
    await setDoc(userRef, {
      authId: user.uid,
      email: user.email,
      firstName: firstName || 'User',
      lastName: lastName || '',
      photoURL: user.photoURL,
    });
    toast.add({
      title: 'Logged in successfully',
      timeout: 3000,
    });
  } catch (reason) {
    toast.add({
      title: 'Failed to login with Google',
      timeout: 3000,
    });
    console.error('Failed to sign in with Google', reason);
    error.value = reason as Error;
  }
}

const error = ref<Error | null>(null);

const route = useRoute();

onMounted(() => {
  if (route.query.redirect) {
    toast.add({
      title: 'Please login to access ' + route.query.redirect,
      timeout: 1500,
    });
  }
});

// Redirect to the home page when the user logs in,
// or if the user is already logged in.
watchEffect(() => {
  if (user.value && auth.currentUser) {
    navigateTo('/');
  }
});
</script>

<script lang="ts">
export const googleAuthProvider = new GoogleAuthProvider();
</script>

<template>
  <main class="p-4 flex flex-col justify-center items-center">
    <h1 class="mt-12 mb-8">{{ $t('login') }}</h1>

    <ClientOnly>
      <p v-if="!isUserLoaded">Loading</p>
    </ClientOnly>

    <div class="w-80 flex flex-col gap-4">
      <UInput
        v-model="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
      <UInput
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <UButton @click="loginWithEmailAndPassword()">Login</UButton>
      <UButton @click="signinPopup()">Sign in with Google</UButton>
      <UButton @click="signInAnonymously(auth)">Sign in anonymously</UButton>

      <UAlert
        v-if="error"
        :title="error.message"
        color="primary"
        variant="outline"
      />
    </div>

    <div class="mt-8 flex flex-col items-center gap-2">
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
