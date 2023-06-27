<script setup>
import QuestionComponent from '@/component/QuestionComponent.vue'
import ButtonComponent from '@/component/ButtonComponent.vue'
import ResultsComponent from '@/component/ResultsComponent.vue'
import useQuiz from '@/composable/useQuiz'

const {
  getCurrentQuestion,
  resetData,
  showStats,
  showNextQuestion,
  score,
  stats,
  validateAnswer,
  validatedAnswer
} = useQuiz()
</script>

<template>
  <div class="container mx-auto px-2 max-w-screen-sm">
    <div v-if="stats == null">
      <QuestionComponent
          v-bind="getCurrentQuestion()"
          @submit-answer="validateAnswer"
      />

      <div class="px-4 py-4">
        <div v-if="validatedAnswer?.isAnswerValid === true">
          <span class="text-green-500">The answer <span class="font-bold">{{ validatedAnswer?.correctAnswer }}</span> was correct</span>!
          You got <span class="font-bold">1</span> point, totalling to <span class="font-bold">{{ score }}.</span>
        </div>
        <div v-else-if="validatedAnswer?.isAnswerValid === false">
          <span class="text-red-500">Selected answer <span
              class="font-bold">{{ validatedAnswer?.selectedAnswer }}</span> was incorrect</span>. The correct
          answer is <span
            class="font-bold">{{ validatedAnswer?.correctAnswer }}</span>. Your total
          score remains at <span class="font-bold">{{ score }}.</span>
        </div>
      </div>

      <ButtonComponent
          v-if="validatedAnswer?.isLastQuestion === false"
          @click="showNextQuestion()"
      >
        Next question
      </ButtonComponent>

      <div
          v-if="validatedAnswer?.isLastQuestion === true"
          class="px-4 py-4"
      >
        <div class="text-xl font-bold py-4">
          That's it, you are all done with the quiz!
        </div>

        <ButtonComponent @click="showStats()">
          See results
        </ButtonComponent>
      </div>
    </div>

    <ResultsComponent
        v-else
        v-bind="stats"
        @restart-quiz="resetData()"
    />
  </div>
</template>
