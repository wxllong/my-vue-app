<template>
  <div class="dashboard">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <template #title>总用户数</template>
          <div class="card-content">
            <span class="number">1,234</span>
            <span class="label">用户</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <template #title>今日访问</template>
          <div class="card-content">
            <span class="number">123</span>
            <span class="label">次</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <template #title>总订单数</template>
          <div class="card-content">
            <span class="number">456</span>
            <span class="label">单</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <template #title>总收入</template>
          <div class="card-content">
            <span class="number">¥89,123</span>
            <span class="label">元</span>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
// 仪表盘页面
</script>

<style scoped lang="scss">
.dashboard {
  padding: 24px;

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;

    .number {
      font-size: 24px;
      font-weight: bold;
      color: #1890ff;
      margin-bottom: 8px;
    }

    .label {
      font-size: 14px;
      color: #666;
    }
  }
}
</style> 