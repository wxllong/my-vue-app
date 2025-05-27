import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { checkToken } from '@/api'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '工作台',
          icon: 'HomeOutlined',
          menu: true
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
        meta: {
          title: '个人中心',
          icon: 'UserOutlined',
          menu: true
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        meta: {
          title: '系统管理',
          icon: 'SettingOutlined',
          menu: true
        },
        children: [
          {
            path: 'account',
            name: 'AccountSettings',
            component: () => import('@/views/AccountSettings.vue'),
            meta: {
              title: '账号管理',
              menu: true
            }
          },
          {
            path: 'security',
            name: 'SecuritySettings',
            component: () => import('@/views/SecuritySettings.vue'),
            meta: {
              title: '安全中心',
              menu: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '404',
      hidden: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    const token = localStorage.getItem('token')
    if (token) {
      const isValid = await checkToken()
      if (isValid) {
        next('/')
      } else {
        localStorage.removeItem('token')
        next()
      }
    } else {
      next()
    }
  } else {
    const token = localStorage.getItem('token')
    if (token) {
      const isValid = await checkToken()
      if (isValid) {
        next()
      } else {
        localStorage.removeItem('token')
        next('/login')
      }
    } else {
      next('/login')
    }
  }
})

export default router 