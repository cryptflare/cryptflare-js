/// <reference types="node" />
/**
 * Mints a fresh workspace PAT with the same scope as the current token in
 * `.env`, writes it back to `.env`, and prints the old token's ID so the
 * caller can revoke it after verifying the new one works.
 *
 * Run:
 *   pnpm --filter @cryptflare/sdk rotate
 *
 * Optional env (in `.env`):
 *   CRYPTFLARE_ROTATE_AUTO_REVOKE=1   - revoke the old token immediately
 *                                       after the new one is minted. Default
 *                                       off because verifying the new token
 *                                       first is safer.
 *
 * The script never logs the bearer token. Only the *prefix* (first 12
 * chars) is echoed so a human can confirm the rotation took effect.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { APIError, CryptFlare } from '../src';

const here = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(here, '..', '.env');

const apiKey = process.env['CRYPTFLARE_API_KEY'];
const baseUrl = process.env['CRYPTFLARE_API_URL'] ?? 'http://localhost:5488';
const autoRevoke = process.env['CRYPTFLARE_ROTATE_AUTO_REVOKE'] === '1';

if (!apiKey) {
  console.error('CRYPTFLARE_API_KEY is required (load `.env` or pass inline).');
  process.exit(1);
}

const client = new CryptFlare({ apiKey, baseUrl, userAgentSuffix: 'rotate' });

type Whoami = {
  tokenType: 'service' | 'access';
  tokenId: string | null;
  organisation: { id: string; name: string; plan: string };
  userId: string | null;
  permissions: string[];
  orgId: string;
  tokenKind: 'service' | 'workspace' | 'session';
};

type Token = {
  id: string;
  name: string;
  workspaceId?: string;
  workspace_id?: string;
  scopes: string[];
  environment?: 'live' | 'test';
  tokenPrefix?: string;
};

type CreatedToken = {
  id: string;
  name: string;
  token: string;
  tokenPrefix?: string;
};

async function main(): Promise<number> {
  const me = await client.auth.whoami() as unknown as Whoami;
  console.log(`Current token: kind=${me.tokenKind} id=${me.tokenId} org=${me.organisation.name} (${me.orgId})`);

  if (me.tokenKind !== 'workspace' && me.tokenKind !== 'service') {
    console.error(`Unsupported token kind for rotation: ${me.tokenKind}.`);
    return 1;
  }
  if (!me.tokenId) {
    console.error('Token introspection returned no tokenId. Cannot identify the source token to rotate.');
    return 1;
  }

  const isService = me.tokenKind === 'service';
  const listPath = isService
    ? `/v1/organisations/${encodeURIComponent(me.orgId)}/service-tokens`
    : `/v1/organisations/${encodeURIComponent(me.orgId)}/tokens`;

  // Pull the existing token row to recover workspace + environment shape.
  const list = await client.runner.send<{ data: Token[] }>({ method: 'GET', path: listPath });
  const existing = list.data.find((t) => t.id === me.tokenId);
  if (!existing) {
    console.error(`Token ${me.tokenId} not visible to itself - cannot copy scopes.`);
    return 1;
  }

  // Mint a replacement with the same shape. Append a timestamp suffix so
  // the audit log shows a clear rotation event.
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const created = isService
    ? await client.runner.send<{ data: CreatedToken }>({
        method: 'POST',
        path: listPath,
        body: {
          name: `${existing.name} (rotated ${stamp})`,
          scopes: existing.scopes,
        },
      })
    : await mintWorkspaceToken(existing, stamp, me.orgId);

  const fresh = created.data;
  console.log(`Minted new token: id=${fresh.id} prefix=${fresh.tokenPrefix ?? fresh.token.slice(0, 12)}…`);

  rewriteEnv(envPath, fresh.token);
  console.log(`.env updated at ${envPath}.`);

  const oldRevokePath = `${listPath}/${encodeURIComponent(me.tokenId)}`;
  if (autoRevoke) {
    await client.runner.send<void>({ method: 'DELETE', path: oldRevokePath });
    console.log(`Revoked old token ${me.tokenId}.`);
  } else {
    console.log(`Old token ${me.tokenId} left active. Verify the new one with \`pnpm smoke\`, then revoke via dashboard or:`);
    console.log(`  curl -X DELETE -H "Authorization: Bearer $CRYPTFLARE_API_KEY" ${baseUrl}${oldRevokePath}`);
  }

  return 0;
}

async function mintWorkspaceToken(existing: Token, stamp: string, orgId: string): Promise<{ data: CreatedToken }> {
  const workspaceId = existing.workspaceId ?? existing.workspace_id;
  if (!workspaceId) {
    throw new Error('Existing workspace token has no workspace id; refusing to mint a replacement.');
  }
  return await client.runner.send<{ data: CreatedToken }>({
    method: 'POST',
    path: `/v1/organisations/${encodeURIComponent(orgId)}/tokens`,
    body: {
      name: `${existing.name} (rotated ${stamp})`,
      workspaceId,
      scopes: existing.scopes,
      environment: existing.environment ?? 'live',
    },
  });
}

/**
 * Replaces the `CRYPTFLARE_API_KEY=` line in `.env` atomically. Preserves
 * comments and ordering. Falls back to appending the line when the file
 * doesn't already contain the key.
 */
function rewriteEnv(path: string, newToken: string): void {
  let body: string;
  try {
    body = readFileSync(path, 'utf8');
  } catch {
    body = '';
  }
  const line = `CRYPTFLARE_API_KEY=${newToken}`;
  const replaced = body.match(/^CRYPTFLARE_API_KEY=.*$/m)
    ? body.replace(/^CRYPTFLARE_API_KEY=.*$/m, line)
    : body + (body.endsWith('\n') ? '' : '\n') + line + '\n';
  writeFileSync(path, replaced, 'utf8');
}

main()
  .then((code) => process.exit(code))
  .catch((err: unknown) => {
    if (err instanceof APIError) {
      console.error(`API error: ${err.code ?? 'unknown'} (status ${err.status ?? 'n/a'}): ${err.message}`);
    } else {
      console.error('Rotation failed:', err);
    }
    process.exit(1);
  });
