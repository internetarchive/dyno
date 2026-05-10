import js from '@eslint/js'
import process from 'node:process'
import { existsSync } from 'node:fs'

import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import html from 'eslint-plugin-html'
import compat from 'eslint-plugin-compat'
import noFloatingPromise from 'eslint-plugin-no-floating-promise'
import importPlugin from 'eslint-plugin-import-x'
import globals from 'globals'

const hasPrettier = [
  '.prettierrc', '.prettierrc.js', '.prettierrc.cjs', '.prettierrc.json',
  '.prettierrc.yaml', '.prettierrc.yml', 'prettier.config.js',
  'prettier.config.cjs', 'prettier.config.ts',
].some((f) => existsSync(f))
const requireSemis = /\/petabox\d*(\/|$)/.test(process.cwd())  // Prettier repos don't need this
const checkPromises = !!process.env.LINT_PROMISES

const IGNORES = [
  '**/*.min.js',
  '**/node_modules/**',
  '**/vendor/**',
  '**/web_modules/**',

  // av repo stuff
  '**/www.gstatic.com/**',
  '**/datamaps.js',
  '**/av/www/build/**',
  '**/av/test/captions/**/*.ts',
  '**/av/test/identify/**/*.ts',

  // jwplayer stuff
  '**/www/jw/**',
  '**/jwplayer.controls.js',
  '**/jwplayer.core.js',
  '**/jwplayer.core.*',
  '**/polyfills.webvtt.js',
  '**/vttparser.js',

  // petabox stuff
  // symlink to npm pkg:
  '**/components/bookreader/',
  // 3rd party code:
  '**/components/npm/',
  '**/components/editxml/jquery.json-ui.js',
  '**/components/uploader/jquery.sprintf.js',
  '**/components/uploader/jquery.wysiwyg.js',
  '**/components/uploader/wysiwyg.link.js',

  // lint negative tests -- intentionally bad code
  '**/test/should-fail/**',

  // markdown slide decks stuff
  '**/reveal.js/**',
]

const DEFAULT_RULES = {
  // we use deno in repos, and `import from 'https://..' is fine
  'import/no-unresolved': [2, {
    ignore: [
      '^https://deno.land/x/',
      '^https://deno.land/std(@[0-9^.]+)*/assert/assert.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/crypto/mod.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/encoding/base64.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/fs/mod.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/http/cookie.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/http/file_server.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/http/server.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/io/mod.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/io/read_all.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/io/write_all.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/node/fs/promises.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/path/mod.ts$',
      '^https://deno.land/std(@[0-9^.]+)*/testing/bdd.ts$',
      '^https://esm.archive.org/',
      '^https://esm.ext.archive.org/',
      '^https://cdn.skypack.dev/sinon@v15.0.2',
      '^https://cdn.skypack.dev/masto',
      '^https://archive.org/components/related/related.js$',
      '^https://av.archive.org/js/jwplayer.js$',
      '^https://av.archive.org/js/play.js$',
      '^https://av.archive.org/js/player.js$',
      '^https://av.archive.org/js/time.js$',
      '^https://av.archive.org/js/playset.js$',
      '^https://av.archive.org/js/util/cmd.js$',
      '^https://av.archive.org/js/util/cgiarg.js$',
      '^https://av.archive.org/js/util/log.js$',
      '^https://av.archive.org/js/util/strings.js$',
      '^https://av.dev.archive.org/js/play.js$',
      '^https://raw.githubusercontent.com/internetarchive/dyno/main/test/test.js$',
      // for lit SSR:
      '^npm:lit$',
      '^npm:@lit-labs/ssr',
      // optional peer deps — loaded dynamically if installed in the target repo
      '^eslint-config-prettier$',
      '^typescript-eslint$',
    ],
  }],
  'import/extensions': 'off', // allow `import .. from '.js'` (.js suffix) in JS files
  'import/no-cycle': 'off', // it's ok to have cycles with ES Modules and import
  'compat/compat': 'error', // ensure JS compat w/ 90%+ of currently used browsers via caniuse.com
  'no-floating-promise/no-floating-promise': 2, // suuuuuuper useful

  // =========================================================
  // STYLE OVERRIDES (on top of stylistic.configs.customize)
  // =========================================================

  // TS-specific @stylistic rules — off globally, re-enabled for .ts in buildTsConfigs() below
  '@stylistic/member-delimiter-style': 'off',
  '@stylistic/type-annotation-spacing': 'off',
  '@stylistic/type-generic-spacing': 'off',
  '@stylistic/type-named-tuple-spacing': 'off',


  '@stylistic/max-len': ['error', 100, 2, {
    ignorePattern: '#!/usr/bin/env',
    ignoreUrls: true,
    ignoreComments: true,
    ignoreRegExpLiterals: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
  }],
  '@stylistic/max-statements-per-line': ['error', { max: 2 }],
  '@stylistic/no-multi-spaces': 'off', // allow: x  = 3 (lining up multiple lines by column)
  '@stylistic/key-spacing': ['error', { mode: 'minimum' }], // allow column-aligning object values
  '@stylistic/operator-linebreak': 'off',
  '@stylistic/no-multiple-empty-lines': [2, { max: 2 }],
  '@stylistic/quote-props': ['error', 'as-needed'],
  '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
  '@stylistic/indent': ['error', 2, { // override customize's defaults for first-arg alignment
    CallExpression: { arguments: 'first' },
    ArrayExpression: 'first',
    FunctionDeclaration: { parameters: 'first' },
    FunctionExpression: { body: 1, parameters: 2 },
  }],

  // =========================================================
  // LOGIC / QUALITY
  // =========================================================

  'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
  camelcase: 'off', // allow snake_case if dev desires
  curly: 'off', // author discretion on braces around one-liners
  'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
  'no-restricted-globals': ['off', 'location'],
  'no-console': 'warn',
  'no-constant-condition': 'warn',
  'no-unused-vars': ['error', {
    vars: 'all',
    args: 'after-used',
    ignoreRestSiblings: true,
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
    caughtErrorsIgnorePattern: '^_',
  }],
  'no-shadow': ['error', { hoist: 'functions' }],
  'no-var': 'error',
  'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'no-param-reassign': ['error', {
    props: true,
    ignorePropertyModificationsFor: [
      'acc', 'accumulator',
      'e',                   // event.returnValue
      'ctx', 'context',
      'req', 'request',
      'res', 'response',
      'staticContext',
    ],
  }],
  'prefer-template': 'error',
  'arrow-body-style': ['error', 'as-needed'],
  'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
  'no-promise-executor-return': 'error',
  'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
  'prefer-object-has-own': 'error',

  // =========================================================
  // IMPORT PLUGIN
  // =========================================================

  'import/no-extraneous-dependencies': ['error', {
    devDependencies: true,
    optionalDependencies: false,
  }],
  'import/no-duplicates': 'error',
  'import/first': 'error',
  'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
}


