<script setup lang="ts">
const user = useUser();
</script>

<template>
  <div>
    <h1>Profile</h1>
    <p>Welcome, {{ user?.firstName }}!</p>
  </div>
</template>
