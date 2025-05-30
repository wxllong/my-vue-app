<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const countdown = ref(5)

const goHome = () => {
  router.push('/')
}

onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      goHome()
    }
  }, 1000)
})
</script>

<template>
  <div class="not-found">
    <div class="glow-text">404</div>
    <p class="message">Oops! 页面走丢了</p>
    <p class="sub">将在 <span class="countdown">{{ countdown }}</span> 秒后返回首页</p>
    <a-button class="back-button" type="primary" size="small" @click="goHome">
      立即返回
    </a-button>
  </div>
</template>

<style scoped>
.not-found {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.glow-text {
  font-size: 160px;
  font-weight: bold;
  color: #00d8ff;
  text-shadow:
    0 0 5px #00d8ff,
    0 0 10px #00d8ff,
    0 0 20px #00d8ff,
    0 0 40px #00d8ff;
  animation: flicker 2s infinite alternate;
  margin-bottom: 20px;
}

.message {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
}

.sub {
  font-size: 18px;
  color: #ccc;
  margin-bottom: 24px;
}

.countdown {
  color: #00ffff;
  font-weight: bold;
  animation: pulse 1s infinite;
}

.back-button {
  background-color: #00d8ff;
  border: none;
  color: #000;
  font-weight: 600;
  box-shadow: 0 0 10px #00d8ff;
  transition: all 0.3s;
}

.back-button:hover {
  background-color: #00bcd4;
  box-shadow: 0 0 20px #00ffff;
}

@keyframes flicker {
  0% {
    opacity: 1;
    text-shadow: 0 0 5px #00d8ff, 0 0 10px #00d8ff, 0 0 20px #00d8ff;
  }
  50% {
    opacity: 0.85;
    text-shadow: 0 0 2px #00d8ff, 0 0 4px #00d8ff;
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 5px #00d8ff, 0 0 10px #00d8ff, 0 0 20px #00d8ff;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
