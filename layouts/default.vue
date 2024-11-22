<script lang="ts" setup>
const route = useRoute();

useHead({
  meta: [
    {
      property: 'og:title',
      content: `Neighbourhood Watch - ${route.meta.title}`,
    },
  ],
});
</script>

<template>
  <div>
    <AppHeader />
    <slot />
  </div>
</template>
