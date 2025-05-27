<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">抱歉，您访问的页面不存在</p>
      <a-button type="primary" @click="goHome">
        返回首页
      </a-button>
    </div>
  </div>
</template> 