<template>
  <div>
    <h2>Bosses</h2>
    <div v-for="(boss, index) in character.Bosses.BossList" :key="index">
      <h3>{{ boss.Name }}</h3>
      <div v-for="(difficulty, diffIndex) in activeDifficulties(boss)" :key="diffIndex">
        <p>{{ difficulty.DifficultyName }}: {{ difficulty.DifficultyReset }}</p>
        <p>Completion Status: <input type="checkbox" v-model="difficulty.CompletionStatus" @change="handleCompletionChange(difficulty)" /></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { saveData } from '../../localStorageService'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

function activeDifficulties(boss) {
  return boss.Difficulty.filter(difficulty => difficulty.isActive)
}

function handleCompletionChange(difficulty) {
  if (difficulty.CompletionStatus) {
    difficulty.CompletionDate = new Date().toISOString().split('T')[0] // Set to current date in YYYY-MM-DD format
  } else {
    difficulty.CompletionDate = ''
  }
  saveBosses()
}

function saveBosses() {
  const characters = JSON.parse(localStorage.getItem('mapleStoryData')).Legion.Characters
  const characterIndex = characters.findIndex(c => c.Name === props.character.Name)
  if (characterIndex !== -1) {
    characters[characterIndex] = props.character
    saveData({ Legion: { Characters: characters } })
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>