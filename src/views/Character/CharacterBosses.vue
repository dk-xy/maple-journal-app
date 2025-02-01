<template>
  <div class="character-bosses-container">
    <div class="page-title">
      <h2>Bosses</h2>
      <div class="complete-all-container">
        <button class="complete-all-button" @click="toggleDropdown">
  
          <div>Complete All</div>
          <Icon :iconName="dropdownVisible ? 'arrow_drop_up' : 'arrow_drop_down'" />
        </button>
        <!-- <button class="complete-all-button" @click="toggleDropdown"><Icon iconName="task_alt" /> <div>Complete All</div></button> -->
        <div v-if="dropdownVisible" class="dropdown-menu">
          <button @click="completeAll('Daily')">Daily</button>
          <button @click="completeAll('Weekly')">Weekly</button>
        </div>
      </div>
    </div>



    <div class="character-bosses">
      <div v-for="(boss, index) in bossesWithActiveDifficulties" :key="index">
        <BossBlock :boss="boss" :saveBosses="saveBosses" />
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import { saveData } from '../../localStorageService'
import BossBlock from '../../components/Character/Bosses/BossBlock.vue'
import Icon from '../../components/Icon.vue'


const bossDropdownVisible = ref(false)

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const dropdownVisible = ref(false)

function toggleDropdown() {
  dropdownVisible.value = !dropdownVisible.value
}

const bossesWithActiveDifficulties = computed(() => {
  return props.character.Bosses.BossList.filter(boss =>
    boss.Difficulty.some(difficulty => difficulty.isActive)
  )
})
function completeAll(type) {
  const allCompleted = props.character.Bosses.BossList.every(boss =>
    boss.Difficulty.every(difficulty =>
      difficulty.DifficultyReset !== type || !difficulty.isActive || difficulty.CompletionStatus
    )
  )

  props.character.Bosses.BossList.forEach(boss => {
    boss.Difficulty.forEach(difficulty => {
      if (difficulty.DifficultyReset === type && difficulty.isActive) {
        difficulty.CompletionStatus = !allCompleted
        difficulty.CompletionDate = !allCompleted ? new Date().toISOString().split('T')[0] : ''
      }
    })
  })
  saveBosses()
  dropdownVisible.value = false
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

.complete-all-container {
  position: relative;
  display: inline-block;
}
</style>