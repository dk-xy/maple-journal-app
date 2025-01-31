<template>
    <!-- ARCANE RIVER -->
    <div :class="'progression-item__symbols ' + item.RegionName" v-if="type === 'region' && code === 'arcaneRiver'">
        {{ item.RegionName }}
        <div class="completion_container">
            <div class="progression-item__symbols__completion">
                <div>Daily</div>
                <input type="checkbox" v-model="item.RegionDailyCompletion" @change="saveProgression" />
            </div>
            <div class="progression-item__symbols__completion">
                <div>
                    Weekly
                </div>
                <input type="checkbox" v-model="item.RegionWeeklyCompletion" @change="saveProgression" />

            </div>
        </div>
    </div>

    <!-- GRANDIS -->
    <div :class="'progression-item__symbols ' + item.RegionName" v-else-if="type === 'region' && code === 'grandis'">
        {{ item.RegionName }}:
        <div class="completion_container">
            <div class="progression-item__symbols__completion">
                <div>Daily</div>
                    
                    <input type="checkbox" v-model="item.RegionDailyCompletion" @change="saveProgression" />
              
            </div>
        </div>
    </div>

    <!-- DAILIES -->
    <div class="progression-item__activity" v-else-if="type === 'daily'">
        {{ item.Name }}
        <input type="checkbox" v-model="item.CompletionStatus" @change="saveProgression" />
    </div>

    <!-- WEEKLIES -->
    <div class="progression-item__activity" v-else-if="type === 'weekly'">
        {{ item.Name }}
        <input type="checkbox" v-model="item.CompletionStatus" @change="saveProgression" />
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
        required: true
    },
    saveProgression: {
        type: Function,
        required: true
    }
})
</script>

<style scoped>
/* .progression-item {
    margin-bottom: 1em;
} */


.progression-item__symbols {
    display: flex;
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    justify-content: flex-start;
    max-width: 300px;
}

.completion_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
}



.progression-item {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
}

.progression-item__symbols__completion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    width: 80%;
    border-radius: 6px;
    border: 1px solid rgba(228, 228, 228, 0.67);
    background: linear-gradient(0deg, rgba(45, 45, 45, 0.10) 0%, rgba(45, 45, 45, 0.10) 100%), linear-gradient(124deg, rgba(255, 255, 255, 0.49) 30.91%, rgba(255, 255, 255, 0.55) 97.62%);

    padding: 4px 8px;
}




/* ACTIVITY */

.progression-item__activity{
    display: flex;
height: 46px;
padding: 4px 8px;
justify-content: center;
align-items: center;
gap: 16px;

border-radius: 8px;
border: 1px solid var(--lIGHTgRADIENT, #FFD9B4);
background: var(--elev-2);
box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.15);
}
</style>