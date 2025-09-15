<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Icon from './components/Icon.vue'

import { onMounted } from 'vue'
import { getData, saveData } from './localStorageService'
import { checkResets } from './utils/resetUtils'


onMounted(() => {
  const data = getData()
  data.Legion.Characters.forEach(character => {
    checkResets(character)
  })
  saveData(data)
})
</script>

<template>
  <div class="app-container">
  
    <nav class="main-header">
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
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 1em;
  box-sizing: border-box;
}


nav.main-header {
  background-color: var(--elev-2);
  padding: 16px 32px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 728px;
  z-index: 100;
  margin: auto;
  margin-top: 12px;
  min-width: 320px;
}

nav a {
  margin: 0;
  text-decoration: none;
  color: var(--dark-text);
  padding: 2px 16px;

  /* font-weight: bold; */
}

/* 
.content {

  padding: 0.4em;
  margin: auto;
  margin-top: 64px;
} */

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: auto;
  margin-top: 80px; /* Adjust this value based on the height of your nav */
  max-width: 1280px;
  min-width: 375px;
  width: 100%;
  box-sizing: border-box;
}

.menu-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
}

.menu-item-container-title {
  font-size: 0.8em;
}
</style>