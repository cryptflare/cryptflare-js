import { describe, expect, it } from 'vitest';
import { verifyWebhook, WebhookVerificationError } from '@/core/webhooks';

const SECRET = 'whsec_super_secret_value';

async function makeHeader(body: string, timestamp: number, secret = SECRET): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`${timestamp}.${body}`));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `t=${timestamp},v1=${hex}`;
}

describe('verifyWebhook', () => {
  const body = JSON.stringify({ id: 'evt_1', type: 'secret.rotated' });
  const fixedNow = 1_700_000_000;
  const now = () => fixedNow;

  it('parses payload when signature is valid', async () => {
    const header = await makeHeader(body, fixedNow);
    const event = await verifyWebhook(body, header, SECRET, { now });
    expect(event).toEqual({ id: 'evt_1', type: 'secret.rotated' });
  });

  it('throws when header is missing', async () => {
    await expect(verifyWebhook(body, undefined, SECRET, { now })).rejects.toBeInstanceOf(WebhookVerificationError);
  });

  it('throws when header is malformed', async () => {
    await expect(verifyWebhook(body, 'garbage', SECRET, { now })).rejects.toBeInstanceOf(WebhookVerificationError);
  });

  it('rejects when timestamp is outside tolerance', async () => {
    const header = await makeHeader(body, fixedNow - 600);
    await expect(verifyWebhook(body, header, SECRET, { now })).rejects.toThrow(/outside the .* tolerance/);
  });

  it('rejects when body has been tampered with', async () => {
    const header = await makeHeader(body, fixedNow);
    await expect(verifyWebhook(body + 'x', header, SECRET, { now })).rejects.toThrow(/does not match/);
  });

  it('rejects when secret is wrong', async () => {
    const header = await makeHeader(body, fixedNow, 'whsec_other');
    await expect(verifyWebhook(body, header, SECRET, { now })).rejects.toThrow(/does not match/);
  });

  it('rejects when body is not JSON', async () => {
    const text = 'not-json';
    const header = await makeHeader(text, fixedNow);
    await expect(verifyWebhook(text, header, SECRET, { now })).rejects.toThrow(/not valid JSON/);
  });

  it('narrows the data shape on `event.type`', async () => {
    // Type-check intent: a `switch (event.type)` on the returned union
    // must narrow `event.data` to the per-event shape declared in
    // WebhookEventPayloads. We exercise both the runtime parse and the
    // structural shape so the test would fail if someone widens the
    // return type back to `unknown`.
    const evt = {
      id: 'evt_42',
      type: 'secret.rotated' as const,
      occurredAt: '2026-05-02T00:00:00Z',
      organisation: 'org_xyz',
      workspace: 'my-app',
      environment: 'production',
      actor: { type: 'user' as const, id: 'usr_abc', email: 'jane@acme.com' },
      data: { key: 'STRIPE_API_KEY', version: 4, previousVersion: 3 },
    };
    const json = JSON.stringify(evt);
    const header = await makeHeader(json, fixedNow);
    const event = await verifyWebhook(json, header, SECRET, { now });

    if (event.type === 'secret.rotated') {
      // Narrowed: event.data is { key: string; version: number; previousVersion: number }.
      expect(event.data.key).toBe('STRIPE_API_KEY');
      expect(event.data.version).toBe(4);
      expect(event.data.previousVersion).toBe(3);
    } else {
      throw new Error('expected secret.rotated, got ' + event.type);
    }
  });
});
