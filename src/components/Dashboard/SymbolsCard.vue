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
        <div class="stat-info arcane-river">
          <div class="stat-image">
            <!-- oblivion symbol -->
            <img src="/src/assets/images/symbols/oblivion.webp" alt="oblivion symbol" class="reward-icon" />
          </div>
          <div class="stat-title">Arcane River</div>
          <div class="stat-contents">
            <div class="stat-content">
              <div class="stat-description">Dailies</div>
              <div class="stat-value">{{ symbolStats.arcaneRiverDaily.completed }} / {{
                symbolStats.arcaneRiverDaily.total }}</div>
            </div>
            <div class="stat-content">
              <div class="stat-description">Weeklies</div>
              <div class="stat-value">{{ symbolStats.arcaneRiverWeekly.completed }} / {{
                symbolStats.arcaneRiverWeekly.total }}</div>
            </div>
          </div>



        </div>

      </div>



      <div class="stat">
        <div class="stat-info grandis">
          <div class="stat-image">
            <img src="/src/assets/images/symbols/cernium.webp" alt="oblivion symbol" class="reward-icon" />

          </div>

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
  margin-bottom: 16px;
  text-align: left;
  font-size: 1.48em;
  font-weight: 700;
}

.dashboard-card.symbols {

  /* background: var(--shangrila-g
  rad); */
  /* linear gradient #466f7f  #4e7e8c*/

  background: linear-gradient(102deg, #ddddddab -6.39%, #dddddfc4 110.52%);
  /* background: linear-gradient(90deg,rgba(79, 136, 158, 0.788) 0%, rgba(78, 126, 140, 0.63) 100%); */
  /* background-color: var(--elev-1-a); */
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  color: #3d3d3d;
}

.stats {
  display: flex;
  flex-direction: column;
  color: var(--dark-text);
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;

  gap: 16px;

}

.stat-info.arcane-river {
  background: var(--oblivion-grad);
  /* background opacity */


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

.stat:last-child {
  border-bottom: none;
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
display: grid;
  grid-template-columns: 1fr 1fr;

  justify-content: left;
 
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
  min-width: 40px;
}
</style>