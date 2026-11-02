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

const arcaneRiverRegionsConfig = [
  { key: 'oblivion', name: 'Vanishing Journey' },
  { key: 'chuchu', name: 'Chu Chu Island' },
  { key: 'lach', name: 'Lachelein' },
  { key: 'arcana', name: 'Arcana' },
  { key: 'morass', name: 'Morass' },
  { key: 'esfera', name: 'Esfera' }
]

const grandisRegionsConfig = [
  { key: 'cernium', name: 'Cernium' },
  { key: 'arcus', name: 'Hotel Arcs' },
  { key: 'odium', name: 'Odium' },
  { key: 'shangrila', name: 'Shangri-La' },
  { key: 'arteria', name: 'Arteria' },
  { key: 'carcion', name: 'Carcion' }
]

const arcaneRiverBreakdown = computed(() => {
  return arcaneRiverRegionsConfig.map(cfg => {
    let activeChars = 0
    let dailyCompleted = 0
    let weeklyCompleted = 0

    props.characters.forEach(character => {
      const regions = character?.Progression?.ArcaneRiver?.Region || []
      const found = regions.find(r => r.key === cfg.key || r.RegionName === cfg.name)
      if (found && found.isActive) {
        activeChars++
        if (found.RegionDailyCompletion) dailyCompleted++
        if (found.RegionWeeklyCompletion) weeklyCompleted++
      }
    })

    return {
      ...cfg,
      activeChars,
      dailyCompleted,
      weeklyCompleted
    }
  })
})

const grandisBreakdown = computed(() => {
  return grandisRegionsConfig.map(cfg => {
    let activeChars = 0
    let dailyCompleted = 0

    props.characters.forEach(character => {
      const regions = character?.Progression?.Grandis?.Region || []
      const found = regions.find(r => r.key === cfg.key || r.RegionName === cfg.name)
      if (found && found.isActive) {
        activeChars++
        if (found.RegionDailyCompletion || found.CompletionStatus) dailyCompleted++
      }
    })

    return {
      ...cfg,
      activeChars,
      dailyCompleted
    }
  })
})
</script>

<template>
  <div class="dashboard-card symbols">
    <h2>Symbols</h2>
    <div class="stats">
      <!-- Arcane River -->
      <div class="stat-section">
        <div class="stat-info arcane-river">
          <div class="stat-title">Arcane River</div>
          <div class="stat-contents">
            <div class="stat-content">
              <div class="stat-description">Dailies</div>
              <div class="stat-value">
                {{ symbolStats.arcaneRiverDaily.completed }} / {{ symbolStats.arcaneRiverDaily.total }}
              </div>
            </div>
            <div class="stat-content">
              <div class="stat-description">Weeklies</div>
              <div class="stat-value">
                {{ symbolStats.arcaneRiverWeekly.completed }} / {{ symbolStats.arcaneRiverWeekly.total }}
              </div>
            </div>
          </div>
        </div>

        <!-- 2 or 3 column breakdown -->
        <div class="region-breakdown-grid">
          <div v-for="region in arcaneRiverBreakdown" :key="region.key" class="region-item">
            <img :src="`/src/assets/images/symbols/${region.key}.webp`" :alt="region.name" class="region-icon" />
            <div class="region-details">
               <!-- <span class="region-name" :title="region.name">{{ region.name }}</span> -->
              <div class="region-badges">
                <span
                  class="badge daily"
                  :class="{ complete: region.activeChars > 0 && region.dailyCompleted === region.activeChars }"
                  title="Daily completion"
                >
                  <span class="badge-label">D</span>{{ region.dailyCompleted }}/{{ region.activeChars }}
                </span>
                <span
                  class="badge weekly"
                  :class="{ complete: region.activeChars > 0 && region.weeklyCompleted === region.activeChars }"
                  title="Weekly completion"
                >
                  <span class="badge-label">W</span>{{ region.weeklyCompleted }}/{{ region.activeChars }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grandis -->
      <div class="stat-section">
        <div class="stat-info grandis">
          <div class="stat-title">Grandis</div>
          <div class="stat-contents">
            <div class="stat-content">
              <div class="stat-description">Dailies</div>
              <div class="stat-value">
                {{ symbolStats.grandis.completed }} / {{ symbolStats.grandis.total }}
              </div>
            </div>
          </div>
        </div>

        <!-- 2 or 3 column breakdown -->
        <div class="region-breakdown-grid">
          <div v-for="region in grandisBreakdown" :key="region.key" class="region-item">
            <img :src="`/src/assets/images/symbols/${region.key}.webp`" :alt="region.name" class="region-icon" />
            <div class="region-details">
              <!-- <span class="region-name" :title="region.name">{{ region.name }}</span> -->
              <div class="region-badges">
                <span
                  class="badge daily"
                  :class="{ complete: region.activeChars > 0 && region.dailyCompleted === region.activeChars }"
                  title="Daily completion"
                >
                  <span class="badge-label">D</span>{{ region.dailyCompleted }}/{{ region.activeChars }}
                </span>
              </div>
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
  margin-bottom: 16px;
  text-align: left;
  font-size: 1.48em;
  font-weight: 700;
}

.dashboard-card.symbols {
    background: linear-gradient(102deg, #ddddddab -6.39%, #dddddfc4 110.52%);
    border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  color: #3d3d3d;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--dark-text);
}

.stat-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f5f5f575;
  border-radius: 6px;
  border : solid 1px #e0e0e0;
}

.stat-info.arcane-river {
  background: var(--oblivion-grad);
}

.stat-info.grandis {
  background: var(--cernium-grad);
}

.stat-image {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.stat-title {
  font-weight: 600;
  text-align: left;
  width: 30%;
  padding: 16px 32px;
}

.stat-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background: rgba(144, 170, 180, 0.815);
  border-radius: 4px;
  border: solid 1px #eeeeee;
}

.stat-contents {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
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

.stat-value {
  font-weight: 700;
  width: 100%;
  min-width: 65px;
}

/* Region Breakdown Grid (2 or 3 columns) */
.region-breakdown-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 2px;
  margin-bottom: 4px
}

@media (max-width: 540px) {
  .region-breakdown-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.region-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  /* background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.8); */
  border-radius: 6px;
  min-width: 0;
  box-sizing: border-box;
}

.region-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.region-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
  gap: 2px;
  text-align: left;
}

.region-name {
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--dark-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.region-badges {
  display: flex;
  gap: 4px;
  align-items: center;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
  color: var(--dark-text);
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}

.badge.complete {
  background: rgba(46, 125, 50, 0.18);
  color: #1b5e20;
}

.badge-label {
  font-size: 0.62rem;
  opacity: 0.75;
  font-weight: 800;
}
</style>
