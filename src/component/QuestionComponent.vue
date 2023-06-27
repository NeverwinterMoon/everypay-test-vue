<script setup>
import {ref, watch} from "vue"

const emit = defineEmits(['submit-answer'])

const props = defineProps({
  isDisabled: {
    type:     Boolean,
    required: true
  },
  question:   {
    type:     String,
    required: true
  },
  options:    {
    type:     Array,
    required: true
  }
})

// These are used to reset transition animations for the list when new question data comes in
const transitionKey = ref(0)
watch(() => props.options, () => {
  transitionKey.value++
}, { immediate: true })

function submitAnswer(answer) {
  emit('submit-answer', answer)
}

function beforeEnterAnimationHandler(el) {
  el.style.transform = 'translateX(100%)';
  el.style.opacity = 0;
}

function enterAnimationHandler(el, done) {
  const delay = el.dataset.index * 100;
  setTimeout(() => {
    el.style.transform = 'translateX(0)';
    el.style.opacity = 1;
    el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    el.addEventListener('transitionend', done);
  }, delay);
}

function leaveAnimatonHandler(el, done) {
  el.style.transform = 'translateX(100%)';
  el.style.opacity = 0;
  el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  el.addEventListener('transitionend', done);
}

</script>

<template>
  <div>
    <div class="px-4 py-4 font-bold">
      {{ props.question }}
    </div>

    <TransitionGroup
        :key="transitionKey"
        name="list"
        tag="ul"
        class="space-y-2"
        appear
        @before-enter="beforeEnterAnimationHandler"
        @enter="enterAnimationHandler"
        @leave="leaveAnimatonHandler"
    >
      <li
          v-for="(answer, index) in props.options"
          :key="index"
          :data-index="index"
      >
        <button
            class="px-4 py-4 bg-emerald-100 hover:bg-emerald-700 hover:text-white rounded-lg enabled:cursor-pointer w-full disabled:bg-gray-500 disabled:text-white"
            :disabled="isDisabled"
            @click="submitAnswer(answer)"
        >
          {{ answer }}
        </button>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-leave-active {
  position: absolute;
}
</style>
