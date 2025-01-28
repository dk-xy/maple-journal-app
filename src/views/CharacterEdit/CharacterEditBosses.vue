<template>
  <div>
    <h2>Edit Bosses</h2>
    <div v-for="(boss, index) in character.Bosses.BossList" :key="index">
      <h3>{{ boss.Name }}</h3>
      <div v-for="(difficulty, diffIndex) in boss.Difficulty" :key="diffIndex">
        <label :for="'boss-' + index + '-difficulty-' + diffIndex">{{ difficulty.DifficultyName }}</label>
        <input :id="'boss-' + index + '-difficulty-' + diffIndex" v-model="difficulty.isActive" type="checkbox" @change="handleDifficultyChange(boss, difficulty)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { saveData } from '../../localStorageService'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

function handleDifficultyChange(boss, changedDifficulty) {
  // Ensure only one difficulty is active for each DifficultyReset type
  if (changedDifficulty.isActive) {
    boss.Difficulty.forEach(difficulty => {
      if (difficulty !== changedDifficulty && difficulty.DifficultyReset === changedDifficulty.DifficultyReset) {
        difficulty.isActive = false
      }
    })
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