import js from '@eslint/js'
import compat from 'eslint-plugin-compat'
import html from 'eslint-plugin-html'
import noFloatingPromise from 'eslint-plugin-no-floating-promise'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'

export default [
  {
    // global ignores MUST be their own object, first, with nothing else
    ignores: [
      '**/*.min.js',
      '**/www.gstatic.com/',
      '**/datamaps.js',
      '**/node_modules',
      '**/web_modules',
      '**/reveal.js',
      'eveal.js/reveal.js',

      '__JWPLAYER-STUFF:__',
      'www/jw/',
      'www/jw/head/',
      'www/jw/8/',
      'www/jw/8.2.3/',
      'www/jw/8.8.2/',
      'jwplayer.controls.js',
      'jwplayer.core.js',
      'jwplayer.core.*',
      'polyfills.webvtt.js',
      'vttparser.js',
    ],
  },

  js.configs.recommended,
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
      // OUR OVERRIDES
      // =========================================================

      // we use deno and `import from 'https://..' is fine
      'import/no-unresolved': [2, {
        ignore: [
          '^https://deno.land/x/',
          '^https://deno.land/std(@[0-9^.]+)*/assert/assert.ts$',
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
      'import/extensions': ['off'], // allow `import .. from '.js'` (.js suffix) in JS files
      'import/no-cycle': 'off', // it's ok to have cycles with ES Modules and import
      'compat/compat': 'error', // ensure JS compat w/ 90%+ of currently used browsers via caniuse.com
      'no-floating-promise/no-floating-promise': 2, // suuuuuuper userful
      'max-len': ['error', 100, 2, {
        ignorePattern: '#!/usr/bin/env', // only current variation from airbnb defaults
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
      'no-multiple-empty-lines': [2, { max: 2 }], // showed up as necessary w/ `npm i` Jun11, 2020
      'operator-linebreak': 'off', // showed up w/ babel + eslint updates to latest Sep1, 2019
      camelcase: 'off', // allow snakecase var names if dev desires
      'no-multi-spaces': 'off', // allow: x  = 3 (for example lining up multiple lines by column)
      curly: 'off',  // author discretion when using braces around one-liners or same-liners

      // allow ++ or -- at the end of a for() loop (all other uses are banned per airbnb):
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

      'key-spacing': ['error', { mode: 'minimum' }], // allow objects to column-align vals when multiline

      // allow for (x of array)  and  for (key in obj)  and   for (val in array):
      'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],

      'no-restricted-globals': ['off', 'location'],
      'nonblock-statement-body-position': 'off',
      'func-style': 'off', // not particularly useful...
      'no-await-in-loop': 'off', // not particularly useful...
      'no-return-await': 'off', // not particularly useful...
      indent: ['error', 2, {
        CallExpression: { arguments: 'first' },
        ArrayExpression: 'first',
        FunctionDeclaration: { parameters: 'first' },
        FunctionExpression: { body: 1, parameters: 2 },
      }],
      semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],


      //
      //
      // =========================================================
      // AIRBNB-BASE RULES (not covered by js.configs.recommended
      // and not already overridden above)
      // =========================================================

      // --- variables ---
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
      'no-shadow': ['error', { hoist: 'functions' }],
      'no-shadow-restricted-names': 'error',
      'no-undef-init': 'error',
      'vars-on-top': 'error',
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],

      // --- best practices ---
      'array-callback-return': ['error', { allowImplicit: true }],
      'block-scoped-var': 'error',
      'consistent-return': 'error',
      'default-case': ['error', { commentPattern: '^no default$' }],
      'default-param-last': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'guard-for-in': 'error',
      'no-alert': 'warn',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],
      'no-eq-null': 'off',       // covered by eqeqeq above
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-floating-decimal': 'error',
      'no-global-assign': ['error', { exceptions: [] }],
      // eslint-disable-next-line object-curly-newline
      'no-implicit-coercion': ['off', { boolean: false, number: true, string: true, allow: [] }],
      'no-implicit-globals': 'off',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-magic-numbers': 'off',  // airbnb leaves this off
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: [
          'acc',         // reduce accumulators
          'accumulator',
          'e',           // event.returnValue
          'ctx',         // koa routing
          'context',
          'req',         // express request
          'request',
          'res',         // express response
          'response',
          'staticContext',
        ],
      }],
      'no-proto': 'error',
      'no-return-assign': ['error', 'always'],
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'off',
      'no-unused-expressions': ['error', {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
      }],
      'no-useless-call': 'off',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-void': 'error',
      'no-with': 'error',
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
      radix: 'error',
      'require-await': 'off',
      'wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],
      yoda: 'error',

      // --- errors ---
      'for-direction': 'error',
      'no-console': 'warn',
      'no-constant-condition': 'warn',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-inner-declarations': 'error',
      'no-irregular-whitespace': 'error',
      'no-obj-calls': 'error',
      'no-prototype-builtins': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'use-isnan': 'error',
      'valid-typeof': ['error', { requireStringLiterals: true }],

      // --- ES6 / style ---
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'constructor-super': 'error',
      'generator-star-spacing': ['error', { before: false, after: true }],
      'no-class-assign': 'error',
      'no-confusing-arrow': ['error', { allowParens: true }],
      'no-const-assign': 'error',
      'no-dupe-class-members': 'error',
      'no-duplicate-imports': 'off',  // covered by import/no-duplicates
      'no-new-symbol': 'error',
      'no-this-before-super': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': ['error', {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      }],
      'object-shorthand': ['error', 'always', { avoidQuotes: true, ignoreConstructors: false }],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      'prefer-destructuring': ['error', {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: true, object: false },
      }, { enforceForRenamedProperties: false }],
      'prefer-numeric-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'rest-spread-spacing': ['error', 'never'],
      'symbol-description': 'error',
      'template-curly-spacing': 'error',
      'yield-star-spacing': ['error', 'after'],

      // --- style (formatting) ---
      'array-bracket-newline': ['off', 'consistent'],
      'array-bracket-spacing': ['error', 'never'],
      'array-element-newline': ['off', { multiline: true, minItems: 3 }],
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      }],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'computed-property-spacing': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'func-call-spacing': ['error', 'never'],
      'function-paren-newline': ['error', 'multiline-arguments'],
      'implicit-arrow-linebreak': ['error', 'beside'],
      'jsx-quotes': ['off', 'prefer-double'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'line-comment-position': ['off', { position: 'above' }],
      'linebreak-style': ['error', 'unix'],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],
      'max-depth': ['off', 4],
      'max-lines': ['off', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-params': ['off', 3],
      'max-statements': ['off', 10],
      'multiline-comment-style': ['off', 'starred-block'],
      'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
      'new-parens': 'error',
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-continue': 'error',
      'no-inline-comments': 'off',
      'no-lonely-if': 'error',
      'no-mixed-operators': ['error', {
        groups: [
          ['%', '**'],
          ['%', '+'], ['%', '-'], ['%', '*'], ['%', '/'],
          ['/', '*'],
          ['&', '|', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      }],
      'no-mixed-spaces-and-tabs': 'error',
      'no-negated-condition': 'off',
      'no-nested-ternary': 'error',
      'no-new-object': 'error',
      'no-tabs': 'error',
      'no-trailing-spaces': 'error',
      'no-underscore-dangle': ['error', {
        allow: [],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
      }],
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-whitespace-before-property': 'error',
      'object-curly-newline': ['error', {
        ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
        ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
        ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
        ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
      }],
      'object-curly-spacing': ['error', 'always'],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      'one-var': ['error', 'never'],
      'one-var-declaration-per-line': ['error', 'always'],
      'padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
      'prefer-exponentiation-operator': 'error',
      'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
      quotes: ['error', 'single', { avoidEscape: true }],
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': ['error', { words: true, nonwords: false, overrides: {} }],
      'spaced-comment': ['error', 'always', {
        line: { exceptions: ['-', '+'], markers: ['=', '!', '/'] },
        block: { exceptions: ['-', '+'], markers: ['=', '!', ':', '::'], balanced: true },
      }],
      'switch-colon-spacing': ['error', { after: true, before: false }],
      'template-tag-spacing': ['error', 'never'],
      'unicode-bom': ['error', 'never'],
      'wrap-regex': 'off',

      // --- import plugin (remaining airbnb defaults) ---
      'import/export': 'error',
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: true,
        optionalDependencies: false,
      }],
      'import/no-mutable-exports': 'error',
      'import/no-duplicates': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/prefer-default-export': 'error',
      'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
    },
  },
]
