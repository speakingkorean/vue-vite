<script setup lang="ts">
</script>

<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <br>
    <RouterLink :to="{ name: 'demo'}">Demo</RouterLink>
    <br>
    <RouterLink :to="{ name: 'videos'}">Videos</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
