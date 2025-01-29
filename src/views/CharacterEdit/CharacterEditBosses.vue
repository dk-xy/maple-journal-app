<template>
  <div>
    <h2>Edit Bosses</h2>
    <div v-for="(boss, index) in character.Bosses.BossList" :key="index">
      <EditBossBlock :boss="boss" :saveBosses="saveBosses" />
    </div>
  </div>
</template>

<script setup>
import { saveData } from '../../localStorageService'
import EditBossBlock from '../../components/CharacterEdit/Bosses/EditBossBlock.vue'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
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
</style>