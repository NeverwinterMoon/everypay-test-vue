<script setup>
import ButtonComponent from "@/component/ButtonComponent.vue"

const emit = defineEmits(['restart-quiz'])

const props = defineProps({
  score:    {
    type:     Number,
    required: true
  },
  maxScore: {
    type:     Number,
    required: true
  }
})

const resetQuiz = () => {
  emit('restart-quiz')
}
</script>


<template>
  <h1 class="text-4xl mt-4">
    The results are in!
  </h1>

  <div class="py-4">
    <div>
      Your score: <span class="font-bold">{{ props.score }}</span>
    </div>
    <div>
      Maximum score: <span class="font-bold">{{ props.maxScore }}</span>
    </div>
  </div>

  <ButtonComponent @click="resetQuiz">
    Restart the quiz
  </ButtonComponent>
</template>
