import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface UserInfo {
  id: number
  name: string
  age: number
  avatar?: string
}

export const useUserStore = defineStore('user', () => {
  // state
  const userInfo = ref<UserInfo | null>(null)
  const token = ref<string>('')
  const isLoggedIn = ref(false)

  // getters
  const userName = computed(() => userInfo.value?.name ?? 'Guest')
  const isAdult = computed(() => (userInfo.value?.age ?? 0) >= 18)
  const avatar = computed(() => userInfo.value?.avatar ?? '/default-avatar.png')

  // actions
  function login(userData: UserInfo, userToken: string) {
    userInfo.value = userData
    token.value = userToken
    isLoggedIn.value = true
  }

  function logout() {
    userInfo.value = null
    token.value = ''
    isLoggedIn.value = false
  }

  function updateUserInfo(info: Partial<UserInfo>) {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...info }
    }
  }

  return {
    // state
    userInfo,
    token,
    isLoggedIn,
    // getters
    userName,
    isAdult,
    avatar,
    // actions
    login,
    logout,
    updateUserInfo
  }
}) 