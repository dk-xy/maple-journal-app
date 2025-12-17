<script setup>
import { computed } from 'vue'
import Icon from '../Icon.vue'

const props = defineProps({
    characters: {
        type: Array,
        required: true
    }
})
const viMatrixStats = computed(() => {
    const MAX_ACCOUNT_EPIC_CLEARS = 2 // account-wide cap per week

    let stats = {
        fragmentsCompleted: 0,
        totalEnergy: 0,
        totalFragments: 0,
        energyCompleted: 0,
        // two account slots for epic grandis clears
        grandisSlots: [
            { dungeon: null, character: null, fragments: 0, erdaSol: 0 },
            { dungeon: null, character: null, fragments: 0, erdaSol: 0 }
        ],
        activeFragmentCharacters: 0,
        activeEnergyCharacters: 0
    }

    let slotIndex = 0
    const usedCharacters = new Set()

    props.characters.forEach(character => {
        // Respect: 1 epic clear per character per week
        if (slotIndex >= MAX_ACCOUNT_EPIC_CLEARS) return

        const grandisCompletions = (character.Progression.Weeklies.WeeklyActivity || [])
            .filter(a => a.key === 'grandisdungeon' && a.isActive && a.CompletionStatus)

        // Only one epic clear per character counts
        if (grandisCompletions.length > 0 && !usedCharacters.has(character.Name)) {
            const activity = grandisCompletions[0]
            const slot = stats.grandisSlots[slotIndex]
            slot.dungeon = activity.Name
            slot.character = character.Name
            slot.fragments = activity.fragments || 0
            slot.erdaSol = activity.erdaSol || 0

            stats.totalFragments += slot.fragments
            stats.totalEnergy += slot.erdaSol

            usedCharacters.add(character.Name)
            slotIndex++
        }

        // Fragment quest (daily)
        const fragmentQuest = character.Progression.Dailies.DailyActivity.find(
            activity => activity.key === 'erdarequest'
        )
        if (fragmentQuest?.isActive) {
            stats.activeFragmentCharacters++
            if (fragmentQuest.CompletionStatus) {
                stats.fragmentsCompleted++
                stats.totalEnergy += 600
                stats.totalFragments += 12
            }
        }

        // Energy quest (daily)
        const energyQuest = character.Progression.Dailies.DailyActivity.find(
            activity => activity.key === 'erdarequest_energy'
        )
        if (energyQuest?.isActive) {
            stats.activeEnergyCharacters++
            if (energyQuest.CompletionStatus) {
                stats.energyCompleted++
                stats.totalEnergy += energyQuest.energyPerCompletion
            }
        }

        // Weekly Erda quests (9 Sol & 90 Sol)
        const erdaWeekly9Sol = character.Progression.Weeklies.WeeklyActivity.find(
            activity => activity.key === 'erdarequest_9sol'
        )
        if (erdaWeekly9Sol?.CompletionStatus) {
            stats.totalFragments += 9
        }

        const erdaWeekly90Sol = character.Progression.Weeklies.WeeklyActivity.find(
            activity => activity.key === 'erdarequest_90sol'
        )
        if (erdaWeekly90Sol?.CompletionStatus) {
            stats.totalFragments += 90
        }
    })

    return stats
})
</script>

