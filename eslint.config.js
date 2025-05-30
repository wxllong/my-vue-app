import vue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import * as parser from 'vue-eslint-parser';
import globals from 'globals';
import fs from 'fs';
import path from 'path';

// 读取自动导入的全局变量 json 文件（用同步方式，兼容性好）
const autoImportGlobalsPath = path.resolve(process.cwd(), './.eslintrc-auto-import.json');
const autoImportGlobals = fs.existsSync(autoImportGlobalsPath)
  ? JSON.parse(fs.readFileSync(autoImportGlobalsPath, 'utf-8'))
  : { globals: {} };

// 基础通用配置（不包含 parser，不包含 plugins）
const baseConfig = {
  ignores: [
    'node_modules',
    'dist',
    'public',
    '*.d.ts',
    '*.js',
    '*.cjs',
    '*.mjs',
    '*.json',
    '*.md',
    '*.yml',
    '*.yaml',
    '*.lock',
    '.vscode',
    '.git',
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
      ...autoImportGlobals.globals,
      // Vue 3 组合式 API 宏定义，避免 eslint 警告
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
    },
  },
};

// TypeScript 规则（你原来的规则基础上稍作保留）
const tsRules = {
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/ban-ts-comment': 'off',
  'no-undef': 'off', // 关闭原生 no-undef，由 TS 处理
};

// Vue 规则（基于 TS 规则增强）
const vueRules = {
  ...tsRules,
  'vue/multi-word-component-names': 'off', // 可根据需求开关
  'vue/component-api-style': ['error', ['script-setup']], // 强制 script setup 书写风格
  'vue/no-undef-components': 'off', // 开启组件未定义检查
  'vue/no-v-html': 'off',
  'vue/require-default-prop': 'warn',
};

// eslint 配置导出（ESM 格式）
export default [
  // Vue 文件配置
  {
    ...baseConfig,
    files: ['**/*.vue'],
    languageOptions: {
      ...baseConfig.languageOptions,
      parser, // vue-eslint-parser 负责 .vue 文件
      parserOptions: {
        parser: tsParser, // 使用 ts-eslint 解析 <script lang="ts">
        extraFileExtensions: ['.vue'],
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
    },
    rules: vueRules,
  },
  // TS/TSX 文件配置
  {
    ...baseConfig,
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ...baseConfig.languageOptions,
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: tsRules,
  },
];
