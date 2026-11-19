import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

/**
 * The SDK is published from a public mirror (cryptflare/cryptflare-js) that
 * carries only this package. A static import of a private workspace package
 * (`@cryptflare/shared`, `@cryptflare/mcp-shared`, ...) resolves here and
 * then fails the mirror's `npm test` at release time - which stopped the
 * 1.3.0 publish. Monorepo-only checks read the source by path and skip when
 * it is absent (see core/error-codes.test.ts).
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PRIVATE = /(?:from\s+|import\s*\(\s*|import\s+)['"](@cryptflare\/(?!sdk\b)[^'"]+)['"]/g

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) return entry === 'node_modules' ? [] : sourceFiles(full)
    return /\.(ts|tsx|mts|mjs)$/.test(entry) ? [full] : []
  })
}

describe('imports the public mirror cannot resolve', () => {
  it('src and tests import no private workspace package', () => {
    const offenders: string[] = []
    for (const dir of ['src', 'tests']) {
      for (const file of sourceFiles(join(ROOT, dir))) {
        for (const match of readFileSync(file, 'utf-8').matchAll(PRIVATE)) {
          offenders.push(`${relative(ROOT, file)}: ${match[1] ?? ''}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })
})
