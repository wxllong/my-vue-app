<template>
  <a-layout class="layout" :class="{ 'dark-theme': theme.isDark }">
    <a-layout-header class="header">
      <div class="header-content">
        <div class="logo">
          <ComSvgIcon name="vue" size="24" />
          <h1 class="title">Vue 3 Demo</h1>
        </div>
        <div class="header-right">
          <a-button type="text" @click="theme.toggleTheme" class="theme-btn">
            <template #icon>
              <BulbOutlined />
            </template>
            {{ theme.isDark ? '浅色' : '深色' }}
          </a-button>
          <div v-if="user.isLoggedIn" class="user-info">
            <a-avatar :src="user.avatar" class="avatar" />
            <span class="username">{{ user.userName }}</span>
            <a-dropdown>
              <a-button type="link" @click.prevent class="logout-btn">
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
      </div>
    </a-layout-header>

    <a-layout>
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        class="sider"
        :class="{ 'dark-sider': theme.isDark }"
      >
        <a-menu
          mode="inline"
          :selectedKeys="selectedKeys"
          :openKeys="openKeys"
          class="menu"
          :class="{ 'dark-menu': theme.isDark }"
          @openChange="handleOpenChange"
        >
          <template v-for="item in menuItems" :key="item.key">
            <a-sub-menu v-if="item.children?.length" :key="item.key">
              <template #icon>
                <component :is="item.icon" v-if="item.icon" />
              </template>
              <template #title>{{ item.label }}</template>
              <a-menu-item
                v-for="child in item.children"
                :key="child.path"
                @click="handleMenuClick(child)"
              >
                {{ child.label }}
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item
              v-else
              :key="item.path"
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

      <a-layout-content class="content" :class="{ 'dark-content': theme.isDark }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { useThemeStore } from '@/stores/modules/theme'
import { useRoute, useRouter } from 'vue-router'
import * as Icons from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'

const user = useUserStore()
const theme = useThemeStore()
const collapsed = ref(false)
const route = useRoute()
const router = useRouter()
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

watch(() => route.fullPath, (newPath) => {
  selectedKeys.value = [newPath]
}, { immediate: true })

const menuItems = computed(() => {
  const mainRoute = router.options.routes.find(r => r.path === '/')
  if (!mainRoute?.children) return []

  return mainRoute.children
    .filter(route => !route.meta?.hidden)
    .map(route => {
      const fullPath = route.path.startsWith('/') ? route.path : '/' + route.path
      return {
        key: fullPath,
        icon: route.meta?.icon ? Icons[route.meta.icon as keyof typeof Icons] : undefined,
        label: route.meta?.title,
        path: fullPath,
        children: route.children?.filter(child => !child.meta?.hidden).map(child => {
          const childFullPath = child.path.startsWith('/')
            ? child.path
            : `${fullPath}/${child.path}`
          return {
            key: childFullPath,
            label: child.meta?.title,
            path: childFullPath
          }
        })
      }
    })
})

const handleOpenChange = (keys: (string | number)[]) => {
  openKeys.value = keys as string[]
}

const handleMenuClick = (item: { path: string }) => {
  const targetPath = item.path.startsWith('/') ? item.path : `/${item.path}`
  if (route.fullPath !== targetPath) {
    router.push(targetPath)
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
        user.logoutAction()
        message.success('退出成功')
        router.push('/login')
      } catch (error: unknown) {
        message.error(error instanceof Error ? error.message : '退出失败')
      }
    }
  })
}

// 获取当前路径的父路径作为 openKeys 初始值
onMounted(() => {
  const findParentPath = (path: string): string | null => {
    for (const item of menuItems.value) {
      if (item.children?.some(child => child.path === path)) {
        return item.key
      }
    }
    return null
  }

  const parentKey = findParentPath(route.path)
  if (parentKey) {
    openKeys.value = [parentKey]
  }
})
</script>

<style lang="scss" scoped>
$primary-color: #1890ff;
$dark-bg: #1f1f1f;
$dark-bg-sider: #141414;
$dark-text: #e0e0e0;
$dark-border: #303030;

.layout {
  min-height: 100vh;
}

.header {
  background: #001529 !important;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  height: 64px;
  line-height: 64px;

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    .title {
      color: #fff;
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;

    .theme-btn {
      color: #fff;

      &:hover {
        color: rgba(255, 255, 255, 0.85);
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;

      .avatar {
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .username {
        color: #fff;
      }

      .logout-btn {
        color: #fff;

        &:hover {
          color: rgba(255, 255, 255, 0.85);
        }
      }
    }
  }
}

.sider {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .menu {
    height: 100%;
    border-right: none;
  }
}

.content {
  padding: 24px;
  background: #f0f2f5;
  height: calc(100vh - 64px);
  overflow-x: auto;
  white-space: nowrap;
}

// 暗色主题
.dark-theme {
  .header {
    background: $dark-bg !important;
  }

  .sider,
  .dark-sider {
    background: $dark-bg-sider !important;

    .menu {
      background: $dark-bg-sider !important;
      color: $dark-text;

      :deep(.ant-menu-item),
      :deep(.ant-menu-submenu-title) {
        color: $dark-text;

        &:hover {
          background-color: rgba(255, 255, 255, 0.06);
          color: #fff;
        }
      }

      :deep(.ant-menu-item-selected) {
        background-color: $primary-color !important;
        color: #fff !important;

        .anticon {
          color: #fff !important;
        }
      }
    }
  }

  .dark-content {
    background: $dark-bg !important;
    color: $dark-text;
  }

  .theme-btn,
  .username,
  .logout-btn {
    color: $dark-text !important;
  }
}

// 全局菜单项选中样式
:deep(.ant-menu-item-selected) {
  background-color: $primary-color !important;
  color: #fff !important;

  .anticon {
    color: #fff !important;
  }
}
</style>

