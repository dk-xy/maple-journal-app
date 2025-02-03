<template>
  <div class="boss-edit-page">
    <h2>Edit Bosses</h2>
    <div class="boss-edit-container">
      <EditBossBlock v-for="(boss, index) in character.Bosses.BossList" :key="index" :boss="boss" :saveBosses="saveBosses" />
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
.boss-edit-page {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.boss-edit-page h2 {
  text-align: center;
}

.boss-edit-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
}

.boss-edit-block {
  border-radius: 8px;
  background: var(--elev-1, #F5D9BE);
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: left;
}


</style>