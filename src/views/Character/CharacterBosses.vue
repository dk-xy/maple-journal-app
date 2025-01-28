<template>
  <div>
    <h2>Bosses</h2>
    <div v-for="(boss, index) in character.Bosses.BossList" :key="index">
      <h3>{{ boss.Name }}</h3>
      <div v-for="(difficulty, diffIndex) in boss.Difficulty" :key="diffIndex">
        <p>{{ difficulty.DifficultyName }}: {{ difficulty.DifficultyReset }}</p>
      </div>
      <p>Completion Status: <input type="checkbox" v-model="boss.CompletionStatus" disabled /></p>
      <p>Completion Date: {{ boss.CompletionDate }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>