<template>
    <div 
        class="toggleable-activity"
        :class="{ 'is-active': modelValue, 'is-inactive': !modelValue }"
        @click="toggleValue"
        role="button"
        :aria-pressed="modelValue"
        tabindex="0"
        @keydown.space.prevent="toggleValue"
        @keydown.enter.prevent="toggleValue"
    >
        <div class="item-image">
            <img :src="props.image" v-if="props.image" alt="" loading="lazy" decoding="async">
        </div>
        <span class="activity-label">{{ label }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    modelValue: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

const emit = defineEmits(['update:modelValue'])

function toggleValue() {
    emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped>
.toggleable-activity {
    cursor: pointer;
    user-select: none;
    transition: all 0.15s ease-in-out;
}

/* Inactive / Deselected: greyed out like None in boss difficulties */
.toggleable-activity.is-inactive {
    opacity: 0.5;
    filter: grayscale(70%);
    background: rgba(255, 255, 255, 0.12) !important;
    border: 1px dashed rgba(255, 255, 255, 0.45) !important;
    box-shadow: none !important;
}

.toggleable-activity.is-inactive:hover {
    opacity: 0.75;
    filter: grayscale(30%);
    border-color: rgba(255, 255, 255, 0.7) !important;
}

/* Active / Selected: fully colored with active border */
.toggleable-activity.is-active {
    opacity: 1;
    filter: grayscale(0%);
    border: 1.5px solid #ffffff !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

.toggleable-activity.is-active:hover {
    transform: translateY(-1px);
}

.item-image {
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-image img {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

.activity-label {
    flex: 1;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--dark-text);
}

.Symbol {
    display: flex;
    padding: 8px 12px;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    min-height: 44px;
    box-sizing: border-box;
}

.Activity {
    display: flex;
    min-height: 48px;
    padding: 8px 12px;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    background-color: var(--elev-1);
    box-sizing: border-box;
}
</style>