export default (async () => {
  // If repo has a Prettier config: disable @stylistic rules that conflict with Prettier.
  let prettierConfig = []
  if (hasPrettier)
    prettierConfig = [(await import('eslint-config-prettier')).default]

  return [
    { ignores: IGNORES }, // global ignores MUST be their own object, first, with nothing else

    js.configs.recommended,

    stylistic.configs.customize({
      indent: 2,
      quotes: 'single',
      semi: requireSemis,
      arrowParens: true,
      braceStyle: '1tbs',
      commaDangle: 'always-multiline',
    }),

    {
      plugins: {
        compat,
        html,
        'no-floating-promise': noFloatingPromise,
        import: importPlugin,
      },

      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          Deno: false,
          globalThis: false,
        },
      },

      settings: {
        browsers: ['> 1%', 'not op_mini all'], // for eslint-plugin-compat
      },

      rules: DEFAULT_RULES,
    },

    ...buildTsConfigs(),

    // LINT_PROMISES: type-aware promise checking via typescript-eslint
    ...(checkPromises
      ? [{
        languageOptions: {
          parser: tseslint.parser,
          parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
          },
        },
        plugins: { '@typescript-eslint': tseslint.plugin },
        rules: {
          '@typescript-eslint/no-floating-promises': 'error',
          'no-floating-promise/no-floating-promise': 'off',
        },
      }]
      : []),

    // Prettier repos: disable all @stylistic formatting rules, let Prettier own them.
    // Quality/logic rules above are unaffected.
    ...prettierConfig,
  ]
})()


// TS quality rules for .ts/.tsx files — no-op on plain JS repos.
// Includes Chai test file carve-out (getter assertions like .to.exist aren't function calls).
function buildTsConfigs() {
  return [
    ...tseslint.config({
      files: ['**/*.ts', '**/*.tsx'],
      extends: [tseslint.configs.recommended],
      rules: {
        // re-enable TS-specific @stylistic rules (only fire on TS syntax).
        // These survive ...prettierConfig (which comes after) because eslint-config-prettier
        // intentionally leaves them alone — Prettier doesn't touch these TS-specific constructs
        // (interface member delimiters, type annotation spacing, generics, named tuple spacing).
        '@stylistic/member-delimiter-style': 'error',
        '@stylistic/type-annotation-spacing': 'error',
        '@stylistic/type-generic-spacing': 'error',
        '@stylistic/type-named-tuple-spacing': 'error',

        // TS-aware replacements for base rules
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', {
          functions: false,
          classes: true,
          variables: true,
        }],

        // loosen a few recommended defaults for pragmatic use
        '@typescript-eslint/no-explicit-any': 'warn',

        // TS handles module resolution (path aliases, .svg, etc.) — this rule is blind to them
        'import/no-unresolved': 'off',

        // recommended default fires on `a && b()` and optional chains — too noisy
        '@typescript-eslint/no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        }],

        // re-assert base quality rules that typescript-eslint.configs.recommended
        // may clobber via its own base config objects (which have no files filter)
        'no-shadow': ['error', { hoist: 'functions' }],
        'no-var': 'error',
        'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'prefer-template': 'error',
        'no-promise-executor-return': 'error',
      },
    }),
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
      },
    },
  ]
}
