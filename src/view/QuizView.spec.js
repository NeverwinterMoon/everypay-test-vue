import {expect, it} from 'vitest'
// Use to visually debug any step of the test by calling debug()
// import {debug} from 'vitest-preview'

import {render, screen, fireEvent, within} from '@testing-library/vue'
import QuizView from './QuizView.vue'

it('increments value on click', async () => {
  /* When */
  render(QuizView)

  /* Then */
  expect(screen.queryByText('Which game features a plumber named Mario?')).toBeTruthy()

  const correctAnswerForQuestionID0 = screen.queryByRole('button', {
    name: 'Super Mario Bros.'
  })

  expect(screen.queryByRole('button', {
    name: 'The Legend of Zelda'
  })).toBeTruthy()

  expect(correctAnswerForQuestionID0).toBeTruthy()

  expect(screen.queryByRole('button', {
    name: 'Minecraft'
  })).toBeTruthy()

  expect(screen.queryByRole('button', {
    name: 'Call of Duty'
  })).toBeTruthy()

  expect(queryForNextQuestionButton()).toBeFalsy()

  /* When */
  await fireEvent.click(correctAnswerForQuestionID0)

  /* Then */
  // This splitting is done because of multiple spans
  const answer0ResultText01 = screen.queryByText('The answer was correct')
  expect(answer0ResultText01).toBeTruthy()
  expect(within(answer0ResultText01).queryByText('Super Mario Bros.')).toBeTruthy()

  const answer0ResultText02 = screen.queryByText('! You got point, totalling to')
  expect(answer0ResultText02).toBeTruthy()
  expect(within(answer0ResultText02).queryByText('1')).toBeTruthy()
  expect(within(answer0ResultText02).queryByText('1.')).toBeTruthy()

  expect(queryForNextQuestionButton()).toBeTruthy()

  /* When */
  await fireEvent.click(queryForNextQuestionButton())

  /* Then */
  expect(screen.getByText('In which game can you catch Pokémon?')).toBeTruthy()

  const incorrectAnswerForQuestionID1 = screen.queryByRole('button', {
    name: 'Grand Theft Auto V'
  })

  expect(incorrectAnswerForQuestionID1).toBeTruthy()

  expect(screen.queryByRole('button', {
    name: 'Mortal Kombat'
  })).toBeTruthy()

  expect(screen.queryByRole('button', {
    name: 'Pokémon Go'
  })).toBeTruthy()

  expect(screen.queryByRole('button', {
    name: 'FIFA 22'
  })).toBeTruthy()

  /* When */
  await fireEvent.click(incorrectAnswerForQuestionID1)

  /* Then */
  const answer1ResultText01 = screen.queryByText('Selected answer was incorrect')
  expect(answer1ResultText01).toBeTruthy()
  expect(within(answer1ResultText01).queryByText('Grand Theft Auto V')).toBeTruthy()

  const answer1ResultText02 = screen.queryByText('. The correct answer is . Your total score remains at')
  expect(answer1ResultText02).toBeTruthy()
  expect(within(answer1ResultText02).queryByText('Pokémon Go')).toBeTruthy()
  expect(within(answer1ResultText02).queryByText('1.')).toBeTruthy()

  expect(queryForNextQuestionButton()).toBeTruthy()

  /* When */
  const clickActions = Array(8).fill(async () => {
    await fireEvent.click(queryForNextQuestionButton())

    const answerButton = screen.queryAllByRole('button')[0]

    await fireEvent.click(answerButton)
  })

  await Promise.all(clickActions.map(action => action()));

  /* Then */
  expect(screen.queryByText("That's it, you are all done with the quiz!")).toBeTruthy()

  const resultsButton = screen.queryByRole('button', {
    name: 'See results'
  })
  expect(resultsButton).toBeTruthy()

  /* When */
  await fireEvent.click(resultsButton)

  /* Then */
  expect(screen.queryByRole('heading', {
    name: 'The results are in!'
  })).toBeTruthy()

  const yourScore = screen.queryByText('Your score:')
  expect(yourScore).toBeTruthy()
  expect(within(yourScore).queryByText('2')).toBeTruthy()

  const maximumScore = screen.queryByText('Maximum score:')
  expect(within(maximumScore).queryByText('10')).toBeTruthy()

  const restartQuizButton = screen.queryByRole('button', {
    name: 'Restart the quiz'
  })

  expect(restartQuizButton).toBeTruthy()

  /* When */
  await fireEvent.click(restartQuizButton)

  /* Then */
  expect(screen.queryByRole('button', {
    name: 'The Legend of Zelda'
  })).toBeTruthy()

  expect(screen.queryByRole('button', {
    name: 'Super Mario Bros.'
  })).toBeTruthy()

  expect(screen.queryByRole('button', {
    name: 'Minecraft'
  })).toBeTruthy()

  expect(screen.queryByRole('button', {
    name: 'Call of Duty'
  })).toBeTruthy()

  expect(queryForNextQuestionButton()).toBeFalsy()
})

function queryForNextQuestionButton() {
  return screen.queryByRole('button', {
    name: 'Next question'
  })
}
