<template>
  <div class="boss-block">
    <div class="boss-info">
      <h3>{{ boss.Name }}</h3>
      <DifficultyCompletion :difficulties="boss.Difficulty" :handleChange="handleCompletionChange" />
    </div>
    <div class="boss-image-container">
      <img :src="`/src/assets/images/resizedBosses/${boss.key}.webp`" :alt="boss.Name" class="boss-image" />
    </div>
  </div>
</template>
<script setup>
import DifficultyCompletion from './DifficultyCompletion.vue'
import { saveData } from '../../../localStorageService'

const props = defineProps({
  boss: {
    type: Object,
    required: true
  },
  saveBosses: {
    type: Function,
    required: true
  }
})

function handleCompletionChange(difficulty) {
  if (difficulty.CompletionStatus) {
    difficulty.CompletionDate = new Date().toISOString().split('T')[0] // Set to current date (YYYY-MM-DD)
  } else {
    difficulty.CompletionDate = ''
  }
  props.saveBosses()
  updateLocalStorage()
}

function updateLocalStorage() {
  const characters = JSON.parse(localStorage.getItem('mapleStoryData')).Legion.Characters
  const characterIndex = characters.findIndex(c => c.Name === props.boss.Name)
  if (characterIndex !== -1) {
    characters[characterIndex] = props.boss
    saveData({ Legion: { Characters: characters } })
  }
}
</script>


<style scoped>
.boss-block {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--elev-1, #F5D9BE);
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.boss-info {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 0.5em 0.5em;
  margin-right: 130px; /* Space for the fixed image */
}

.boss-image-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 100%;
  border-radius: 8px 0 0 8px;
  overflow: hidden;
  z-index: 1;
}

.boss-image {
  width: 112px;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  display: block;
}

/* Gradient overlay on the image */
.boss-image-container::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(145deg, #f5d9be 23.61%, rgba(197, 160, 125, 0) 98%);
  z-index: 2;
  pointer-events: none;
}

h3 {
  margin: 0.2em;
  text-align: left;
}
</style>