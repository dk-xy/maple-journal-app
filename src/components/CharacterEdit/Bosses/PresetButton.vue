<template>
    <button @click="$emit('click')" class="preset-button">
      <div class="preset-name">{{ config.name }}</div>
      <div class="preset-tooltip">{{ config.tooltip }}</div>
    </button>
  </template>
  
  <script setup>
  defineProps({
    config: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['click'])
  </script>
  
  <style scoped>
  .preset-button {
    position: relative;
    padding: 0.5em 1em;
    background: var(--elev-2);
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .preset-button:hover .preset-tooltip {
    display: block;
  }
  
  .preset-tooltip {
    display: none;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--elev-1);
    padding: 0.5em;
    border-radius: 4px;
    white-space: nowrap;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 0.5em;
    z-index: 1;
    font-size: 0.8em;
  }
  </style>