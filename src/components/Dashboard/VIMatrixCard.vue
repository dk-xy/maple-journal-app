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
        grandisDungeonCompleted: false,
        activeFragmentCharacters: 0,
        activeEnergyCharacters: 0
    }

    props.characters.forEach(character => {
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

        const grandisDungeon = character.Progression.Weeklies.WeeklyActivity.find(
            activity => activity.key === 'grandisdungeon'
        )
        if (grandisDungeon?.isActive && grandisDungeon?.CompletionStatus) {
            stats.grandisDungeonCompleted = true
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
                <h3>Erda's Request</h3>
                <div class="stat-value">{{ viMatrixStats.fragmentsCompleted }}/7</div>
            </div>

            <div class="stat-block">
                <h3>Erda's Request (Energy)</h3>
                <div class="stat-value">{{ viMatrixStats.energyCompleted }}/{{ viMatrixStats.activeEnergyCharacters }}</div>
            </div>

            <div class="stat-block">
                <h3>Grandis Dungeon</h3>
                <div class="completion-status" :class="{ completed: viMatrixStats.grandisDungeonCompleted }">
                    {{ viMatrixStats.grandisDungeonCompleted ? 'Completed' : 'Not Completed' }}
                </div>
            </div>

            <div class="reward-container">
                <div class="stat-row">
                    <img src="/src/assets/images/quests/erdarequest.webp" alt="Fragments" class="reward-icon" />
                    <div class="reward-title">Fragments</div>
                    <div class="stat-value">{{ viMatrixStats.totalFragments }}</div>
                </div>

                <div class="stat-row">
                    <img src="/src/assets/images/quests/erdaenergy.webp" alt="Energy" class="reward-icon" />
                    <div class="reward-title">Energy</div>
                    <div class="stat-value">{{ viMatrixStats.totalEnergy }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.vi-matrix {
    display: grid;
    grid-template-columns: 1fr 2fr;
}

.vi-matrix .card-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
}

.dashboard-card {
    border-radius: 6px;
    background: linear-gradient(102deg, #97B5F5 -6.39%, #ACA7F4 110.52%);
    padding: 1.5em;
    margin-bottom: 1em;
    color: white;
}

.stats-container {
    display: flex;
    flex-direction: column;
    gap: 0.6em;
}

.stat-block {
    display: grid;
    grid-template-columns: 3fr 1fr;
    text-align: left;
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
    background: rgba(255, 59, 59, 0.3);
    min-width: 120px;
    text-align: center;
}

.completion-status.completed {
    background: rgba(72, 199, 116, 0.3);
}
</style>