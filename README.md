# everypay-test-vue

View on [Github Pages](https://neverwintermoon.github.io/everypay-test-vue/)

## Requirements (to run/build)

- Node.js (I was using 20)

## Running

- `npm install`

For development build:

- `npm run dev`

For production build:

- `npm run build`
- `npm run preview`

For tests:

- `npm run test:unit`

## Design

I chose to go with a JavaScript framework for this project, although it could have been accomplished using pure
JavaScript. Out of curiosity, I opted for Vue.js. I have previous experience with this framework, albeit without the
Composition API. Hence, I was interested in comparing it to React Hooks, which I have extensively used.

The application's structure adheres to fundamental Vue.js guidelines. It involves segregating components into "smart"
components (views or pages in my case) and "dumb" components (smaller components that could potentially be reused).
Additionally, following the principles of clean architecture and separation of concerns, I extracted most of the logic
from the "smart" component into a Composable called useQuiz (`useQuiz.js`). This ensures that the component primarily
focuses on presenting data and handling user interactions, rather than dealing with business logic.

The data for quiz questions and answers is separated into two different structures, potentially simulating two different
requests in order not to expose answers when the questions are loaded.

## Tests

There is one test, `QuizView.spec.js`, it's more of a E2E test, as it tests the whole flow of the quiz, checking
answering correctly and incorrectly, getting to the end and checking the results.

The test is only slightly adjusted after implementing the deliverable 2, not covering timer running out and using hints,
as this would already take more time to implement.

## Deliverable 2

Things implemented in scope of that:

- Life system
- Question weights
- Hint feature

## Bonus

- Animations. Only for the list of answers when they are appearing.
- Timer. Automatically fail if there is no answer within 5 seconds.
