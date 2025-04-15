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
    '**/www.gstatic.com/',
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
        '^https://offshoot.prod.archive.org/lit.js$',
        '^https://archive.org/components/related/related.js$',
        '^https://home.archive.org/components/related/related.js$',
        '^https://av.archive.org/js/jwplayer.js$',
        '^https://av.archive.org/js/play.js$',
        '^https://av.archive.org/js/time.js$',
        '^https://av.archive.org/js/playset.js$',
        '^https://av.archive.org/js/util/cmd.js$',
        '^https://av.archive.org/js/util/cgiarg.js$',
        '^https://av.archive.org/js/util/log.js$',
        '^https://av.archive.org/js/util/strings.js$',
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
