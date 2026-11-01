export function checkResets(character, now = new Date()) {
  if (!character || typeof character !== 'object') {
    return { daily: 0, weekly: 0, monthly: 0 }
  }

  // Ensure Progression object exists on the character
  if (!character.Progression || typeof character.Progression !== 'object') {
    character.Progression = {}
  }
  const progression = character.Progression

  const lastDailyReset = progression.lastDailyReset ? new Date(progression.lastDailyReset) : null
  const lastWeeklyReset = progression.lastWeeklyReset ? new Date(progression.lastWeeklyReset) : null
  const lastMonthlyReset = progression.lastMonthlyReset ? new Date(progression.lastMonthlyReset) : null
  const currentDailyReset = getResetBoundaryTime('daily', now)
  const currentWeeklyReset = getResetBoundaryTime('weekly', now)
  const currentMonthlyReset = getResetBoundaryTime('monthly', now)

  const dailyCount = resetDailyContent(character, currentDailyReset, lastDailyReset)
  const weeklyCount = resetWeeklyContent(character, currentWeeklyReset, lastWeeklyReset)
  const monthlyCount = resetMonthlyContent(character, currentMonthlyReset, lastMonthlyReset)

  progression.lastDailyReset = currentDailyReset.toISOString()
  progression.lastWeeklyReset = currentWeeklyReset.toISOString()
  progression.lastMonthlyReset = currentMonthlyReset.toISOString()

  return { daily: dailyCount, weekly: weeklyCount, monthly: monthlyCount }
}

export function getResetBoundaryTime(type, now = new Date()) {
  const resetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0))

  if (type === 'weekly') {
    // Find the most recent Thursday at 00:00 UTC.
    // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
    while (resetTime.getUTCDay() !== 4) {
      resetTime.setUTCDate(resetTime.getUTCDate() - 1)
    }
  }

  if (type === 'monthly') {
    // First day of the current month at 00:00 UTC.
    resetTime.setUTCDate(1)
  }

  return resetTime
}

export function shouldResetItem(completionDate, currentBoundary, lastBoundary) {
  if (completionDate) {
    const compTime = new Date(completionDate)
    if (!isNaN(compTime.getTime())) {
      // If completed before the current reset boundary, it expired and must be reset.
      // If completed on or after the current boundary, it was done in this active cycle.
      return compTime < currentBoundary
    }
  }
  // Fallback if completionDate is not recorded or invalid:
  // Reset if last boundary recorded is before the current boundary
  return !lastBoundary || lastBoundary < currentBoundary
}

function resetDailyContent(character, currentDailyReset, lastDailyReset) {
  if (!character || typeof character !== 'object') return 0

  let count = 0
  const progression = character.Progression && typeof character.Progression === 'object' ? character.Progression : {}
  const dailies = progression.Dailies && typeof progression.Dailies === 'object' ? progression.Dailies : {}
  const arcaneRiver = progression.ArcaneRiver && typeof progression.ArcaneRiver === 'object' ? progression.ArcaneRiver : {}
  const grandis = progression.Grandis && typeof progression.Grandis === 'object' ? progression.Grandis : {}
  const guild = progression.Guild && typeof progression.Guild === 'object' ? progression.Guild : {}
  const bosses = character.Bosses && typeof character.Bosses === 'object' ? character.Bosses : {}

  // Reset daily activities
  ;(Array.isArray(dailies.DailyActivity) ? dailies.DailyActivity : []).forEach(activity => {
    if (activity.CompletionStatus && shouldResetItem(activity.CompletionDate, currentDailyReset, lastDailyReset)) {
      activity.CompletionStatus = false
      activity.CompletionDate = ''
      count++
    }
  })

  // Reset daily symbols (Arcane River)
  ;(Array.isArray(arcaneRiver.Region) ? arcaneRiver.Region : []).forEach(region => {
    const compDate = region.DailyCompletionDate || region.CompletionDate
    if (region.RegionDailyCompletion && shouldResetItem(compDate, currentDailyReset, lastDailyReset)) {
      region.RegionDailyCompletion = false
      region.DailyCompletionDate = ''
      if (!region.RegionWeeklyCompletion) {
        region.CompletionDate = ''
      }
      count++
    }
  })

  // Reset daily symbols (Grandis)
  ;(Array.isArray(grandis.Region) ? grandis.Region : []).forEach(region => {
    const compDate = region.DailyCompletionDate || region.CompletionDate
    if (region.RegionDailyCompletion && shouldResetItem(compDate, currentDailyReset, lastDailyReset)) {
      region.RegionDailyCompletion = false
      region.DailyCompletionDate = ''
      region.CompletionDate = ''
      count++
    }
  })

  // Reset daily guild activities
  ;(Array.isArray(guild.DailyActivity) ? guild.DailyActivity : []).forEach(activity => {
    if (activity.CompletionStatus && shouldResetItem(activity.CompletionDate, currentDailyReset, lastDailyReset)) {
      activity.CompletionStatus = false
      activity.CompletionDate = ''
      count++
    }
  })

  // Reset daily bosses
  ;(Array.isArray(bosses.BossList) ? bosses.BossList : []).forEach(boss => {
    (Array.isArray(boss.Difficulty) ? boss.Difficulty : []).forEach(diff => {
      if (diff.DifficultyReset !== 'Daily') return
      if (diff.CompletionStatus && shouldResetItem(diff.CompletionDate, currentDailyReset, lastDailyReset)) {
        diff.CompletionStatus = false
        diff.CompletionDate = ''
        count++
      }
    })
  })

  return count
}

