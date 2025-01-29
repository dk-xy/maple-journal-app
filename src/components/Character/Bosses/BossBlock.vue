<template>
    <div class="boss-block">
      <h3>{{ boss.Name }}</h3>
      <DifficultySelector :difficulties="boss.Difficulty" :handleChange="handleCompletionChange" />
    </div>
  </template>

<script setup>
import { computed } from 'vue'

import DifficultySelector from '../../DifficultySelector.vue'

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

const activeDifficulties = computed(() => {
    return props.boss.Difficulty.filter(difficulty => difficulty.isActive)
})

function handleCompletionChange(difficulty) {
    if (difficulty.CompletionStatus) {
        difficulty.CompletionDate = new Date().toISOString().split('T')[0] // Set to current date in YYYY-MM-DD format
    } else {
        difficulty.CompletionDate = ''
    }
    props.saveBosses()
}
</script>

<style scoped>
.boss-block {
    border-radius: 8px;
    background: var(--elev-1, #F5D9BE);
    border-radius: 8px;
    padding: 1em;
    margin: 1em 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
}

h3 {
    margin: 0 0 0.5em 0;
}

p {
    margin: 0.5em 0;
}




.difficulties-container{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

.difficulty-container{
    display: flex;
    flex-direction: column;
    margin-right: 1em;
    align-items: start;
}
</style>