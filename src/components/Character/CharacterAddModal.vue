<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2>Character Lookup</h2>
      <div class="character-lookup-content">
        <form @submit.prevent="fetchCharacter">
          <div class="form-group">
            <label for="charName">Character Name:</label>
            <input id="charName" v-model="characterName" type="text" required />
          </div>

          <div class="form-group">
            <label>Select Server:</label>
            <div class="server-selection-grid">
              <div v-for="server in servers" :key="server.name" class="server-button" :class="{
                active: selectedServer && selectedServer.name === server.name,
              }" @click="selectServer(server)">
                {{ server.name }}
              </div>
            </div>
          </div>

          <button type="submit" :disabled="loading" class="lookup-button">
            {{ loading ? 'Searching...' : 'Get Character' }}
          </button>
        </form>

        <div v-if="loading" class="loading-spinner">
          <p>Loading...</p>
        </div>

        <div v-if="errorMsg" class="error-message">
          <p>{{ errorMsg }}</p>
        </div>

        <div v-if="charData" class="character-result">
          <h3>{{ charData.characterName }}</h3>
          <p>Level {{ charData.level }} {{ charData.jobName }}</p>
          <p>({{ charData.worldName }})</p>
          <img :src="charData.avatarImgUrl || charData.characterImgURL" alt="Character Avatar" />
          <div style="margin-top:12px;">
            <button class="lookup-button" @click="addCharToLegion">Add to Legion</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addCharacter } from '../../localStorageService'   // <-- added
import { emptyCharacter } from '../../dataStructure'       // <-- added
// --- Modal Props & Emits ---
const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])

// --- State ---
const characterName = ref('')
const selectedServer = ref(null) // This will hold the { name, region, world_type } object

// Response state
const loading = ref(false)
const errorMsg = ref(null)
const charData = ref(null)

// --- Job mapping (jobID -> display string) ---
const JOB_MAP = {
  0: 'Beginner',
  1: 'Warrior',
  2: 'Magician',
  3: 'Bowman',
  4: 'Thief',
  5: 'Pirate',
  11: 'Dawn Warrior',
  12: 'Blaze Wizard',
  13: 'Wind Archer',
  14: 'Night Walker',
  15: 'Thunder Breaker',
  202: 'Mihile',
  30: 'Citizen',
  31: 'Demon Slayer',
  32: 'Battle Mage',
  33: 'Wild Hunter',
  35: 'Mechanic',
  208: 'Xenon',
  209: 'Demon Avenger',
  215: 'Blaster',
  20: 'Legend',
  21: 'Aran',
  22: 'Evan',
  23: 'Mercedes',
  24: 'Phantom',
  203: 'Luminous',
  212: 'Shade',
  204: 'Kaiser',
  205: 'Angelic Buster',
  216: 'Cadena',
  222: 'Kain',
  217: 'Illium',
  218: 'Ark',
  221: 'Adele',
  224: 'Khali',
  206: 'Hayato',
  207: 'Kanna',
  223: 'Lara',
  220: 'Hoyoung',
  225: 'Lynn',
  226: 'Mo Xuan'
}

function mapJob(jobId) {
  return JOB_MAP[jobId] || 'Unknown'
}


// --- Server List with IDs ---
const servers = ref([
  // EU Servers
  { name: 'Solis', id: 46, region: 'eu' },
  { name: 'Luna', id: 30, region: 'eu' },
  // NA Servers
  { name: 'Bera', id: 1, region: 'na' },
  { name: 'Scania', id: 19, region: 'na' },
  { name: 'Chronos', id: 45, region: 'na' },
  { name: 'Hyperion', id: 70, region: 'na' },
])

// --- Methods ---

/**
 * Sets the currently active server.
 * @param {object} server
 */
function selectServer(server) {
  selectedServer.value = server
  errorMsg.value = null // Clear error on new selection
}

/**
 * Fetches character data from Nexon's API using world ID
 */
