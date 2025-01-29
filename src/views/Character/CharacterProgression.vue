<template>
  <div>
    <h2>Progression</h2>

    <div class="all-symbols">

      <div class="symbol-progression_container" v-if="character.Progression.ArcaneRiver.isActive">
        <h3>Arcane River</h3>
        <ProgressionItem v-for="(region, index) in activeArcaneRiverRegions" :key="index" :item="region" type="region"
          code="arcaneRiver" :saveProgression="saveProgression" />
      </div>

      <div class="symbol-progression_container" v-if="character.Progression.Grandis.isActive" >
        <h3>Grandis</h3>
        <ProgressionItem v-for="(region, index) in activeGrandisRegions" :key="index" :item="region" type="region"
          code="grandis" :saveProgression="saveProgression" />
      </div>

    </div>
    <h3>Activities</h3>
    <div class="activity-container">

    </div>

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
</template>

<script setup>
import { computed } from 'vue'
import ProgressionItem from '../../components/Character/Progression/ProgressionItem.vue'
import { saveData } from '../../localStorageService'

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

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
</script>

<style scoped>


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
}

.activity-category-container h4{
  grid-column-start: span 3;
}


h3 {
  margin: 0.5em 0;
  line-height: 1.2; /* Ensure consistent line height */
}

.all-symbols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

}





.symbol-progression_container h3 {
  grid-column-start: span 3;
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