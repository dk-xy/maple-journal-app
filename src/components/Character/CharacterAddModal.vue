<template>
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal">
        <h2>Add Character</h2>
        <form @submit.prevent="handleAddCharacter">
          <div>
            <label for="name">Name:</label>
            <input id="name" v-model="characterName" required />
          </div>
          <div>
            <label for="class">Class:</label>
            <select id="class" v-model="characterClass" required>
              <option v-for="cls in classes" :key="cls" :value="cls">{{ cls }}</option>
            </select>
          </div>
          <div>
            <label for="level">Level:</label>
            <input id="level" type="number" v-model="characterLevel" min="1" max="300" required />
          </div>
          <button type="submit">Add</button>
        </form>
        <button @click="close">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { addCharacter } from '../../localStorageService'
  import { emptyCharacter } from '../../dataStructure'
  
  const props = defineProps({
    show: Boolean
  })
  
  const emit = defineEmits(['close'])
  
  const characterName = ref('')
  const characterClass = ref('')
  const characterLevel = ref(1)
  
  const classes = [
    'Warrior', 'Mage', 'Archer', 'Thief', 'Pirate', // Add all MapleStory classes here
  ]
  
  function handleAddCharacter() {
    const newCharacter = { ...emptyCharacter }
    newCharacter.Name = characterName.value
    newCharacter.Class = characterClass.value
    newCharacter.Level = characterLevel.value
  
    addCharacter(newCharacter)
    resetForm()
    emit('close')
    alert('Character added!')
  }
  
  function resetForm() {
    characterName.value = ''
    characterClass.value = ''
    characterLevel.value = 1
  }
  
  function close() {
    resetForm()
    emit('close')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: white;
    padding: 2em;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
  }
  button {
    margin-top: 1em;
  }
  </style>