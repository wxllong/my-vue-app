export * from './modules/counter'
export * from './modules/user'

// 如果需要，可以在这里添加一些全局的store配置
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia 