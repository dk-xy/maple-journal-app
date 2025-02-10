<script setup>
import { ref } from 'vue'
import { getCharacters } from '../localStorageService'
import VIMatrixCard from '../components/Dashboard/VIMatrixCard.vue'

const characters = ref(getCharacters())
</script>

<template>
    <div class="dashboard-container">
        <h1>Dashboard</h1>
        <VIMatrixCard :characters="characters" />
    </div>
</template>

<style scoped>
.dashboard-container {
    padding: 1em;
    width: 100%;
}
</style>