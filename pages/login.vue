<script lang="ts" setup>
import { ref, onMounted } from 'vue';

useHead({
  title: 'Login',
});

definePageMeta({
  title: 'Login',
  linkTitle: 'Login',
  order: 0,
});

const toast = useToast();

const email = ref('');
const password = ref('');

async function handleLoginWithEmailAndPassword() {
  error.value = null;

  if (!email.value || !password.value) {
    error.value = new Error('Email and password are required');
    return;
  }

  const res = await $fetch<Response>('/api/identity/login', {
    method: 'POST',
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    credentials: 'include',
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data);
    toast.add({
      title: 'Logged in successfully',
      timeout: 3000,
    });
    // navigateTo('/');
  } else {
    const data = await res.json();
    toast.add({
      title: 'Failed to login',
      description: data.message,
      timeout: 3000,
    });
    error.value = new Error(data.message);
  }
}

async function handleSignInWithGoogle() {
  error.value = null;

  // window.location.href = `${useRuntimeConfig().public.apiBaseUrl}/api/auth/signin/google`;

  const res = await $fetch<Response>('/api/auth/signin/google', {
    method: 'POST',
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    mode: 'cors',
    credentials: 'include',
    redirect: 'follow',
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  const data = await res.json();
  console.log(data);
  toast.add({
    title: 'Logged in successfully',
    timeout: 3000,
  });
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
</script>

<template>
  <main class="p-4 flex flex-col justify-center items-center">
    <h1 class="mt-12 mb-8">{{ $t('login') }}</h1>

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
      <UButton @click.prevent="handleLoginWithEmailAndPassword()"
        >Login</UButton
      >
      <UButton @click.prevent="handleSignInWithGoogle()"
        >Sign in with Google</UButton
      >

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
