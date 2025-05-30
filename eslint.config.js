import vue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import * as parser from 'vue-eslint-parser';
import globals from 'globals';

// 基础配置
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
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
    },
  },
};

// TypeScript 规则
const tsRules = {
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/no-array-constructor': 'error',
  '@typescript-eslint/no-empty-function': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-var-requires': 'error',
  '@typescript-eslint/prefer-as-const': 'warn',
  'no-undef': 'error',
  'no-console': ['warn', { allow: ['warn', 'error'] }],
};

// Vue 规则
const vueRules = {
  ...tsRules,
  'vue/multi-word-component-names': 'off',
  'vue/no-v-html': 'off',
  'vue/require-default-prop': 'error',
  'vue/require-explicit-emits': 'error',
  'vue/require-prop-types': 'error',
  'vue/require-toggle-inside-transition': 'error',
  'vue/return-in-computed-property': 'error',
  'vue/return-in-emits-validator': 'error',
  'vue/use-v-on-exact': 'error',
  'vue/valid-define-emits': 'error',
  'vue/valid-define-props': 'error',
  'vue/valid-next-tick': 'error',
  'vue/valid-template-root': 'error',
  'vue/valid-v-bind': 'error',
  'vue/valid-v-cloak': 'error',
  'vue/valid-v-else-if': 'error',
  'vue/valid-v-else': 'error',
  'vue/valid-v-for': 'error',
  'vue/valid-v-html': 'error',
  'vue/valid-v-if': 'error',
  'vue/valid-v-is': 'error',
  'vue/valid-v-memo': 'error',
  'vue/valid-v-model': 'error',
  'vue/valid-v-on': 'error',
  'vue/valid-v-once': 'error',
  'vue/valid-v-pre': 'error',
  'vue/valid-v-show': 'error',
  'vue/valid-v-slot': 'error',
  'vue/valid-v-text': 'error',
};

export default [
  // Vue 文件配置
  {
    ...baseConfig,
    files: ['**/*.vue'],
    languageOptions: {
      ...baseConfig.languageOptions,
      parser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
    },
    rules: vueRules,
  },
  // TypeScript 文件配置
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
  // Vite 配置
  {
    ...baseConfig,
    files: ['vite.config.ts'],
    languageOptions: {
      ...baseConfig.languageOptions,
      globals: {
        ...baseConfig.languageOptions.globals,
        __dirname: 'readonly',
      },
    },
  },
]; 