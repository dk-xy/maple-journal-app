<script setup>
import { computed } from 'vue'

const props = defineProps({
  characters: {
    type: Array,
    required: true
  }
})

const bossStats = computed(() => {
  const stats = {
    daily: { completed: 0, total: 0 },
    weekly: { completed: 0, total: 0 },
    monthly: { completed: 0, total: 0 },
    crystalLimit: { perCharacter: [], worldTotal: 0, worldLimit: 180 }
  }

  const characters = Array.isArray(props.characters) ? props.characters : []

  characters.forEach(character => {
    const charStats = { name: character?.Name || 'Unknown', completed: 0, total: 0 }
    const bossList = character?.Bosses?.BossList || []

    bossList.forEach(boss => {
      const difficulties = boss?.Difficulty || []
      difficulties.forEach(diff => {
        if (!diff) return

        // Count this difficulty if it's active OR already completed (handles older data)
        const counted = Boolean(diff.isActive) || Boolean(diff.CompletionStatus)
        if (!counted) return

        const reset = (diff.DifficultyReset || '').toString().toLowerCase()
        const completed = Boolean(diff.CompletionStatus)

        switch (reset) {
          case 'daily':
            stats.daily.total++
            if (completed) stats.daily.completed++
            break
          case 'weekly':
            stats.weekly.total++
            if (completed) {
              stats.weekly.completed++
              charStats.completed++
            }
            charStats.total++
            break
          case 'monthly':
            stats.monthly.total++
            if (completed) stats.monthly.completed++
            break
          default:
            // Unknown reset type — ignore or extend if needed
            break
        }
      })
    })

    if (charStats.total > 0) {
      stats.crystalLimit.perCharacter.push(charStats)
      stats.crystalLimit.worldTotal += Math.min(charStats.total, 14)
    }
  })

  return stats
})
</script>

<template>
  <div class="dashboard-card bosses">
    <div class="card-header">
      <h2>Bosses</h2>
    </div>

    <div class="stats-container">
      <div class="completion-stats">
        <h3>Completion</h3>

        <div class="stat-block-container">
<div class="stat-block">
          <h4>Daily</h4>
          <div class="stat-value">{{ bossStats.daily.completed }}/{{ bossStats.daily.total }}</div>
        </div>

        <div class="stat-block">
          <h4>Weekly</h4>
          <div class="stat-value">{{ bossStats.weekly.completed }}/{{ bossStats.weekly.total }}</div>
        </div>

        <div class="stat-block">
          <h4>Monthly</h4>
          <div class="stat-value">{{ bossStats.monthly.completed }}/{{ bossStats.monthly.total }}</div>
        </div>
      </div>
        </div>
        

      <div class="crystal-limit">
        <div class="crystal-weekly-counter">
          <h4>World Crystal Limit</h4>
          <div class="world-limit">
            {{ bossStats.crystalLimit.worldTotal }}/{{ bossStats.crystalLimit.worldLimit }}
          </div>
        </div>


        <div class="character-limits">
          <h4>Characters Crystal Limit</h4>
          <div class="all-characters-container">
            <div v-for="(char, index) in bossStats.crystalLimit.perCharacter" :key="index" class="char-limit">
              <span class="char-name">{{ char.name }}</span>
              <div class="progress-bar">
                <div class="progress" :style="{ width: `${(char.completed / 14) * 100}%` }"></div>
              </div>
              <span class="limit-value">{{ char.completed }}/{{ Math.min(char.total, 14) }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bosses {
  background: var(--elev-1-a);
  /* background: linear-gradient(102deg, #A183F4 -6.39%, #837FF4 110.52%); */
  /* background: rgb(46, 46, 46);
  background: rgb(46, 46, 46);
  background: -moz-linear-gradient(38deg, rgba(46, 46, 46, 1) 0%, rgba(0, 0, 0, 1) 0%, rgba(37, 11, 11, 1) 52%, rgba(0, 0, 0, 1) 100%, rgba(34, 34, 34, 0.9303922252494747) 100%);
  background: -webkit-linear-gradient(38deg, rgba(46, 46, 46, 1) 0%, rgba(0, 0, 0, 1) 0%, rgba(37, 11, 11, 1) 52%, rgba(0, 0, 0, 1) 100%, rgba(34, 34, 34, 0.9303922252494747) 100%);
  background: linear-gradient(38deg, rgba(46, 46, 46, 1) 0%, rgba(0, 0, 0, 1) 0%, rgba(37, 11, 11, 1) 52%, rgba(0, 0, 0, 1) 100%, rgba(34, 34, 34, 0.9303922252494747) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2e2e2e", endColorstr="#222222", GradientType=1); */

  color: var(--dark-text);

  border-radius: 4px;
  /* padding: 16px 8px; */
  display: flex;
  flex-direction: column; 
  gap: 16px;
  /* background: #F5D9BE; */
  color: var(--dark-text);

}

.bosses .stats-container {
  display: grid;
  grid-template-rows: 1fr 2fr;
  gap: 1.5em;



}

.bosses .stat-block-container {
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: space-around;
}

.bosses .stat-block {
  /* background-color: #2d2d2d; */
  /* From https://css.glass */
  /* background: rgba(0, 0, 0, 0.185); */
  padding: 2px 4px;
  border-radius: 8px;
  /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(16px);
  /* border: 1px solid rgba(255, 255, 255, 0.581); */
  background-color: var(--elev-2);
  /* padding: 2px 16px; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  width: 100%;
}

.bosses .stat-block h4 {
  margin: 0px;
  text-align: left;
  width: 33%;
}

.bosses h2{
  margin: 0px; 
  text-align: left; 
  font-size: 1.2em;
  font-weight: 700;
  padding: 8px 16px;;
}

.bosses h3 {
  margin:  0px;
  text-align: left;
}

.bosses h4 {
  margin: 2px 4px;
  text-align: left;
  font-weight: 700;
}

.bosses .completion-stats {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  /* background: rgba(31, 31, 31, 0.44); */
  background: #f0d3b8;
  justify-content: top;
  padding: 8px 16px;
  border-radius: 6px;
  
  margin: 8px 16px;
}

.bosses .stat-value {
  margin: 8px 16px;
}

/* .stat-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1em;
  border-radius: 6px;
} */

.crystal-limit {
  /* background: rgba(31, 31, 31, 0.44); */
  padding: 1em;
  border-radius: 6px;
  background-color: #F5D9BE;
  margin: 8px 16px;

}

.crystal-weekly-counter {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.world-limit {
  margin: 1em 0;
  font-weight: bold;
}

.character-limits {
  display: flex;
  flex-direction: column;
  gap: 0.8em;
}

.all-characters-container{
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.char-limit {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  align-items: center;
  gap: 0.5em;
  background: var(--elev-2);
  padding: 4px 4px;
  border-radius: 4px;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.425);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background:var(--blue-accent);
  transition: width 0.3s ease;
  border-radius: 16px;

}

.limit-value {
  text-align: right;
  font-size: 0.9em;
  padding: 4px;
}

.char-name {
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  padding: 4px;
}



</style>