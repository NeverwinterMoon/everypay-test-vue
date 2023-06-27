import { ref } from 'vue'
import quizQuestions from '@/repository/questionList.json'
import quizAnswers from '@/repository/answerList.json'

export default function useQuiz() {
  const currentQuestionID = ref(0)
  const score = ref(0)
  const stats = ref(null)
  const validatedAnswer = ref(null)

  function showStats() {
    currentQuestionID.value = 0
    validatedAnswer.value = null

    const maxScore = quizQuestions.length
    stats.value = {
      score:    score.value,
      maxScore: maxScore
    }
  }

  function validateAnswer(selectedAnswer) {
    if (validatedAnswer.value !== null) return

    const question = getCurrentQuestion()
    const correctAnswer = quizAnswers.find(({ id }) => id === question.id)?.answer

    const isAnswerValid = correctAnswer === selectedAnswer
    if (isAnswerValid) {
      score.value++
    }

    const isLastQuestion = currentQuestionID.value === (quizQuestions.length - 1)

    validatedAnswer.value = {
      correctAnswer:  correctAnswer,
      isAnswerValid:  isAnswerValid,
      isLastQuestion: isLastQuestion,
      selectedAnswer: selectedAnswer
    }
  }

  function getCurrentQuestion() {
    return quizQuestions.find(({ id }) => id === currentQuestionID.value)
  }

  function showNextQuestion() {
    validatedAnswer.value = null
    currentQuestionID.value++
  }

  function resetData() {
    score.value = 0
    stats.value = null
  }

  return {
    getCurrentQuestion,
    resetData,
    showStats,
    showNextQuestion,
    score,
    stats,
    validateAnswer,
    validatedAnswer
  }
}
