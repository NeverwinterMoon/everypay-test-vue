<script setup>
import {computed} from "vue"

const props = defineProps({
  correctAnswer: {
    type:     String,
    required: true
  },
  score:         {
    type:     Number,
    required: true
  },
  weight:        {
    type:     Number,
    required: true
  }
})

const pointText = computed(() => {
  return props.score === 1 ? 'point' : 'points';
})
</script>

<template>
  <div>
    <span class="text-green-500">The answer <span class="font-bold">{{ props.correctAnswer }}</span> was correct</span>!
    You got <span class="font-bold">{{ props.weight }}</span> {{ pointText }}, totalling to <span
      class="font-bold">{{ props.score }}.</span>
  </div>
</template>
