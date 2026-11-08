<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCharacters, saveData } from '../../localStorageService'
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
  <div class="character-edit-page" v-if="character">
    <!-- Sticky Top Header with Transparency Gradient -->
    <div class="character-edit-sticky-header">
      <div class="character-edit-topbar">
        <h1>Edit Character</h1>
        <button class="save-button" @click="handleSave">Save Changes</button>
      </div>

      <div class="character-edit-info">
        <div class="character-edit-details">
          <div class="character-name">{{ character.Name }}</div>
          <div class="character-meta">{{ character.Class }} &bull; Lvl. {{ character.Level }}</div>
        </div>
        <button class="edit-info-button" @click="showEditModal = true">Edit Character Info</button>
      </div>
    </div>

    <EditCharacterInfo :show="showEditModal" :character="character" @close="showEditModal = false" />

    <div class="edit-sections-container">
      <!-- Progression Section -->
      <section class="edit-page-section">
        <CharacterEditProgression :character="character" />
      </section>

      <hr class="section-divider" />

      <!-- Bosses Section -->
      <section class="edit-page-section">
        <CharacterEditBosses :character="character" />
      </section>
    </div>

    <div class="character-edit-bottombar">
      <button class="save-button" @click="handleSave">Save Changes</button>
    </div>
  </div>

  <div v-else class="not-found-message">
    <p>Character not found.</p>
  </div>
</template>

<style scoped>
.character-edit-page {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding-bottom: 3em;
  width: 100%;
  box-sizing: border-box;
}

/* Sticky top container with gradient fade */
.character-edit-sticky-header {
  position: sticky;
  width: fit-content;
  top: 72px;
  z-index: 90;
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  padding-top: 1em;
  padding-bottom: 1em;
  padding: 1em;
  margin: auto;
  margin-top:32px;
  background: var(--elev-0);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  /* margin: 16px; */
}

.character-edit-topbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  
}

.character-edit-topbar h1 {
  margin: 0;
  text-align: left;
  padding: 16px 32px;
}

.character-edit-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--elev-1);
  padding: 0.85em 1.25em;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.character-edit-details {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  text-align: left;
}

.character-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--dark-text);
}

.character-meta {
  font-size: 0.95rem;
  color: var(--dark-brown);
  opacity: 0.85;
}

.edit-info-button {
  background-color: var(--elev-2);
  color: var(--dark-text);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0.5em 1em;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.15s ease;
}

.edit-info-button:hover {
  background-color: var(--elev-0);
}

.save-button {
  background-color: var(--blue-accent);
  color: white;
  border: none;
  padding: 0.55em 1.4em;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: background-color 0.15s ease;
}

.save-button:hover {
  background-color: var(--blue-accent-deep);
}

.edit-sections-container {
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 100%;
}

.edit-page-section {
  width: 100%;
}

.section-divider {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  margin: 0.5em 0;
}

.character-edit-bottombar {
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
}

.not-found-message {
  padding: 2em;
  font-size: 1.1rem;
}
</style>
