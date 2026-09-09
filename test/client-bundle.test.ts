import { createRequire } from 'node:module'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi, afterEach } from 'vitest'

/**
 * Bundle-level smoke test for the browser half.
 *
 * lib/client.js is the esbuild-produced lazy-CJS ModuleLoader module: it calls
 * `window.__ModuleLoader__.load({ id, factory })` at the top level and must
 * surface `{ inject, apply }` through the factory return value. We emulate the
 * loader, execute the factory against Node's require (react is installed), and
 * then drive `apply(ctx)` with a stub Context to assert the conversation.view
 * registration the web runtime will consume.
 */

const require = createRequire(import.meta.url)
const BUNDLE = new URL('../lib/client.js', import.meta.url)

function hasBundle(): boolean {
  return existsSync(BUNDLE)
}

describe.skipIf(!hasBundle())('client bundle (lib/client.js)', () => {
  let loadConfig: { id: string; factory: (r: NodeRequire) => unknown } | undefined

  afterEach(() => {
    delete (globalThis as Record<string, unknown>).window
    loadConfig = undefined
  })

  function loadBundle(): void {
    ;(globalThis as Record<string, unknown>).window = {
      __ModuleLoader__: {
        load(cfg: { id: string; factory: (r: NodeRequire) => unknown }) {
          loadConfig = cfg
        },
      },
    }
    // Execute the bundle's source directly, handing it a stub window and the
    // node require (react etc. resolve from node_modules). `new Function`
    // sidesteps Node's require cache between the two tests.
    const code = readFileSync(BUNDLE, 'utf8')
    const win = {
      __ModuleLoader__: {
        load(cfg: { id: string; factory: (r: NodeRequire) => unknown }) {
          loadConfig = cfg
        },
      },
    }
    // eslint-disable-next-line no-new-func
    const exec = new Function('window', 'require', code)
    exec(win, require)
  }

  it('registers itself under the package id and yields inject/apply', () => {
    loadBundle()
    expect(loadConfig).toBeDefined()
    expect(loadConfig?.id).toBe('dsh-unit-conversion')
    expect(typeof loadConfig?.factory).toBe('function')

    const mod = loadConfig!.factory(require)
    expect(mod).toBeTruthy()
    expect((mod as { inject: string[] }).inject).toEqual(['slots', 'locale'])
    expect(typeof (mod as { apply: unknown }).apply).toBe('function')
  })

  it('apply() registers a conversation.view entry unit-conversion/order 20', () => {
    loadBundle()
    const mod = loadConfig!.factory(require) as {
      apply: (ctx: unknown) => void
    }

    const register = vi.fn<(...args: unknown[]) => () => void>(() => () => {})
    const inject = vi.fn((_key: string, fn: () => void) => {
      fn() // immediately resolve so register() is observed
      return () => {}
    })
    const registerLocale = vi.fn(() => () => {})
    const bind = vi.fn(() => (key: string) => `t:${key}`)
    const ctx = {
      effect: (fn: () => void) => {
        fn()
        return () => {}
      },
      locale: { register: registerLocale, bind },
      slots: { inject, register },
    }

    expect(() => mod.apply(ctx)).not.toThrow()
    expect(inject).toHaveBeenCalledWith('conversation.view', expect.any(Function))
    expect(register).toHaveBeenCalledTimes(1)
    const options = register.mock.calls[0]![0] as {
      name?: string
      id?: string
      order?: number
      locale?: string
      label?: () => string
    }
    expect(options).toMatchObject({
      name: 'conversation.view',
      id: 'unit-conversion',
      order: 20,
      locale: 'unit-conversion',
    })
    expect(options.label?.()).toBe('t:view.tab')
    expect(registerLocale).toHaveBeenCalledWith(
      'unit-conversion',
      expect.objectContaining({ zh: expect.any(Object), en: expect.any(Object) }),
    )
  })
})
