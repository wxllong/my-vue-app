import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia 

export * from './modules/user'
export * from './modules/theme'

// 如果需要，可以在这里添加一些全局的store配置
export * from './modules/counter' 