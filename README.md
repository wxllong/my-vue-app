# Vue 3 Demo

基于 Vue 3 + TypeScript + Vite 的现代化前端项目模板。

## 技术栈

### 核心框架
- [Vue 3](https://v3.vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

### UI 框架
- [Ant Design Vue](https://antdv.com/) - 企业级 UI 设计语言和 Vue 组件库
- [SCSS](https://sass-lang.com/) - CSS 预处理器

### 状态管理
- [Pinia](https://pinia.vuejs.org/) - Vue 的状态管理库

### 事件通信
- [@vueuse/core](https://vueuse.org/) - 全局事件总线 (EventBus)

### 路由
- [Vue Router](https://router.vuejs.org/) - Vue.js 的官方路由

### 工具链
- [ESLint](https://eslint.org/) - 代码检查工具
- [Prettier](https://prettier.io/) - 代码格式化工具
- [Husky](https://typicode.github.io/husky/) - Git 钩子工具
- [lint-staged](https://github.com/okonet/lint-staged) - 暂存文件检查工具
- [commitlint](https://commitlint.js.org/) - 提交信息检查工具

### 开发工具
- [pnpm](https://pnpm.io/) - 快速、节省磁盘空间的包管理器
- [axios](https://axios-http.com/) - HTTP 客户端

## 功能特性

- 🚀 基于 Vite 的快速开发体验
- 💪 TypeScript 支持
- 🎨 集成 Ant Design Vue 组件库
- 📦 使用 Pinia 进行状态管理
- 📡 全局事件总线通信
- 🛣️ Vue Router 路由管理
- 📝 ESLint + Prettier 代码规范
- 🐶 Husky + lint-staged 提交检查
- 📦 使用 pnpm 作为包管理器
- 🎯 完整的 TypeScript 支持
- 🔍 代码提交规范检查
- 🌙 支持暗黑模式
- 📱 响应式布局
- 🔌 内置API请求封装（支持模拟数据）
- 🔒 路由权限控制
- 🛠️ 自动导入组件和API

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- pnpm >= 7.0.0

### 安装依赖
```bash
pnpm install
```

### 开发环境运行
```bash
pnpm dev
```

### 使用SVG图标组件
1. 将SVG文件放入`src/assets/svg`目录
2. 在组件中直接使用：
```vue
<template>
  <ComSvgIcon name="icon-name" class="custom-class" style="width: 24px; height: 24px" />
</template>
```

### 生产环境构建
```bash
pnpm build
```

### 代码检查
```bash
pnpm lint
```

### 预览生产版本
```bash
pnpm preview
```

## 环境变量配置

项目使用Vite环境变量配置，创建`.env`文件：

```ini
# 开发环境配置
VITE_API_BASE_URL=/api
VITE_APP_TITLE=Vue3 Demo
```

## API代理配置

开发环境API代理配置在`vite.config.ts`中：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

## 项目结构
```
├── docs/                # 项目文档
├── public/             # 静态资源
├── src/                # 源代码
│   ├── api/           # API 接口
│   │   ├── modules/   # 模块化API
│   │   ├── types/     # 类型定义
│   │   └── utils/     # 请求工具
│   ├── assets/        # 资源文件
│   ├── components/    # 公共组件
│   ├── layouts/       # 布局组件
│   ├── libs/          # 全局工具库
│   │   └── eventBus.ts # 全局事件总线
│   ├── router/        # 路由配置
│   ├── stores/        # 状态管理
│   ├── styles/        # 全局样式
│   ├── types/         # 类型定义
│   ├── utils/         # 工具函数
│   └── views/         # 页面组件
├── .eslintrc.js       # ESLint 配置
├── .gitignore         # Git 忽略文件
├── index.html         # HTML 模板
├── package.json       # 项目配置
├── tsconfig.json      # TypeScript 配置
└── vite.config.ts     # Vite 配置
```

## 开发规范

### 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 严格模式
- 组件使用大驼峰命名法
- 工具函数使用小驼峰命名法
- 类型定义使用大驼峰命名法并添加`I`前缀

### 提交规范
提交信息格式：
```
<type>(<scope>): <subject>

<body>

<footer>
```

类型（type）：
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动
- perf: 性能优化
- build: 构建相关
- ci: CI配置

## 常见问题

### 1. 如何添加新页面？
1. 在`src/views`下创建新组件
2. 在`src/router/index.ts`中添加路由配置
3. 使用自动导入功能，无需手动导入组件

### 2. 如何使用SVG图标组件？
项目内置了`ComSvgIcon`组件用于显示SVG图标：
1. 将SVG文件放入`src/assets/svg`目录
2. 在组件中使用：
```vue
<ComSvgIcon name="your-svg-file-name" class="icon-class" />
```
3. 支持属性：
   - `name`: SVG文件名(不带.svg后缀)
   - `class`: 自定义样式类
   - `style`: 自定义样式

### 3. 如何添加API接口？
1. 在`src/api/modules`下创建新模块
2. 导出接口函数
3. 在`src/api/index.ts`中统一导出

### 4. 如何添加全局状态？
1. 在`src/stores`下创建新store
2. 使用Pinia的`defineStore`定义状态
3. 在组件中使用`useStore`获取状态

### 5. 如何使用全局事件总线？
1. 在组件中通过 `getCurrentInstance()` 获取代理对象
2. 使用 `$pub` 发布事件，`$sub` 订阅事件，`$unsub` 取消订阅

#### 发布事件：
```typescript
const { proxy: { $pub } } = getCurrentInstance() as any;
$pub('key', data);
```

#### 订阅事件：
```typescript
const { proxy: { $sub } } = getCurrentInstance() as any;
$sub('key', (data) => {
  // 处理事件
});
```

#### 取消订阅：
```typescript
const { proxy: { $unsub } } = getCurrentInstance() as any;
$unsub('key');
```

### 6. 如何解决ESLint错误？
- 运行`pnpm lint`查看错误
- 运行`pnpm lint --fix`自动修复可修复的错误
- 对于无法自动修复的错误，根据提示手动修改

## 相关文档

- [Vue 3 文档](https://v3.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vitejs.dev/)
- [Ant Design Vue 文档](https://antdv.com/)
- [ESLint 配置指南](./docs/eslint-guide.md)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Vue Router 文档](https://router.vuejs.org/)
- [VueUse EventBus 文档](https://vueuse.org/core/useEventBus/)

## 许可证

[MIT](./LICENSE)


