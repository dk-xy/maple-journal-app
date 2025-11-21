<script setup>
import { ref } from 'vue'
import { getCharacters } from '../localStorageService'
import VIMatrixCard from '../components/Dashboard/VIMatrixCard.vue'
import DailyWeeklyCard from '../components/Dashboard/DailyWeeklyCard.vue'
import BossesCard from '../components/Dashboard/BossesCard.vue'
import SymbolsCard from '../components/Dashboard/SymbolsCard.vue'
import { getData, saveData } from './../localStorageService'


const data = getData()
const characters = data.Legion.Characters
</script>

<template>
  <div class="dashboard-container">
    <div class="title-section">
      <img src="/src/assets/blacklist.png" alt="oblivion symbol" class="dashboard-icon" />
      <h1>Dashboard</h1>
    </div>

    <!-- changed: wrap cards in responsive grid -->
    <div class="dashboard-grid">
      <VIMatrixCard :characters="characters" />
      <SymbolsCard :characters="characters" />
      <DailyWeeklyCard :characters="characters" />
      <BossesCard :characters="characters" />
    </div>
  </div>
</template>

<style scoped>
.title-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
  width: 100%;
  padding: 32px 24px;
}

.title-section h1 {
  margin: 0;
  font-size: 2.2em;
  color: var(--dark-text);
}

.dashboard-icon {
  width: 32x;
  height: 32px;
}

/* new: responsive grid for dashboard cards */
.dashboard-grid {
  display: grid;
  gap: 24px;
  /* mobile: single column */
  grid-template-columns: 1fr;
}

/* two columns on medium+ screens (wide) */
@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* optional: limit card max-width and center grid */
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dashboard-grid > * {
  width: 100%;
  box-sizing: border-box;
}

</style>