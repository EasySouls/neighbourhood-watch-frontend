<script setup lang="ts">
const user = useCurrentUser();
const auth = useFirebaseAuth();
const router = useRouter();

const logout = () => {
  if (auth == null) return;

  if (auth.currentUser == null) {
    return;
  }

  auth.signOut();
  router.push('/login');
};

const login = () => {
  router.push('/login');
};
</script>

<template>
  <header>
    <h1 class="title">Neighbourhood Watch</h1>
    <div v-if="user !== null && user !== undefined">
      <p>Welcome, {{ user.displayName }}</p>
      <UButton @click="logout">Logout</UButton>
      <NuxtImg
        :src="user.photoURL ? user.photoURL : undefined"
        alt="User avatar"
        width="50"
        height="50"
      />
    </div>
    <div v-else>
      <UButton @click="login">Login</UButton>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 1rem;
}

.title {
  font-size: x-large;
  margin: 0;
}
</style>
