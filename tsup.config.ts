import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { index: 'src/index.ts', browser: 'src/browser.ts' },
    format: ['esm', 'cjs'],
    dts: false,
    clean: true,
    sourcemap: true,
    target: 'es2022',
    outDir: 'dist',
    external: ['@cryptflare/shared'],
    minify: false,
    splitting: false,
    treeshake: true,
  },
  // Emit `.d.ts` for ESM consumers and a parallel `.d.cts` for CJS
  // consumers. `publint --strict` flags packages that ship one .d.ts
  // under both conditions because Node's CJS resolver interprets it as
  // ESM, breaking type-only imports for older toolchains. Splitting the
  // declarations is the canonical fix.
  {
    entry: { index: 'src/index.ts', browser: 'src/browser.ts' },
    format: ['esm', 'cjs'],
    dts: { only: true, compilerOptions: { composite: false } },
    tsconfig: 'tsconfig.build.json',
    clean: false,
    target: 'es2022',
    outDir: 'dist',
  },
]);
