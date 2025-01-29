<template>
    <div class="boss-edit-block">
      <h3>{{ boss.Name }}</h3>
      <div class="edit-difficulties-block">
        <div v-for="(difficulty, diffIndex) in boss.Difficulty" :key="diffIndex">
        <label :for="'difficulty-' + diffIndex">{{ difficulty.DifficultyName }}:</label>
        <input :id="'difficulty-' + diffIndex" type="checkbox" v-model="difficulty.isActive" @change="handleDifficultyChange(difficulty)" />
        <!-- <label :for="'completion-' + diffIndex">Completed:</label>
        <input :id="'completion-' + diffIndex" type="checkbox" v-model="difficulty.CompletionStatus" @change="handleCompletionChange(difficulty)" /> -->
      </div>
      </div>

    </div>
  </template>
  
  <script setup>
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
  
  function handleDifficultyChange(difficulty) {
    props.saveBosses()
  }
  
  
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  .boss-edit-block{
    border-radius: 8px;
    background: var(--elev-1, #F5D9BE);
    border-radius: 8px;
    padding: 1em;
    margin: 1em 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
  }
  </style>