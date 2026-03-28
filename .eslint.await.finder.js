// this is <only> use to find missing `await` in front of calling `async` functions
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url))

export default tseslint.config({
  languageOptions: {
    globals: {
      Promise: 'readonly',
      // node globals
      __dirname: false,
      __filename: false,
      process: false,
      require: false,
      module: false,
      exports: false,
    },
    parser: tseslint.parser,
    parserOptions: {
      sourceType: 'module',
      tsconfigRootDir: __dirname,
      project: ['./.eslint.await.finder.tsconfig.json'],
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
  ],
})
