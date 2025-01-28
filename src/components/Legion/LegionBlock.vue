<template>
  <div class="card">
    <h3>{{ character.Name }}</h3>
    <p>Class: {{ character.Class }}</p>
    <p>Level: {{ character.Level }}</p>
    <LegionProgressionBlock
      title="Symbols"
      :completed="completedSymbols"
      :total="totalSymbols"
    />
    <LegionProgressionBlock
      title="Dailies"
      :completed="completedDailies"
      :total="totalDailies"
    />
    <LegionProgressionBlock
      title="Weeklies"
      :completed="completedWeeklies"
      :total="totalWeeklies"
    />
    <LegionProgressionBlock
      title="Bosses"
      :completed="completedBosses"
      :total="totalBosses"
    />
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
.card {
  background-color: #ffeccd;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1em;
  margin: 1em 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h3 {
  margin: 0 0 0.5em 0;
}
p {
  margin: 0.5em 0;
}
</style>