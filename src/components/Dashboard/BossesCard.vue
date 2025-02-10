<script setup>
import { computed } from 'vue'

const props = defineProps({
  characters: {
    type: Array,
    required: true
  }
})

const bossStats = computed(() => {
  let stats = {
    daily: {
      completed: 0,
      total: 0
    },
    weekly: {
      completed: 0,
      total: 0
    },
    monthly: {
      completed: 0,
      total: 0
    },
    crystalLimit: {
      perCharacter: [],  // Array of {name, completed, total}
      worldTotal: 0,
      worldLimit: 180
    }
  }

  props.characters.forEach(character => {
    let charStats = {
      name: character.Name,
      completed: 0,
      total: 0
    }

    character.Bosses.BossList.forEach(boss => {
      boss.Difficulty.forEach(diff => {
        if (diff.isActive) {
          switch (diff.DifficultyReset) {
            case 'Daily':
              stats.daily.total++
              if (diff.CompletionStatus) stats.daily.completed++
              break
            case 'Weekly':
              stats.weekly.total++
              if (diff.CompletionStatus) {
                stats.weekly.completed++
                charStats.completed++
              }
              charStats.total++
              break
            case 'Monthly':
              stats.monthly.total++
              if (diff.CompletionStatus) stats.monthly.completed++
              break
          }
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
      <h2>Boss Completion</h2>
    </div>

    <div class="stats-container">
      <div class="completion-stats">
        <div class="stat-block">
          <h3>Daily Bosses</h3>
          <div class="stat-value">{{ bossStats.daily.completed }}/{{ bossStats.daily.total }}</div>
        </div>

        <div class="stat-block">
          <h3>Weekly Bosses</h3>
          <div class="stat-value">{{ bossStats.weekly.completed }}/{{ bossStats.weekly.total }}</div>
        </div>

        <div class="stat-block">
          <h3>Monthly Bosses</h3>
          <div class="stat-value">{{ bossStats.monthly.completed }}/{{ bossStats.monthly.total }}</div>
        </div>
      </div>

      <div class="crystal-limit">
        <h3>Crystal Limit</h3>
        <div class="world-limit">
          World Total: {{ bossStats.crystalLimit.worldTotal }}/{{ bossStats.crystalLimit.worldLimit }}
        </div>
        <div class="character-limits">
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
</template>

<style scoped>
.bosses {
  background: linear-gradient(102deg, #A183F4 -6.39%, #837FF4 110.52%);
}

.stats-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5em;
}

.completion-stats {
  display: flex;
  flex-direction: column;
  gap: 0.8em;
}

.stat-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1em;
  border-radius: 6px;
}

.crystal-limit {
  background: rgba(255, 255, 255, 0.1);
  padding: 1em;
  border-radius: 6px;
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

.char-limit {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  align-items: center;
  gap: 0.5em;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  transition: width 0.3s ease;
}

.limit-value {
  text-align: right;
  font-size: 0.9em;
}

.char-name {
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>