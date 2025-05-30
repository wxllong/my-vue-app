import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/style/index.scss'
import { eventBus } from './libs/eventBus';

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Antd)
app.use(eventBus)

app.mount('#app')
