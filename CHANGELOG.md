# @cryptflare/sdk

## 1.2.0

### Minor Changes

- 14cd95c: Capture new keys from a local env file, and stop needing `-w`/`-e` inside a project.

  **Capture.** `cf sync` only ever pushed keys that already existed remotely: a key typed into `.env` for the first time was reported and skipped, so getting a new secret into CryptFlare still meant a separate `cf secret set` with the right flags. A binding can now opt in with `"capture"` in `.cryptflare.json`:
  - `"auto"` creates the key in the bound environment on the next pass.
  - `"prompt"` asks first when run at a terminal (`cf sync run`), and does nothing unattended.
  - `"off"` (the default) is the previous behaviour.

  Set it once for the whole manifest or per binding. It is read from the manifest on every pass, so changing it does not need a re-run of `cf sync init`. New keys are validated before anything is sent, so an empty value or a lower-case name is reported rather than half-uploaded.

  **No flags inside a project.** `cf run`, `cf env` and `cf secret list/get/set` read `.cryptflare.json` and use the binding nearest the current directory, so `cf run -- npm start` works in a bound repository with no `-w`, `-e` or `.env` file. `--binding <file>` picks a binding by name. Flags still win when given.

  **`cf secret set`** now does what its description said: it creates the secret, or rotates it when the key exists. `--generate [bytes]` stores a random value without printing it, and `--envs dev,production` writes one value to several environments.

  **`cf env -f powershell`** emits `$env:KEY = '...'` for PowerShell. `-f dotenv` now quotes values that need it instead of printing them raw.

  **Windows.** `cf run` and `cf update` start `.cmd` shims (`npm`, `pnpm`, `vite`, `wrangler`) correctly.

  **Large environments.** Revealing a whole environment is paged. `secrets.revealAll()` (SDK) follows the pages; `secrets.revealMany()` accepts `limit` and `cursor` and returns `nextCursor`. Environments with more than 30 secrets could not be pulled at all before, because the reveal budget was charged per key against a 30-per-minute limit.

  **Batch results.** `secrets.batchCreate`, `batchUpdate` and `batchDelete` return the finished per-item result (`results`, `summary`) instead of a job to poll. `secrets.batchStatus` is deprecated. The CLI now reports any key the server did not write, where it previously assumed success. `batchCreate` and `create` accept `description` and `metadata`.

  **The sync service stops when it is logged out.** A revoked token used to be retried every minute indefinitely. After three passes in which every binding is refused as unauthenticated, `cf sync watch` exits with a message saying to log in again, and the systemd unit no longer restarts it.

  **Side by side files.** With `.env` and `.env.production` bound in one directory, a command with no flags now means the development file (`.env.local`, `.env.development`, `.env`, `.dev.vars`, `.envrc`, in that order). It used to refuse to choose. Production is never picked implicitly: ask for it with `--env` or `--binding`.

  **`cf mcp serve`.** A local MCP server for AI coding agents, using your `cf auth login` session. Its tools generate a secret, store one that is already in an env file, and sync the files. None of them returns a secret value.

  **`cf dynamic`.** `cf dynamic issue <config>` mints a credential from a dynamic secret config. With `--save --prefix NAME` it stores the credential as secrets in the bound environment instead of printing it. `cf dynamic list` and `cf dynamic revoke <lease>` complete the set.

  **Edits are picked up at once.** `cf sync watch` watches the bound files and runs a pass within a second of a save, instead of waiting out a poll interval that backs off to ten minutes. Where the filesystem cannot be watched it says so and keeps polling.

  **Background service on macOS and Windows.** `cf sync install-service` installs a launchd agent on macOS and a logon scheduled task on Windows, alongside the existing systemd unit. `cf sync uninstall-service` removes whichever is installed.

  **New project in one command.** In a repository with env files and no `.cryptflare.json`, `cf sync init` now proposes a manifest instead of failing: one environment per file, named `<app>-<stage>`, capture on for development files. It warns about env files git is tracking or not ignoring. `cf sync init --create --yes` writes it, creates the workspace and environments, and uploads each file.

  **Hands-off for a whole directory.** `cf sync auto ~/code` names a directory once. From then on every git repository under it that has a `.env`, `.dev.vars` or `.envrc` is set up without a command: it gets a manifest and its own workspace, its files are uploaded, and it is kept in sync. A fresh clone that already carries a manifest gets its env files pulled. `cf sync auto <dir> --remove` stops it. With the background service installed there is nothing to run per project.

  **Edits made during a sync pass are no longer lost.** A value changed on disk while a pass was running was recorded as already synced and never uploaded. The pass now keeps its baseline on the value it actually compared, and the file watcher remembers a change that arrives while the loop is busy.

  **`cf login` and `cf logout`.** Both now exist at the top level, as the same commands as `cf auth login` and `cf auth logout`. `cf login` checks a saved key before refusing: an expired or revoked key is replaced without a `cf logout` first, a key that still works is kept unless you pass `--force`, and when the API cannot be reached the key is kept and the message says why. When the sync service stops because its key is refused, the log line names the command to run.

  **The running service follows the registry.** `cf sync watch` read the automatic directories and the registered projects once, at start, so `cf sync auto <dir>` or `cf sync init` needed a service restart. It now re-reads the registry on every pass and is woken when the registry file changes. A directory added while the service runs is set up at once. A service started before anything is registered waits instead of exiting.

  **New env files are picked up.** A repository that was already set up was never looked at again, so a new `apps/worker/.dev.vars` or `.env.production` was not synced until `.cryptflare.json` was edited by hand. `cf sync run` and `cf sync watch` now find env files with no binding, name their environment by the usual rules, create it, and append the binding. Existing bindings are never renamed, removed or rewritten. A file that names a stage other than `dev` is bound with capture `off`, so its keys are reported and not uploaded. This only happens for a manifest with `"autoDiscover": true`, which `cf sync auto` and `cf sync init` write when they generate one. A manifest written by hand does not have it and is never edited. `"ignore": ["path/.env"]` keeps single files out. Conflict sidecars and editor backups are no longer mistaken for env files.

  **Two files, one environment.** Two files of a project bound to the same workspace, environment and pod overwrite each other on every pass. `cf sync` now refuses those files with a message naming them and the environment, syncs the rest, and `cf sync run` and `cf sync init` exit with a non-zero code. `cf sync add` refuses the registration.

  **Plan limits are predictable.** `cf sync init --create` and hands-off setup compare what a repository needs with what the plan has left before creating anything. Files that do not fit are left out in manifest order, not registered, and reported on one line with the plan's limits and where to upgrade. The files that fit are synced. A plan-limit refusal is asked about again once an hour, never on every pass, and that includes the secret limit when capturing new keys. Before, the repository was registered anyway and every pass failed on the environments that were never created.

