<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCharacters } from '../../localStorageService'
import Tabs from '../../components/Menus/Tabs.vue'
import CharacterEditProgression from './CharacterEditProgression.vue'
import CharacterEditBosses from './CharacterEditBosses.vue'
import EditCharacterInfo from './CharacterEditInfo.vue'

const route = useRoute()
const router = useRouter()
const character = ref(null)
const showEditModal = ref(false)

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
    <button @click="showEditModal = true">Edit Character Info</button>
    <EditCharacterInfo :show="showEditModal" :character="character" @close="showEditModal = false" />

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