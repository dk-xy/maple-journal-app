<template>
  <div class="character-bosses">
    <h2>Bosses</h2>
    <div v-for="(boss, index) in bossesWithActiveDifficulties" :key="index">
      <BossBlock :boss="boss" :saveBosses="saveBosses" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { saveData } from '../../localStorageService'
import BossBlock from '../../components/Character/Bosses/BossBlock.vue'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const bossesWithActiveDifficulties = computed(() => {
  return props.character.Bosses.BossList.filter(boss => 
    boss.Difficulty.some(difficulty => difficulty.isActive)
  )
})

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

.character-bosses {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 1rem;
}

.character-bosses h2 {
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 1rem;
}
</style>