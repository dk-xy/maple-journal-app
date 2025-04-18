<script setup>
import { computed } from 'vue'

const props = defineProps({
    characters: {
        type: Array,
        required: true
    }
})

const dailyStats = computed(() => {
    let stats = {
        monsterPark: {
            mpCompleted: 0,
            mpeCompleted: 0,
            activeCharacters: 0
        },
        soloContent: {
            ursusCompleted: 0,
            activeUrsusChars: 0
        },
        multiContent: {
            golluxCompleted: 0,
            activeGolluxChars: 0
        }
    }

    props.characters.forEach(character => {
        // Monster Park Stats
        const mpQuest = character.Progression.Dailies.DailyActivity.find(
            activity => activity.key === 'mp'
        )
        const mpeQuest = character.Progression.Dailies.DailyActivity.find(
            activity => activity.key === 'mpe'
        )
        if (mpQuest?.isActive || mpeQuest?.isActive) {
            stats.monsterPark.activeCharacters++
            if (mpQuest?.CompletionStatus) stats.monsterPark.mpCompleted++
            if (mpeQuest?.CompletionStatus) stats.monsterPark.mpeCompleted++
        }

        // Ursus Stats
        const ursusQuest = character.Progression.Dailies.DailyActivity.find(
            activity => activity.key === 'ursus'
        )
        if (ursusQuest?.isActive) {
            stats.soloContent.activeUrsusChars++
            if (ursusQuest.CompletionStatus) stats.soloContent.ursusCompleted++
        }

        // Gollux Stats
        const golluxQuest = character.Progression.Dailies.DailyActivity.find(
            activity => activity.key === 'gollux'
        )
        if (golluxQuest?.isActive) {
            stats.multiContent.activeGolluxChars++
            if (golluxQuest.CompletionStatus) stats.multiContent.golluxCompleted++
        }
    })

    return stats
})

