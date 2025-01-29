<template>
    <div class="difficulty-selector">
      <div class="edit-difficulty" v-if="dailyDifficulties.length">
        <div class="difficulty-frequency-label">Daily</div>
        <div class="all-difficulties-container">
          <div class="boss-difficulty-selector" v-for="(difficulty, diffIndex) in dailyDifficulties" :key="'daily-' + diffIndex">
            <label :class="'difficulty-capsule ' + difficulty.DifficultyName" :for="'daily-difficulty-' + diffIndex">{{ difficulty.DifficultyName }}</label>
            <input :id="'daily-difficulty-' + diffIndex" type="checkbox" v-model="difficulty.CompletionStatus" @change="handleChange(difficulty)" />
          </div>
        </div>
      </div>
      <div class="edit-difficulty" v-if="weeklyDifficulties.length">
        <div class="difficulty-frequency-label">Weekly</div>
        <div class="all-difficulties-container">
          <div class="boss-difficulty-selector" v-for="(difficulty, diffIndex) in weeklyDifficulties" :key="'weekly-' + diffIndex">
            <label :class="'difficulty-capsule ' + difficulty.DifficultyName" :for="'weekly-difficulty-' + diffIndex">{{ difficulty.DifficultyName }}</label>
            <input :id="'weekly-difficulty-' + diffIndex" type="checkbox" v-model="difficulty.CompletionStatus" @change="handleChange(difficulty)" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    difficulties: {
      type: Array,
      required: true
    },
    handleChange: {
      type: Function,
      required: true
    }
  })
  
  const dailyDifficulties = computed(() => {
    return props.difficulties.filter(difficulty => difficulty.DifficultyReset === 'Daily' && difficulty.isActive)
  })
  
  const weeklyDifficulties = computed(() => {
    return props.difficulties.filter(difficulty => difficulty.DifficultyReset === 'Weekly' && difficulty.isActive)
  })
  </script>
  
  <style scoped>
  /* .difficulty-selector {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  
  .edit-difficulty {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  
  .difficulty-frequency-label {
    font-weight: bold;
  }
  
  .all-difficulties-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
  }
  
  .boss-difficulty-selector {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
  
  .difficulty-capsule {
    padding: 0.5em;
    border-radius: 8px;
    background-color: var(--elev-1);
  } */

  .difficulty-selector{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

.edit-difficulty {
    display: flex;
    flex-direction: column;
    /* left alignment */
    align-items: flex-start;
    gap: 1rem;

    padding: 8px 16px;
    background-color: var(--elev-2);
}

.all-difficulties-container {
    display: grid;
    grid-template-columns: repeat(4, auto);
}

.boss-difficulty-selector {
    display: flex;
    gap: 8px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.77);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
    padding: 0px 0px;
    padding-right: 16px;
    border-radius: 16px;
}

.difficulty-capsule{
    padding: 1px 4px;
    border-radius: 16px;
    min-width: 64px;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    text-transform: capitalize;
}
  
  </style>