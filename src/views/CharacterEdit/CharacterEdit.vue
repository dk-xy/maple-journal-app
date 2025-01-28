<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCharacters, saveData } from '../../localStorageService'
import Tabs from '../../components/Menus/Tabs.vue'
import CharacterEditProgression from './CharacterEditProgression.vue'
import CharacterEditBosses from './CharacterEditBosses.vue'

const route = useRoute()
const router = useRouter()
const character = ref(null)

onMounted(() => {
  const characters = getCharacters()
  const characterId = parseInt(route.params.id) - 1
  character.value = characters[characterId]
})

function handleSave() {
  const characters = getCharacters()
  const characterId = parseInt(route.params.id) - 1
  characters[characterId] = character.value
  saveData({ Legion: { Characters: characters } })
  router.push(`/legion/${route.params.id}`)
}
</script>

<template>
  <div v-if="character">
    <h1>Edit Character</h1>
    <form @submit.prevent="handleSave">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="character.Name" required />
      </div>
      <div>
        <label for="class">Class:</label>
        <input id="class" v-model="character.Class" required />
      </div>
      <div>
        <label for="level">Level:</label>
        <input id="level" type="number" v-model="character.Level" min="1" max="300" required />
      </div>
      <button type="submit">Save</button>
    </form>

    <Tabs :tabs="['Progression', 'Bosses']">
      <template #Progression>
        <CharacterEditProgression :character="character" />
      </template>
      <template #Bosses>
        <CharacterEditBosses :character="character" />
      </template>
    </Tabs>
  </div>
  <div v-else>
    <p>Character not found.</p>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>