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

## 功能特性

- 🚀 基于 Vite 的快速开发体验
- 💪 TypeScript 支持
- 🎨 集成 Ant Design Vue 组件库
- 📦 使用 Pinia 进行状态管理
- 🛣️ Vue Router 路由管理
- 📝 ESLint + Prettier 代码规范
- 🐶 Husky + lint-staged 提交检查
- 📦 使用 pnpm 作为包管理器
- 🎯 完整的 TypeScript 支持
- 🔍 代码提交规范检查
- 🎨 支持暗黑模式
- 📱 响应式布局

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

### 生产环境构建
```bash
pnpm build
```

### 代码检查
```bash
pnpm lint
```

## 项目结构
```
├── docs/                # 项目文档
├── public/             # 静态资源
├── src/                # 源代码
│   ├── api/           # API 接口
│   ├── assets/        # 资源文件
│   ├── components/    # 公共组件
│   ├── layouts/       # 布局组件
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

## 相关文档

- [Vue 3 文档](https://v3.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vitejs.dev/)
- [Ant Design Vue 文档](https://antdv.com/)
- [ESLint 配置指南](./docs/eslint-guide.md)

## 许可证

[MIT](./LICENSE)


