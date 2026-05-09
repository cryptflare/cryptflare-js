import { describe, expect, it } from 'vitest';

import { isMutatingVerb, newIdempotencyKey } from '@/core/idempotency';

describe('isMutatingVerb', () => {
  it('returns true for POST, PUT, PATCH, DELETE', () => {
    for (const m of ['POST', 'PUT', 'PATCH', 'DELETE'] as const) {
      expect(isMutatingVerb(m)).toBe(true);
    }
  });

  it('returns false for GET', () => {
    expect(isMutatingVerb('GET')).toBe(false);
  });
});

describe('newIdempotencyKey', () => {
  it('produces a UUID v4 shape', () => {
    const key = newIdempotencyKey();
    expect(key).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('produces a new value on each call', () => {
    const a = newIdempotencyKey();
    const b = newIdempotencyKey();
    expect(a).not.toBe(b);
  });
});
