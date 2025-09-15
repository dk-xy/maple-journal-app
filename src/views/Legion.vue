<script setup>
import { ref, onMounted } from 'vue'
import CharacterAddModal from '../components/Character/CharacterAddModal.vue'
import LegionBlock from '../components/Legion/LegionBlock.vue'
import { getCharacters } from '../localStorageService'
import { getData } from '../localStorageService'
import { RouterLink } from 'vue-router'
import Icon from '../components/Icon.vue'

const showModal = ref(false)
const characters = ref([])

onMounted(() => {
  // characters.value = getCharacters()
  characters.value = getData().Legion.Characters
})

function handleCharacterAdded() {
  characters.value = getCharacters()
  showModal.value = false
}
</script>

<template>
  <div class="legion-container">
    <h1>Legion</h1>
    <div class="section-title">
      <h2>Characters</h2>
      <button class="addChar" @click="showModal = true"><Icon iconName="add_box" /></button>
    </div>
    
    <CharacterAddModal :show="showModal" @close="handleCharacterAdded" />
    <div v-if="characters.length">
     
      <div class="character-container">
        <div class="character" v-for="(character, index) in characters" :key="index">
          <RouterLink :to="`/legion/${index + 1}`">
            <LegionBlock :character="character" />
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No characters added yet.</p>
    </div>
  </div>
</template>

<style scoped>

.legion-container {
  /* display: flex;
  flex-direction: column; */
  gap: 1em;
  width: 100%;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0.02em 0.2em; /* Adjust padding as needed */
  gap: 8px;
  background-color: var(--blue-accent);
  border: none;
  cursor: pointer;
  font-weight: bold;
  /* margin: 8px; */
  border-radius: 4px;
}
button:hover {
  background-color: var(--blue-accent-deep);
  
}

.add_text {
  font-size:0.8em
}

.character-container {
/* grid */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(372px, 2fr));
  gap: 1em;
  width: 100%;
}
</style>