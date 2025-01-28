<script setup>
import { ref } from 'vue'
import CharacterAddModal from '../components/Character/CharacterAddModal.vue'

const showModal = ref(false)
</script>

<template>
  <div>
    <h1>Legion</h1>
    <button @click="showModal = true">Add Character</button>
    <CharacterAddModal :show="showModal" @close="showModal = false" />
  </div>
</template>

<style scoped>
button {
  padding: 0.5em 1em;
  background-color: #ffeccd;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background-color: #ffd7a8;
}
</style>