import type { HttpMethod } from '../types/options'
import { readPath } from './guards'

/** Mutating verbs that auto-attach an `Idempotency-Key` when retries are enabled. */
const MUTATING_VERBS: ReadonlySet<HttpMethod> = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export function isMutatingVerb(method: HttpMethod): boolean {
  return MUTATING_VERBS.has(method)
}

/**
 * Generates an `Idempotency-Key` value. Prefers the platform's
 * `crypto.randomUUID()` (Workers, Node 19+, browsers, Bun, Deno) and
 * falls back to a manually composed UUID v4 only when the platform does
 * not expose Web Crypto. The fallback is functional but ships with a
 * `Math.random()` source - acceptable for idempotency keys (collision
 * resistance, not security) but never used for cryptographic material.
 */
export function newIdempotencyKey(): string {
  // Read structurally: Workers type packages and DOM lib disagree on
  // whether `globalThis.crypto` is declared, and some runtimes lack it.
  const cryptoObj = readPath(globalThis, 'crypto')
  const randomUUID = readPath(cryptoObj, 'randomUUID')
  if (typeof randomUUID === 'function') {
    const id: unknown = Reflect.apply(randomUUID, cryptoObj, [])
    if (typeof id === 'string') return id
  }
  return fallbackUuidV4()
}

function fallbackUuidV4(): string {
  const hex = '0123456789abcdef'
  const bytes = new Array<string>(36)
  for (let i = 0; i < 36; i += 1) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      bytes[i] = '-'
      continue
    }
    if (i === 14) {
      bytes[i] = '4'
      continue
    }
    let r = (Math.random() * 16) | 0
    if (i === 19) r = (r & 0x3) | 0x8
    bytes[i] = hex[r] ?? '0'
  }
  return bytes.join('')
}
