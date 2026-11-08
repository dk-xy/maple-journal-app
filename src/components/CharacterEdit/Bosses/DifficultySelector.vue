<template>
  <div class="difficulty-selector" ref="selectorRef">
    <div 
      class="edit-difficulty" 
      v-for="cat in categories" 
      :key="cat.label"
    >
      <div class="difficulty-frequency-label">{{ cat.label }}</div>

      <!-- Single difficulty in category: Checkmark + Capsule -->
      <div v-if="cat.difficulties.length === 1" class="boss-difficulty-selector">
        <label 
          :class="['difficulty-capsule', cat.difficulties[0].DifficultyName]" 
          :for="`${bossId}-${cat.label}-${cat.difficulties[0].DifficultyName}`"
        >
          {{ cat.difficulties[0].DifficultyName }}
        </label>
        <input 
          :id="`${bossId}-${cat.label}-${cat.difficulties[0].DifficultyName}`" 
          type="checkbox" 
          :checked="cat.difficulties[0].isActive" 
          @change="toggleSingle(cat.difficulties[0])" 
        />
      </div>

      <!-- Multiple difficulties in category: Mini List Dropdown -->
      <div v-else class="difficulty-dropdown" :class="{ 'is-open': openDropdown === cat.label }">
        <button 
          type="button" 
          class="difficulty-dropdown-trigger" 
          @click.stop="toggleDropdown(cat.label)"
          :title="`Select ${cat.label} difficulty`"
        >
          <span 
            v-if="getActiveDiff(cat.difficulties)" 
            :class="['difficulty-capsule', getActiveDiff(cat.difficulties).DifficultyName]"
          >
            {{ getActiveDiff(cat.difficulties).DifficultyName }}
          </span>
          <span v-else class="difficulty-capsule none-capsule">
            None
          </span>
          <Icon :iconName="openDropdown === cat.label ? 'arrow_drop_up' : 'arrow_drop_down'" class="dropdown-arrow" />
        </button>

        <div v-if="openDropdown === cat.label" class="difficulty-dropdown-menu" @click.stop>
          <div 
            class="dropdown-item" 
            :class="{ active: !getActiveDiff(cat.difficulties) }"
            @click="selectDifficulty(null, cat.difficulties)"
          >
            <span class="difficulty-capsule none-capsule">None</span>
            <span v-if="!getActiveDiff(cat.difficulties)" class="active-check">✓</span>
          </div>

          <div 
            v-for="diff in cat.difficulties" 
            :key="diff.DifficultyName"
            class="dropdown-item" 
            :class="{ active: diff.isActive }"
            @click="selectDifficulty(diff, cat.difficulties)"
          >
            <span :class="['difficulty-capsule', diff.DifficultyName]">
              {{ diff.DifficultyName }}
            </span>
            <span v-if="diff.isActive" class="active-check">✓</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Icon from '../../Icon.vue'

const props = defineProps({
  difficulties: {
    type: Array,
    required: true
  },
  bossKey: {
    type: String,
    required: false,
    default: ''
  },
  handleChange: {
    type: Function,
    required: true
  }
})

const selectorRef = ref(null)
const openDropdown = ref(null)

const bossId = computed(() => {
  return props.bossKey || Math.random().toString(36).substring(2, 9)
})

const categories = computed(() => {
  const resets = ['Daily', 'Weekly', 'Monthly']
  const groups = []

  for (const reset of resets) {
    const diffs = props.difficulties.filter(d => d.DifficultyReset === reset)
    if (diffs.length > 0) {
      groups.push({
        label: reset,
        difficulties: diffs
      })
    }
  }

  // Catch any other non-standard resets if present
  const otherDiffs = props.difficulties.filter(d => !resets.includes(d.DifficultyReset))
  if (otherDiffs.length > 0) {
    groups.push({
      label: 'Other',
      difficulties: otherDiffs
    })
  }

  return groups
})

function getActiveDiff(difficulties) {
  return difficulties.find(d => d.isActive) || null
}

function toggleDropdown(label) {
  openDropdown.value = openDropdown.value === label ? null : label
}

function selectDifficulty(diff, difficulties) {
  if (!diff) {
    // Deselect all in this category
    difficulties.forEach(d => {
      d.isActive = false
    })
  } else {
    const wasActive = diff.isActive
    // Only 1 difficulty active per reset category in MapleStory
    difficulties.forEach(d => {
      d.isActive = false
    })
    diff.isActive = !wasActive
  }

  openDropdown.value = null
  props.handleChange(diff)
}

function toggleSingle(difficulty) {
  difficulty.isActive = !difficulty.isActive
  props.handleChange(difficulty)
}

function handleOutsideClick(event) {
  if (selectorRef.value && !selectorRef.value.contains(event.target)) {
    openDropdown.value = null
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
.difficulty-selector {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  width: 100%;
  flex-wrap: wrap;
}

.edit-difficulty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  padding: 6px 12px;
  background-color: var(--elev-2);
  border-radius: 8px;
  position: relative;
}

.difficulty-frequency-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--dark-brown);
  opacity: 0.9;
}

.boss-difficulty-selector {
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.77);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  padding: 2px 8px 2px 2px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.boss-difficulty-selector input[type="checkbox"] {
  cursor: pointer;
  accent-color: var(--blue-accent);
}

.difficulty-capsule {
  padding: 2px 10px;
  border-radius: 16px;
  min-width: 58px;
  text-align: center;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;
  user-select: none;
}

.difficulty-capsule.none-capsule {
  background: rgba(255, 255, 255, 0.15);
  border: 1px dashed rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.75);
}

/* Mini List Dropdown */
.difficulty-dropdown {
  position: relative;
  display: inline-block;
}

.difficulty-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: rgba(0, 0, 0, 0.77);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  padding: 2px 6px 2px 2px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  cursor: pointer;
  color: white;
  transition: all 0.15s ease-in-out;
}

.difficulty-dropdown-trigger:hover {
  border-color: rgba(255, 255, 255, 0.45);
  background-color: rgba(0, 0, 0, 0.88);
}

.difficulty-dropdown.is-open .difficulty-dropdown-trigger {
  border-color: var(--blue-accent);
}

.dropdown-arrow {
  display: flex;
  align-items: center;
  width: 18px;
  height: 18px;
  opacity: 0.85;
}

.difficulty-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 130px;
  background: var(--elev-1);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  z-index: 100;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s ease;
}

.dropdown-item:hover {
  background: var(--elev-2);
}

.dropdown-item.active {
  background: rgba(51, 170, 187, 0.2);
}

.active-check {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--blue-accent);
}
</style>
