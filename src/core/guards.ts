/**
 * Runtime narrowing helpers for untrusted values (parsed JSON, runtime
 * globals that may not exist). They replace structural `as` casts so a
 * missing field reads as `undefined` instead of being assumed present.
 *
 * @internal
 */

/** True for a non-null, non-array object, safe to read with string keys. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Reads a nested property path without trusting any level to exist.
 * `readPath(globalThis, 'process', 'env')` is `undefined` on runtimes
 * with no `process` global instead of throwing a ReferenceError.
 */
export function readPath(root: unknown, ...keys: string[]): unknown {
  let current: unknown = root
  for (const key of keys) {
    if ((typeof current !== 'object' && typeof current !== 'function') || current === null)
      return undefined
    current = Reflect.get(current, key)
  }
  return current
}

/** Reads a string property, or `undefined` when absent or not a string. */
export function readString(root: unknown, ...keys: string[]): string | undefined {
  const value = readPath(root, ...keys)
  return typeof value === 'string' ? value : undefined
}
