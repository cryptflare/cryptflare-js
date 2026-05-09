import { describe, expect, it } from 'vitest';
import { LocalKeyring, isEnvelope, seal, unseal } from '@/core/crypto';

function masterKey(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(32));
}

describe('client-side envelope encryption', () => {
  it('round-trips short ASCII', async () => {
    const ring = new LocalKeyring({ masterKey: masterKey() });
    const sealed = await seal('hello world', ring);
    expect(isEnvelope(sealed)).toBe(true);
    const plain = await unseal(sealed, ring);
    expect(plain).toBe('hello world');
  });

  it('round-trips multi-byte UTF-8', async () => {
    const ring = new LocalKeyring({ masterKey: masterKey() });
    const text = 'sk_live_emoji_🔐_éàü_测试';
    const sealed = await seal(text, ring);
    expect(await unseal(sealed, ring)).toBe(text);
  });

  it('produces a fresh IV each call (no nonce reuse)', async () => {
    const ring = new LocalKeyring({ masterKey: masterKey() });
    const a = JSON.parse((await seal('same', ring)).slice('cfenv:v1:'.length));
    const b = JSON.parse((await seal('same', ring)).slice('cfenv:v1:'.length));
    expect(a.iv).not.toBe(b.iv);
    expect(a.ct).not.toBe(b.ct);
  });

  it('rejects an envelope sealed with a different keyring', async () => {
    const a = new LocalKeyring({ masterKey: masterKey(), kid: 'A' });
    const b = new LocalKeyring({ masterKey: masterKey(), kid: 'B' });
    const sealed = await seal('hello', a);
    await expect(unseal(sealed, b)).rejects.toThrow(/kid=A/);
  });

  it('rejects ciphertext tampering via auth-tag mismatch', async () => {
    const ring = new LocalKeyring({ masterKey: masterKey() });
    const sealed = await seal('confidential', ring);
    const env = JSON.parse(sealed.slice('cfenv:v1:'.length));
    // Flip a single byte in the ciphertext.
    const ct = atob(env.ct);
    const tampered = ct.slice(0, -1) + String.fromCharCode((ct.charCodeAt(ct.length - 1) ^ 1) & 0xff);
    env.ct = btoa(tampered);
    const broken = 'cfenv:v1:' + JSON.stringify(env);
    await expect(unseal(broken, ring)).rejects.toBeDefined();
  });

  it('rejects non-32-byte master keys', () => {
    expect(() => new LocalKeyring({ masterKey: new Uint8Array(16) })).toThrow(/32 bytes/);
  });

  it('accepts a base64-encoded master key string', async () => {
    const raw = masterKey();
    const b64 = btoa(String.fromCharCode(...raw));
    const ring = new LocalKeyring({ masterKey: b64 });
    expect(await unseal(await seal('x', ring), ring)).toBe('x');
  });
});
