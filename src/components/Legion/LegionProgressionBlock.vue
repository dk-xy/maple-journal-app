<template>
    <div class="progression-block">
      <h4>{{ title }}</h4>
      <p>{{ completed }} / {{ total }} completed</p>
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
    background-color: #ffeccd;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1em;
    margin: 1em 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  h4 {
    margin: 0 0 0.5em 0;
  }
  p {
    margin: 0.5em 0;
  }
  </style>