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

function resetDailyContent(character) {
  const now = new Date()
  const nextDailyReset = getNextResetTime('daily')

  // Reset daily activities only if done before the next reset OR date missing/invalid
  character.Progression.Dailies.DailyActivity.forEach(activity => {
    const completionDate = new Date(activity.CompletionDate)
    if (
      activity.CompletionStatus &&
      (
        !activity.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        completionDate < nextDailyReset
      )
    ) {
      activity.CompletionStatus = false
      activity.CompletionDate = ''
    }
  })

  // Reset daily symbols
  character.Progression.ArcaneRiver.Region.forEach(region => {
    const completionDate = new Date(region.CompletionDate)
    if (
      region.RegionDailyCompletion &&
      (
        !region.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        completionDate < nextDailyReset
      )
    ) {
      region.RegionDailyCompletion = false
      region.CompletionDate = ''
    }
  })
  character.Progression.Grandis.Region.forEach(region => {
    const completionDate = new Date(region.CompletionDate)
    if (
      region.RegionDailyCompletion &&
      (
        !region.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        completionDate < nextDailyReset
      )
    ) {
      region.RegionDailyCompletion = false
      region.CompletionDate = ''
    }
  })

  // Reset daily bosses
  character.Bosses.BossList.forEach(boss => {
    boss.Difficulty.forEach(diff => {
      const completionDate = new Date(diff.CompletionDate)
      if (
        diff.DifficultyReset === 'Daily' &&
        diff.CompletionStatus &&
        (
          !diff.CompletionDate ||
          isNaN(completionDate.getTime()) ||
          completionDate < nextDailyReset
        )
      ) {
        diff.CompletionStatus = false
        diff.CompletionDate = ''
      }
    })
  })
}

function resetWeeklyContent(character) {
  const now = new Date()
  const nextWeeklyReset = getNextResetTime('weekly')

  // Reset weekly activities
  character.Progression.Weeklies.WeeklyActivity.forEach(activity => {
    const completionDate = new Date(activity.CompletionDate)
    if (
      activity.CompletionStatus &&
      (
        !activity.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        completionDate < nextWeeklyReset
      )
    ) {
      activity.CompletionStatus = false
      activity.CompletionDate = ''
    }
  })

  // Reset weekly symbols
  character.Progression.ArcaneRiver.Region.forEach(region => {
    const completionDate = new Date(region.CompletionDate)
    if (
      region.RegionWeeklyCompletion &&
      (
        !region.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        completionDate < nextWeeklyReset
      )
    ) {
      region.RegionWeeklyCompletion = false
      region.CompletionDate = ''
    }
  })

  // Reset weekly bosses
  character.Bosses.BossList.forEach(boss => {
    boss.Difficulty.forEach(diff => {
      const completionDate = new Date(diff.CompletionDate)
      if (
        diff.DifficultyReset === 'Weekly' &&
        diff.CompletionStatus &&
        (
          !diff.CompletionDate ||
          isNaN(completionDate.getTime()) ||
          completionDate < nextWeeklyReset
        )
      ) {
        diff.CompletionStatus = false
        diff.CompletionDate = ''
      }
    })
  })
}