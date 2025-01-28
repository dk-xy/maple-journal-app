<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCharacters, deleteCharacter } from '../../localStorageService'
import Tabs from '../../components/Menus/Tabs.vue'
import CharacterProgression from './CharacterProgression.vue'
import CharacterBosses from './CharacterBosses.vue'

const route = useRoute()
const router = useRouter()
const character = ref(null)

onMounted(() => {
  const characters = getCharacters()
  const characterId = parseInt(route.params.id) - 1
  character.value = characters[characterId]
})

function handleDelete() {
  const characterId = parseInt(route.params.id) - 1
  deleteCharacter(characterId)
  router.push('/legion')
}
</script>

<template>
  <div v-if="character">
    <h1>{{ character.Name }}</h1>
    <p>Class: {{ character.Class }}</p>
    <p>Level: {{ character.Level }}</p>

    <RouterLink :to="`/legion/${route.params.id}/edit`">
      <button>Edit Character</button>
    </RouterLink>
    <button @click="handleDelete">Delete Character</button>

    <Tabs :tabs="['Progression', 'Bosses']">
      <template #Progression>
        <CharacterProgression :character="character" />
      </template>
      <template #Bosses>
        <CharacterBosses :character="character" />
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