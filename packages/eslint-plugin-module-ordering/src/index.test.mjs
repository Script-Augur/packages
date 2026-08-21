import { RuleTester } from 'eslint'
import tseslint from 'typescript-eslint'
import { describe, it } from 'node:test'

import moduleOrderingPlugin from './index.mjs'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
})

describe('module-ordering', () => {
  it('flags export type before a later export function', () => {
    ruleTester.run(
      'module-ordering',
      moduleOrderingPlugin.rules['module-ordering'],
      {
        valid: [
          {
            filename: 'src/example.ts',
            code: `
export const X = 1
export function f() {}
export type T = { a: string }
`,
          },
        ],
        invalid: [
          {
            filename: 'src/example.ts',
            code: `
export const X = 1
export type T = { a: string }
export function f() {}
`,
            errors: [
              { messageId: 'wrongOrderBefore' },
              { messageId: 'wrongOrder' },
            ],
            output: `
export const X = 1
export function f() {}
export type T = { a: string }
`,
          },
        ],
      }
    )
  })

  it('keeps JSDoc attached when reordering export function past export type', () => {
    ruleTester.run(
      'module-ordering',
      moduleOrderingPlugin.rules['module-ordering'],
      {
        valid: [],
        invalid: [
          {
            filename: 'src/example.ts',
            code: `
/**
 * Options for f.
 */
export type T = { a: string }

/**
 * Does the thing.
 *
 * @returns nothing
 */
export function f() {}
`,
            errors: [
              { messageId: 'wrongOrderBefore' },
              { messageId: 'wrongOrder' },
            ],
            output: `
/**
 * Does the thing.
 *
 * @returns nothing
 */
export function f() {}
/**
 * Options for f.
 */
export type T = { a: string }
`,
          },
        ],
      }
    )
  })

  it('does not pull a file header across a blank line onto the first export', () => {
    ruleTester.run(
      'module-ordering',
      moduleOrderingPlugin.rules['module-ordering'],
      {
        valid: [],
        invalid: [
          {
            filename: 'src/example.ts',
            code: `
/* file header */

/**
 * Options for f.
 */
export type T = { a: string }

/**
 * Does the thing.
 */
export function f() {}
`,
            errors: [
              { messageId: 'wrongOrderBefore' },
              { messageId: 'wrongOrder' },
            ],
            output: `
/* file header */

/**
 * Does the thing.
 */
export function f() {}
/**
 * Options for f.
 */
export type T = { a: string }
`,
          },
        ],
      }
    )
  })
})
