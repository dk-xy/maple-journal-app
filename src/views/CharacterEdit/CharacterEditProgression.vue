<template>
    <div>
      <h2>Edit Progression</h2>
      <div>
        <h3>Arcane River</h3>
        <div v-for="(region, index) in character.Progression.ArcaneRiver.Region" :key="index">
          <label :for="'arcane-' + index">{{ region.RegionName }}</label>
          <input :id="'arcane-active-' + index" v-model="region.isActive" type="checkbox" />
        </div>
      </div>
      <div>
        <h3>Grandis</h3>
        <div v-for="(region, index) in character.Progression.Grandis.Region" :key="index">
          <label :for="'grandis-' + index">{{ region.RegionName }}</label>
          <input :id="'grandis-active-' + index" v-model="region.isActive" type="checkbox" />
        </div>
      </div>
      <div>
        <h3>Dailies</h3>
        <div v-for="(daily, index) in character.Progression.Dailies.DailyActivity" :key="index">
          <label :for="'daily-' + index">{{ daily.Name }}</label>
          <input :id="'daily-active-' + index" v-model="daily.isActive" type="checkbox" />
        </div>
      </div>
      <div>
        <h3>Weeklies</h3>
        <div v-for="(weekly, index) in character.Progression.Weeklies.WeeklyActivity" :key="index">
          <label :for="'weekly-' + index">{{ weekly.Name }}</label>
          <input :id="'weekly-active-' + index" v-model="weekly.isActive" type="checkbox" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { watch } from 'vue'
  
  const props = defineProps({
    character: {
      type: Object,
      required: true
    }
  })
  
  // Watchers for Arcane River
  watch(
    () => props.character.Progression.ArcaneRiver.Region.map(region => region.isActive),
    (newValues) => {
      props.character.Progression.ArcaneRiver.isActive = newValues.some(isActive => isActive)
    },
    { deep: true }
  )
  
  // Watchers for Grandis
  watch(
    () => props.character.Progression.Grandis.Region.map(region => region.isActive),
    (newValues) => {
      props.character.Progression.Grandis.isActive = newValues.some(isActive => isActive)
    },
    { deep: true }
  )
  
  // Watchers for Dailies
  watch(
    () => props.character.Progression.Dailies.DailyActivity.map(daily => daily.isActive),
    (newValues) => {
      props.character.Progression.Dailies.isActive = newValues.some(isActive => isActive)
    },
    { deep: true }
  )
  
  // Watchers for Weeklies
  watch(
    () => props.character.Progression.Weeklies.WeeklyActivity.map(weekly => weekly.isActive),
    (newValues) => {
      props.character.Progression.Weeklies.isActive = newValues.some(isActive => isActive)
    },
    { deep: true }
  )
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>