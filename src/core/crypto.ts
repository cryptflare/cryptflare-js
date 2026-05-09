/**
 * Client-side envelope encryption helpers.
 *
 * The CryptFlare server stores secret values as opaque strings, so we
 * can layer customer-side AES-256-GCM encryption on top WITHOUT any API
 * contract change. The plaintext never leaves the calling process; only
 * a JSON-encoded envelope (ciphertext + IV + auth tag + wrapped data
 * key) reaches the server. Even an operator with full database access
 * cannot read the secret without the customer's master key.
 *
 * Design:
 *   - Per-secret 256-bit data key (DK), AES-GCM with a fresh 12-byte IV.
 *   - DK wrapped with the customer master key. Ships with `LocalKeyring`
 *     (AES-KW, master key in the calling process) for the simple case;
 *     external KMS adapters can implement the same `Keyring` interface.
 *   - Envelope serialised as JSON, base64-encoded fields, and version-
 *     tagged so we can change the algorithm in future without breaking
 *     existing values.
 *
 * Limitations:
 *   - The customer's master key sits in process memory while the SDK is
 *     loaded. For zero-knowledge mode a KMS-backed Keyring is the right
 *     answer (out of scope for this initial drop, see
 *     docs/standards/sdk/envelope-encryption-plan.md).
 *   - All crypto runs through Web Crypto, available natively on Node 20+,
 *     Workers, Deno, Bun, and modern browsers. No Node-specific APIs.
 */

const ENVELOPE_PREFIX = 'cfenv:v1:';
const ALG_GCM = 'AES-GCM';
const ALG_KW = 'AES-KW';

export type Envelope = {
  /** Schema version. Bump when the wire format changes. */
  version: 1;
  /** AES-256-GCM ciphertext (base64). */
  ct: string;
  /** Initialisation vector (base64, 12 bytes). */
  iv: string;
  /** Wrapped data key (base64). */
  wdk: string;
  /** Identifier for the master key that wrapped the DK. Lets a Keyring
   *  rotate keys without breaking older secrets. */
  kid: string;
};

/**
 * Wraps and unwraps the per-secret data key. `LocalKeyring` ships in the
 * SDK; KMS-backed implementations live in caller code or future
 * sub-path packages (`@cryptflare/sdk/keyrings/aws-kms`, etc.).
 */
export interface Keyring {
  /** Stable identifier so envelopes can find their key on unseal. */
  readonly kid: string;
  /** Wrap a 256-bit raw data key. */
  wrap(rawDk: ArrayBuffer): Promise<ArrayBuffer>;
  /** Unwrap a previously wrapped data key. */
  unwrap(wrapped: ArrayBuffer): Promise<ArrayBuffer>;
}

/**
 * AES-KW based keyring. Master key is supplied at construction time and
 * stays in memory. Suitable for development and for callers who already
 * fetch their master key from another secrets store (Vault, AWS Secrets
 * Manager, etc.) and just need a thin wrapping primitive.
 */
export class LocalKeyring implements Keyring {
  readonly kid: string;
  private readonly key: Promise<CryptoKey>;

  constructor(input: {
    /** Master key as either 32 raw bytes (Uint8Array) or a base64-encoded
     *  string. Anything else is rejected to avoid common shape mistakes. */
    masterKey: Uint8Array | string;
    /** Identifier baked into envelopes so different keyrings can co-exist. */
    kid?: string;
  }) {
    this.kid = input.kid ?? 'local-1';
    const raw = typeof input.masterKey === 'string'
      ? base64Decode(input.masterKey)
      : input.masterKey;
    if (raw.byteLength !== 32) {
      throw new Error(`LocalKeyring master key must be 32 bytes; got ${raw.byteLength}`);
    }
    this.key = crypto.subtle.importKey(
      'raw',
      bufferOf(raw),
      { name: ALG_KW, length: 256 },
      false,
      ['wrapKey', 'unwrapKey'],
    );
  }

