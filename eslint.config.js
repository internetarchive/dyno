import js from '@eslint/js'
import process from 'node:process'

import stylistic from '@stylistic/eslint-plugin'
import compat from 'eslint-plugin-compat'
import html from 'eslint-plugin-html'
import noFloatingPromise from 'eslint-plugin-no-floating-promise'
import importPlugin from 'eslint-plugin-import-x'
import globals from 'globals'

const requireSemis = /\/petabox\d*(\/|$)/.test(process.cwd())

export default [
  {
    // global ignores MUST be their own object, first, with nothing else
    ignores: [
      '**/*.min.js',
      '**/node_modules/**',
      '**/web_modules/**',

      // av repo stuff
      '**/www.gstatic.com/**',
      '**/datamaps.js',
      '**/av/www/build/**',

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

      // markdown slide decks stuff
      '**/reveal.js/**',
    ],
  },

  js.configs.recommended,

  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
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

    rules: {

      // =========================================================
      // IA / DENO SPECIFICS
      // =========================================================

      // we use deno and `import from 'https://..' is fine
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
        ],
      }],
      'import/extensions': 'off', // allow `import .. from '.js'` (.js suffix) in JS files
      'import/no-cycle': 'off', // it's ok to have cycles with ES Modules and import
      'compat/compat': 'error', // ensure JS compat w/ 90%+ of currently used browsers via caniuse.com
      'no-floating-promise/no-floating-promise': 2, // suuuuuuper useful

      // =========================================================
      // STYLE OVERRIDES (on top of stylistic.configs.customize)
      // =========================================================

      // customize() includes TS-specific rules that crash on ESLint v10 in plain JS projects
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
      '@stylistic/semi': ['error', requireSemis ? 'always' : 'never'],
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
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
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
    },
  },
]
