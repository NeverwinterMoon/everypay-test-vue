import {computed, ref} from 'vue'
import quizQuestions from '@/repository/questionList.json'
import quizAnswers from '@/repository/answerList.json'

export default function useQuiz() {
  const DEFAULT_TIME_TO_ANSWER_MS = 5000
  const DEFAULT_TIME_TICK_MS = 1000

  const questionSortedByWeight = quizQuestions.sort((left, right) => left.weight - right.weight)
  const lastQuestionID = questionSortedByWeight[questionSortedByWeight.length - 1].id

  const life = ref(3)
  const currentQuestionID = ref(questionSortedByWeight[0].id)
  const currentQuestion = ref(null)
  const score = ref(0)
  const stats = ref(null)
  const isHintEnabled = ref(false)
  const timer = ref({
    id:         null,
    timeLeftMs: DEFAULT_TIME_TO_ANSWER_MS
  })
  const timerLeftInSeconds = computed(() => timer.value.timeLeftMs / 1000)
  const validatedAnswer = ref(null)

  function showStats() {
    currentQuestionID.value = 0
    currentQuestion.value = null
    validatedAnswer.value = null

    const maxScore = questionSortedByWeight.reduce((accumulator, { weight }) => {
      return accumulator + weight
    }, 0)

    stats.value = {
      score:    score.value,
      maxScore: maxScore
    }
  }

  function validateAnswer(selectedAnswer, isTimedOut = false) {
    if (validatedAnswer.value !== null) return

    stopTimer()

    const correctAnswer = getCorrectAnswer(currentQuestion.value.id)
    const weightAdjusted = currentQuestion.value.weight / (isHintEnabled.value ? 2 : 1)

    const isAnswerValid = correctAnswer === selectedAnswer
    if (isAnswerValid) {
      score.value += weightAdjusted
    } else {
      life.value--
    }

    const isGameOver = life.value === 0
    const isLastQuestion = currentQuestionID.value === lastQuestionID

    validatedAnswer.value = {
      correctAnswer:  correctAnswer,
      isAnswerValid:  isAnswerValid,
      isGameOver:     isGameOver,
      isLastQuestion: isLastQuestion,
      isTimedOut:     isTimedOut,
      selectedAnswer: selectedAnswer,
      weight:         weightAdjusted
    }
  }

  function showNextQuestion() {
    isHintEnabled.value = false
    validatedAnswer.value = null
    currentQuestionID.value++

    setCurrentQuestion()
    startTimer()
  }

  function resetData() {
    life.value = 3
    score.value = 0
    stats.value = null

    setCurrentQuestion()
  }

  function useHint() {
    isHintEnabled.value = true

    setCurrentQuestion()
  }

  // PRIVATE

  function setCurrentQuestion() {
    const question = questionSortedByWeight.find(({ id }) => id === currentQuestionID.value)

    if (isHintEnabled.value) {
      const correctAnswer = getCorrectAnswer(question.id)
      const options = [...removeTwoRandomIncorrectAnswers(question.options, correctAnswer), correctAnswer]
        .sort(() => Math.random() - 0.5)

      currentQuestion.value = Object.assign({}, question, { options: options })
    } else {
      currentQuestion.value = question
    }
  }

  function startTimer() {
    if (timer.value.id !== null) return

    timer.value.id = setInterval(() => {
      timer.value.timeLeftMs -= DEFAULT_TIME_TICK_MS

      if (timer.value.timeLeftMs === 0) {
        validateAnswer(null, true)
      }
    }, DEFAULT_TIME_TICK_MS)
  }

  function stopTimer() {
    clearInterval(timer.value.id)
    timer.value.id = null
    timer.value.timeLeftMs = DEFAULT_TIME_TO_ANSWER_MS
  }

  function removeTwoRandomIncorrectAnswers(answers, correctAnswer) {
    const incorrectAnswers = answers.filter(answer => answer !== correctAnswer)

    return removeRandomElement(removeRandomElement(incorrectAnswers))
  }

  function removeRandomElement(array) {
    const indexToRemove = Math.floor(Math.random() * array.length)

    return array.filter((_, index) => indexToRemove !== index)
  }

  function getCorrectAnswer(questionID) {
    return quizAnswers.find(({ id }) => id === questionID)?.answer
  }

  startTimer()
  setCurrentQuestion()

  return {
    currentQuestion,
    isHintEnabled,
    life,
    resetData,
    showStats,
    showNextQuestion,
    score,
    stats,
    timer: timerLeftInSeconds,
    useHint,
    validateAnswer,
    validatedAnswer
  }
}
