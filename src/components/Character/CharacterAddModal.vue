<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2>Add Character</h2>
      <form @submit.prevent="handleAddCharacter">
        <div class="form-fields">
          <div class="form-field form-field-text">
            <label for="name">Name</label>
            <input id="name" v-model="characterName" required />
          </div>
          <div class="form-field form-field-select">
            <label for="class">Class</label>
            <select id="class" v-model="characterClass" required>
              <optgroup label="Explorer">
                <option>Dark Knight</option>
                <option>Hero</option>
                <option>Paladin</option>

                <option>Fire/Poison Mage</option>
                <option>Ice/Lightning Mage</option>
                <option>Bishop</option>

                <option>Bowmaster</option>
                <option>Marksman</option>

                <option>Shadower</option>
                <option>Night Lord</option>
                <option>Dual Blade</option>

                <option>Buccaneer</option>
                <option>Pirate</option>
              </optgroup>

              <optgroup label="Cygnus Knights">
                <option>Dawn Warrior</option>
                <option>Blaze Wizard</option>
                <option>Wind Archer</option>
                <option>Night Walker</option>
                <option>Thunder Breaker</option>
              </optgroup>


              <optgroup label="Resistance">
                <option>Battle Mage</option>
                <option>Wild Hunter</option>
                <option>Mechanic</option>
                <option>Demon Slayer</option>
                <option>Demon Avenger</option>
                <option>Xenon</option>
              </optgroup>

              <optgroup label="Heroes">
                <option>Aran</option>
                <option>Evan</option>
                <option>Mercedes</option>
                <option>Phantom</option>
                <option>Luminous</option>
                <option>Shade</option>
              </optgroup>



              <optgroup label="Nova">
                <option>Angelic Buster</option>
                <option>Kaiser</option>
                <option>Cadena</option>
                <option>Kain</option>
              </optgroup>

              <optgroup label="Sengoku">
                <option>Kanna</option>
                <option>Hayato</option>
              </optgroup>

              <optgroup label="Flora">
                <option>Adele</option>
                <option>Ark</option>
                <option>Illium</option>
                <option>Khali</option>
              </optgroup>

              <optgroup label="Anima">
                <option>Lara</option>
                <option>Hoyoung</option>
              </optgroup>
              <!-- Add more families and classes as needed -->
            </select>
          </div>
          <div class="form-field form-field-number">
            <label for="level">Level</label>
            <input id="level" type="number" v-model="characterLevel" min="1" max="350" required />
          </div>

          <div class="form-button-container">
            <button class="form-button-close" @click="close">Cancel</button>
            <button class="form-button-add" type="submit">Add</button>
          </div>
        </div>

      </form>

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
  z-index: 200;
}

.modal {
  background: var(--elev-0);
  padding: 2em;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

button {
  margin-top: 1em;
}

.form-fields{
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.form-field {
  display: flex;
  flex-direction: column;
  justify-content: left;

}

.form-field label {
  text-align: left;
  font-size: 0.8em;
  color: var(--dark-text);
}

.form-field input,
.form-field select {
  padding: 0.5em;
  margin-top: 0.5em;
  border-radius: 4px;
  border: solid 1px transparent;
  background-color: var(--elev-2);
  color: var(--dark-text);
}


.form-button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.form-button-close {
  background-color: transparent;
  color: var(--dark-text);
  border: 0px;
  /* border-bottom: solid 1px var(--dark-brown); */
  padding: 0.5em 1em;
  border-radius: 0px;
}

.form-button-add {
  background-color: var(--blue-accent);
  color: #fff;
  border: 0px;
  padding: 0.5em 1em;
  border-radius: 4px;
}

.form-button-add:hover {
  background-color: var(--blue-accent-deep);
}

/* input focus */
input:focus,
select:focus {
  outline: none;
  border: 1px solid var(--dark-brown);
  border-style: inset;

}

/* NUMBER INPUT */

input[type=number] { 
    -moz-appearance: textfield;
    appearance: textfield;
    background-color: var(--elev-2);
    color: var(--dark-text);
}

input[type=number]::-webkit-inner-spin-button {
  background-color: var(--dark-text);
}
</style>