function resetWeeklyContent(character, currentWeeklyReset, lastWeeklyReset) {
  if (!character || typeof character !== 'object') return 0

  let count = 0
  const progression = character.Progression && typeof character.Progression === 'object' ? character.Progression : {}
  const weeklies = progression.Weeklies && typeof progression.Weeklies === 'object' ? progression.Weeklies : {}
  const arcaneRiver = progression.ArcaneRiver && typeof progression.ArcaneRiver === 'object' ? progression.ArcaneRiver : {}
  const bosses = character.Bosses && typeof character.Bosses === 'object' ? character.Bosses : {}

  // Reset weekly activities
  ;(Array.isArray(weeklies.WeeklyActivity) ? weeklies.WeeklyActivity : []).forEach(activity => {
    if (activity.CompletionStatus && shouldResetItem(activity.CompletionDate, currentWeeklyReset, lastWeeklyReset)) {
      activity.CompletionStatus = false
      activity.CompletionDate = ''
      count++
    }
  })

  // Reset weekly symbols (Arcane River)
  ;(Array.isArray(arcaneRiver.Region) ? arcaneRiver.Region : []).forEach(region => {
    const compDate = region.WeeklyCompletionDate || region.CompletionDate
    if (region.RegionWeeklyCompletion && shouldResetItem(compDate, currentWeeklyReset, lastWeeklyReset)) {
      region.RegionWeeklyCompletion = false
      region.WeeklyCompletionDate = ''
      if (!region.RegionDailyCompletion) {
        region.CompletionDate = ''
      }
      count++
    }
  })

  // Reset weekly bosses
  ;(Array.isArray(bosses.BossList) ? bosses.BossList : []).forEach(boss => {
    (Array.isArray(boss.Difficulty) ? boss.Difficulty : []).forEach(diff => {
      if (diff.DifficultyReset !== 'Weekly') return
      if (diff.CompletionStatus && shouldResetItem(diff.CompletionDate, currentWeeklyReset, lastWeeklyReset)) {
        diff.CompletionStatus = false
        diff.CompletionDate = ''
        count++
      }
    })
  })

  return count
}

function resetMonthlyContent(character, currentMonthlyReset, lastMonthlyReset) {
  if (!character || typeof character !== 'object') return 0

  let count = 0
  const bosses = character.Bosses && typeof character.Bosses === 'object' ? character.Bosses : {}

  // Reset monthly bosses (e.g. Black Mage)
  ;(Array.isArray(bosses.BossList) ? bosses.BossList : []).forEach(boss => {
    (Array.isArray(boss.Difficulty) ? boss.Difficulty : []).forEach(diff => {
      if (diff.DifficultyReset !== 'Monthly') return
      if (diff.CompletionStatus && shouldResetItem(diff.CompletionDate, currentMonthlyReset, lastMonthlyReset)) {
        diff.CompletionStatus = false
        diff.CompletionDate = ''
        count++
      }
    })
  })

  return count
}
