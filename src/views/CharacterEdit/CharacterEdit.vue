<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCharacters, saveData } from '../../localStorageService'
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
    <div class="character-edit-info">
      <div class="character-edit-details">
        <div> {{ character.Name }}</div>
        <div>{{ character.Class }}</div>
        <div>{{ character.Level }}</div>
      </div>
      <button @click="showEditModal = true">Edit Character Info</button>
    </div>

    <button @click="handleSave">Save</button>
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
.character-edit-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--elev-1);
  padding: 1em;
  border-radius: 8px;
  margin-bottom: 1em;
}

.character-edit-details {
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  justify-content: left;
  text-align: left;
}

button {
  background-color: var(--blue-accent);
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: var(--blue-accent-deep);
}
</style>