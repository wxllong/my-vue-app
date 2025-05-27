// 通用响应类型
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 分页请求参数
export interface PageParams {
  page: number
  pageSize: number
}

// 分页响应数据
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
} 