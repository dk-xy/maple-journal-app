<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Icon from './components/Icon.vue'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">
        <div class="menu-item-container">
          <Icon iconName="dashboard" />
          <div class="menu-item-container-title">Dashboard</div>
        </div>
      </RouterLink>
      <RouterLink to="/legion">
        <div class="menu-item-container">
          <Icon iconName="swords" />
          <div class="menu-item-container-title">Legion</div>
        </div>
      </RouterLink>
      <RouterLink to="/checklist">
        <div class="menu-item-container">
          <Icon iconName="checklist" />
          <div class="menu-item-container-title">Checklist</div>
        </div>
      </RouterLink>
      <RouterLink to="/settings">
        <div class="menu-item-container">
          <Icon iconName="settings" />
          <div class="menu-item-container-title">Settings</div>
        </div>
      </RouterLink>
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
  /* padding: 1em; */
  padding: 0.6em 1.6em;
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
  z-index: 100;
  margin-top: 12px;

}

nav a {
  margin: 0;
  text-decoration: none;
  color: var(--dark-text);
  padding: 2px 32px;
  /* font-weight: bold; */
}


.content {
  margin-top: 64px;
  padding: 1em;
}

.menu-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
}

.menu-item-container-title {
  font-size: 0.8rem;
}
</style>