## 1.1.0

### Minor Changes

- 580b710: Reveal many secrets in one request instead of one request per key.

  Every consumer looped `secrets.reveal()`, and each of those is a full worker invocation paying auth, org context, RBAC, a quota Durable Object hop and several D1 queries to move a single value. Bootstrapping a ten-file repository cost 69 requests; it now costs 10. `cf pull` over a 23-secret environment goes from 24 requests to 1.

  Adds `POST .../secrets/reveal`, `secrets.revealMany()` in the SDK, and routes `cf pull`, `cf run`, `cf sync init`, `cf sync run`, `cf daemon` and `cf diff --values` through it.

  The rate limit is deliberately unchanged. The server charges one unit per key against the same 30/min bucket a single reveal uses, so batching buys round trips, not budget - otherwise adding the endpoint would have turned a 30/min ceiling into 30 batches/min. Keys travel in the request body rather than the query string so they cannot reach access logs, and one audit row records the whole batch with every key named, because a queue send per key would be a subrequest per secret.

  A CLI running against an API deployed before this endpoint existed falls back to single reveals on a 404; any other error propagates, so a 429 cannot fan out into N requests.

### Patch Changes

- 5104d94: Narrow the `zod` peer range to `^3.20.0`.

  The published `dist/index.d.ts` inlines generated declarations that spell out Zod 3 generics, because the dts rollup pulls in the vendored schema files behind the exported `z.infer<>` types. Zod 4 re-arited those generics (`ZodObject` takes two parameters, `ZodEnum` a record rather than a tuple, `ZodEffects` was removed), so the shipped types produce several hundred `TS2707`/`TS2344` errors under Zod 4 - `^4.0.0` was advertising support that did not exist. Supporting Zod 4 properly means emitting plain TypeScript types and dropping the peer dependency altogether; that is tracked separately.

## 1.0.2

### Patch Changes

- bc0656b: Export `AuditEvent`. It is the element type of `audit.list`, but consumers could not name it.

## 1.0.1

### Patch Changes

