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
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <UContainer>
        <NuxtPage />
      </UContainer>

      <UNotifications />
    </NuxtLayout>
  </div>
</template>
