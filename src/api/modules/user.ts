import { get, post } from '../utils/request'

// 用户登录
export interface LoginParams {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  roles: string[]
}

// 模拟登录接口
export function login(data: LoginParams) {
  return new Promise<{ token: string }>((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(() => {
      if (data.username === 'admin' && data.password === '123456') {
        resolve({ token: 'mock-token-' + Date.now() })
      } else {
        reject(new Error('用户名或密码错误'))
      }
    }, 1000)
  })
}

// 模拟获取用户信息接口
export function getUserInfo() {
  return new Promise<UserInfo>((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        username: 'admin',
        nickname: '管理员',
        avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
        roles: ['admin']
      })
    }, 500)
  })
}

// 模拟登出接口
export function logout() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

// 模拟校验 token 接口
export function checkToken() {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      const token = localStorage.getItem('token')
      // 模拟 token 校验：如果 token 存在且不是以 'mock-token-' 开头，则视为无效
      const isValid = token && token.startsWith('mock-token-')
      resolve(isValid)
    }, 500)
  })
} 