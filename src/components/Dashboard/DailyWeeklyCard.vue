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
        if (mpQuest?.isActive) {
            stats.monsterPark.activeCharacters++
            if (mpQuest?.CompletionStatus) stats.monsterPark.mpCompleted++
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
        },
        monsterPark: {
            mpeCompleted: 0,
            activeCharacters: 0
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

        // Monster Park Extreme
        const mpeQuest = character.Progression.Weeklies.WeeklyActivity.find(
            activity => activity.key === 'mpe'
        )
        if (mpeQuest?.isActive) {
            stats.monsterPark.activeCharacters++
            if (mpeQuest?.CompletionStatus) stats.monsterPark.mpeCompleted++
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
                <div class="stat-block dailies">
                    <h3>Maple World</h3>
                    <!-- <h3>Monster Park</h3> -->
                    <div class="sub-stats dailies">
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/mp.webp" alt="MP" class="quest-icon" />
                            <span>Monster Park</span>
                            <div class="stat-value">{{ dailyStats.monsterPark.mpCompleted }}/{{
                                dailyStats.monsterPark.activeCharacters }}</div>
                        </div>
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
                    <h3>Maple World</h3>
                    <div class="sub-stats weekly">
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/mpe.webp" alt="MPE" class="quest-icon" />
                            <span>MPE</span>
                            <div class="stat-value">{{ weeklyStats.monsterPark.mpeCompleted }}/{{
                                weeklyStats.monsterPark.activeCharacters }}</div>
                        </div>
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/mulungdojo.webp" alt="Dojo" class="quest-icon" />
                            <span>Dojo</span>
                            <div class="stat-value">{{ weeklyStats.dojo.completed }}/{{ weeklyStats.dojo.activeChars }}
                            </div>
                        </div>
                        <div class="stat-row">
                            <img src="/src/assets/images/quests/haven.webp" alt="Haven" class="quest-icon" />
                            <span>Haven</span>
                            <div class="stat-value">{{ weeklyStats.absolab.havenCompleted }}/{{
                                weeklyStats.absolab.activeChars }}</div>
                        </div>
                         <div class="stat-row">
                            <img src="/src/assets/images/quests/darkworldtree.webp" alt="DWT" class="quest-icon" />
                            <span>Dark World Tree</span>
                            <div class="stat-value">{{ weeklyStats.absolab.dwtCompleted }}/{{
                                weeklyStats.absolab.activeChars }}</div>
                        </div>

                    </div>
                </div>

                <div class="stat-block">
                    <h3>Guild Activities</h3>
                    <div class="sub-stats guild">
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
    flex-direction: column;
    padding: 8px;
    align-items: flex-start;
    gap: 16px;
    border-radius: 6px;
    /* background: var(--elev-1-a); */
    margin: 8px;
    width: 100%;
}

.dashboard-activites-section {
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.50);
    background: var(--elev-1-a);
    /* background: #F5D9BE; */
        width: 100%;
}

.dashboard-activites-section .stat-row {
    border-radius: 8px;
    background: var(--elev-2, #E9C7AE);
}





section {
    margin-bottom: 1.5em;
}

section:last-child {
    margin-bottom: 0;
}

h2 {
    margin: 0;
    padding: 8px 16px;
    text-align: left;
    font-size: 1.2em;
    font-weight: 700;
    color: var(--dark-text);
}

.stats-grid {
    display: grid;
    /* grid-template-rows: repeat(auto-fit, minmax(250px, 1fr)); */
    gap: 1em;
    height: fit-content;
}

.stat-block {
    /* background: rgba(255, 255, 255, 0.1); */
    background-color: #f0d3b8;
    padding: 1em;
    border-radius: 6px;
    border: solid 1px rgba(255, 255, 255, 0.3);
    margin: 8px 16px;
    height: fit-content;
}

.stat-block h3 {
    margin: 0 0 0.8em 0;
    font-size: 1em;
    font-weight: 500;
}

.stat-block.dailies .sub-stats {
 display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
}

.stat-block.dailies .sub-stats h3 {
    width: 100%;
}

.sub-stats {
    display: flex;
    flex-direction: column;
    gap: 0.6em;
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

.sub-stats.guild {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

}

.stat-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    padding: 4px 8px;
    margin: 2px 4px;
    border: solid 1px var(--elev-1);
    border-radius: 9px;
    background: rgba(235, 230, 230, 0.418);
    width: 10%;
}

h3 {
    text-align: left;
    font-weight: 600 !important;
}
</style>