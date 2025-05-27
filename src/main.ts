import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from '@/App.vue'
import 'ant-design-vue/dist/reset.css'
import '@/assets/style/tailwind.css'
import '@/assets/style/index.scss'
import pinia from '@/stores'
import router from '@/router'

const app = createApp(App)

app.use(pinia)
app.use(Antd)
app.use(router)
app.mount('#app')
