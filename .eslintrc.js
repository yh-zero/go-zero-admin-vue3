module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser', //👈解析template
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser', //👈解析script
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-types': ['off'], //👈
    '@typescript-eslint/no-explicit-any': ['off'], //👈允许使用any
    '@typescript-eslint/no-unused-vars': 'off', // 允许使用未使用变量
    'vue/multi-word-component-names': 0,
  },
};
