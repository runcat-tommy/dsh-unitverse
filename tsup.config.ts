import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/convert.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: false,
  clean: true,
  target: 'node18',
  outDir: 'lib',
  // cordis/dsh-tools come from the host at runtime; never bundle them.
  external: ['@deepseek-ai/cordis', '@deepseek-ai/dsh-tools'],
})
