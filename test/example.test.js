// eslint-disable-next-line object-curly-newline
import { describe, it, expect, run } from 'https://raw.githubusercontent.com/internetarchive/dyno/main/test/test.js'


describe('test imports', () => {
  it('importing', () => {
    expect(typeof expect).toEqual('function')
    expect(typeof nope).toEqual('undefined')
  })
})


run()
