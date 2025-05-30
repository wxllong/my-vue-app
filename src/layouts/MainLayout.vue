<template>
  <a-layout class="layout" :class="{ 'dark-theme': theme.isDark }">
    <!-- 顶部导航 -->
    <a-layout-header class="header">
      <div class="header-content">
        <div class="logo">
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
      <!-- 左侧菜单 -->
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

      <!-- 右侧内容 -->
      <a-layout-content class="content" :class="{ 'dark-content': theme.isDark }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores'
import { useThemeStore } from '@/stores/modules/theme'
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
const selectedKeys = ref<string[]>([route.path])

// 监听路由变化，更新 selectedKeys
watch(() => route.path, (newPath) => {
  selectedKeys.value = [newPath]
})

// 从路由配置中获取菜单数据
const menuItems = computed(() => {
  const mainRoute = router.options.routes.find(r => r.path === '/')
  if (!mainRoute?.children) return []

  return mainRoute.children
    .filter(route => !route.meta?.hidden)
    .map(route => ({
      key: route.path,
      icon: route.meta?.icon ? Icons[route.meta.icon as keyof typeof Icons] : undefined,
      label: route.meta?.title,
      path: route.path,
      children: route.children?.filter(child => !child.meta?.hidden).map(child => ({
        key: child.path.startsWith('/') ? child.path : `${route.path}/${child.path}`,
        label: child.meta?.title,
        path: child.path.startsWith('/') ? child.path : `${route.path}/${child.path}`
      }))
    }))
})

// 展开的子菜单
const openKeys = computed(() => {
  const path = route.path
  const keys: string[] = []
  
  // 检查当前路径是否在某个子菜单下
  const parentRoute = menuItems.value.find(item => 
    item.children?.some(child => child.path === path)
  )
  
  if (parentRoute) {
    keys.push(parentRoute.key)
  }
  
  return keys
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
        user.logoutAction()
        message.success('退出成功')
        router.push('/login')
      } catch (error: unknown) {
        if (error instanceof Error) {
          message.error(error.message || '退出失败')
        } else {
          message.error('退出失败')
        }
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}

.header {
  background: #2c3e50 !important;
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
        color: rgba(255, 255, 255, 0.8);
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
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
}

.sider {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: #fff;

  .menu {
    height: 100%;
    border-right: none;

    :deep(.ant-menu-item) {
      margin: 4px 8px;
      padding: 0 16px;
      height: 40px;
      line-height: 40px;
      border-radius: 4px;

      &:hover {
        color: #1890ff;
        background: rgba(24, 144, 255, 0.1);
      }

      &.ant-menu-item-selected {
        background: #1890ff !important;
        color: #fff !important;

        &::after {
          display: none;
        }

        .anticon {
          color: #fff !important;
        }
      }
    }

    :deep(.ant-menu-submenu) {
      .ant-menu-submenu-title {
        margin: 4px 8px;
        padding: 0 16px;
        height: 40px;
        line-height: 40px;
        border-radius: 4px;

        &:hover {
          color: #1890ff;
          background: rgba(24, 144, 255, 0.1);
        }
      }

      .ant-menu-sub {
        background: transparent;
        padding: 4px 0;

        .ant-menu-item {
          margin: 4px 8px;
          padding: 0 16px;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;

          &:hover {
            color: #1890ff;
            background: rgba(24, 144, 255, 0.1);
          }

          &.ant-menu-item-selected {
            background: #1890ff !important;
            color: #fff !important;

            &::after {
              display: none;
            }

            .anticon {
              color: #fff !important;
            }
          }
        }
      }
    }
  }
}

.content {
  padding: 24px;
  min-height: calc(100vh - 64px);
}

.dark-theme {
  .dark-sider {
    background: #34495e !important;

    .menu {
    background: #34495e !important;
    color: #fff;

    :deep(.ant-menu-item) {
      color: #fff;

      &:hover {
        color: #1890ff;
          background: rgba(24, 144, 255, 0.1);
      }

      &.ant-menu-item-selected {
          background: #1890ff !important;
          color: #fff !important;

          .anticon {
            color: #fff !important;
          }
      }
    }

      :deep(.ant-menu-submenu) {
        .ant-menu-submenu-title {
          color: #fff;

          &:hover {
            color: #1890ff;
            background: rgba(24, 144, 255, 0.1);
          }
        }

        .ant-menu-sub {
          background: #2c3e50 !important;

          .ant-menu-item {
      color: #fff;

      &:hover {
        color: #1890ff;
              background: rgba(24, 144, 255, 0.1);
            }

            &.ant-menu-item-selected {
              background: #1890ff !important;
              color: #fff !important;

              .anticon {
                color: #fff !important;
              }
            }
          }
        }
      }
    }
  }

  .dark-content {
    background: #2c3e50 !important;
    color: #fff;
  }
}

// 覆盖 ant-design-vue 的默认样式
:deep(.ant-menu) {
  .ant-menu-item-selected {
    background-color: #1890ff !important;
    color: #fff !important;

    .anticon {
      color: #fff !important;
    }
  }

  .ant-menu-submenu-selected {
    > .ant-menu-submenu-title {
      color: #1890ff !important;
    }
  }
}

:deep(.ant-menu-dark) {
  .ant-menu-item-selected {
    background-color: #1890ff !important;
    color: #fff !important;

    .anticon {
      color: #fff !important;
    }
  }

  .ant-menu-submenu-selected {
    > .ant-menu-submenu-title {
      color: #1890ff !important;
    }
  }
}
</style> 