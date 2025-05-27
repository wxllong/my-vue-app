<script setup lang="ts">
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'

const user = useUserStore()

// 模拟用户登录
onMounted(() => {
  user.login(
    {
      id: 1,
      name: '测试用户',
      age: 25,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
    },
    'test-token'
  )
})
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/style/index.scss';
</style>
