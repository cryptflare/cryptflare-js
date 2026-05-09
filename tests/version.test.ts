import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { VERSION } from '@/version';

const here = dirname(fileURLToPath(import.meta.url));
const pkgPath = resolve(here, '..', 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version: string };

/**
 * Guard against `src/version.ts` drifting away from the package version.
 * The constant is what `client.user-agent` and `version` exports show, and
 * historically (0.1.0) we shipped a stale `0.0.1` because the changeset
 * version-bump only touches package.json. This test fails the build long
 * before a release if a contributor forgets to keep them in sync.
 */
describe('VERSION constant', () => {
  it('matches package.json version', () => {
    expect(VERSION).toBe(pkg.version);
  });
});