const weeklyStats = computed(() => {
    let stats = {
        dojo: {
            completed: 0,
            activeChars: 0
        },
        absolab: {
            dwtCompleted: 0,
            havenCompleted: 0,
            activeChars: 0
        },
        guild: {
            culvertCompleted: 0,
            flagraceCompleted: 0,
            activeChars: 0
        }
    }

    props.characters.forEach(character => {
        // Mu Lung Dojo
        const dojoQuest = character.Progression.Weeklies.WeeklyActivity.find(
            activity => activity.key === 'mulungdojo'
        )
        if (dojoQuest?.isActive) {
            stats.dojo.activeChars++
            if (dojoQuest.CompletionStatus) stats.dojo.completed++
        }

        // Absolab Materials
        const dwtQuest = character.Progression.Weeklies.WeeklyActivity.find(
            activity => activity.key === 'darkworldtree'
        )
        const havenQuest = character.Progression.Weeklies.WeeklyActivity.find(
            activity => activity.key === 'haven'
        )
        if (dwtQuest?.isActive || havenQuest?.isActive) {
            stats.absolab.activeChars++
            if (dwtQuest?.CompletionStatus) stats.absolab.dwtCompleted++
            if (havenQuest?.CompletionStatus) stats.absolab.havenCompleted++
        }

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
    <div class="dashboard-card activities">
        <section class="dashboard-activites-section daily-section">
            <h2>Daily Activities</h2>
            <div class="stats-grid">
                <div class="stat-block monster-park">
                    <h3>Monster Park</h3>
                    <div class="sub-stats">
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/mp.webp" alt="MP" class="quest-icon" />
                            <span>Regular</span>
                            <div class="stat-value">{{ dailyStats.monsterPark.mpCompleted }}/{{
                                dailyStats.monsterPark.activeCharacters }}</div>
                        </div>
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/mpe.webp" alt="MPE" class="quest-icon" />
                            <span>Extreme</span>
                            <div class="stat-value">{{ dailyStats.monsterPark.mpeCompleted }}/{{
                                dailyStats.monsterPark.activeCharacters }}</div>
                        </div>
                    </div>
                </div>

                <div class="stat-block boss-content">
                    <h3>Boss Content</h3>
                    <div class="sub-stats">
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/ursus.webp" alt="Ursus" class="quest-icon" />
                            <span>Ursus</span>
                            <div class="stat-value">{{ dailyStats.soloContent.ursusCompleted }}/{{
                                dailyStats.soloContent.activeUrsusChars }}</div>
                        </div>
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/gollux.webp" alt="Gollux" class="quest-icon" />
                            <span>Gollux</span>
                            <div class="stat-value">{{ dailyStats.multiContent.golluxCompleted }}/{{
                                dailyStats.multiContent.activeGolluxChars }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="dashboard-activites-section weekly-section">
            <h2>Weekly Activities</h2>
            <div class="stats-grid">
                <div class="stat-block">
                    <h3>Mu Lung Dojo</h3>
                    <div class="stat-row">
                        <img src="/src/assets/images/quests/mulungdojo.webp" alt="Dojo" class="quest-icon" />
                        <div class="stat-value">{{ weeklyStats.dojo.completed }}/{{ weeklyStats.dojo.activeChars }}
                        </div>
                    </div>
                </div>

                <div class="stat-block">
                    <h3>Absolab Materials</h3>
                    <div class="sub-stats">
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/darkworldtree.webp" alt="DWT" class="quest-icon" />
                            <span>Dark World Tree</span>
                            <div class="stat-value">{{ weeklyStats.absolab.dwtCompleted }}/{{
                                weeklyStats.absolab.activeChars }}</div>
                        </div>
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/haven.webp" alt="Haven" class="quest-icon" />
                            <span>Haven</span>
                            <div class="stat-value">{{ weeklyStats.absolab.havenCompleted }}/{{
                                weeklyStats.absolab.activeChars }}</div>
                        </div>
                    </div>
                </div>

                <div class="stat-block">
                    <h3>Guild Activities</h3>
                    <div class="sub-stats">
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/culvert.png" alt="Culvert" class="quest-icon" />
                            <span>Culvert</span>
                            <div class="stat-value">{{ weeklyStats.guild.culvertCompleted }}/{{
                                weeklyStats.guild.activeChars }}</div>
                        </div>
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/flagrace.png" alt="Flag Race" class="quest-icon" />
                            <span>Flag Race</span>
                            <div class="stat-value">{{ weeklyStats.guild.flagraceCompleted }}/{{
                                weeklyStats.guild.activeChars }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.dashboard-card.activities {
    /* background: linear-gradient(102deg, #F4C183 -6.39%, #F4A183 110.52%);
    border-radius: 6px;
    padding: 1.5em;
    margin-bottom: 1em;
    color: white; */
    display: flex;
    padding: 8px;
    align-items: flex-start;
    gap: 16px;
    border-radius: 6px;
    background: var(--elev-1-a);
}

.dashboard-activites-section{
    border-radius: 8px;
border: 1px solid rgba(255, 255, 255, 0.50);
/* background: var(--elev-1); */
background: #F5D9BE;
}

.dashboard-activites-section .stat-row{
    border-radius: 8px;
    background: var(--elev-2, #E9C7AE);
}

.weekly-section .stats-grid{
display: grid;

grid-template-columns: repeat(2, auto);
}

.weekly-section .stats-grid{
    display: grid;
    grid-template-rows: repeat(2, auto);
}


section {
    margin-bottom: 1.5em;
}

section:last-child {
    margin-bottom: 0;
}

h2 {
    font-size: 1.5em;
    margin: 0 0 1em 0;
    font-weight: 500;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1em;
}

.stat-block {
    background: rgba(255, 255, 255, 0.1);
    padding: 1em;
    border-radius: 6px;
}

.stat-block h3 {
    margin: 0 0 0.8em 0;
    font-size: 1em;
    font-weight: 500;
}

.sub-stats {
    display: flex;
    flex-direction: column;
    gap: 0.6em;
}

.stat-row {
    display: flex;
    align-items: center;
    gap: 0.8em;
    padding: 0.4em;
    background: rgba(255, 255, 255, 0.1);
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
}
</style>