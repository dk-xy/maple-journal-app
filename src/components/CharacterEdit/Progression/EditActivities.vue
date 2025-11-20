<template>
    <div :class="class">
        <div class="item-image">
            <img :src="props.image" v-if="props.image" alt="">
        </div>
        <label :for="id">{{ label }}</label>
        <input :id="id" :checked="modelValue" type="checkbox" @change="updateValue" />
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: false
    },
    modelValue: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: false
    }


})

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
    emit('update:modelValue', event.target.checked)
}


</script>

<style scoped>
/* Add any custom styles here */

.Symbol {
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    border: solid 0.5px #ffffffaf;
    /* very light box shadow */
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.09);
}

.Symbol label {
    min-width: 130px;
}

.Activity {
    display: flex;
    min-height: 48px;
    max-height: 86px;
    padding: 4px 8px;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    background-color: var(--elev-1);
}
</style>