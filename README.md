# @cryptflare/sdk

[![npm version](https://img.shields.io/npm/v/@cryptflare/sdk.svg)](https://www.npmjs.com/package/@cryptflare/sdk)
[![npm downloads](https://img.shields.io/npm/dm/@cryptflare/sdk.svg)](https://www.npmjs.com/package/@cryptflare/sdk)
[![License](https://img.shields.io/npm/l/@cryptflare/sdk.svg)](LICENSE)
[![CI](https://github.com/cryptflare/cryptflare-js/actions/workflows/ci.yml/badge.svg)](https://github.com/cryptflare/cryptflare-js/actions/workflows/ci.yml)

Official **TypeScript / JavaScript SDK** for the [CryptFlare API](https://cryptflare.com).

> This repository is the **public mirror** of `packages/sdk/typescript` from the CryptFlare platform monorepo. Source-of-truth lives in the monorepo and is synced here on every release. **Open issues and pull requests in this repository.**

## Features

- Strongly-typed clients generated from Zod schemas
- Works in Node 20+, Bun, Deno, Cloudflare Workers, and modern browsers
- Tree-shakeable ESM + CJS dual builds
- Optional `zod` peer dep for runtime validation
- Provenance-attested builds via [npm sigstore](https://docs.npmjs.com/generating-provenance-statements)

## Install

```bash
npm install @cryptflare/sdk
# or
pnpm add @cryptflare/sdk
# or
yarn add @cryptflare/sdk
# or
bun add @cryptflare/sdk
```

## Quick start

```ts
import { CryptFlare } from '@cryptflare/sdk';

const client = new CryptFlare({
  token: process.env.CRYPTFLARE_TOKEN!,
});

// List secrets in a pod
const secrets = await client.secrets.list({
  pod: 'prod',
  environment: 'production',
});

// Reveal a single secret value (audited server-side)
const value = await client.secrets.reveal({
  pod: 'prod',
  environment: 'production',
  key: 'DATABASE_URL',
});
```

## Browser usage

For frontend code that needs short-lived scoped tokens:

```ts
import { CryptFlare } from '@cryptflare/sdk/browser';

const client = new CryptFlare({ token: scopedToken });
```

The browser entry point omits Node-only APIs and ships smaller.

## Documentation

- **Full reference**: https://cryptflare.com/sdk/typescript
- **API docs**: https://cryptflare.com/api
- **Examples**: https://github.com/cryptflare/examples

## Versioning

We follow [Semantic Versioning](https://semver.org/):
- **Major** - breaking API changes
- **Minor** - new features, backwards compatible
- **Patch** - bug fixes, backwards compatible

Pre-1.0 minors may include breaking changes - we will call this out in the changelog.

## Supply chain

Every release is published with [npm provenance](https://docs.npmjs.com/generating-provenance-statements). The Verified badge on npm proves the package was built from this exact commit by GitHub Actions.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Most code changes are made in the upstream monorepo; doc, README, and tooling fixes can be PR'd here.

## Security

Vulnerabilities: email **security@cryptflare.com**. See [SECURITY.md](SECURITY.md).

## License

[Apache-2.0](LICENSE) (c) BUUN GROUP PTY LTD
