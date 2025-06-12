// src/router/modules/index.ts
import { RouteRecordRaw } from 'vue-router'

const login: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login.vue'),
  meta: {
    title: '登录',
    hidden: true
  }
}

const main: RouteRecordRaw = {
  path: '/',
  component: () => import('@/layouts/MainLayout.vue'),
  redirect: '/dashboard',
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        title: '仪表盘',
        icon: 'DashboardOutlined'
      }
    },
    {
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/Profile.vue'),
      meta: {
        title: '个人中心',
        icon: 'UserOutlined'
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
}

const notFound: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/NotFound.vue'),
  meta: {
    title: '404',
    hidden: true
  }
}

export const routes = [login, main, notFound]