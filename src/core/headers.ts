/**
 * Header keys whose values may contain a credential. Matched
 * case-insensitively; the value is replaced with `<redacted>` before any
 * hook or logger sees the request. Adding a new header to this regex is
 * the only safe place to ratchet redaction; keep it in sync with new
 * header names introduced by API features.
 */
const SECRET_HEADER_PATTERN = /token|key|secret|cookie|authorization/i;

const REDACTED = '<redacted>';

/** Returns a shallow copy of the headers with secret-looking values masked. */
export function redactHeaders(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(headers)) {
    out[name] = SECRET_HEADER_PATTERN.test(name) ? REDACTED : value;
  }
  return out;
}

/**
 * Coerces a `Headers` object, plain record, or undefined into a
 * lower-case-keyed plain record. Lower-casing makes downstream merges and
 * redaction predictable; HTTP header names are case-insensitive so this
 * loses no information.
 */
export function normaliseHeaders(input?: HeadersInit): Record<string, string> {
  if (!input) return {};
  if (input instanceof Headers) {
    const out: Record<string, string> = {};
    input.forEach((value, key) => { out[key.toLowerCase()] = value; });
    return out;
  }
  if (Array.isArray(input)) {
    const out: Record<string, string> = {};
    for (const [key, value] of input) {
      if (typeof key === 'string' && typeof value === 'string') {
        out[key.toLowerCase()] = value;
      }
    }
    return out;
  }
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string') out[key.toLowerCase()] = value;
  }
  return out;
}
