<template>
    <div v-if="iconComponent" class="icon" v-html="iconComponent"></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
    iconName: {
        type: String,
        required: true
    }
})

const iconComponent = ref(null)

watchEffect(async () => {
    if (props.iconName) {
        try {
            const icon = await import(`../assets/icons/${props.iconName}.svg?raw`)
            iconComponent.value = icon.default
        } catch (e) {
            console.error(`Icon "${props.iconName}" not found.`)
            iconComponent.value = null
        }
    }
})
</script>

<style scoped>
.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 2px;
    margin: auto;

}

.icon svg {
    width: 100%;
    /* Ensure the SVG takes the full width of the container */
    height: 100%;
    /* Ensure the SVG takes the full height of the container */
}

/* select .icon svg */
</style>