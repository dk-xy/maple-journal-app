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
    gap: 4px;

    border-radius: 32px;
    border: 0.5px solid #FFF;
    background: #E9C7AE;
}

h4 {
    margin: 0 0 0.5em 0;
}

p {
    margin: 0.5em 0;
}
</style>