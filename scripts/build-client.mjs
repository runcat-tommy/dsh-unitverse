/**
 * Build the browser half (client module) into the lazy-CJS ModuleLoader
 * format the DSH web runtime expects: a single self-registering file that
 * calls `window.__ModuleLoader__.load({ id, factory })`, resolving `react`,
 * `react/jsx-runtime` and every `@deepseek-ai/*` specifier through the
 * browser-side module table (they must stay external) while bundling our own
 * conversion core inline (pure client-side execution, no host round-trip).
 *
 * Output: lib/client.js (+ lib/client.d.ts hand-written mirror for typing).
 */
import { build } from 'esbuild'
import { writeFileSync } from 'node:fs'

const PACKAGE_ID = 'dsh-unit-conversion'

const banner = `window.__ModuleLoader__.load({
\tid: ${JSON.stringify(PACKAGE_ID)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
`

const footer = `
\t\treturn module.exports;
\t}
});
`

await build({
  entryPoints: ['src/client/index.tsx'],
  outfile: 'lib/client.js',
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  // Provided by the DSH web runtime module table — never bundle them.
  external: ['react', 'react-dom', 'react/jsx-runtime', '@deepseek-ai/*'],
  banner: { js: banner },
  footer: { js: footer },
  sourcemap: false,
  logLevel: 'info',
})

// Minimal static typing for `dsh-unit-conversion/client` consumers.
writeFileSync(
  'lib/client.d.ts',
  `/**
 * Browser half of dsh-unit-conversion: a DSH client module that registers the
 * conversation view tab "单位换算 / Unit Converter" (next to 对话 / 轨迹).
 * Loaded by the web runtime through the package \`dsh.client\` declaration;
 * not meant for direct import.
 */
import type { Context } from '@deepseek-ai/cordis'
/** Cordis service names this client plugin waits for. */
export declare const inject: readonly ['slots', 'locale']
export declare function apply(ctx: Context): void
`,
)