- 2423622: Wait out a rate limit for as long as the server asks, instead of clamping `Retry-After` to `maxDelayMs`.

  The reveal endpoint allows 30 requests per minute and answers a 429 with "retry in 27s". `maxDelayMs` defaults to 8s, and the backoff clamped the server's instruction down to it, so every retry woke inside the closed window and all three attempts failed. `maxDelayMs` now caps only computed backoff; a server-supplied `Retry-After` is honoured up to the new `maxRetryAfterMs` option (default 60s), plus a one-second grace because the header is whole seconds. A wait longer than that ceiling is not retried at all - surfacing the rate limit beats stalling a call the caller is awaiting.

## 1.0.0

### Major Changes

- d154236: Correct 53 SDK methods that targeted routes the API does not serve.

  The contract audit found 48 of 173 requests pointing at non-existent paths.
  Every one has been checked against the generated OpenAPI spec and corrected:

  | Resource         | Was                                         | Now                                      |
  | ---------------- | ------------------------------------------- | ---------------------------------------- |
  | analytics        | `/request-history`, `/endpoint-breakdown`   | `/requests`, `/endpoints`                |
  | audit            | `/verify-chain`, `/integrity-report`        | `/verify`, `/verify/report`              |
  | billing          | `POST /plan`, `/sessions/:id/confirm`       | `/change-plan`, `/confirm-session`       |
  | compliance       | `/reports/*`                                | `/report/*`                              |
  | data-residency   | `/data-residency/region`                    | `/data-region`                           |
  | encryption       | `/status`, `/keys`                          | `/`, `/generate`                         |
  | environments     | `/resolve`                                  | `/resolve-path`                          |
  | events           | `/subscriptions/:id/deliveries`             | `/deliveries`                            |
  | integrations     | `POST /probe`                               | `POST /:id/probe`                        |
  | members          | `POST /members`, `PATCH /members/:id`       | `/members/invite`, `/members/:id/role`   |
  | invitations      | `/invitations/*`                            | `/members/invitations/*`                 |
  | policies         | `/:id/simulate`, `/teams/:id`               | `/simulate`, `/team-policies`            |
  | sso              | `/sso/connections/*`                        | `/sso/*`                                 |
  | support          | `/support/tickets/*`                        | `/support/*`, attachments -> `/upload`   |
  | sync-connections | `/:id/handshake`, `/:id/sync`, `/:id/queue` | `/:id/confirm`, `/:id/trigger`, `/queue` |
  | tags             | `/all`, `DELETE /:id`                       | `/org`, `DELETE /`                       |
  | transfers        | `/organisations/:org/transfer/*`            | `/auth/transfer*`                        |

  BREAKING: `integrations.probe()` now requires `integrationId`, and the tag and
  transfer methods identify their subject in the body rather than the path.

  Three methods target endpoints the API has never implemented - `audit.stream()`,
  `rotationPolicies.get()` and `organisations.toggleFeature()`. They can only 404.
  They are marked `@deprecated` rather than removed so the removal lands in a
  deliberate major.

### Patch Changes

- 023d039: Fix `dynamicSecrets.issueLease`, which posted to a route that does not exist,
  and `renewLease`, which sent the wrong field name.

  `issueLease` posted to `/dynamic-secrets/leases` with the config id in the body.
  There is no `POST /leases` route - `/leases` is the GET listing. The real
  endpoint is `POST /configs/:configId/lease`, so issuing a lease through the SDK
  never worked.

  `renewLease` sent `ttlSeconds` where the API reads `increment`. Zod strips
  unknown keys, so the requested extension was silently dropped and every renewal
  used the server default - the call appeared to succeed while ignoring its main
  argument.

  ```ts
  // before - broken
  client.dynamicSecrets.issueLease({ configId, ttlSeconds: 900 });
  client.dynamicSecrets.renewLease({ leaseId, ttlSeconds: 300 });

  // after
  client.dynamicSecrets.issueLease({ configId, ttl: 900 });
  client.dynamicSecrets.issueLease({ configId, wrap: { ttl: 60 } }); // response wrapping, now supported
  client.dynamicSecrets.renewLease({ leaseId, increment: 300 });
  ```

  `issueLease`'s `metadata` option is gone; the endpoint never accepted it.
  Response wrapping (`wrap`) is now exposed - it was in the API but not the SDK.

## 0.4.0

### Minor Changes

- 8fb25cf: Expose access-token IP allowlist on the TypeScript SDK and CLI.
  - `tokens.create` and `tokens.update` accept an optional `ipAllowlist?: string[]` (max 50 entries; IPv4 / IPv6 addresses or CIDR blocks). Requests from outside the list are rejected with `403 ACCESS_TOKEN_IP_BLOCKED`.
  - `tokens.update` accepts `ipAllowlist: null` to clear an existing allowlist; omitting the field leaves it unchanged.
  - New CLI flag `cf token create --ip-allow=10.0.0.0/8,203.0.113.5,...` (comma-separated). `cf token list` shows the allowlist size per token.

  Mirrors the long-standing service-token allowlist behaviour for personal access tokens.

