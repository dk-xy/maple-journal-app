<template>
    <div>
      <h2>Progression</h2>
      <div v-if="character.Progression.ArcaneRiver.isActive">
        <h3>Arcane River</h3>
        <div class="edit-symbol-Container">
          <div class="regionContainer" v-for="(region, index) in activeArcaneRiverRegions" :key="index">
            <div></div>
            {{ region.RegionName }}: 
            <input type="checkbox" v-model="region.RegionDailyCompletion" @change="saveProgression" /> / 
            <input type="checkbox" v-model="region.RegionWeeklyCompletion" @change="saveProgression" />
          </div>
        </div>
      </div>
      <div v-if="character.Progression.Grandis.isActive">
        <h3>Grandis</h3>
        <ul>
          <li v-for="(region, index) in activeGrandisRegions" :key="index">
            {{ region.RegionName }}: 
            <input type="checkbox" v-model="region.RegionDailyCompletion" @change="saveProgression" disabled />
          </li>
        </ul>
      </div>
      <div v-if="character.Progression.Dailies.isActive">
        <h3>Dailies</h3>
        <ul>
          <li v-for="(daily, index) in activeDailies" :key="index">
            {{ daily.Name }}: <input type="checkbox" v-model="daily.CompletionStatus" @change="saveProgression" disabled />
          </li>
        </ul>
      </div>
      <div v-if="character.Progression.Weeklies.isActive">
        <h3>Weeklies</h3>
        <ul>
          <li v-for="(weekly, index) in activeWeeklies" :key="index">
            {{ weekly.Name }}: <input type="checkbox" v-model="weekly.CompletionStatus" @change="saveProgression" disabled />
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { saveData } from '../../localStorageService'
  
  const props = defineProps({
    character: {
      type: Object,
      required: true
    }
  })
  
  const activeArcaneRiverRegions = computed(() => {
    return props.character.Progression.ArcaneRiver.Region.filter(region => region.isActive)
  })
  
  const activeGrandisRegions = computed(() => {
    return props.character.Progression.Grandis.Region.filter(region => region.isActive)
  })
  
  const activeDailies = computed(() => {
    return props.character.Progression.Dailies.DailyActivity.filter(daily => daily.isActive)
  })
  
  const activeWeeklies = computed(() => {
    return props.character.Progression.Weeklies.WeeklyActivity.filter(weekly => weekly.isActive)
  })
  
  function saveProgression() {
    const characters = JSON.parse(localStorage.getItem('mapleStoryData')).Legion.Characters
    const characterIndex = characters.findIndex(c => c.Name === props.character.Name)
    if (characterIndex !== -1) {
      characters[characterIndex] = props.character
      saveData({ Legion: { Characters: characters } })
    }
  }
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>