module.exports = {
  // used for lint-checking JS

  extends: 'airbnb-base',
  root: true,
  plugins: [
    'compat',
    'no-floating-promise',
    'eslint-plugin-html',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
  },
  env: {
    browser: true,
  },
  globals: {
    Deno: false,
    globalThis: false,
  },
  ignorePatterns: [
    '**/*.min.js',
    '**/jw/8/',
    '**/datamaps.js',
    '**/node_modules',
    '**/web_modules',
    '**/reveal.js',
    'eveal.js/reveal.js',
  ],
  rules: {
    // we use deno and `import from 'https://..' is fine
    'import/no-unresolved': [2, {
      ignore: [
        '^https://deno.land/x/',
        '^https://deno.land/std/assert/assert.ts$',
        '^https://deno.land/std/encoding/base64.ts$',
        '^https://deno.land/std/fs/mod.ts$',
        '^https://deno.land/std/http/cookie.ts$',
        '^https://deno.land/std/http/file_server.ts$',
        '^https://deno.land/std/http/server.ts$',
        '^https://deno.land/std/io/mod.ts$',
        '^https://deno.land/std/io/read_all.ts$',
        '^https://deno.land/std/io/write_all.ts$',
        '^https://deno.land/std/node/fs/promises.ts$',
        '^https://deno.land/std/path/mod.ts$',
        '^https://deno.land/std/testing/bdd.ts$',
        '^https://esm.archive.org/',
        '^https://cdn.skypack.dev/sinon@v15.0.2',
        '^https://cdn.skypack.dev/masto',
        '^https://offshoot.prod.archive.org/lit.js$',
        '^https://archive.org/components/related/related.js$',
        '^https://home.archive.org/components/related/related.js$',
        '^https://av.prod.archive.org/js/jwplayer.js$',
        '^https://av.prod.archive.org/js/play.js$',
        '^https://av.prod.archive.org/js/time.js$',
        '^https://av.prod.archive.org/js/playset.js$',
        '^https://av.prod.archive.org/js/util/cmd.js$',
        '^https://av.prod.archive.org/js/util/cgiarg.js$',
        '^https://av.prod.archive.org/js/util/log.js$',
        '^https://av.prod.archive.org/js/util/strings.js$',
        '^https://raw.githubusercontent.com/internetarchive/dyno/main/test/test.js$',
        // for lit SSR:
        '^npm:lit$',
        '^npm:@lit-labs/ssr',
      ],
    }],

    'max-len': ['error', 100, 2, {
      ignorePattern: '#!/usr/bin/env', // only current variation from airbnb defaults
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    // suuuuuuper userful
    'no-floating-promise/no-floating-promise': 2,

    // not particularly useful...
    'no-await-in-loop': 'off',

    // not particularly useful...
    'no-return-await': 'off',

    // allow `import .. from '.js'` (.js suffix) in JS files
    'import/extensions': ['off'],

    // this just showed up as necessary w/ `npm i` on Jun11, 2020
    'no-multiple-empty-lines': [2, { max: 2 }],

    // this just showed up w/ babel + eslint updates to latest versions Sep1,2019
    'operator-linebreak': 'off',
    'import/no-cycle': 'off', // it's ok to have cycles with ES Modules and import

    // 'make sure all used JS compatible with 90%+ of currently used browsers a la caniuse.com'
    'compat/compat': 'error',

    // 'allow snakecase var names if dev desires'
    camelcase: 'off',

    // 'allow: x  = 3 (for example lining up multiple lines by column)'
    'no-multi-spaces': 'off',

    // 'author discretion when using braces around one-liners or same-liners'
    curly: 'off',

    // 'allow ++ or -- at the end of a for() loop (all other uses are banned per airbnb!)'
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    // 'allow JSON/map definitions to column-align values when multiline'
    'key-spacing': ['error', { mode: 'minimum' }],

    // 'allow for (x of array)  and  for (key in obj)  and   for (val in array)'
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],

    'no-restricted-globals': ['off', 'location'],

    'nonblock-statement-body-position': 'off',

    indent: ['error', 2, {
      CallExpression: { arguments: 'first' },
      ArrayExpression: 'first',
      FunctionDeclaration: { parameters: 'first' },
      FunctionExpression: { body: 1, parameters: 2 },
    }],

    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
  },
}
