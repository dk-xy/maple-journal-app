import { initialData, emptyCharacter } from './dataStructure'

const LOCAL_STORAGE_KEY = 'mapleStoryData'

export function getData() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY)
  return data ? JSON.parse(data) : initialData
}

export function saveData(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
}

export function addCharacter() {
  const data = getData()
  data.Legion.Characters.push({ ...emptyCharacter })
  saveData(data)
}