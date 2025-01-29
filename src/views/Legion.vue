<script setup>
import { ref, onMounted } from 'vue'
import CharacterAddModal from '../components/Character/CharacterAddModal.vue'
import LegionBlock from '../components/Legion/LegionBlock.vue'
import { getCharacters } from '../localStorageService'
import { RouterLink } from 'vue-router'

const showModal = ref(false)
const characters = ref([])

onMounted(() => {
  characters.value = getCharacters()
})

function handleCharacterAdded() {
  characters.value = getCharacters()
  showModal.value = false
}
</script>

<template>
  <div>
    <h1>Legion</h1>
    <button class="addChar" @click="showModal = true">Add Character</button>
    <CharacterAddModal :show="showModal" @close="handleCharacterAdded" />
    <div v-if="characters.length">
      <h2>Characters</h2>
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
button {
  padding: 0.5em 1em;
  background-color: var(--blue-accent);
  border: none;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background-color: #ffd7a8;
}

.character-container {
/* grid */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  gap: 1em;
}
</style>