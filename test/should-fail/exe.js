// lint-test: deno-check-only
// eslint-disable-next-line import/no-unresolved
import { exe } from 'https://av.dev.archive.org/js/util/cmd.js'

exe('ls')
exe('pwd')

await exe('ls').trim()
