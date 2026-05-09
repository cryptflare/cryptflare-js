/**
 * Webhook signature verification.
 *
 * Cryptflare signs every outbound webhook payload with HMAC-SHA256 over
 * a string formed by joining `<timestamp>.<raw body>`. The header
 * `X-Cryptflare-Signature` carries `t=<unix>,v1=<hex>` so the recipient
 * can replay-protect (timestamp bound) and integrity-check (hmac).
 *
 * The shape mirrors what Stripe does so anyone migrating reads the same
 * mental model. The `Webhooks.verify` helper does both checks in one
 * call and returns the parsed payload on success or throws otherwise.
 *
 * Crypto runs through Web Crypto (`crypto.subtle`), so the helper works
 * unchanged on Node, Bun, Deno, Cloudflare Workers, and modern browsers.
 */

import { CryptFlareError } from './errors';
import type { WebhookEvent } from '../types/webhooks';

const HEADER_NAME = 'x-cryptflare-signature';
const DEFAULT_TOLERANCE_SECONDS = 300; // 5 minutes either direction.

export class WebhookVerificationError extends CryptFlareError {
  constructor(message: string, code = 'webhook_signature_invalid') {
    super({ message, code });
  }
}

export type VerifyOptions = {
  /**
   * Maximum drift between the timestamp baked into the signature and the
   * verifier's clock, in seconds. Default 300 (5 minutes). Set to `0` to
   * disable replay protection (do not).
   */
  toleranceSeconds?: number;
  /**
   * Override the current time. Used by tests to feed deterministic input
   * without monkey-patching `Date.now`.
   */
  now?: () => number;
};

/**
 * Verifies the signature header on a webhook delivery.
 *
 * @param body The raw request body as a string. Re-stringifying parsed
 *   JSON breaks the signature - read the raw text from your server's
 *   request object before parsing.
 * @param header The full value of the `X-Cryptflare-Signature` header.
 * @param secret The shared secret printed when the webhook endpoint was
 *   created in the dashboard.
 *
 * @returns The parsed webhook event as a discriminated union over
 *   `event.type`. Switch on `type` to narrow `data` to the shape for
 *   that event family.
 *
 * @throws WebhookVerificationError when the signature is missing,
 *   malformed, expired, or doesn't match the body.
 */
export async function verifyWebhook(
  body: string,
  header: string | null | undefined,
  secret: string,
  options: VerifyOptions = {},
): Promise<WebhookEvent> {
  if (!header) {
    throw new WebhookVerificationError(`Missing ${HEADER_NAME} header`, 'webhook_signature_missing');
  }

  const parts = parseHeader(header);
  if (!parts.timestamp || parts.signatures.length === 0) {
    throw new WebhookVerificationError(`Malformed ${HEADER_NAME} header`, 'webhook_signature_malformed');
  }

  const tolerance = options.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS;
  const now = options.now ? options.now() : Math.floor(Date.now() / 1000);
  if (tolerance > 0 && Math.abs(now - parts.timestamp) > tolerance) {
    throw new WebhookVerificationError(
      `Signature timestamp ${parts.timestamp} is outside the ${tolerance}s tolerance window`,
      'webhook_signature_expired',
    );
  }

  const signed = `${parts.timestamp}.${body}`;
  const expected = await hmacSha256Hex(secret, signed);
  const matched = parts.signatures.some((sig) => constantTimeEqual(sig, expected));
  if (!matched) {
    throw new WebhookVerificationError('Signature does not match payload', 'webhook_signature_mismatch');
  }

  try {
    return JSON.parse(body) as WebhookEvent;
  } catch {
    throw new WebhookVerificationError('Body is not valid JSON', 'webhook_body_invalid');
  }
}

function parseHeader(header: string): { timestamp: number; signatures: string[] } {
  const parts: { timestamp: number; signatures: string[] } = { timestamp: NaN, signatures: [] };
  for (const segment of header.split(',')) {
    const [k, v] = segment.split('=', 2);
    if (!k || !v) continue;
    const key = k.trim();
    const value = v.trim();
    if (key === 't') parts.timestamp = Number(value);
    else if (key === 'v1') parts.signatures.push(value);
  }
  return parts;
}

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  const bytes = new Uint8Array(sig);
  let out = '';
  for (const b of bytes) out += b.toString(16).padStart(2, '0');
  return out;
}

/**
 * Constant-time string comparison. A naive `a === b` short-circuits on
 * the first mismatching byte and leaks signature length / position via
 * timing. This walks every byte and ORs all differences together.
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
