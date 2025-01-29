<template>
    <div class="boss-edit-block">
      <h3>{{ boss.Name }}</h3>
      <DifficultySelector :difficulties="boss.Difficulty" :handleChange="handleDifficultyChange" />
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
// const dailyDifficulties = computed(() => {
//     return props.boss.Difficulty.filter(difficulty => difficulty.DifficultyReset === 'Daily')
// })

// const weeklyDifficulties = computed(() => {
//     return props.boss.Difficulty.filter(difficulty => difficulty.DifficultyReset === 'Weekly')
// })

function handleDifficultyChange(difficulty) {
    props.saveBosses()
}

// function handleDifficultyChange(difficulty) {
//     props.saveBosses()
// }


</script>

<style scoped>


/* Add any custom styles here */
.boss-edit-block {
    border-radius: 8px;
    background: var(--elev-1, #F5D9BE);
    border-radius: 8px;
    padding: 1em;
    margin: 1em 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;

}

.edit-difficulties-block {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 16px;
}

</style>