<script setup>
import { computed } from 'vue'

const props = defineProps({
    characters: {
        type: Array,
        required: true
    }
})
const weeklyStats = computed(() => {
     let stats = {
            guild: {
            culvertCompleted: 0,
            flagraceCompleted: 0,
            activeChars: 0
        },
          }

    props.characters.forEach(character => {

        // Guild Activities
        const culvertQuest = character.Progression.Guild.DailyActivity.find(
            activity => activity.key === 'culvert'
        )
        const flagraceQuest = character.Progression.Guild.DailyActivity.find(
            activity => activity.key === 'flagrace'
        )
        if (culvertQuest?.isActive || flagraceQuest?.isActive) {
            stats.guild.activeChars++
            if (culvertQuest?.CompletionStatus) stats.guild.culvertCompleted++
            if (flagraceQuest?.CompletionStatus) stats.guild.flagraceCompleted++
        }
    })  
    
    return stats
})
</script>

<template>
<div class="stat-block">
                    <!-- <h3>Guild Activities</h3> -->
                    <div class="sub-stats guild">
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/culvert.png" alt="Culvert" class="quest-icon" />
                            <!-- <span>Culvert</span> -->
                            <div class="stat-value">{{ weeklyStats.guild.culvertCompleted }}/{{
                                weeklyStats.guild.activeChars }}</div>
                        </div>
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/flagrace.png" alt="Flag Race" class="quest-icon" />
                            <!-- <span>Flag Race</span> -->
                            <div class="stat-value">{{ weeklyStats.guild.flagraceCompleted }}/{{
                                weeklyStats.guild.activeChars }}</div>
                        </div>
                    </div>
                </div>
                
</template>
<style scoped>
.stat-block {
    /* background: linear-gradient(102deg, #F4C183 -6.39%, #F4A183 110.52%);
    border-radius: 6px;
    padding: 1.5em;
    margin-bottom: 1em;
    color: white; */
  display: flex;
   
   justify-items: center;
   justify-content: center;
    padding: 8px 8px !important;
    align-items: center;
    gap: 8px;
    border-radius: 6px;
    /* background: var(--elev-1-a); */
    /* margin: 8px; */
    width: fit-content;

        background-color: var(--elev-1);
  
    border-radius: 6px;
    border: solid 1px rgba(255, 255, 255, 0.3);
   
    height: fit-content;
}


 .stat-row {
    border-radius: 8px;
    background: var(--elev-2);
        border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.50);
   
    width: fit-content;
    /* background: #F5D9BE; */
       
}





section {
    margin-bottom: 1em;
}

section:last-child {
    margin-bottom: 0;
}

h2 {
    margin: 0;
    padding: 2px 4px;
    text-align: left;
    font-size: 1.025em;
    font-weight: 700;
    color: var(--dark-text);
}

.stats-grid {
    display: grid;
    /* grid-template-rows: repeat(auto-fit, minmax(250px, 1fr)); */
    gap: 1em;
    height: fit-content;
}


.stat-block h3 {
    margin: 0 0 0.4em 0;
    font-size: 1em;
    font-weight: 500;
    text-align: center;
}

.stat-block.dailies .sub-stats {

    width: 100%;
}

.stat-block.dailies .sub-stats h3 {
    width: 100%;
}

.sub-stats {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0.6em;
    width: fit-content;
}

.sub-stats.weekly {
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
    /* grid 2 columns */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6em;


}



.stat-row {
    display: flex;
    align-items: center;
   
    gap: 0.8em;
    padding: 0.4em;
   
    border-radius: 4px;
}

.quest-icon {
    width: 24px;
    height: 24px;
    object-fit: cover;
}

.stat-value {
    margin-left: auto;
    font-weight: bold;
    padding: 4px 8px;
    margin: 2px 4px;
    border: solid 1px var(--elev-1);
    border-radius: 9px;
   
    /* width: 10%; */
}

h3 {
    text-align: left;
    font-weight: 600 !important;
}
</style>