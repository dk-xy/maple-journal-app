import { initialData } from './dataStructure'
import { checkResets } from './utils/resetUtils'

const LOCAL_STORAGE_KEY = 'mapleStoryData'

function cloneData(data) {
  return JSON.parse(JSON.stringify(data))
}

function extractCharacters(data) {
  if (!data || typeof data !== 'object') {
    return []
  }

  const legion = data.Legion && typeof data.Legion === 'object' ? data.Legion : null

  if (Array.isArray(legion?.Characters)) {
    return legion.Characters
  }

  if (Array.isArray(data?.Characters)) {
    return data.Characters
  }

  if (Array.isArray(legion?.characters)) {
    return legion.characters
  }

  if (Array.isArray(data?.characters)) {
    return data.characters
  }

  return []
}

function normalizeCharacter(character, index) {
  if (!character || typeof character !== 'object') {
    return null
  }

  const progression = character.Progression && typeof character.Progression === 'object' ? character.Progression : {}
  const bosses = character.Bosses && typeof character.Bosses === 'object' ? character.Bosses : {}

  return {
    ...character,
    Name: character.Name || `Character ${index + 1}`,
    Progression: {
      ...progression,
      ArcaneRiver: {
        ...(progression.ArcaneRiver || {}),
        Region: Array.isArray(progression.ArcaneRiver?.Region) ? progression.ArcaneRiver.Region : []
      },
      Grandis: {
        ...(progression.Grandis || {}),
        Region: Array.isArray(progression.Grandis?.Region) ? progression.Grandis.Region : []
      },
      Dailies: {
        ...(progression.Dailies || {}),
        DailyActivity: Array.isArray(progression.Dailies?.DailyActivity) ? progression.Dailies.DailyActivity : []
      },
      Weeklies: {
        ...(progression.Weeklies || {}),
        WeeklyActivity: Array.isArray(progression.Weeklies?.WeeklyActivity) ? progression.Weeklies.WeeklyActivity : []
      },
      Guild: {
        ...(progression.Guild || {}),
        DailyActivity: Array.isArray(progression.Guild?.DailyActivity) ? progression.Guild.DailyActivity : []
      }
    },
    Bosses: {
      ...(bosses || {}),
      BossList: Array.isArray(bosses.BossList) ? bosses.BossList : []
    }
  }
}

function normalizeData(data) {
  const baseData = cloneData(initialData)

  if (!data || typeof data !== 'object') {
    return baseData
  }

  const legion = data.Legion && typeof data.Legion === 'object' ? data.Legion : {}
  const rawCharacters = extractCharacters(data)
  const characters = Array.isArray(rawCharacters)
    ? rawCharacters.map((character, index) => normalizeCharacter(character, index)).filter(Boolean)
    : []

  return {
    ...baseData,
    ...data,
    Legion: {
      ...baseData.Legion,
      ...(legion || {}),
      Characters: characters
    }
  }
}

export function getData() {
  const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!storedValue) {
    return cloneData(initialData)
  }

  try {
    const parsed = JSON.parse(storedValue)
    return normalizeData(parsed)
  } catch (error) {
    console.error('Failed to parse saved data, falling back to defaults.', error)
    return cloneData(initialData)
  }
}

export function saveData(data) {
  const currentData = getData()
  const incomingData = data && typeof data === 'object' ? data : {}
  const nextData = {
    ...currentData,
    ...incomingData,
    Legion: {
      ...currentData.Legion,
      ...(incomingData.Legion || {})
    }
  }

  if (Array.isArray(incomingData.Legion?.Characters) && incomingData.Legion.Characters.length > 0) {
    nextData.Legion.Characters = incomingData.Legion.Characters.map((character, index) => normalizeCharacter(character, index)).filter(Boolean)
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData))
}

export function addCharacter(character) {
  const data = getData()
  data.Legion.Characters.push(character)
  saveData(data)
}
export function getCharacters() {
  const data = getData()
  data.Legion.Characters.forEach(character => {
    checkResets(character) 
  })
  saveData(data)
  return data.Legion.Characters
}

export function deleteCharacter(index) {
  const data = getData()
  data.Legion.Characters.splice(index, 1)
  saveData(data)
}