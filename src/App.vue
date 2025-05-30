<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
onMounted(() => {
  userStore.initUser()
})
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/style/index.scss';
</style>
