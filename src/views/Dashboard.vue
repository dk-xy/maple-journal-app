<script setup>
import { ref } from 'vue'
import { getCharacters } from '../localStorageService'
import VIMatrixCard from '../components/Dashboard/VIMatrixCard.vue'
import DailyWeeklyCard from '../components/Dashboard/DailyWeeklyCard.vue'
import BossesCard from '../components/Dashboard/BossesCard.vue'

const characters = ref(getCharacters())
</script>

<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <VIMatrixCard :characters="characters" />
    <DailyWeeklyCard :characters="characters" />
    <BossesCard :characters="characters" />
  </div>
</template>