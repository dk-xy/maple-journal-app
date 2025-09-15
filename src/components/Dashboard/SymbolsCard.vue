<script setup>
import { computed } from 'vue'

const props = defineProps({
  characters: {
    type: Array,
    required: true
  }
})

const symbolStats = computed(() => {
  const stats = {
    arcaneRiverDaily: { completed: 0, total: 0 },
    arcaneRiverWeekly: { completed: 0, total: 0 },
    grandis: { completed: 0, total: 0 }
  }

  props.characters.forEach(character => {
    const arcaneRegions = character?.Progression?.ArcaneRiver?.Region || []
    arcaneRegions.forEach(region => {
      if (!region || !region.isActive) return

      // Daily (always counted)
      stats.arcaneRiverDaily.total++
      if (region.RegionDailyCompletion) stats.arcaneRiverDaily.completed++

      // Weekly (only count if the weekly property exists — prevents bad counts if not present)
      if ('RegionWeeklyCompletion' in region) {
        stats.arcaneRiverWeekly.total++
        if (region.RegionWeeklyCompletion) stats.arcaneRiverWeekly.completed++
      }
    })

    const grandisRegions = character?.Progression?.Grandis?.Region || []
    grandisRegions.forEach(region => {
      if (!region || !region.isActive) return

      stats.grandis.total++
      // Grandis might use RegionDailyCompletion or another flag; check both
      if (region.RegionDailyCompletion || region.CompletionStatus) stats.grandis.completed++
    })
  })

  return stats
})
</script>

<template>
  <div class="dashboard-card symbols">
    <h3>Symbols</h3>
    <div class="stats">
      <div class="stat">
        <span>Arcane River (Daily)</span>
        <span>{{ symbolStats.arcaneRiverDaily.completed }} / {{ symbolStats.arcaneRiverDaily.total }}</span>
      </div>

      <div class="stat">
        <span>Arcane River (Weeklies)</span>
        <span>{{ symbolStats.arcaneRiverWeekly.completed }} / {{ symbolStats.arcaneRiverWeekly.total }}</span>
      </div>

      <div class="stat">
        <span>Grandis</span>
        <span>{{ symbolStats.grandis.completed }} / {{ symbolStats.grandis.total }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-card.symbols {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.stats {
  display: flex;
  flex-direction: column;
}

.stat {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.stat:last-child {
  border-bottom: none;
}
</style>