<template>
  <div>
    <h2>Edit Progression</h2>

    <div class="allSymbols-container">
      <div class="region-container">
        <h3>Arcane River</h3>
        <div class="symbol-container">
          <EditActivities v-for="(region, index) in character.Progression.ArcaneRiver.Region" :key="index"
            :id="'arcane-active-' + index" :label="region.RegionName" :class="'Symbol ArcaneRiver ' + region.RegionName"
            v-model="region.isActive" />
        </div>
      </div>

      <div class="region-container">
        <h3>Grandis</h3>
        <div class="symbol-container">
          <EditActivities v-for="(region, index) in character.Progression.Grandis.Region" :key="index"
            :id="'grandis-active-' + index" :label="region.RegionName" :class="'Symbol Grandis ' + region.RegionName"
            v-model="region.isActive" />
        </div>
      </div>
    </div>

    <div class="activities-container">
      <div class="activity-block">
        <h3>Dailies</h3>
        <div class="activity-container">
          <EditActivities v-for="(daily, index) in character.Progression.Dailies.DailyActivity" :key="index"
            :id="'daily-active-' + index" :class="'Activity ' + daily.Name" :label="daily.Name"
            v-model="daily.isActive" />
        </div>
      </div>

      <div class="activity-block">
        <h3>Weeklies</h3>
        <div class="activity-container">
          <EditActivities v-for="(weekly, index) in character.Progression.Weeklies.WeeklyActivity" :key="index"
            :id="'weekly-active-' + index" :label="weekly.Name" :class="'Activity ' + weekly.Name"
            v-model="weekly.isActive" />
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { watch } from 'vue'
import EditActivities from '../../components/CharacterEdit/Progression/EditActivities.vue'
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