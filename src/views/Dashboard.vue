<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getCharacters } from '../localStorageService'
import VIMatrixCard from '../components/Dashboard/VIMatrixCard.vue'
import DailyWeeklyCard from '../components/Dashboard/DailyWeeklyCard.vue'
import DailyCard from '../components/Dashboard/DailyCard.vue'
import WeeklyCard from '../components/Dashboard/WeeklyCard.vue'
import BossesCard from '../components/Dashboard/BossesCard.vue'
import SymbolsCard from '../components/Dashboard/SymbolsCard.vue'
import { getData, saveData } from './../localStorageService'
import GuildCard from '../components/Dashboard/GuildCard.vue'

const data = getData()
const characters = data.Legion.Characters

const now = ref(new Date())
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const utcDateStr = computed(() => {
  return now.value.toLocaleDateString('fr-CH', { timeZone: 'UTC' })
})

const utcTimeStr = computed(() => {
  return now.value.toLocaleTimeString('en-GB', { timeZone: 'UTC', timeZoneName: 'short' })
})

// Next Daily Reset: upcoming 00:00:00 UTC
const nextDailyReset = computed(() => {
  const t = now.value
  return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() + 1, 0, 0, 0, 0))
})

const dailyCountdown = computed(() => {
  const diff = Math.max(0, nextDailyReset.value.getTime() - now.value.getTime())
  const totalSeconds = Math.floor(diff / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = n => String(n).padStart(2, '0')
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
})

// Next Weekly Reset: upcoming Thursday 00:00:00 UTC
const nextWeeklyReset = computed(() => {
  const t = now.value
  // Day of week in UTC: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const currentDay = t.getUTCDay()
  let daysUntilThursday = (4 - currentDay + 7) % 7
  // If today is Thursday, the reset already occurred at 00:00:00 UTC, so next is in 7 days
  if (daysUntilThursday === 0) {
    daysUntilThursday = 7
  }
  return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() + daysUntilThursday, 0, 0, 0, 0))
})

const weeklyCountdown = computed(() => {
  const diff = Math.max(0, nextWeeklyReset.value.getTime() - now.value.getTime())
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  // const seconds = totalSeconds % 60
  const pad = n => String(n).padStart(2, '0')
  if (days > 0) {
    return `${days}d ${pad(hours)}h ${pad(minutes)}m`
  }
  return `${pad(hours)}h ${pad(minutes)}m`
})
</script>

<template>
  <div class="dashboard-container">
    <div class="title-section">
      <div class="time-section">
        <div class="icon-container">
          <img src="/src/assets/blacklist.png" alt="oblivion symbol" class="dashboard-icon" />
        </div>

        <div class="today-info">
          <!-- MUST BE UTC -->
          <div class="date">{{ utcDateStr }}</div>
          <!-- time -->
          <div class="time">{{ utcTimeStr }}</div>
        </div>
        <div class="reset-container">
          <div class="next-daily-reset">
            <div class="reset-title">Daily Reset</div>
            <div class="reset-time">{{ dailyCountdown }}</div>
          </div>
          <div class="next-weekly-reset">
            <div class="reset-title">Weekly Reset</div>
            <div class="reset-time">{{ weeklyCountdown }}</div>
          </div>
        </div>

      </div>
      <GuildCard :characters="characters" />
      <!-- <h1>Dashboard</h1> -->
    </div>

    <!-- changed: wrap cards in responsive grid -->
    <div class="dashboard-prog">




    </div>
    <div class="dashboard-grid">
      <VIMatrixCard :characters="characters" />
      <SymbolsCard :characters="characters" />
      <DailyCard :characters="characters" />
      <WeeklyCard :characters="characters" />

    </div>
    <BossesCard :characters="characters" />
  </div>
</template>

<style scoped>
.reset-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.title-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 4px;
  /* width: 100%; */
  padding: 16px 12px;
  width: 80%;
  margin: 32px auto;
}

.time-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 8px 16px;
  background-color: var(--elev-1);
  border-radius: 8px;
}

.today-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}

.next-daily-reset,
.next-weekly-reset {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--elev-2);
  padding: 6px 14px;
  border-radius: 6px;
  min-width: 110px;
}

.reset-title {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--dark-text);
  opacity: 0.75;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.reset-time {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--dark-text);
  font-variant-numeric: tabular-nums;
  margin-top: 2px;
}

.title-section h1 {
  margin: 0;
  font-size: 2.2em;
  color: var(--dark-text);
}

.dashboard-icon {
  width: 32px;
  height: 32px;
  padding: 8px 4px;
}

.dashboard-prog {
  width: 30%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.dashboard-head-prog {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;

}

.time {
  font-weight: 600;
}

/* new: responsive grid for dashboard cards */
.dashboard-grid {
  display: grid;
  gap: 24px;
  /* mobile: single column */
  grid-template-columns: 1fr;
}

/* two columns on medium+ screens (wide) */
@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* optional: limit card max-width and center grid */
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dashboard-grid>* {
  width: 100%;
  box-sizing: border-box;
}
</style>
