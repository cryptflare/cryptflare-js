import { describe, expect, it } from 'vitest'

import { ERRORS as SHARED_ERRORS } from '@cryptflare/shared/constants/errors'

import { ERRORS } from '@/core/errors'

/**
 * The SDK ships its own copy of the error registry because it has no
 * runtime dependency on @cryptflare/shared. This test fails the moment
 * the two drift. Fix: `pnpm --filter @cryptflare/sdk gen:errors`.
 */
describe('ERRORS parity with @cryptflare/shared', () => {
  it('has exactly the same codes as the shared registry', () => {
    expect(Object.keys(ERRORS).sort()).toEqual(Object.keys(SHARED_ERRORS).sort())
  })

  it('maps every key to the same value', () => {
    expect({ ...ERRORS }).toEqual({ ...SHARED_ERRORS })
  })
})
