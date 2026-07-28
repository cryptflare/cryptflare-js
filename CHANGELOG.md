# @cryptflare/sdk

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
