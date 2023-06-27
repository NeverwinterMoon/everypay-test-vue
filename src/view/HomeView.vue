<script setup>
import ButtonComponent from "@/component/ButtonComponent.vue"
</script>

<template>
  <div class="container mx-auto flex justify-center items-center h-screen">
    <div>
      <h1 class="text-4xl mb-4">Welcome to EveryPay's quiz!</h1>

      <div class="flex justify-center">
        <RouterLink to="/quiz">
          <ButtonComponent>
            Start the Quiz
          </ButtonComponent>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
