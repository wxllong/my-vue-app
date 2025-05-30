import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, getUserInfo } from '@/api'
import type { LoginParams } from '@/api/modules/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userName = ref('')
  const avatar = ref('')
  const isLoggedIn = ref(!!token.value)

  // 登录
  const loginAction = async (params: LoginParams) => {
    try {
      const { data } = await login(params)
      token.value = data.token
      localStorage.setItem('token', data.token)
      isLoggedIn.value = true
      await getUserInfoAction()
      return true
    } catch (error) {
      return false
    }
  }

  // 获取用户信息
  const getUserInfoAction = async () => {
    try {
      const { data } = await getUserInfo()
      userName.value = data.username
      avatar.value = data.avatar || ''
      return true
    } catch (error) {
      return false
    }
  }

  // 退出登录
  const logoutAction = () => {
    token.value = ''
    userName.value = ''
    avatar.value = ''
    isLoggedIn.value = false
    localStorage.removeItem('token')
  }

  // 新增：初始化用户信息
  const initUser = async () => {
    if (token.value) {
      await getUserInfoAction()
    }
  }

  return {
    token,
    userName,
    avatar,
    isLoggedIn,
    loginAction,
    getUserInfoAction,
    logoutAction,
    initUser
  }
}) 