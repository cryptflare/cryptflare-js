import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { describe, expect, it } from 'vitest'

import { ERRORS } from '@/core/errors'

/**
 * The SDK ships its own copy of the error registry because it has no
 * runtime dependency on @cryptflare/shared.
 *
 * The parity half reads the server's registry from the monorepo source.
 * The public mirror (cryptflare/cryptflare-js) carries only this package, so
 * there the source is not on disk and that half skips; a static import of
 * `@cryptflare/shared` stopped the 1.3.0 publish (`npm test` could not resolve
 * it). The registry checks below run everywhere.
 */
const SHARED_ERRORS = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../../../shared/src/constants/errors.ts',
)

describe('the ERRORS registry', () => {
  it('maps every code to itself', () => {
    for (const [key, value] of Object.entries(ERRORS)) expect(value).toBe(key)
  })

  it('names codes in SCREAMING_SNAKE_CASE', () => {
    for (const key of Object.keys(ERRORS)) expect(key).toMatch(/^[A-Z][A-Z0-9_]*$/)
  })
})

describe.skipIf(!existsSync(SHARED_ERRORS))('ERRORS parity with @cryptflare/shared', () => {
  it('has exactly the same codes and values as the shared registry', async () => {
    // Fix drift with `pnpm --filter @cryptflare/sdk gen:errors`.
    const shared = (await import(pathToFileURL(SHARED_ERRORS).href)) as {
      ERRORS: Record<string, string>
    }
    expect({ ...ERRORS }).toEqual({ ...shared.ERRORS })
  })
})
