# ESLint 配置指南

## 目录
- [简介](#简介)
- [安装步骤](#安装步骤)
- [配置文件说明](#配置文件说明)
- [规则说明](#规则说明)
- [使用方式](#使用方式)
- [常见问题](#常见问题)

## 简介

本文档详细说明了如何在 Vue 3 + TypeScript 项目中配置 ESLint，包括代码检查、自动修复、提交前检查等功能。

## 安装步骤

### 1. 初始化项目
```bash
# 创建 Vue 项目
pnpm create vite my-vue-app --template vue-ts

# 进入项目目录
cd my-vue-app

# 安装依赖
pnpm install
```

### 2. 安装 ESLint 相关依赖
```bash
# 安装 ESLint 核心包
pnpm add -D eslint

# 安装 Vue 相关插件
pnpm add -D eslint-plugin-vue vue-eslint-parser

# 安装 TypeScript 相关插件
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 安装全局变量包
pnpm add -D globals
```

### 3. 配置 Git 提交检查
```bash
# 安装 husky 和 lint-staged
pnpm add -D husky lint-staged

# 初始化 husky
pnpm dlx husky-init && pnpm install

# 安装 commitlint
pnpm add -D @commitlint/cli @commitlint/config-conventional

# 创建 commitlint 配置
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

## 配置文件说明

### 1. ESLint 配置文件 (eslint.config.js)

配置文件分为三个主要部分：

#### 基础配置
```javascript
const baseConfig = {
  ignores: ['node_modules', 'dist', ...], // 忽略的文件
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,  // 浏览器环境变量
      ...globals.es2021,   // ES2021 特性
      ...globals.node,     // Node.js 环境变量
      // Vue 3 组合式 API
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
    },
  },
};
```

#### 规则配置
```javascript
// TypeScript 规则
const tsRules = {
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  // ... 其他规则
};

// Vue 规则
const vueRules = {
  ...tsRules,
  'vue/multi-word-component-names': 'off',
  'vue/require-default-prop': 'error',
  // ... 其他规则
};
```

#### 导出配置
```javascript
export default [
  // Vue 文件配置
  {
    ...baseConfig,
    files: ['**/*.vue'],
    // Vue 特定配置
  },
  // TypeScript 文件配置
  {
    ...baseConfig,
    files: ['**/*.ts', '**/*.tsx'],
    // TypeScript 特定配置
  },
  // Vite 配置
  {
    ...baseConfig,
    files: ['vite.config.ts'],
    // Vite 特定配置
  },
];
```

### 2. package.json 配置
```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix"
  },
  "lint-staged": {
    "*.{vue,js,jsx,ts,tsx}": "eslint --fix"
  }
}
```

### 3. husky 配置
```bash
# 添加 pre-commit 钩子
npx husky add .husky/pre-commit "pnpm lint-staged"

# 添加 commit-msg 钩子
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

## 规则说明

### TypeScript 规则
- `@typescript-eslint/no-explicit-any`: 禁止使用 any 类型
- `@typescript-eslint/no-unused-vars`: 禁止未使用的变量
- `@typescript-eslint/no-var-requires`: 禁止使用 require 语句
- `@typescript-eslint/prefer-as-const`: 建议使用 as const 断言

### Vue 规则
- `vue/multi-word-component-names`: 组件名必须是多个单词
- `vue/require-default-prop`: props 必须设置默认值
- `vue/require-explicit-emits`: 必须显式声明 emits
- `vue/valid-template-root`: 模板根节点必须有效

## 使用方式

### 1. 开发时
- 编辑器集成 ESLint
- 实时显示错误和警告

### 2. 提交代码时
- 自动运行 lint-staged
- 检查提交信息格式

### 3. 手动检查
```bash
# 检查所有文件
pnpm lint

# 自动修复问题
pnpm lint --fix
```

## 常见问题

### 1. ESLint 报错但代码正确
- 检查是否正确安装了所有依赖
- 检查配置文件是否正确
- 检查是否需要重启编辑器

### 2. 提交时检查失败
- 检查 husky 是否正确安装
- 检查 lint-staged 配置是否正确
- 检查提交信息格式是否符合规范

### 3. 规则冲突
- 检查规则优先级
- 检查是否有重复规则
- 检查规则配置是否正确

## 提交信息规范

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

示例：
```
feat(auth): 添加用户登录功能

- 实现用户名密码登录
- 添加记住密码功能
- 添加验证码功能

Closes #123
``` 