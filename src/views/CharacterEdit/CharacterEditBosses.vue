<template>
  <div class="boss-edit-page">
    <h2>Edit Bosses</h2>
    <div class="preset-section">
      <h3>Presets</h3>
      <div class="preset-buttons">
        <PresetButton 
          v-for="(config, key) in presetConfigs" 
          :key="key"
          :config="config"
          @click="applyPreset(key)"
        />
      </div>
    </div>
    <div class="boss-section-header">
      <h3>Boss list</h3>
    </div>
    <div class="boss-sections">
      <button @click="activeSection = 'mapleWorld'" :class="{ active: activeSection === 'mapleWorld' }">
        Maple World
      </button>
      <button @click="activeSection = 'arcaneRiver'" :class="{ active: activeSection === 'arcaneRiver' }">
        Arcane River
      </button>
      <button @click="activeSection = 'grandis'" :class="{ active: activeSection === 'grandis' }">
        Grandis
      </button>
    </div>

    <div class="boss-edit-container">
      <EditBossBlock v-for="boss in filteredBosses" :key="boss.key" :boss="boss" :saveBosses="saveBosses" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { saveData } from '../../localStorageService'
import EditBossBlock from '../../components/CharacterEdit/Bosses/EditBossBlock.vue'
import PresetButton from '../../components/CharacterEdit/Bosses/PresetButton.vue'
import { presetConfigs } from '../../components/CharacterEdit/Bosses/presetConfigs'


const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const activeSection = ref('mapleWorld')

const bossGroups = {
  mapleWorld: ['zakum', 'magnus', 'horntail', 'pinkBean', 'cygnus', 'vonLeon', 'arkarium', 'hilla', 'ranmaru', 'pierre', 'queen', 'vonBon', 'vellum'],
  arcaneRiver: ['lotus', 'damien', 'lucid', 'will', 'gloom', 'darknell', 'verusHilla', 'blackMage'],
  grandis: ['kalos', 'kaling', 'seren']
}


// const presets = {
//   threeDoors: {
//     pierre: ['Chaos'],
//     queen: ['Chaos'],
//     vonBon: ['Chaos'],
//     magnus: ['Hard'],
//     cygnus: ['Normal']
//   },
//   fourDoors: {
//     pierre: ['Chaos'],
//     queen: ['Chaos'],
//     vonBon: ['Chaos'],
//     vellum: ['Chaos'],
//     vonLeon: ['Hard'],
//     magnus: ['Hard'],
//     cygnus: ['Normal']
//   }
// }
// export const presetConfigs = {
//   threeDoors: {
//     name: '3 Doors+',
//     tooltip: 'CRA (except Vel.), Hard Magnus, Normal Cygnus',
//     bosses: {
//       pierre: ['Chaos'],
//       queen: ['Chaos'],
//       vonBon: ['Chaos'],
//       magnus: ['Hard'],
//       cygnus: ['Normal']
//     }
//   },
//   fourDoors: {
//     name: '4 Doors+',
//     tooltip: 'Full CRA, Hard Magnus, Hard Von Leon, Normal Cygnus',
//     bosses: {
//       pierre: ['Chaos'],
//       queen: ['Chaos'],
//       vonBon: ['Chaos'],
//       vellum: ['Chaos'],
//       vonLeon: ['Hard'],
//       magnus: ['Hard'],
//       cygnus: ['Normal']
//     }
//   }
// }
function applyPreset(presetName) {
  const preset = presetConfigs[presetName]
  if (!preset) return

  // Reset affected bosses
  const presetBosses = Object.keys(preset.bosses)
  props.character.Bosses.BossList.forEach(boss => {
    if (presetBosses.includes(boss.key)) {
      boss.Difficulty.forEach(diff => {
        diff.isActive = false
      })
    }
  })

  // Apply preset
  Object.entries(preset.bosses).forEach(([bossKey, difficulties]) => {
    const boss = props.character.Bosses.BossList.find(b => b.key === bossKey)
    if (boss) {
      difficulties.forEach(diffName => {
        const difficulty = boss.Difficulty.find(d => d.DifficultyName === diffName)
        if (difficulty) {
          difficulty.isActive = true
        }
      })
    }
  })

  saveBosses()
}

const filteredBosses = computed(() => {
  return props.character.Bosses.BossList.filter(boss =>
    bossGroups[activeSection.value].includes(boss.key)
  )
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

.boss-sections {
  display: flex;
  gap: 1em;
  justify-content: center;
  margin-bottom: 1em;
}

.boss-sections button {
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  background: var(--elev-2);
  cursor: pointer;
  color: var(--dark-text);
}

.boss-sections button.active {
  background: var(--blue-accent);
  color: white;
}

.boss-edit-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
}

.preset-buttons{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;

}

.preset-button{
  display: flex;
  flex-direction: column;
  justify-content: flex-start ;
  background-color: var(--elev-1);
  color: var(--dark-text);
  text-align: left;
}

.preset-tooltip{
  font-size: 0.6rem;
  text-align: left;
}
</style>