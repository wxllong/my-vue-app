import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    // 更新 body 的 class
    document.body.classList.toggle('dark-theme', isDark.value)
  }

  return {
    isDark,
    toggleTheme
  }
}) 