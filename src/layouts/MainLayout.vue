<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores'
import { useThemeStore } from '@/stores/theme'
import { BulbOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import * as Icons from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { logout } from '@/api'

const user = useUserStore()
const theme = useThemeStore()
const collapsed = ref(false)
const route = useRoute()
const router = useRouter()

// 从路由配置中获取菜单数据
const menuItems = computed(() => {
  const mainRoute = router.options.routes.find(r => r.path === '/')
  if (!mainRoute?.children) return []

  return mainRoute.children
    .filter(route => route.meta?.menu)
    .map(route => ({
      key: `/${route.path}`,
      icon: route.meta?.icon ? Icons[route.meta.icon as keyof typeof Icons] : undefined,
      label: route.meta?.title,
      path: `/${route.path}`,
      children: route.children?.filter(child => child.meta?.menu).map(child => ({
        key: `/${route.path}/${child.path}`,
        label: child.meta?.title,
        path: `/${route.path}/${child.path}`
      }))
    }))
})

const handleMenuClick = (item: { path: string }) => {
  if (route.path !== item.path) {
    router.push(item.path)
  }
}

const handleLogout = () => {
  Modal.confirm({
    title: '确认退出',
    content: '确定要退出系统吗？',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        await logout()
        localStorage.removeItem('token')
        message.success('退出成功')
        router.push('/login')
      } catch (error: any) {
        message.error(error.message || '退出失败')
      }
    }
  })
}
</script>

<template>
  <a-layout class="min-h-screen" :class="{ 'dark-theme': theme.isDark }">
    <!-- 顶部导航 -->
    <a-layout-header class="px-6 shadow-card h-header flex items-center justify-between" :class="{ 'dark-header': theme.isDark }">
      <div class="flex items-center">
        <h1 class="text-primary text-xl font-medium m-0 text-white">Vue 3 Demo</h1>
      </div>
      <div class="flex items-center gap-4">
        <a-button type="text" @click="theme.toggleTheme" class="text-white">
          <template #icon>
            <BulbOutlined />
          </template>
          {{ theme.isDark ? '浅色' : '深色' }}
        </a-button>
        <div v-if="user.isLoggedIn" class="flex items-center gap-2">
          <a-avatar :src="user.avatar" class="border border-gray-200" />
          <span class="text-white">{{ user.userName }}</span>
          <a-dropdown>
            <a-button type="link" @click.prevent class="text-primary hover:text-primary/80">
              <LogoutOutlined />
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile" @click="router.push('/profile')">
                  <UserOutlined />
                  个人中心
                </a-menu-item>
                <a-menu-item key="logout" @click="handleLogout">
                  <LogoutOutlined />
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>

    <a-layout>
      <!-- 左侧菜单 -->
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        :class="{ 'dark-sider': theme.isDark }"
      >
        <a-menu
          mode="inline"
          :selectedKeys="[route.path]"
          class="h-full border-r-0"
          :class="{ 'dark-menu': theme.isDark }"
        >
          <template v-for="item in menuItems" :key="item.key">
            <a-sub-menu v-if="item.children?.length" :key="item.key">
              <template #icon>
                <component :is="item.icon" v-if="item.icon" />
              </template>
              <template #title>{{ item.label }}</template>
              <a-menu-item
                v-for="child in item.children"
                :key="child.key"
                @click="handleMenuClick(child)"
              >
                {{ child.label }}
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item
              v-else
              :key="item.key"
              @click="handleMenuClick(item)"
            >
              <template #icon>
                <component :is="item.icon" v-if="item.icon" />
              </template>
              {{ item.label }}
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>

      <!-- 右侧内容 -->
      <a-layout-content class="p-6 min-h-[calc(100vh-64px)]" :class="{ 'dark-content': theme.isDark }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.ant-layout-sider {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.dark-theme {
  .dark-header {
    background: #2c3e50 !important;
  }

  .dark-sider {
    background: #34495e !important;
  }

  .dark-menu {
    background: #34495e !important;
    color: #fff;

    :deep(.ant-menu-item) {
      color: #fff;

      &:hover {
        color: #1890ff;
      }

      &.ant-menu-item-selected {
        background: #1890ff;
        color: #fff;
      }
    }

    :deep(.ant-menu-submenu-title) {
      color: #fff;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .dark-content {
    background: #2c3e50 !important;
    color: #fff;
  }
}

:deep(.ant-layout-header) {
  background: #2c3e50 !important;
}
</style> 