const fetchCharacter = async () => {
  if (!selectedServer.value) {
    errorMsg.value = 'Please select a server first'
    return
  }

  loading.value = true
  errorMsg.value = null
  charData.value = null

  try {
    // Call our server-side API endpoint
    const params = new URLSearchParams({
      name: characterName.value,
      world: selectedServer.value.name
    });

    const url = `/api/lookup?${params}`;
    console.log('Fetching URL:', url);

    const response = await fetch(url);
    console.log('Response status:', response.status);

    // Always read the body as text once to avoid double-consuming the stream.
    const raw = await response.text();
    console.log('Response raw text:', raw);

    // Try to parse JSON; if it fails use the raw text for error messages
    let parsed = null
    try {
      parsed = JSON.parse(raw)
    } catch (e) {
      // not JSON, keep parsed null
    }

    if (!response.ok) {
      const errMsg = parsed?.error || parsed || raw || `HTTP ${response.status}`
      throw new Error(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg))
    }

    const data = parsed || raw
    console.log('API Response:', data)

    // Update the UI with the character data (if parsed is an object)
    if (parsed && typeof parsed === 'object') {
      // Check if it has the 'ranks' property and if it's an array with data
      if (parsed.ranks && Array.isArray(parsed.ranks) && parsed.ranks.length > 0) {
        // *** FIX IS HERE ***: Assign the first element of the 'ranks' array.
        charData.value = {
          ...parsed.ranks[0], // Spread the character details
          worldName: selectedServer.value.name, // Add worldName for display
          jobName: mapJob(parsed.ranks[0].jobID) // Add jobName using your mapJob function
        }
      } else {
        // Handle cases where API returns JSON but no ranks (e.g., character not found)
        errorMsg.value = 'Character not found on this server.'
      }
    } else {
      // If the response wasn't JSON, show raw text in error area
      errorMsg.value = 'Received non-JSON response; check console for details.'
    }

  } catch (err) {
    console.error('API Error:', err);
    errorMsg.value = err.message;
  } finally {
    loading.value = false;
  }
}

/**
 * Resets all form fields and results.
 */
function resetForm() {
  characterName.value = ''
  selectedServer.value = null
  loading.value = false
  errorMsg.value = null
  charData.value = null
}

function addCharToLegion() {
  if (!charData.value) return

  // deep clone emptyCharacter and populate
  const newChar = JSON.parse(JSON.stringify(emptyCharacter))
  newChar.Name = characterName.value || charData.value.characterName || 'Character'
  newChar.Class = mapJob(charData.value.jobID)
  newChar.Level = charData.value.level || 1
  // store avatar URL on a simple property used by LegionBlock
  newChar.Image = charData.value.characterImgURL || charData.value.avatarImgUrl || ''
  console.log('Adding character to Legion:', newChar)
  // persist
  addCharacter(newChar)

  // close modal (Legion view refreshes on close)
  resetForm()
  emit('close')
}

/**
 * Emits close event and resets the form.
 */
function close() {
  resetForm()
  emit('close')
}
</script>

<style scoped>
/* (Your existing modal styles should work perfectly here) */

/* --- Modal Styles --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.modal {
  background: var(--elev-0, #fff);
  /* Uses CSS var or fallback */
  padding: 2em;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

/* --- Content & Form Styles --- */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input[type='text'] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* --- Server Button Styles --- */
.server-selection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.server-button {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  font-size: 0.9em;
}

.server-button:hover {
  background-color: #f4f4f4;
}

.server-button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
  font-weight: bold;
}

/* --- Action/Result Styles --- */
.lookup-button {
  width: 100%;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
}

.lookup-button:disabled {
  background-color: #ccc;
}

.character-result {
  margin-top: 20px;
  text-align: center;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.character-result img {
  display: block;
  margin: 10px auto 0;
}

.character-result p {
  margin: 4px 0;
}

.error-message {
  color: red;
  margin-top: 15px;
  text-align: center;
}

.loading-spinner {
  margin-top: 15px;
  text-align: center;
}
</style>