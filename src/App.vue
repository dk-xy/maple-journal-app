<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/legion">Legion</RouterLink>
      <RouterLink to="/checklist">Checklist</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
nav {
  background: linear-gradient(94deg, rgba(156, 110, 73, 0.5) -16.45%, rgba(133, 116, 103, 0.418) 128.2%);
  padding: 1em;
  height: auto;
  display: flex;
  justify-content: space-around;
}
nav a {
  margin: 0;
  text-decoration: none;
  color: #000;
  font-weight: bold;
}
</style>