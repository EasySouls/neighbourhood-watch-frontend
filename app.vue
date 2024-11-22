<script lang="ts" setup>
useHead({
  titleTemplate: '%s - Neighbourhood Watch',
  meta: [
    {
      name: 'description',
      content: 'The dashboard for the Neighbourhood Watch mobile app',
    },
  ],
});

const router = useRouter();
const route = useRoute();
const user = useCurrentUser();

// we don't need this watcher on server
onMounted(() => {
  watch(user, (user, prevUser) => {
    if (prevUser && !user) {
      // user logged out
      router.push('/login');
    } else if (user && typeof route.query.redirect === 'string') {
      // user logged in
      router.push(route.query.redirect);
    }
  });
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <UContainer>
        <NuxtPage />
      </UContainer>

      <UNotifications />
    </NuxtLayout>
  </div>
</template>
