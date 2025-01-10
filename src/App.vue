<script setup lang="ts">
</script>

<template>
  <nav>
    <li><RouterLink to="/">Home</RouterLink></li>
    <li><RouterLink :to="{ name: 'demo'}">Demo</RouterLink></li>
    <li><RouterLink :to="{ name: 'videos'}">Videos</RouterLink></li>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  margin-bottom: 20px;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.router-link-active {
  background-color: #04AA6D;
}
</style>
