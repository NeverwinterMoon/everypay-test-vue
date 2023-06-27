<script setup>
import QuestionComponent from '@/component/QuestionComponent.vue'
import ButtonComponent from '@/component/ButtonComponent.vue'
import ResultsComponent from '@/component/ResultsComponent.vue'
import useQuiz from '@/composable/useQuiz'
import AnswerCorrectComponent from "@/component/AnswerCorrectComponent.vue"

const {
  currentQuestion,
  isHintEnabled,
  life,
  resetData,
  showStats,
  showNextQuestion,
  score,
  stats,
  timer,
  useHint,
  validateAnswer,
  validatedAnswer
} = useQuiz()
</script>

<template>
  <div class="container mx-auto px-2 max-w-screen-sm">
    <div v-if="stats == null">
      <QuestionComponent
          :is-disabled="validatedAnswer !== null"
          v-bind="currentQuestion"
          @submit-answer="validateAnswer"
      />

      <div
          v-if="validatedAnswer === null"
          class="p-4 flex justify-center"
      >
        Time left to answer: {{ timer }}
      </div>

      <div v-if="validatedAnswer !== null"
           class="p-4"
      >
        <div v-if="validatedAnswer?.isAnswerValid === true">
          <AnswerCorrectComponent
              :weight="validatedAnswer?.weight"
              :score="score"
              :correct-answer="validatedAnswer?.correctAnswer"
          />
        </div>
        <div v-else-if="validatedAnswer?.isAnswerValid === false">
          <span class="text-red-500">
            <span v-if="validatedAnswer?.isTimedOut === false">
              Selected answer <span class="font-bold">{{ validatedAnswer?.selectedAnswer }}</span> was incorrect</span><span v-else>Time ran out</span></span>. The correct
          answer is <span
            class="font-bold">{{ validatedAnswer?.correctAnswer }}</span>. Your total
          score remains at <span class="font-bold">{{ score }}</span>. Your total lives remain at <span
            class="font-bold">{{ life }}</span>
        </div>
      </div>

      <div
          v-else-if="!isHintEnabled"
          class="p-4"
      >
        <ButtonComponent @click="useHint()">
          Use hint
        </ButtonComponent>
      </div>

      <div
          v-if="validatedAnswer?.isGameOver === true"
          class="p-4"
      >
        <div class="text-xl font-bold py-4">
          Sadly, you ran out of lives. It's game over for now.
        </div>

        <ButtonComponent @click="showStats()">
          See results
        </ButtonComponent>
      </div>

      <ButtonComponent
          v-else-if="validatedAnswer?.isLastQuestion === false"
          @click="showNextQuestion()"
      >
        Next question
      </ButtonComponent>

      <div
          v-else-if="validatedAnswer?.isLastQuestion === true"
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
