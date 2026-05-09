/// <reference types="node" />
/**
 * Fetches the API's OpenAPI 3.1 document and emits a typed schema module
 * to `src/_generated/openapi.d.ts`. Drives the future replacement for
 * `src/_vendored/schemas/*` (see docs/standards/sdk/openapi-codegen-plan.md).
 *
 * Usage:
 *   pnpm sdk:codegen                     # uses CRYPTFLARE_API_URL or local API
 *   pnpm sdk:codegen --url=https://...   # explicit override
 *   pnpm sdk:codegen --file=path.json    # offline, from disk
 *
 * The script intentionally stays out of `pnpm build` for now so we can
 * land the tool without flipping the source-of-truth. Once stable, the
 * release workflow's drift gate will run this and diff `_generated`.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '..');
const OUT_DIR = resolve(ROOT, 'src', '_generated');
const OUT_FILE = resolve(OUT_DIR, 'openapi.d.ts');

const args = parseArgs(process.argv.slice(2));

async function main() {
  const spec = await loadSpec();
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  // Write the spec to a temp file so openapi-typescript reads it without
  // re-fetching. Stays inside the package so any contributor cloning the
  // repo can reproduce the codegen.
  const tmp = resolve(OUT_DIR, 'openapi.json');
  writeFileSync(tmp, JSON.stringify(spec, null, 2));

  console.log(`[codegen] generating ${OUT_FILE}`);
  const result = spawnSync(
    'npx',
    ['-y', 'openapi-typescript@latest', tmp, '-o', OUT_FILE, '--root-types'],
    { stdio: 'inherit' },
  );
  if (result.status !== 0) {
    console.error('[codegen] openapi-typescript exited non-zero');
    process.exit(result.status ?? 1);
  }

  // Provide a friendlier index that re-exports the generated schemas under
  // names the SDK can import without leaking the openapi-typescript shape.
  const indexPath = resolve(OUT_DIR, 'index.ts');
  writeFileSync(
    indexPath,
    [
      '/**',
      ' * Auto-generated re-exports of the OpenAPI schema types.',
      ' * Regenerate with `pnpm sdk:codegen`. Do not hand-edit.',
      ' */',
      "export type { components, paths, operations } from './openapi';",
      '',
    ].join('\n'),
  );

  console.log(`[codegen] done. ${OUT_FILE}`);
}

async function loadSpec(): Promise<unknown> {
  if (args.file) {
    const path = resolve(process.cwd(), args.file);
    return JSON.parse(readFileSync(path, 'utf8'));
  }
  const url = args.url
    ?? process.env.CRYPTFLARE_OPENAPI_URL
    ?? `${process.env.CRYPTFLARE_API_URL ?? 'https://api.cryptflare.com'}/v1/openapi.json`;
  console.log(`[codegen] fetching ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch OpenAPI spec from ${url}: HTTP ${res.status}`);
  }
  return await res.json();
}

function parseArgs(argv: string[]): { url?: string; file?: string } {
  const out: { url?: string; file?: string } = {};
  for (const arg of argv) {
    if (arg.startsWith('--url=')) out.url = arg.slice(6);
    else if (arg.startsWith('--file=')) out.file = arg.slice(7);
  }
  return out;
}

main().catch((err) => {
  console.error('[codegen]', err);
  process.exit(1);
});
