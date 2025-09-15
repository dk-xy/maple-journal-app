import { initialData } from './dataStructure'
import { checkResets } from './utils/resetUtils'

const LOCAL_STORAGE_KEY = 'mapleStoryData'

export function getData() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY)
  return data ? JSON.parse(data) : initialData
}

export function saveData(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
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