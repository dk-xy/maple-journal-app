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
    let stats = {
        fragmentsCompleted: 0,
        totalEnergy: 0,
        totalFragments: 0,
        energyCompleted: 0,
        grandisDungeonCompleted: [],
        activeFragmentCharacters: 0,
        activeEnergyCharacters: 0
    }

    props.characters.forEach(character => {
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

        // Grandis dungeon (track by character name)
        const grandisDungeon = character.Progression.Weeklies.WeeklyActivity.find(
            activity => activity.key === 'grandisdungeon'
        )
        if (grandisDungeon?.isActive && grandisDungeon?.CompletionStatus) {
            // Keep only the first two characters that completed the dungeon
            if (stats.grandisDungeonCompleted.length < 2) {
                stats.grandisDungeonCompleted.push(character.Name)
            }
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




            <div class="stat-block">
                <h3>Grandis Dungeon</h3>
                <!-- <div class="completion-status" :class="{ completed: viMatrixStats.grandisDungeonCompleted.length > 0 }">
                    {{ viMatrixStats.grandisDungeonCompleted.length > 0
                        ? `${viMatrixStats.grandisDungeonCompleted.length}x -
                    ${viMatrixStats.grandisDungeonCompleted.join(', ')}`
                        : 'Not Completed'
                    }}
                </div> -->
                <div class="completion-row vi-matrix-completion">
                    <div
                        v-for="idx in 2"
                        :key="viMatrixStats.grandisDungeonCompleted[idx - 1] || idx"
                        class="completion-status"
                        :class="{ completed: viMatrixStats.grandisDungeonCompleted[idx - 1] }"
                    >
                        {{ viMatrixStats.grandisDungeonCompleted[idx - 1] || 'Not Completed' }}
                    </div>
                </div>
            </div>

            <div class="reward-container">
                <div class="stat-container">
                    <div class="quest-block">
                        <h3>Weekly Erda (9 Sol + 90 Sol)</h3>
                        <div class="stat-value">✓</div>
                    </div>
                    <div class="stat-row">
                        <img src="/src/assets/images/quests/erdarequest.webp" alt="Fragments" class="reward-icon" />
                        <div class="reward-title">Fragments</div>
                        <div class="stat-value">{{ viMatrixStats.totalFragments }}</div>
                    </div>
                </div>
                <div class="stat-container">
                    <div class="quest-block">
                        <h3>Erda's Request (Energy)</h3>
                        <div class="stat-value">{{ viMatrixStats.energyCompleted }}/{{
                            viMatrixStats.activeEnergyCharacters }}
                        </div>
                    </div>
                    <div class="stat-row">
                        <img src="/src/assets/images/quests/erdaenergy.webp" alt="Energy" class="reward-icon" />
                        <div class="reward-title">Energy</div>
                        <div class="stat-value">{{ viMatrixStats.totalEnergy }}</div>
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

.stat-value {
    font-size: 1.2em;
    font-weight: bold;
    min-width: 80px;
    text-align: right;
}

.active-chars {
    font-size: 0.9em;
    opacity: 0.8;
}

.completion-status {
    font-weight: bold;
    padding: 0.4em 0.8em;
    border-radius: 4px;
    margin: 8px;
    border: solid 1px rgba(231, 221, 238, 0.103);
    background: rgba(235, 230, 230, 0.418);
    /* background: linear-gradient(102deg, #b95bf767 -6.39%, #7b74df8f 110.52%); */
    min-width: 120px;
    text-align: center;
}

.completion-status.completed {

    border: solid 1px rgba(206, 153, 241, 0.103);
    background: linear-gradient(102deg, #b95bf767 -6.39%, #7b74df8f 110.52%);

}

.vi-matrix-completion {
    display: flex;
    gap: 8px;
    justify-content: flex-start;
    flex-direction: row;
}
</style>