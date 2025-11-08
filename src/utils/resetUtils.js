

export function checkResets(character) {
  const now = new Date()
  const lastDailyReset = character.Progression.lastDailyReset ? new Date(character.Progression.lastDailyReset) : null
  const lastWeeklyReset = character.Progression.lastWeeklyReset ? new Date(character.Progression.lastWeeklyReset) : null
  const nextDailyReset = getNextResetTime('daily')
  const nextWeeklyReset = getNextResetTime('weekly')
  
  // Check daily reset
  if (!lastDailyReset || lastDailyReset < nextDailyReset) {
    // Reset daily content
    resetDailyContent(character)
    character.Progression.lastDailyReset = now.toISOString()
  }

  // Check weekly reset
  if (!lastWeeklyReset || lastWeeklyReset < nextWeeklyReset) {
    // Reset weekly content
    resetWeeklyContent(character)
    character.Progression.lastWeeklyReset = now.toISOString()
  }
}
function getNextResetTime(type) {
  const now = new Date()
  const resetTime = new Date(now)
  resetTime.setUTCHours(0, 0, 0, 0) // Set to midnight GMT

  if (type === 'daily') {
    // If current time is past midnight, set to next day
    if (now.getUTCHours() >= 0) {
      resetTime.setUTCDate(resetTime.getUTCDate() + 1)
    }
  } else if (type === 'weekly') {
    // Get next Thursday
    while (resetTime.getUTCDay() !== 4) { // 4 = Thursday
      resetTime.setUTCDate(resetTime.getUTCDate() + 1)
    }
  }

  return resetTime
}

function resetDailyContent(character) {
  const nextDailyReset = getNextResetTime('daily')
  const lastDailyReset = character.Progression.lastDailyReset ? new Date(character.Progression.lastDailyReset) : null

  // Reset daily activities
  character.Progression.Dailies.DailyActivity.forEach(activity => {
    if (!activity.CompletionStatus) return // Skip if not completed

    const completionDate = new Date(activity.CompletionDate)
    // Reset if completion was before last reset or is invalid
    if (!activity.CompletionDate || 
        isNaN(completionDate.getTime()) ||
        !lastDailyReset || // Reset if no last reset stored
        completionDate < lastDailyReset) {
      activity.CompletionStatus = false
      activity.CompletionDate = ''
    }
  })

  // Reset daily symbols with same logic
  character.Progression.ArcaneRiver.Region.forEach(region => {
    if (!region.RegionDailyCompletion) return

    const completionDate = new Date(region.CompletionDate)
    if (!region.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        !lastDailyReset ||
        completionDate < lastDailyReset) {
      region.RegionDailyCompletion = false
      region.CompletionDate = ''
    }
  })

  character.Progression.Grandis.Region.forEach(region => {
    if (!region.RegionDailyCompletion) return

    const completionDate = new Date(region.CompletionDate)
    if (!region.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        !lastDailyReset ||
        completionDate < lastDailyReset) {
      region.RegionDailyCompletion = false
      region.CompletionDate = ''
    }
  })

  // Reset daily bosses
  character.Bosses.BossList.forEach(boss => {
    boss.Difficulty.forEach(diff => {
      if (!diff.CompletionStatus || diff.DifficultyReset !== 'Daily') return

      const completionDate = new Date(diff.CompletionDate)
      if (!diff.CompletionDate ||
          isNaN(completionDate.getTime()) ||
          !lastDailyReset ||
          completionDate < lastDailyReset) {
        diff.CompletionStatus = false
        diff.CompletionDate = ''
      }
    })
  })
}

function resetWeeklyContent(character) {
  const nextWeeklyReset = getNextResetTime('weekly')
  const lastWeeklyReset = character.Progression.lastWeeklyReset ? new Date(character.Progression.lastWeeklyReset) : null

  // Reset weekly activities
  character.Progression.Weeklies.WeeklyActivity.forEach(activity => {
    if (!activity.CompletionStatus) return

    const completionDate = new Date(activity.CompletionDate)
    if (!activity.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        !lastWeeklyReset ||
        completionDate < lastWeeklyReset) {
      activity.CompletionStatus = false
      activity.CompletionDate = ''
    }
  })

  // Reset weekly symbols
  character.Progression.ArcaneRiver.Region.forEach(region => {
    if (!region.RegionWeeklyCompletion) return

    const completionDate = new Date(region.CompletionDate)
    if (!region.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        !lastWeeklyReset ||
        completionDate < lastWeeklyReset) {
      region.RegionWeeklyCompletion = false
      region.CompletionDate = ''
    }
  })

  // Reset weekly bosses
  character.Bosses.BossList.forEach(boss => {
    boss.Difficulty.forEach(diff => {
      if (!diff.CompletionStatus || diff.DifficultyReset !== 'Weekly') return

      const completionDate = new Date(diff.CompletionDate)
      if (!diff.CompletionDate ||
          isNaN(completionDate.getTime()) ||
          !lastWeeklyReset ||
          completionDate < lastWeeklyReset) {
        diff.CompletionStatus = false
        diff.CompletionDate = ''
      }
    })
  })
}