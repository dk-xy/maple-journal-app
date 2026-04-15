

export function checkResets(character) {
  const lastDailyReset = character.Progression.lastDailyReset ? new Date(character.Progression.lastDailyReset) : null
  const lastWeeklyReset = character.Progression.lastWeeklyReset ? new Date(character.Progression.lastWeeklyReset) : null
  const currentDailyReset = getResetBoundaryTime('daily')
  const currentWeeklyReset = getResetBoundaryTime('weekly')

  // Reset if we have never reset or the last reset happened before the current reset boundary
  if (!lastDailyReset || lastDailyReset < currentDailyReset) {
    resetDailyContent(character)
    character.Progression.lastDailyReset = currentDailyReset.toISOString()
  }

  if (!lastWeeklyReset || lastWeeklyReset < currentWeeklyReset) {
    resetWeeklyContent(character)
    character.Progression.lastWeeklyReset = currentWeeklyReset.toISOString()
  }
}

function getResetBoundaryTime(type) {
  const now = new Date()
  const resetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0))

  if (type === 'weekly') {
    // Find the most recent Thursday at 00:00 UTC.
    while (resetTime.getUTCDay() !== 4) { // 4 = Thursday
      resetTime.setUTCDate(resetTime.getUTCDate() - 1)
    }
  }

  return resetTime
}

function resetDailyContent(character) {
  const lastDailyReset = character.Progression.lastDailyReset ? new Date(character.Progression.lastDailyReset) : null

  // Reset daily activities
  character.Progression.Dailies.DailyActivity.forEach(activity => {
    if (!activity.CompletionStatus) return

    const completionDate = new Date(activity.CompletionDate)
    if (!activity.CompletionDate ||
        isNaN(completionDate.getTime()) ||
        !lastDailyReset ||
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