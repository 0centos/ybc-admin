import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const logined = ref(false)
  function increment() {
    logined.value = true
  }

  return { logined, increment }
})
