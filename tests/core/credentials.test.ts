import { describe, expect, it } from 'vitest';

import { resolveCredential } from '@/core/credentials';
import { ConfigurationError } from '@/core/errors';

describe('resolveCredential', () => {
  it('returns an apiKey credential when only apiKey is supplied', () => {
    const cred = resolveCredential({ apiKey: 'cf_live_abc' });
    expect(cred).toEqual({ kind: 'apiKey', value: 'cf_live_abc' });
  });

  it('returns a serviceToken credential when only serviceToken is supplied', () => {
    const cred = resolveCredential({ serviceToken: 'cf_svc_xyz' });
    expect(cred).toEqual({ kind: 'serviceToken', value: 'cf_svc_xyz' });
  });

  it('returns a getToken credential', () => {
    const fn = async () => 'cf_pat_abc';
    const cred = resolveCredential({ getToken: fn });
    expect(cred.kind).toBe('getToken');
  });

  it('throws when more than one option is provided', () => {
    expect(() => resolveCredential({ apiKey: 'a', serviceToken: 'b' })).toThrow(ConfigurationError);
    expect(() => resolveCredential({ apiKey: 'a', getToken: () => 'b' })).toThrow(ConfigurationError);
  });

  it('rejects empty strings', () => {
    expect(() => resolveCredential({ apiKey: '' })).toThrow(ConfigurationError);
  });

  it('throws when nothing is supplied and env vars are absent', () => {
    const original = { ...process.env };
    delete process.env['CRYPTFLARE_API_KEY'];
    delete process.env['CRYPTFLARE_SERVICE_TOKEN'];
    try {
      expect(() => resolveCredential({})).toThrow(ConfigurationError);
    } finally {
      process.env = original;
    }
  });

  it('falls back to CRYPTFLARE_API_KEY env var', () => {
    const original = process.env['CRYPTFLARE_API_KEY'];
    process.env['CRYPTFLARE_API_KEY'] = 'cf_live_env';
    try {
      const cred = resolveCredential({});
      expect(cred).toEqual({ kind: 'apiKey', value: 'cf_live_env' });
    } finally {
      if (original === undefined) delete process.env['CRYPTFLARE_API_KEY'];
      else process.env['CRYPTFLARE_API_KEY'] = original;
    }
  });
});