- cfe749b: `audit.export(...)` SDK method + `cf audit export` CLI command.

  ```ts
  const stream = await client.audit.export({
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-04-30T23:59:59Z",
  });
  // stream is a ReadableStream<Uint8Array> of JSON Lines.
  ```

  ```bash
  cf audit export --start 2026-04-01T00:00:00Z --end 2026-04-30T23:59:59Z --file audit-april.jsonl
  ```

  Streams the API's `POST /v1/organisations/:org/audit/export` JSON Lines response directly to disk (or stdout when `--file -`). No buffering, so memory stays flat for arbitrarily large exports up to the server's 100 000-row + 366-day caps. Throttled server-side to one request per hour per organisation.

  Closes the audit-export loop end to end (API endpoint shipped previously).

## 0.3.0

### Minor Changes

- 8d8c10f: Update vendored schemas with type corrections
  - Corrects type definitions for fields like `id`, `organisation_id`, and `resource_type` in audit logs
  - Standardizes schema definitions for user authentication and profile details (e.g., `auth`, `me`)
  - Refines schemas for billing and subscription management
  - Updates helper scripts to handle schema synchronization and canonicalization

### Patch Changes

- 09e31bf: Implement package version synchronization
  - Adds a new script `sync:package-versions` to update in-source VERSION constants
    of published packages (CLI and SDK) to match the version defined in their respective package.json files.
  - Integrates version synchronization into the `test`, `test:run`, and `typecheck` scripts across CLI and SDK packages.
  - Updates the root `version-packages` script to run version synchronization after changing the version.
  - Adds a CI workflow step to verify that in-source VERSION constants match package.json before running tests.
  - Implements a new utility script `scripts/sync-package-versions.mjs` to handle the version syncing logic.
  - Updates the CLI and SDK packages to use the new version synchronization script for build and test steps.

## 0.2.0

### Minor Changes

- 4ce9bfd: - Fix `version` export shipping a stale `0.0.1` string instead of the package version. A new test guards the constant against drift.
  - Add `verifyWebhook(body, header, secret)` for HMAC-SHA256 signature verification on inbound webhook deliveries. Stripe-compatible header shape (`t=<unix>,v1=<hex>`) and constant-time comparison.
  - Add `LocalKeyring`, `seal()`, `unseal()`, and `isEnvelope()` for client-side envelope encryption (AES-256-GCM + AES-KW). The CryptFlare API never sees plaintext when callers seal first; the `Keyring` interface lets users plug in AWS KMS or any HSM.
  - Add `@cryptflare/sdk/browser` entry point - browser-safe subset that excludes service-token credential mode and Node-only helpers.
  - `secrets.list()` now returns a `PagePromise<T>` that is both a `Promise<CursorPage<T>>` and an `AsyncIterable<T>`. Callers can `for await (const s of client.secrets.list())` directly without the previous await-then-iterate two-step.
  - New optional peer dependency on `zod` (only consumed by published `.d.ts` types - zero runtime cost).
  - Add `pnpm sdk:codegen` tooling that fetches the API's OpenAPI 3.1 doc and emits typed schemas under `src/_generated/`. Foundation for the eventual replacement of the vendored Zod schemas.

### Patch Changes

- 9f37e22: Update package manifest and build configurations
  - Update repository URLs in package.json files to use git+https:// format
  - Adjust package exports in mcp-client and sdk/typescript to support modern module resolution (default/types/require)
  - Update tsup configuration to output both esm and cjs formats for better type compatibility

## 0.1.0

Initial public release.

### Added

- Typed resource fan-out (`secrets`, `pods`, `environments`, `workspaces`, `organisations`, `tokens`, `service-tokens`, `teams`, `policies`, `members`, `compliance`, `billing`, `audit`, `auth`, plus more).
- `CryptFlare` client with API key + service token + custom credential resolver.
- `CursorPage<T>` async iterator for paginated endpoints.
- Configurable retry policy, idempotency keys, request hooks, and timeouts.
- Full error hierarchy (`CryptFlareError`, `APIError`, `AuthenticationError`, `NotFoundError`, `RateLimitError`, etc.).
- `ERRORS` registry inlined for `error.code === ERRORS.RATE_LIMITED` style branching.
- ESM + CJS bundles with self-contained type declarations (no internal package dependencies).
