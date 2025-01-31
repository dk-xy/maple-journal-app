<template>
  <div>
    
    <div class="page-title">
      <h2>Progression</h2>
      <div class="complete-all-container">
      <button class="complete-all-button" @click="completeAll('all')">Complete All</button>
    </div>
    </div>


    <div class="symbol-title section-title">
      <h3>Symbols</h3>
      <div class="complete-symbols-container">
        <button class="complete-all-button" @click="toggleSymbolsDropdown">Complete Symbols</button>
        <div v-if="symbolsDropdownVisible" class="dropdown-menu">
          <button @click="completeSymbols('Daily')">Daily</button>
          <button @click="completeSymbols('Weekly')">Weekly</button>
          <button @click="completeSymbols('all')">All</button>
        </div>
      </div>
    </div>
    <div class="all-symbols">
      <div class="symbol-progression_container" v-if="character.Progression.ArcaneRiver.isActive">
        <h4>Arcane River</h4>
        <ProgressionItem v-for="(region, index) in activeArcaneRiverRegions" :key="index" :item="region" type="region"
          code="arcaneRiver" :saveProgression="saveProgression" />
      </div>

      <div class="symbol-progression_container" v-if="character.Progression.Grandis.isActive">
        <h4>Grandis</h4>
        <ProgressionItem v-for="(region, index) in activeGrandisRegions" :key="index" :item="region" type="region"
          code="grandis" :saveProgression="saveProgression" />
      </div>
    </div>

    <div class="activities-title section-title">
      <h3>Activities</h3>
    <div class="complete-activities-container">
      <button class="complete-all-button" @click="toggleActivitiesDropdown">Complete Activities</button>
      <div v-if="activitiesDropdownVisible" class="dropdown-menu">
        <button @click="completeActivities('Daily')">Daily</button>
        <button @click="completeActivities('Weekly')">Weekly</button>
        <button @click="completeActivities('all')">All</button>
      </div>
    </div>
    </div>

    <div class="activities-container">
      <div class="activity-block" v-if="character.Progression.Dailies.isActive">
        <div class="activity-category-container">
          <h4>Dailies</h4>
          <ProgressionItem v-for="(daily, index) in activeDailies" :key="index" :item="daily" type="daily" code="daily"
            :saveProgression="saveProgression" />
        </div>
      </div>

      <div class="activity-block" v-if="character.Progression.Weeklies.isActive">
        <div class="activity-category-container">
          <h4>Weeklies</h4>
          <ProgressionItem v-for="(weekly, index) in activeWeeklies" :key="index" :item="weekly" type="weekly"
            code="weekly" :saveProgression="saveProgression" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProgressionItem from '../../components/Character/Progression/ProgressionItem.vue'
import { saveData } from '../../localStorageService'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const symbolsDropdownVisible = ref(false)
const activitiesDropdownVisible = ref(false)

const activeArcaneRiverRegions = computed(() => {
  return props.character.Progression.ArcaneRiver.Region.filter(region => region.isActive)
})

const activeGrandisRegions = computed(() => {
  return props.character.Progression.Grandis.Region.filter(region => region.isActive)
})

const activeDailies = computed(() => {
  return props.character.Progression.Dailies.DailyActivity.filter(daily => daily.isActive)
})

const activeWeeklies = computed(() => {
  return props.character.Progression.Weeklies.WeeklyActivity.filter(weekly => weekly.isActive)
})

function saveProgression() {
  const characters = JSON.parse(localStorage.getItem('mapleStoryData')).Legion.Characters
  const characterIndex = characters.findIndex(c => c.Name === props.character.Name)
  if (characterIndex !== -1) {
    characters[characterIndex] = props.character
    saveData({ Legion: { Characters: characters } })
  }
}

function toggleSymbolsDropdown() {
  symbolsDropdownVisible.value = !symbolsDropdownVisible.value
}

function toggleActivitiesDropdown() {
  activitiesDropdownVisible.value = !activitiesDropdownVisible.value
}

function completeAll(type) {
  completeSymbols(type)
  completeActivities(type)
}

