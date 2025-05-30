import type { ApiResponse } from '../types';
import { request } from '../utils/request';

// 用户登录
export interface LoginParams {
  username: string;
  password: string;
}

interface LoginResult {
  token: string;
}

export const login = (data: LoginParams): Promise<ApiResponse<LoginResult>> => {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  });
};

export const logout = (): Promise<ApiResponse<void>> => {
  return request({
    url: '/auth/logout',
    method: 'post',
  });
};

export const getUserInfo = (): Promise<ApiResponse<{
  id: number;
  username: string;
  avatar?: string;
}>> => {
  return request({
    url: '/user/info',
    method: 'get',
  });
};

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