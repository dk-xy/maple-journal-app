<template>
  <div>
    <div class="page-title">
      <h2>Progression</h2>
      <div class="complete-all-container">
        <button class="complete-all-button" @click="completeAll('all')">
          <Icon iconName="task_alt" />
          <div>Complete All</div>
        </button>
      </div>
    </div>


    <div class="symbol-title section-title">
      <h3>Symbols</h3>
      <div class="complete-symbols-container">
        <button class="complete-all-button toggle-complete" @click="toggleSymbolsDropdown">
          <div>Complete</div>
          <Icon :iconName="symbolsDropdownVisible ? 'arrow_drop_up' : 'arrow_drop_down'" />
        </button>
        <!-- <button class="complete-all-button" @click="toggleSymbolsDropdown"> Complete Symbols</button> -->
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
        <button class="complete-all-button toggle-complete" @click="toggleActivitiesDropdown">
          <div>Complete</div> 
          <Icon :iconName="activitiesDropdownVisible ? 'arrow_drop_up' : 'arrow_drop_down'" />
        </button>
        <!-- <button class="complete-all-button" @click="toggleActivitiesDropdown">Complete Activities</button> -->
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
import Icon from '../../components/Icon.vue'


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
.page-title h2 {
  margin: 0;
}


/* .section-title {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 1em;
  gap: 16px;
} */

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
  background-color: var(--elev-1-a);
  gap: 16px;
  padding: 16px 16px;
}



.progression-item__symbols {
  /* border: solid 4px #ddd; */
  min-height: 100px;
}





/* DAILIES */
.activity-category-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 8px;
  grid-column-gap: 16px;

  background-color: var(--elev-1-a);
  padding: 16px 16px;
}

.activity-category-container h4 {
  grid-column-start: span 2;
  margin: 0;
  text-align: left;
}


h3 {
  margin: 0.5em 0;
  line-height: 1.2;
  /* Ensure consistent line height */
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






/* RESPONSIVENES!! */

@media (min-width:768px) and (max-width: 1024px) {
  .symbol-progression_container h3 {
    grid-column-start: span 2;
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