<template>
    <div class="dashboard-card vi-matrix">
        <div class="card-header">
            <h2>VI Matrix Progress</h2>
            <div class="active-chars">on {{ viMatrixStats.activeEnergyCharacters }} characters</div>
        </div>

        <div class="stats-container">




            <div class="stat-block vi-title">
                <h3>Grandis Weekly</h3>

                <div class="grandis-account-slots">
                    <div class="completion-row vi-matrix-completion">
                        <div v-for="(slot, idx) in viMatrixStats.grandisSlots" :key="idx" class="completion-status"
                            :class="{ completed: slot.character }">
                            <div class="slot-title">{{ slot.dungeon || 'Not Completed' }}</div>
                            <div class="slot-sub">{{ slot.character || '' }}</div>
                        </div>
                    </div>
                </div>

            </div> 

            <div class="reward-container">
                <div class="stat-container erda-weekly">
                    <div class="erda-heading">
                        <h3>Erda's weekly</h3>
                    </div>
                    <div class="erda-weekly-stats">
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/erdarequest.webp" alt="Fragments" class="reward-icon" />
                            <!-- <div class="reward-title">Fragments</div> -->
                            <div class="stat-value">{{ viMatrixStats.totalFragments }}</div>
                        </div>
                        <div class="stat-row">
                            <img src="/src/assets/images/etc/Use_Sol_Erda.png" alt="Sol Erda" class="reward-icon" />
                            <!-- <div class="reward-title">Energy</div> -->
                            <div class="stat-value">{{ viMatrixStats.totalEnergy }}</div>
                        </div> 
                    </div>

                </div>





            </div>
        </div>
    </div>
</template>

<style scoped>
.vi-matrix {
    display: grid;
    grid-template-rows: 1fr;
}

.vi-matrix h2 {
    margin: 0;
}


.vi-matrix .card-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    gap: 4px;
    margin-bottom: 4px;

}

.reward-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* Keep this */
    gap: 1em;
}

/* Add these new styles */
.stat-container {
    display: flex;
    flex-direction: column;
    gap: 0.6em;
    width: 100%;
    /* Ensure full width */
    background: rgba(255, 255, 255, 0.1);
    padding: 8px;
    border-radius: 6px;
}

.quest-block {
    display: grid;
    grid-template-columns: 1fr auto;
    /* Changed to auto for the value */
    gap: 1em;

    padding: 0.8em 1em;
    border-radius: 6px;
    align-items: center;
    text-align: left;
}

.quest-block h3 {
    margin: 0;
    font-size: 1em;
    font-weight: 500;
    white-space: nowrap;
    /* Prevent title from wrapping */
}


.dashboard-card {
    border-radius: 6px;
    background: linear-gradient(102deg, #97B5F5 -6.39%, #ACA7F4 110.52%);
    padding: 1.5em;
    margin-bottom: 1em;
    /* color: var(--dark-text); */
    color: #3d3d3d;
}


.stat-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    margin: 16px 0px;
}

.vi-title {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
}

.stat-row {
    display: flex;
    align-items: center;
    gap: 1em;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.8em 1em;
    border-radius: 6px;
}

.reward-container {
    display: flex;
    flex-direction: row;
    gap: 1em;
}

.stat-block h3 {
    margin: 0;
    font-size: 1em;
    flex: 1;
    font-weight: 500;
    /* align center vertically */
    display: flex;
    align-items: center;
    text-align: left;

}

.erda-weekly .erda-heading {
    padding: 0.8em 1em;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.04);
    display: flex;
    align-items: center;
}

.erda-weekly h3 {
    margin: 0;
    font-size: 1em;
    font-weight: 500;
}

.stat-value {
    font-size: 1.2em;
    font-weight: bold;

}

.active-chars {
    font-size: 0.9em;
    opacity: 0.8;
}

.completion-status {
    font-weight: bold;
    padding: 0.6em 0.8em;
    border-radius: 4px;
    margin: 8px;
    border: solid 1px rgba(231, 221, 238, 0.103);
    background: rgba(235, 230, 230, 0.418);
    /* background: linear-gradient(102deg, #b95bf767 -6.39%, #7b74df8f 110.52%); */
    min-width: 140px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.completion-status.completed {

    border: solid 1px rgba(206, 153, 241, 0.103);
    background: linear-gradient(102deg, #b95bf767 -6.39%, #7b74df8f 110.52%);

}

.slot-title {
    font-size: 0.95em;
}

.slot-sub {
    font-size: 0.8em;
    opacity: 0.85;
    color: rgba(60,60,60,0.9);
}

.vi-matrix-completion {
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    flex-direction: row;
    justify-content: center;
    padding: 8px 2px;
}


.erda-weekly-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 8px;
   justify-items: stretch;
   width: 100%;
}
</style>