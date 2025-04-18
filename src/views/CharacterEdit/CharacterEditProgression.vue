<template>
  <div class="character-edit-progression">
    <h2>Edit Progression</h2>

    <div class="allSymbols-container">
      <div class="region-container">
        <div class="section-header">
          <h3>Arcane River</h3>
          <button class="select-all-button" @click="toggleAllArcaneRiver">
            {{ allArcaneRiverSelected ? 'Deselect All' : 'Select All' }}
          </button>
        </div>
        <div class="symbol-container">
          <EditActivities v-for="(region, index) in character.Progression.ArcaneRiver.Region" :key="index"
            :id="'arcane-active-' + index" 
            :label="region.RegionName" 
            :class="'Symbol ArcaneRiver ' + region.RegionName"
            :image="`/src/assets/images/symbols/${region.key}.webp`"
            v-model="region.isActive" />
        </div>
      </div>

      <div class="region-container">
        <div class="section-header">
          <h3>Grandis</h3>
          <button class="select-all-button" @click="toggleAllGrandis">
            {{ allGrandisSelected ? 'Deselect All' : 'Select All' }}
          </button>
        </div>
        <div class="symbol-container">
          <EditActivities v-for="(region, index) in character.Progression.Grandis.Region" :key="index"
            :id="'grandis-active-' + index" 
            :label="region.RegionName" 
            :class="'Symbol Grandis ' + region.RegionName"
            :image="`/src/assets/images/symbols/${region.key}.webp`"
            v-model="region.isActive" />
        </div>
      </div>
    </div>

    <div class="activities-container">
      <div class="activity-block">
        <div class="section-header">
          <h3>Dailies</h3>
          <button class="select-all-button" @click="toggleAllDailies">
            {{ allDailiesSelected ? 'Deselect All' : 'Select All' }}
          </button>
        </div>
        <div class="activity-container">
          <EditActivities v-for="(daily, index) in character.Progression.Dailies.DailyActivity" :key="index"
            :id="'daily-active-' + index" 
            :class="'Activity ' + daily.Name" 
            :label="daily.Name"
            :image="`/src/assets/images/quests/${daily.key}.webp`"
            v-model="daily.isActive" />
        </div>
      </div>

      <div class="activity-block">
        <div class="section-header">
          <h3>Weeklies</h3>
          <button class="select-all-button" @click="toggleAllWeeklies">
            {{ allWeekliesSelected ? 'Deselect All' : 'Select All' }}
          </button>
        </div>
        <div class="activity-container">
          <EditActivities v-for="(weekly, index) in character.Progression.Weeklies.WeeklyActivity" :key="index"
            :id="'weekly-active-' + index" 
            :class="'Activity ' + weekly.Name" 
            :label="weekly.Name"
            :image="`/src/assets/images/quests/${weekly.key}.webp`"
            v-model="weekly.isActive" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import EditActivities from '../../components/CharacterEdit/Progression/EditActivities.vue'
const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const allArcaneRiverSelected = computed(() => {
  return props.character.Progression.ArcaneRiver.Region.every(region => region.isActive)
})

const allGrandisSelected = computed(() => {
  return props.character.Progression.Grandis.Region.every(region => region.isActive)
})

const allDailiesSelected = computed(() => {
  return props.character.Progression.Dailies.DailyActivity.every(daily => daily.isActive)
})

const allWeekliesSelected = computed(() => {
  return props.character.Progression.Weeklies.WeeklyActivity.every(weekly => weekly.isActive)
})

function toggleAllArcaneRiver() {
  const newValue = !allArcaneRiverSelected.value
  props.character.Progression.ArcaneRiver.Region.forEach(region => {
    region.isActive = newValue
  })
}

function toggleAllGrandis() {
  const newValue = !allGrandisSelected.value
  props.character.Progression.Grandis.Region.forEach(region => {
    region.isActive = newValue
  })
}

function toggleAllDailies() {
  const newValue = !allDailiesSelected.value
  props.character.Progression.Dailies.DailyActivity.forEach(daily => {
    daily.isActive = newValue
  })
}

function toggleAllWeeklies() {
  const newValue = !allWeekliesSelected.value
  props.character.Progression.Weeklies.WeeklyActivity.forEach(weekly => {
    weekly.isActive = newValue
  })
}


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

.character-edit-progression {
  display: flex;
  flex-direction: column;
  gap: 32px;
}


.section-header{
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.section-header h3{
  margin:0
}
.allSymbols-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* Add any custom styles here */

.symbol-container {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 8px 16px;
}

.activity-container {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 8px 16px;
}

.activities-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* max width 1000px */
@media (max-width: 968px) {
  .symbol-container {
    grid-template-columns: repeat(2, auto);
  }
}

@media (min-width: 968px) {
  .activities-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
}

@media (max-width: 768px) {
  .allSymbols-container {
    grid-template-columns: 1fr;
  }

  .symbol-container {
    grid-template-columns: repeat(2, auto);
  }

  .activities-container {
    grid-template-columns: 1fr;
  }
}

/* @media (max-width: 480px) {
  .symbol-container {
    grid-template-columns: 1fr;
  }
} */
</style>