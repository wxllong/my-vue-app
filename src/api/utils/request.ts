import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse } from '../types'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 模拟数据
const mockData: Record<string, any> = {
  '/auth/login': {
    code: 0,
    data: {
      token: 'mock-token-' + Date.now()
    },
    message: '登录成功'
  },
  '/user/info': {
    code: 0,
    data: {
      id: 1,
      username: 'admin',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
    },
    message: '获取成功'
  }
}

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: Error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data
    if (res.code !== 0) {
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return response
  },
  (error: Error) => {
    return Promise.reject(error)
  }
)

// 封装 GET 请求
export function get<T>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
  return service.get(url, { params, ...config })
}

// 封装 POST 请求
export function post<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
  return service.post(url, data, config)
}

// 封装 PUT 请求
export function put<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
  return service.put(url, data, config)
}

// 封装 DELETE 请求
export function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return service.delete(url, config)
}

// 封装请求方法
export const request = <T = unknown>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  // 模拟数据拦截
  const url = config.url
  if (url && mockData[url]) {
    return Promise.resolve(mockData[url])
  }
  return service.request(config).then(response => response.data)
}

export default service 