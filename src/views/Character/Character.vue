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

function goToEdit() {
  router.push(`/legion/${route.params.id}/edit`)
}

function hasActiveProgression(character) {
  return character.Progression.ArcaneRiver.Region.some(region => region.isActive) ||
         character.Progression.Grandis.Region.some(region => region.isActive) ||
         character.Progression.Dailies.DailyActivity.some(activity => activity.isActive) ||
         character.Progression.Weeklies.WeeklyActivity.some(activity => activity.isActive)
}

function hasActiveBosses(character) {
  return character.Bosses.BossList.some(boss => boss.Difficulty.some(difficulty => difficulty.isActive))
}
</script>

<template>
  <div class="character-page" v-if="character">
    <div class="character-sheet">
      <div class="character-sheet-info">
        <h1>{{ character.Name }}</h1>
        <div class="sub-name">
          <div class="character-sheet-class"> {{ character.Class }}</div>
          <div class="character-sheet-level">Lvl. {{ character.Level }}</div>
        </div>
      </div>
      <div class="character-buttons">
        <RouterLink :to="`/legion/${route.params.id}/edit`">
          <button class="edit-character character-button">Edit</button>
        </RouterLink>
        <button class="delete-character character-button" @click="handleDelete">Delete</button>
      </div>
    </div>

    <div class="tab-container">
      <Tabs :tabs="['Progression', 'Bosses']">
        <template #Progression>
          <div v-if="hasActiveProgression(character)">
            <CharacterProgression :character="character" />
          </div>
          <div v-else>
            <div class="message-container">
              <p>No progression registered.</p>
              <p>Please edit your character to track it's progression.</p>
            </div>
           
            <button class="edit-cta-button" @click="goToEdit">Edit Character</button>
          </div>
        </template>
        <template #Bosses>
          <div v-if="hasActiveBosses(character)">
            <CharacterBosses :character="character" />
          </div>
          <div v-else>
            <p>No bosses found.</p>
            <button @click="goToEdit">Edit Character</button>
          </div>
        </template>
      </Tabs>
    </div>
  </div>
  <div v-else>
    <p>Character not found.</p>
  </div>
</template>

<style scoped>
/* Add any custom styles here */

.character-sheet {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100px;
  max-width: 728px;
  margin: auto;
  margin-bottom: 1em;
  margin-top: 1em;
  background-color: var(--elev-1);
  border-radius: 8px;
  padding: 16px 16px;
}

.character-sheet-class {
  font-size: 1rem;
}

.character-sheet-level {
  font-size: 0.8rem;
}

.character-sheet-info {
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 0.8em;
}

.sub-name {
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 0.1em;
  text-align: left;
}

.character-sheet-info h1 {
  font-size: 2.441rem;
  margin: 0;
}

.character-buttons {
  display: flex;
  gap: 0.2em;
  flex-direction: column;
}

.character-button {
  width: 64px;
  height: 32px;
  font-size: 0.62rem;
  font-weight: 800;
  text-align: center;
}

.edit-character {
  background-color: var(--blue-accent);
  color: white;
  border: none;
  border-radius: 8px;
}

.delete-character {
  background-color: var(--red-accent);
  color: white;
  border: none;
  border-radius: 8px;
}

.edit-cta-button {
  background-color: var(--blue-accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 1em;
}

.edit-cta-button:hover {
  background-color: var(--blue-accent-deep);
}
</style>