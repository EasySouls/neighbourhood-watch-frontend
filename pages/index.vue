<script setup lang="ts">
import { useCivilGuard } from '~/composables/useCivilGuard';

useHead({
  title: 'Home',
});

definePageMeta({
  middleware: 'auth',
});

const civilGuard = useCivilGuard();
</script>

<template>
  <div v-if="civilGuard">
    <h1>{{ civilGuard.name }}</h1>
  </div>
  <div v-else>
    <h1 class="pt-8 pb-4">Welcome</h1>
    <p>Your user is not yet linked to a civil guard</p>
  </div>
</template>
