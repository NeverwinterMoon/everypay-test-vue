<script setup>
import {ref, watch} from "vue"

const isDisabled = ref(false)

const emit = defineEmits(['submit-answer'])

const props = defineProps({
  question: {
    type:     String,
    required: true
  },
  options:  {
    type:     Array,
    required: true
  }
})

watch(props, () => {
  isDisabled.value = false
}, { immediate: true })

const submitAnswer = (answer) => {
  isDisabled.value = true

  emit('submit-answer', answer)
}

</script>

<template>
  <div>
    <div class="px-4 py-4 font-bold">
      {{ props.question }}
    </div>

    <ul class="space-y-2">
      <li
          v-for="answer of props.options"
          :key="answer"
      >
        <button
            class="px-4 py-4 bg-emerald-100 hover:bg-emerald-700 hover:text-white rounded-lg enabled:cursor-pointer w-full disabled:bg-gray-500 disabled:text-white"
            :disabled="isDisabled"
            @click="submitAnswer(answer)"
        >
          {{ answer }}
        </button>
      </li>
    </ul>
  </div>
</template>
