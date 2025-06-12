import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './modules' // 导入模块路由

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
// ... existing code ...

export default router