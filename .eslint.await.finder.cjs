// this is <only> use to find missing `await` in front of calling `async` functions
module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    Promise: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./.eslint.await.finder.tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
}