function completeSymbols(type) {
  const allCompleted = activeArcaneRiverRegions.value.every(region => 
    (type === 'all' || type === 'Daily') && region.RegionDailyCompletion || 
    (type === 'all' || type === 'Weekly') && region.RegionWeeklyCompletion
  ) && activeGrandisRegions.value.every(region => 
    (type === 'all' || type === 'Daily') && region.RegionDailyCompletion
  )

  activeArcaneRiverRegions.value.forEach(region => {
    if (type === 'all' || type === 'Daily') {
      region.RegionDailyCompletion = !allCompleted
    }
    if (type === 'all' || type === 'Weekly') {
      region.RegionWeeklyCompletion = !allCompleted
    }
  })

  activeGrandisRegions.value.forEach(region => {
    if (type === 'all' || type === 'Daily') {
      region.RegionDailyCompletion = !allCompleted
    }
  })

  saveProgression()
  symbolsDropdownVisible.value = false
}

function completeActivities(type) {
  const allCompleted = activeDailies.value.every(daily => 
    (type === 'all' || type === 'Daily') && daily.CompletionStatus
  ) && activeWeeklies.value.every(weekly => 
    (type === 'all' || type === 'Weekly') && weekly.CompletionStatus
  )

  activeDailies.value.forEach(daily => {
    if (type === 'all' || type === 'Daily') {
      daily.CompletionStatus = !allCompleted
    }
  })

  activeWeeklies.value.forEach(weekly => {
    if (type === 'all' || type === 'Weekly') {
      weekly.CompletionStatus = !allCompleted
    }
  })

  saveProgression()
  activitiesDropdownVisible.value = false
}
</script>
<style scoped>

.page-title{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100%;
  gap: 32px;
}

.page-title h2{
  margin: 0;
}


.section-title {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 1em;
  gap: 16px;
}

.section-title h3 {
  margin: 0;
}

/* SYMBOLS!! */

/* Add any custom styles here */
/* .symbols-Container {
  display: grid;

  grid-template-columns: repeat(3, auto);
  gap: 10px;
  align-content: start;
} */

.symbol-progression_container {
  display: grid;
  grid-template-rows: repeat(3, auto);
  background-color: var(--elev-1);
  gap: 16px;
  padding: 16px 16px;
}



.progression-item__symbols {
  /* border: solid 4px #ddd; */
  min-height: 100px;
}

/* SYMBOLS!!COLORS!!




/* DAILIES */
.activity-category-container{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  background-color: var(--elev-1);
  padding: 32px 16px;
}

.activity-category-container h4{
  grid-column-start: span 3;
  margin: 0;
  text-align: left;
}


h3 {
  margin: 0.5em 0;
  line-height: 1.2; /* Ensure consistent line height */
}

.all-symbols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 64px;

}



.symbol-progression_container h4 {
  grid-column-start: span 3;
  text-align: left;
  margin: 0;
}



/* COMPLETE ALL CSS !!! */
.complete-all-button {
  background: var(--elev-1);
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  color: var(--dark-brown);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* border: solid 1px var(--elev-2); */
  font-size: 0.8rem;
  font-weight: 600;
}


.complete-all-container {
  /* margin-bottom: 1em; */
}

.complete-symbols-container,
.complete-activities-container {
  position: relative;
  display: inline-block;
  /* margin-bottom: 1em; */
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--elev-1);
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;

}

.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 0.5em 1em;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: var(--dark-text);
}

.dropdown-menu button:hover {
  background: var(--elev-2);
}



/* RESPONSIVENES!! */

@media (min-width:768px) and (max-width: 1024px) {
  .symbol-progression_container h3 {
  grid-column-start: span 2 ;
}

  .symbol-progression_container {
    grid-template-columns: repeat(2, auto);
  }
}

@media (min-width: 868px) {
.activities-container {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 20px;
}


  
}

@media (max-width: 768px) {
  .all-symbols {
    grid-template-columns: 1fr;
  }

  .symbol-progression_container {
    grid-template-columns: repeat(2, auto);
  }
}

@media (max-width: 480px) {
  .symbol-progression_container {
    grid-template-columns: 1fr;
  }
}

</style>