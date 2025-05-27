import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0)

  // getters
  const doubleCount = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  return {
    // state
    count,
    // getters
    doubleCount,
    // actions
    increment,
    decrement
  }
}) 