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
    <h1>Dashboard</h1>
    <VIMatrixCard :characters="characters" />
    <SymbolsCard :characters="characters" />
    <DailyWeeklyCard :characters="characters" />
    <BossesCard :characters="characters" />
  </div>
</template>

<style scoped>
h2 {
  margin: 0;

  font-size: 1.1em;
  font-weight: 700;
}
</style>