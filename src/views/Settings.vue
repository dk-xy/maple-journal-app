<script setup>
import { ref } from 'vue'
import { getData, saveData } from '../localStorageService'
import { checkResets, getResetBoundaryTime } from '../utils/resetUtils'

const manualDateTime = ref('')
const message = ref('')

function formatUtcNow() {
  return new Date().toISOString().replace('.000Z', 'Z')
}

function testReset() {
  if (!manualDateTime.value) {
    message.value = 'Pick a UTC date/time to simulate.'
    return
  }

  const [datePart, timePart] = manualDateTime.value.split('T')
  if (!datePart || !timePart) {
    message.value = 'Invalid date/time format. Use the field above.'
    return
  }

  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, minutes] = timePart.split(':').map(Number)
  const now = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0))

  if (Number.isNaN(now.getTime())) {
    message.value = 'Invalid date/time format. Use the field above.'
    return
  }

  const data = getData()
  let totalDaily = 0
  let totalWeekly = 0
  let totalMonthly = 0

  data.Legion.Characters.forEach(character => {
    const res = checkResets(character, now)
    totalDaily += res.daily
    totalWeekly += res.weekly
    totalMonthly += res.monthly
  })
  saveData(data)

  const dailyBoundary = getResetBoundaryTime('daily', now).toISOString()
  const weeklyBoundary = getResetBoundaryTime('weekly', now).toISOString()

  message.value = `Reset check applied for simulated UTC: ${now.toISOString()}\n` +
    `• Daily Boundary: ${dailyBoundary}\n` +
    `• Weekly Boundary: ${weeklyBoundary} (Thursday)\n` +
    `• Items reset: ${totalDaily} daily, ${totalWeekly} weekly, ${totalMonthly} monthly.`
}

function applyCurrentUtcReset() {
  const data = getData()
  const now = new Date()
  let totalDaily = 0
  let totalWeekly = 0
  let totalMonthly = 0

  data.Legion.Characters.forEach(character => {
    const res = checkResets(character, now)
    totalDaily += res.daily
    totalWeekly += res.weekly
    totalMonthly += res.monthly
  })
  saveData(data)

  const dailyBoundary = getResetBoundaryTime('daily', now).toISOString()
  const weeklyBoundary = getResetBoundaryTime('weekly', now).toISOString()

  message.value = `Reset check applied for current UTC: ${now.toISOString()}\n` +
    `• Daily Boundary: ${dailyBoundary}\n` +
    `• Weekly Boundary: ${weeklyBoundary} (Thursday)\n` +
    `• Items reset: ${totalDaily} daily, ${totalWeekly} weekly, ${totalMonthly} monthly.`
}
</script>

<template>
  <div class="settings-page">
    <h2>Settings</h2>
    <section class="reset-test">
      <h3>Reset Tester</h3>
      <p>MapleStory resets are computed using UTC boundaries.</p>
      <div class="field-row">
        <label for="manual-utc">Test UTC date/time</label>
        <input id="manual-utc" type="datetime-local" v-model="manualDateTime" />
      </div>
      <div class="buttons-row">
        <button type="button" @click="testReset">Run test at selected UTC</button>
        <button type="button" @click="applyCurrentUtcReset">Run test at current UTC</button>
      </div>
      <p class="hint">Enter a UTC date/time and click the button to verify whether a daily or weekly reset should apply.</p>
      <p class="message">{{ message }}</p>
      <p class="current-time">Current UTC now: {{ formatUtcNow() }}</p>
    </section>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 720px;
  width: 100%;
}
.reset-test {
  background: var(--elev-2);
  padding: 24px;
  border-radius: 12px;
}
.field-row,
.buttons-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.field-row label {
  min-width: 160px;
  align-self: center;
}
.field-row input {
  flex: 1;
  min-width: 240px;
}
.buttons-row button {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.buttons-row button:hover {
  opacity: 0.9;
}
.hint,
.message,
.current-time {
  margin-top: 8px;
}
.message {
  white-space: pre-wrap;
}
</style>
