<script setup lang="ts">
import { useUserStore } from '@/stores'
import { UserOutlined } from '@ant-design/icons-vue'

const user = useUserStore()
</script>

<template>
  <div class="grid gap-4">
    <a-card title="个人信息" :bordered="false" class="shadow-card">
      <template #extra>
        <user-outlined class="text-primary text-xl" />
      </template>
      <p class="text-gray-600">这是个人信息页面</p>
    </a-card>
  </div>
</template> 