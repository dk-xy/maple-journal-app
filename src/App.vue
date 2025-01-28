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
  background-color: #ffeccd;
  padding: 1em;
  height: auto;
  display: flex;
  justify-content: space-around;
}
nav a {
  margin: 0 1em;
  text-decoration: none;
  color: #000;
  font-weight: bold;
}
</style>