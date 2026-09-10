/**
 * dsh-unit-conversion — browser half (client module).
 *
 * Registers a `conversation.view` entry — the "单位换算" tab that renders next
 * to the built-in 对话 (chat, order 0) and 轨迹 (trajectory, order 10) tabs in
 * the conversation session body. The view itself is a pure in-browser unit
 * converter (no host round-trip): it bundles the conversion core and runs
 * entirely on the client.
 *
 * This file is compiled by `scripts/build-client.mjs` into the lazy-CJS
 * ModuleLoader bundle served at `/plugins/dsh-unit-conversion/client.js`.
 */
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-runtime/client'
import { UnitConvertView } from './UnitConvertView'
import { en, NS, zh } from './locales'

/** Services this client plugin consumes; the runner waits for them to come up. */
export const inject = ['slots', 'locale'] as const

/** Tab order: chat(0) < trajectory(10) < unit-conversion(20). */
const VIEW_ORDER = 20

export function apply(ctx: Context): void {
  // Dictionaries ride the plugin lifecycle: registered on apply, released with it.
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'unit-conversion: dictionaries')
  const t = ctx.locale.bind(NS)

  ctx.slots.inject('conversation.view', () =>
    ctx.slots.register({
      name: 'conversation.view',
      id: 'unit-conversion',
      order: VIEW_ORDER,
      locale: NS,
      label: () => t('view.tab'),
      // The active-locale source is injected so the panel can localize unit and
      // category names (data owned by units.ts) and re-render on a language switch.
      inject: () => ({ locale: ctx.locale }),
    }, UnitConvertView))
}
