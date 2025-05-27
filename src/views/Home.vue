<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <div class="grid gap-4">
    <a-card title="首页" :bordered="false" class="shadow-card">
      <template #extra>
        <home-outlined class="text-primary text-xl" />
      </template>
      <p class="text-gray-600">欢迎来到首页</p>
    </a-card>
  </div>
</template> 