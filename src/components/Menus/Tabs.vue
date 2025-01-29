<template>
    <div>
        <div class="tabs">
            <button v-for="tab in tabs" :key="tab" :class="{ active: tab === selectedTab }" @click="selectTab(tab)">
                {{ tab }}
            </button>
        </div>
        <div class="tab-content">
            <slot :name="selectedTab"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    },
    initialTab: {
        type: String,
        default: ''
    }
})

const selectedTab = ref(props.initialTab || props.tabs[0])

function selectTab(tab) {
    selectedTab.value = tab
}
</script>

<style scoped>
.tabs {
    display: inline-flex;
    align-items: flex-start;
    gap: 32px;

}

.tabs button {
    padding: 0.5em 1em;
    cursor: pointer;
    border: none;
    background: none;
    outline: none;
    font-weight: bold;
    color: #6E4732 !important;

    /* H4 */

    font-size: 23.04px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    border-radius: 0%;
}

.tabs button.active {
    border-bottom: 2px solid #6E4732;

}

.tab-content {
    padding: 1em 0;

}
</style>