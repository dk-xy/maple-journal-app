<template>
    <div class="card">
      <h3>{{ character.Name }}</h3>
      <p>Class: {{ character.Class }}</p>
      <p>Level: {{ character.Level }}</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    character: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .card {
    background-color: #ffeccd;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1em;
    margin: 1em 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  h3 {
    margin: 0 0 0.5em 0;
  }
  p {
    margin: 0.5em 0;
  }
  </style>