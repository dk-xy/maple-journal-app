<template>
  <div class="card">
    <div class="card-character-info">
      <div class="character-properties">
        <h3>{{ character.Name }}</h3>
        <p> {{ character.Class }}</p>
      </div>
      <div class="character-level">
        <p>Lv. {{ character.Level }}</p>
      </div>

   
    </div>

    <div class="progression-block__Container">
      <LegionProgressionBlock title="Symbols" :completed="completedSymbols" :total="totalSymbols" />
      <LegionProgressionBlock title="Dailies" :completed="completedDailies" :total="totalDailies" />
      <LegionProgressionBlock title="Weeklies" :completed="completedWeeklies" :total="totalWeeklies" />
      <LegionProgressionBlock title="Bosses" :completed="completedBosses" :total="totalBosses" />
    </div>

  </div>
</template>

<script setup>
import LegionProgressionBlock from './LegionProgressionBlock.vue'
import { computed } from 'vue'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const completedSymbols = computed(() => {
  return (
    props.character.Progression.ArcaneRiver.Region.filter(region => region.isActive && (region.RegionDailyCompletion || region.RegionWeeklyCompletion)).length +
    props.character.Progression.Grandis.Region.filter(region => region.isActive && region.RegionDailyCompletion).length
  )
})

const totalSymbols = computed(() => {
  return (
    props.character.Progression.ArcaneRiver.Region.filter(region => region.isActive).length +
    props.character.Progression.Grandis.Region.filter(region => region.isActive).length
  )
})

const completedDailies = computed(() => {
  return props.character.Progression.Dailies.DailyActivity.filter(daily => daily.isActive && daily.CompletionStatus).length
})

const totalDailies = computed(() => {
  return props.character.Progression.Dailies.DailyActivity.filter(daily => daily.isActive).length
})

const completedWeeklies = computed(() => {
  return props.character.Progression.Weeklies.WeeklyActivity.filter(weekly => weekly.isActive && weekly.CompletionStatus).length
})

const totalWeeklies = computed(() => {
  return props.character.Progression.Weeklies.WeeklyActivity.filter(weekly => weekly.isActive).length
})

const completedBosses = computed(() => {
  return props.character.Bosses.BossList.reduce((acc, boss) => {
    return acc + boss.Difficulty.filter(difficulty => difficulty.isActive && difficulty.CompletionStatus).length
  }, 0)
})

const totalBosses = computed(() => {
  return props.character.Bosses.BossList.reduce((acc, boss) => {
    return acc + boss.Difficulty.filter(difficulty => difficulty.isActive).length
  }, 0)
})
</script>

<style scoped>
.character a {
  color: var(--dark-text) !important;
}

.character {
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
}

.card {
  background-color: var(--elev-1);
  /* border: 1px solid #ddd; */
  border-radius: 8px;
  padding: 1em;
  margin: 1em 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: var(--elev-1);
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.05);
  color: var(--dark-text) !important;
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  gap: 0.4em;
  min-width: 340px;
}

.card-character-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  text-align: left;
  width: 100%;
  margin: auto;
  margin-bottom: 8px;
  /* padding: 4px 16px; */
}

.progression-block__Container {

  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 8px 8px;
  flex-wrap: wrap;
}

.character-level{
  background-color: var(--elev-2);
  height: fit-content;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

h3 {
  margin: 0;
  /* margin: 0 0 0.5em 0; */
}

p {
  /* margin: 0.5em 0; */
  margin: 0;
}
</style>