<template>
  <div class="boss-edit-page">
    <h2>Edit Bosses</h2>
    
    <!-- Presets Section: Kept visible as buttons (not in a dropdown) -->
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

    <!-- Boss List Header with Dropdown Category Filter -->
    <div class="boss-section-header">
      <div class="boss-header-title">
        <h3>Boss list</h3>
        <span class="boss-count">({{ filteredBosses.length }})</span>
      </div>

      <div class="boss-category-dropdown" ref="categoryDropdownRef">
        <button 
          type="button" 
          class="boss-category-trigger" 
          @click.stop="isCategoryDropdownOpen = !isCategoryDropdownOpen"
        >
          <span>{{ categoryOptions[activeSection] || 'Maple World' }}</span>
          <Icon :iconName="isCategoryDropdownOpen ? 'arrow_drop_up' : 'arrow_drop_down'" class="category-icon" />
        </button>

        <div v-if="isCategoryDropdownOpen" class="boss-category-menu" @click.stop>
          <button 
            v-for="(label, key) in categoryOptions" 
            :key="key"
            type="button"
            class="boss-category-item"
            :class="{ active: activeSection === key }"
            @click="selectCategory(key)"
          >
            <span>{{ label }}</span>
            <span v-if="activeSection === key" class="check">✓</span>
          </button>
        </div>
      </div>
    </div>

    <div class="boss-edit-container">
      <EditBossBlock v-for="boss in filteredBosses" :key="boss.key" :boss="boss" :saveBosses="saveBosses" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { saveData } from '../../localStorageService'
import EditBossBlock from '../../components/CharacterEdit/Bosses/EditBossBlock.vue'
import PresetButton from '../../components/CharacterEdit/Bosses/PresetButton.vue'
import { presetConfigs } from '../../components/CharacterEdit/Bosses/presetConfigs'
import Icon from '../../components/Icon.vue'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const activeSection = ref('all')
const isCategoryDropdownOpen = ref(false)
const categoryDropdownRef = ref(null)

const categoryOptions = {
  all: 'All Bosses',
  mapleWorld: 'Maple World',
  arcaneRiver: 'Arcane River',
  grandis: 'Grandis'
}

const bossGroups = {
  mapleWorld: ['zakum', 'papulatus', 'horntail', 'hilla', 'cygnus', 'arkarium', 'ranmaru', 'magnus', 'vonLeon', 'pierre', 'queen', 'vonBon', 'vellum', 'omnicln', 'pinkBean'],
  arcaneRiver: ['lotus', 'damien', 'guardianSlime', 'lucid', 'will', 'gloom', 'darknell', 'verusHilla', 'blackMage'],
  grandis: ['seren', 'kalos', 'kaling']
}

function selectCategory(key) {
  activeSection.value = key
  isCategoryDropdownOpen.value = false
}

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
  if (activeSection.value === 'all') {
    return props.character.Bosses.BossList
  }
  const group = bossGroups[activeSection.value]
  if (!group) return props.character.Bosses.BossList
  return props.character.Bosses.BossList.filter(boss => group.includes(boss.key))
})

function saveBosses() {
  const characters = JSON.parse(localStorage.getItem('mapleStoryData'))?.Legion?.Characters
  if (!Array.isArray(characters)) return
  const characterIndex = characters.findIndex(c => c.Name === props.character.Name)
  if (characterIndex !== -1) {
    characters[characterIndex] = props.character
    saveData({ Legion: { Characters: characters } })
  }
}

function handleOutsideClick(event) {
  if (categoryDropdownRef.value && !categoryDropdownRef.value.contains(event.target)) {
    isCategoryDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
.boss-edit-page {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  text-align: left;
}

.boss-edit-page h2 {
  margin: 0;
  text-align: left;
}

.preset-section {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.preset-section h3 {
  margin: 0;
}

.preset-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
}

.boss-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.boss-header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.boss-header-title h3 {
  margin: 0;
}

.boss-count {
  font-size: 0.85rem;
  opacity: 0.7;
}

/* Category Dropdown */
.boss-category-dropdown {
  position: relative;
  display: inline-block;
}

.boss-category-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0.45em 0.9em;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  background: var(--elev-2);
  cursor: pointer;
  color: var(--dark-text);
  font-weight: 600;
  min-width: 140px;
  font-size: 0.9rem;
  transition: all 0.15s ease;
}

.boss-category-trigger:hover {
  background: var(--elev-1);
  border-color: rgba(255, 255, 255, 0.6);
}

.category-icon {
  width: 20px;
  height: 20px;
  opacity: 0.8;
}

.boss-category-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 160px;
  background: var(--elev-1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  z-index: 100;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.boss-category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5em 0.8em;
  background: none;
  border: none;
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  color: var(--dark-text);
  font-size: 0.88rem;
  font-weight: 500;
  transition: background 0.12s;
}

.boss-category-item:hover {
  background: var(--elev-2);
}

.boss-category-item.active {
  background: rgba(51, 170, 187, 0.25);
  color: var(--dark-brown);
  font-weight: 700;
}

.check {
  color: var(--blue-accent);
  font-weight: bold;
}

.boss-edit-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25em;
}

@media (min-width: 1100px) {
  .boss-edit-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
