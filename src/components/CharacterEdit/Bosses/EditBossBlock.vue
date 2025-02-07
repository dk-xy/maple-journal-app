<template>
  <div class="boss-edit-block">
    <div class="boss-edit-info">
      <h3>{{ boss.Name }}</h3>
      <div class="edit-difficulties-block">
        <DifficultySelector :difficulties="boss.Difficulty" :handleChange="handleDifficultyChange" />
      </div>
    </div>
    <div class="boss-edit-image-container">
      <img :src="`/src/assets/images/resizedBosses/${boss.key}.webp`" :alt="boss.Name" class="boss-image" />
    </div>
  </div>
</template>

<script setup>
import DifficultySelector from './DifficultySelector.vue'

const props = defineProps({
  boss: {
    type: Object,
    required: true
  },
  saveBosses: {
    type: Function,
    required: true
  }
})

function handleDifficultyChange(difficulty) {
  difficulty.isActive = !difficulty.isActive
  props.saveBosses()
}
</script>

<style scoped>
.boss-edit-block {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--elev-1, #F5D9BE);
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

/* Reserve space for the image by adding right margin */
.boss-edit-info {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 0.5em 0.5em;
  margin-right: 130px; /* Space for the fixed image */
}

.edit-difficulties-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.boss-edit-block h3 {
  text-align: left;
  margin: 0.2em;
}

/* Fixed image container positioned at right */
.boss-edit-image-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 100%;
  border-radius: 8px 0 0 8px;
  overflow: hidden;
  z-index: 1;
}

.boss-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center; /* Ensures the left side of the image is always visible */
  display: block;
}

/* Gradient overlay on the image, from right to left */
.boss-edit-image-container::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(145deg, #f5d9be 23.61%, rgba(197, 160, 125, 0) 98%);
  z-index: 2;
  pointer-events: none;
}
</style>