  async wrap(rawDk: ArrayBuffer): Promise<ArrayBuffer> {
    const dkKey = await crypto.subtle.importKey('raw', rawDk, ALG_GCM, true, ['encrypt']);
    const wrapped = await crypto.subtle.wrapKey('raw', dkKey, await this.key, ALG_KW);
    return wrapped;
  }

  async unwrap(wrapped: ArrayBuffer): Promise<ArrayBuffer> {
    const dkKey = await crypto.subtle.unwrapKey(
      'raw',
      wrapped,
      await this.key,
      ALG_KW,
      ALG_GCM,
      true,
      ['decrypt'],
    );
    // `exportKey('raw', ...)` is always an ArrayBuffer at runtime; the
    // type union with JsonWebKey only applies to format='jwk'.
    return (await crypto.subtle.exportKey('raw', dkKey)) as ArrayBuffer;
  }
}

/**
 * Encrypts `plaintext` with a fresh per-call data key wrapped by the
 * supplied keyring. Returns a deterministic JSON string that callers
 * pass as the secret value.
 */
export async function seal(plaintext: string, keyring: Keyring): Promise<string> {
  const rawDk = crypto.getRandomValues(new Uint8Array(32));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const dkKey = await crypto.subtle.importKey('raw', bufferOf(rawDk), ALG_GCM, false, ['encrypt']);
  const ct = await crypto.subtle.encrypt({ name: ALG_GCM, iv: bufferOf(iv) }, dkKey, new TextEncoder().encode(plaintext));
  const wdk = await keyring.wrap(bufferOf(rawDk));

  const envelope: Envelope = {
    version: 1,
    ct: base64Encode(new Uint8Array(ct)),
    iv: base64Encode(iv),
    wdk: base64Encode(new Uint8Array(wdk)),
    kid: keyring.kid,
  };
  return ENVELOPE_PREFIX + JSON.stringify(envelope);
}

/**
 * Inverse of `seal`. Throws if the envelope is malformed, the keyring's
 * `kid` doesn't match, or the auth tag fails. Returns the original
 * plaintext.
 */
export async function unseal(envelopeStr: string, keyring: Keyring): Promise<string> {
  if (!envelopeStr.startsWith(ENVELOPE_PREFIX)) {
    throw new Error('not an envelope-encrypted value');
  }
  const env = JSON.parse(envelopeStr.slice(ENVELOPE_PREFIX.length)) as Envelope;
  if (env.version !== 1) throw new Error(`unsupported envelope version ${env.version}`);
  if (env.kid !== keyring.kid) {
    throw new Error(`envelope was sealed with kid=${env.kid}, keyring is kid=${keyring.kid}`);
  }
  const rawDk = await keyring.unwrap(bufferOf(base64Decode(env.wdk)));
  const dkKey = await crypto.subtle.importKey('raw', rawDk, ALG_GCM, false, ['decrypt']);
  const plain = await crypto.subtle.decrypt(
    { name: ALG_GCM, iv: bufferOf(base64Decode(env.iv)) },
    dkKey,
    bufferOf(base64Decode(env.ct)),
  );
  return new TextDecoder().decode(plain);
}

/** True when `s` looks like a string sealed by `seal()`. */
export function isEnvelope(s: string): boolean {
  return s.startsWith(ENVELOPE_PREFIX);
}

// -- helpers ----------------------------------------------------------

function bufferOf(input: Uint8Array | ArrayBuffer): ArrayBuffer {
  if (input instanceof ArrayBuffer) return input;
  // Always copy into a fresh ArrayBuffer so SharedArrayBuffer or offset
  // views never reach Web Crypto (which rejects them on some runtimes).
  return input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength) as ArrayBuffer;
}

function base64Encode(bytes: Uint8Array): string {
  // Same logic across Node, browsers, Workers, Bun, Deno.
  let s = '';
  for (let i = 0; i < bytes.byteLength; i++) s += String.fromCharCode(bytes[i]!);
  return globalThis.btoa(s);
}

function base64Decode(b64: string): Uint8Array {
  const s = globalThis.atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}
