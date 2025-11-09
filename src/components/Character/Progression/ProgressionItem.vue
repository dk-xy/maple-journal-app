<template>
    <!-- ARCANE RIVER -->
    <div :class="'progression-item__symbols ' + item.RegionName" v-if="type === 'region' && code === 'arcaneRiver'">
        <img :src="getSymbolImageSrc(item.key)" :alt="item.RegionName" class="progression-item__background-image" />
        {{ item.RegionName }}
        <div class="completion_container">
            <div class="progression-item__symbols__completion">
                <div>Daily</div>
                <input type="checkbox" v-model="item.RegionDailyCompletion" @change="saveProgression('RegionDailyCompletion')" />
            </div>
            <div class="progression-item__symbols__completion">
                <div>Weekly</div>
                <input type="checkbox" v-model="item.RegionWeeklyCompletion" @change="saveProgression('RegionWeeklyCompletion')" />
            </div>
        </div>
    </div>

    <!-- GRANDIS -->
    <div :class="'progression-item__symbols ' + item.RegionName" v-else-if="type === 'region' && code === 'grandis'">
        <img :src="getSymbolImageSrc(item.key)" :alt="item.RegionName" class="progression-item__background-image" />
        {{ item.RegionName }}
        <div class="completion_container">
            <div class="progression-item__symbols__completion">
                <div>Daily</div>
                <input type="checkbox" v-model="item.RegionDailyCompletion" @change="saveProgression('RegionDailyCompletion')" />
            </div>
        </div>
    </div>

    <!-- DAILIES -->
    <div class="progression-item__activity" v-else-if="type === 'daily'">
        <img :src="getImageSrc(item.key)" :alt="item.Name" class="progression-item__image" />
        <div class="progression-item-name">
            {{ item.Name }}
        </div>
        <input type="checkbox" v-model="item.CompletionStatus" @change="saveProgression('CompletionStatus')" />
    </div>

    <!-- WEEKLIES -->
    <div class="progression-item__activity" v-else-if="type === 'weekly'">
        <img :src="getImageSrc(item.key)" :alt="item.Name" class="progression-item__image" />
        <div class="progression-item-name">
            {{ item.Name }}
        </div>
        <input type="checkbox" v-model="item.CompletionStatus" @change="saveProgression('CompletionStatus')" />
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: false
    }
})

const emit = defineEmits(['saveProgression'])


function saveProgression(completionKey) {
    // Ensure the relevant completion flag was toggled before deciding date logic.
    // For region items we need to consider both daily and weekly flags.
    const now = new Date().toISOString()

    if (props.type === 'region') {
        // If any region completion flag is true, set a shared CompletionDate, otherwise clear it.
        if (props.item.RegionDailyCompletion || props.item.RegionWeeklyCompletion) {
            props.item.CompletionDate = now
        } else {
            props.item.CompletionDate = ''
        }
    } else {
        // Activities (daily/weekly) use CompletionStatus
        if (props.item.CompletionStatus) {
            props.item.CompletionDate = now
        } else {
            props.item.CompletionDate = ''
        }
    }

    // Emit the event to the parent component so it persists the change
    emit('saveProgression')
}

function getImageSrc(key) {
    return key === 'grandisdungeon' 
        ? `/src/assets/images/quests/${key}.png` 
        : `/src/assets/images/quests/${key}.webp`
}

function getSymbolImageSrc(key) {
    return `/src/assets/images/symbols/${key}.webp`
}
</script>

<style scoped>
.progression-item__symbols {
    position: relative;
    display: flex;
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    justify-content: flex-start;
    max-width: 300px;
    overflow: hidden;
    border-radius: 4px;
}


.progression-item__activity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    line-height: 99%;
    gap: 8px;
    background-color: var(--elev-2);
    padding: 16px 8px;
    border-radius: 8px;
    min-width: 200px;
}

.progression-item__image {
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 4px;
}

.progression-item-name{
    min-width: 100px;
}

.completion_container{
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 8px;

}

.progression-item__symbols__completion {
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    text-align: left;

   


    border-radius: 6px;
    /* border: 1px solid rgba(228, 228, 228, 0.67); */
    background: linear-gradient(0deg, rgba(218, 218, 218, 0.411) 0%, rgba(153, 153, 153, 0.247) 100%), linear-gradient(124deg, rgba(255, 255, 255, 0.49) 30.91%, rgba(255, 255, 255, 0.664) 97.62%);
    border: #ffffff7e 1px solid;
    padding: 4px 8px;

    border-radius: 8px;

}


.progression-item__background-image {
    position: absolute;
    top: 0;
    right: -15px;
    width: 45px;
    height:auto;
    object-fit: contain;
    opacity: 0.2;
    z-index: 1;
}
</style>