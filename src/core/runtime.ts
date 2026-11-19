import { VERSION } from '../version'
import { readPath, readString } from './guards'

export type Runtime = 'node' | 'bun' | 'deno' | 'workers' | 'browser' | 'unknown'

/**
 * Detects the JavaScript runtime the SDK is executing in. Used by the
 * User-Agent header and the browser-refusal check at construct time. The
 * checks are ordered most-specific first so a Bun process is reported as
 * `bun`, not `node`, even though `process` is defined in both.
 */
export function detectRuntime(): Runtime {
  const g: unknown = globalThis

  if (readPath(g, 'Bun') !== undefined) return 'bun'
  if (readPath(g, 'Deno') !== undefined) return 'deno'

  // Cloudflare Workers and similar edge runtimes expose a navigator.userAgent
  // string starting with "Cloudflare-Workers" but no `process` object.
  const userAgent = readString(g, 'navigator', 'userAgent')
  if (
    userAgent !== undefined &&
    /Cloudflare-Workers|Vercel-Edge|Netlify Edge|workerd/i.test(userAgent)
  ) {
    return 'workers'
  }

  // Heuristic for browsers: window + document. Workers has neither; Node
  // has neither. Excluding the workers branch above, this is reliable.
  if (readPath(g, 'window') !== undefined && readPath(g, 'document') !== undefined) {
    return 'browser'
  }

  if (readString(g, 'process', 'versions', 'node') !== undefined) {
    return 'node'
  }

  return 'unknown'
}

/**
 * Builds the SDK's User-Agent header. Format:
 *   `cryptflare-sdk-ts/<version> (<runtime>; <extra>)`
 * The `extra` portion is supplied by the embedding application (e.g. the
 * CLI passes `cli/0.1.0`) so analytics and rate-limit logs can attribute
 * traffic to the right surface.
 */
export function getUserAgent(suffix?: string): string {
  const runtime = detectRuntime()
  const base = `cryptflare-sdk-ts/${VERSION} (${runtime})`
  return suffix ? `${base} ${suffix}` : base
}
