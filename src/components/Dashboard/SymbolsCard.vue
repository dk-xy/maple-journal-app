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
    <h2>Symbols</h2>
    <div class="stats">
      <div class="stat">
        <div class="stat-info">
          <div class="stat-title">Arcane River</div>
          <div class="stat-contents">
            <div class="stat-content">
              <div class="stat-description">Dailies</div>
              <div class="stat-value">{{ symbolStats.arcaneRiverDaily.completed }} / {{ symbolStats.arcaneRiverDaily.total }}</div>
            </div>
            <div class="stat-content">
              <div class="stat-description">Weeklies</div>
              <div class="stat-value">{{ symbolStats.arcaneRiverWeekly.completed }} / {{ symbolStats.arcaneRiverWeekly.total }}</div>
            </div>
          </div>



        </div>

      </div>



      <div class="stat">
        <div class="stat-info">
          <div class="stat-title">Grandis</div>
          <div class="stat-contents">
            <div class="stat-content">
              <div class="stat-description">Dailies</div>
              <div class="stat-value">{{ symbolStats.grandis.completed }} / {{ symbolStats.grandis.total }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 0;
  text-align: left;
  font-size: 1.48em;
  font-weight: 700;
}

.dashboard-card.symbols {

  background: var(--shangrila-grad);

  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.stats {
  display: flex;
  flex-direction: column;
  color: var(--dark-text);
}

.stat {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.stat-title {
  font-weight: 600;
  margin-right: 16px;
  text-align: left;
  width: 30%;
  padding: 16px 32px;
}

.stat:last-child {
  border-bottom: none;
}

.stat-info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.stat-contents {
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  justify-content: left;
  width: 50%;
}

.stat-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
  padding: 8px 12px;
  background: rgba(243, 243, 243, 0.404);
  border: solid 1px #f1f1f1;
  border-radius: 8px;
  gap: 16px;
}

.stat-value
{
  font-weight: 700;
}
</style>