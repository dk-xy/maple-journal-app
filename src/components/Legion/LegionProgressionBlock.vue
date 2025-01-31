<template>
    <div class="progression-block">
        <div class="progression-block__title">
            {{ title }}
        </div>
        <div class="progression-block__status">
            {{ completed }} / {{ total }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})
</script>

<style scoped>
.progression-block {
    display: flex;
    padding: 2px 8px;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 0.8em;
    border-radius: 32px;
    border: 0.5px solid #FFF;
    background: #E9C7AE;
    text-align: center;
}

h4 {
    margin: 0 0 0.5em 0;
}

p {
    margin: 0.5em 0;
}
</style>