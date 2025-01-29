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
    <div class="content">
      <RouterView />
    </div>
   
  </div>

</template>

<style scoped>
nav {
  /* background: linear-gradient(94deg, rgba(156, 110, 73, 0.5) -16.45%, rgba(133, 116, 103, 0.418) 128.2%); */
  background-color: var(--elev-2);
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  max-width: 1280px;
  z-index: 1000;
  margin-top: 12px;
}

nav a {
  margin: 0;
  text-decoration: none;
  color: #000;
  padding: 8px 32px;
  /* font-weight: bold; */
}

.content {
  margin-top: 32px;
  padding: 1em;
}
</style>