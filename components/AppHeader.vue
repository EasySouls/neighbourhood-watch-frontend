<script setup lang="ts">
const user = useCurrentUser();
const auth = useFirebaseAuth();
const router = useRouter();

const { setLocale } = useI18n();

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

const dropdownItems = [
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-logout-20-solid',
      click: logout,
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-heroicons-user-20-solid',
      click: () => router.push('/profile'),
    },
  ],
  [
    {
      label: 'Hungarian',
      click: () => setLocale('hu'),
    },
    {
      label: 'English',
      click: () => setLocale('en'),
    },
  ],
];
</script>

<template>
  <header>
    <h1 class="title">Neighbourhood Watch</h1>
    <div v-if="user !== null && user !== undefined">
      <UDropdown :items="dropdownItems">
        <UAvatar
          :src="user.photoURL ? user.photoURL : undefined"
          alt="Profile picture"
          size="md"
        />
      </UDropdown>
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
