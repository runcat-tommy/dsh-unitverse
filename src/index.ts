/**
 * dsh-unitverse — DeepSeek Harness plugin entry.
 *
 * A Cordis plugin module (see docs/user/develop/basic) that registers one
 * model-facing tool, `convert`, over the pure engine in `./convert`.
 *
 * ```yaml
 * # cordis.patch.yml (bundle layer)
 * - insert:
 *     - id: unitverse
 *       name: dsh-unitverse
 * ```
 */

import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'
import {
  convert,
  convertDetailed,
  convertRaw,
  parseRequest,
  resolveUnit,
  roundSignificant,
  UnitConversionError,
} from './convert'
import {
  ALIAS_INDEX,
  buildAliasIndex,
  CATEGORIES,
  CATEGORY_ORDER,
  DELTA_MARKERS,
  findUnit,
  normalizeUnit,
  stripDeltaMarker,
  unitsByCategory,
  UNITS,
  type CategoryId,
} from './units'

export const name = 'unitverse'
export const inject = ['tools'] as const
const CATEGORY_PREVIEWS: Record<CategoryId, string> = {
  length: 'm, km, cm, mm, um, nm, in, ft, yd, mi, nmi; 米/千米/英里/英尺/英寸…',
  area: 'm2, km2, cm2, mm2, ha, acre, mu(亩); 平方米/公顷/亩/英亩…',
  volume: 'm3, l, ml, cm3, in3, ft3, gal(US), gal(UK), bbl; 立方米/升/毫升/加仑…',
  time: 's, ms, min, h, d, wk, mo, yr; 秒/分钟/小时/天/周/月/年…',
  angle: 'rad, deg(°), grad, arcmin, arcsec, turn; 弧度/度/角分/角秒…',
  speed: 'm/s, km/h, mph, kn(knot), ft/s; 米每秒/千米每小时/节…',
  temperature: 'C(°C), F(°F), K, R(°R); 摄氏度/华氏度/开尔文…',
  pressure: 'pa, kpa, mpa, hpa, bar, atm, psi, torr, mmhg, inhg; 帕/千帕/兆帕/巴/标准大气压…',
  energy: 'j, kj, mj, cal, kcal, wh, kwh, btu; 焦耳/千焦/卡路里/千卡/千瓦时…',
  power: 'w, kw, mw, gw, hp, ps; 瓦/千瓦/兆瓦/马力…',
}

const DESCRIPTION =
  'Universal unit converter across ten categories: length, area, volume, time, angle, '
  + 'speed, temperature, pressure, energy/heat and power. '
  + 'Unit tokens are case-insensitive and accept English names, symbols and Chinese names — '
  + "e.g. 'km'/'KM'/'kilometer'/'千米'/'公里' are all length units, and '公里/小时' or 'km/h' are speeds. "
  + `Supported units: ${CATEGORY_ORDER.map((id) => `${CATEGORIES[id].labelZh}(${id}): ${CATEGORY_PREVIEWS[id]}`).join(' | ')}. `
  + 'Both units must belong to the same category. '
  + 'Temperature is converted as an absolute scale by default (e.g. 25 °C -> °F). '
  + 'For a temperature *difference*, prefix BOTH unit tokens with "Δ" or "delta" '
  + "(e.g. value=10, from='Δ°C', to='Δ°F' means a 10-degree-Celsius interval equals 18 °F). "
  + "You cannot mix an absolute and a Δ token in one call. "
  + "Unknown units produce an error naming the token; retry with a listed spelling."

export function apply(ctx: Context): void {
  ctx.tools.register(defineTool({
    name: 'convert',
    description: DESCRIPTION,
    parameters: {
      value: {
        type: 'number',
        required: true,
        description: 'The numeric amount to convert (finite number).',
      },
      from: {
        type: 'string',
        required: true,
        description: 'Source unit token: symbol, English or Chinese name (case-insensitive).',
      },
      to: {
        type: 'string',
        required: true,
        description: 'Target unit token: symbol, English or Chinese name (case-insensitive).',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          value: { type: 'number', required: true, description: 'Original input value.' },
          from: { type: 'string', required: true, description: 'Resolved source unit.' },
          to: { type: 'string', required: true, description: 'Resolved target unit.' },
          result: { type: 'number', required: true, description: 'Converted value.' },
          category: { type: 'string', required: true, description: 'Category id, e.g. length.' },
          categoryZh: { type: 'string', required: true, description: 'Category name in Chinese.' },
          summary: { type: 'string', required: true, description: 'Human-readable result line.' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: value.summary }],
    },
    async execute(args) {
      return convertDetailed(args.value, args.from, args.to)
    },
  }))
}

// Re-export the host-independent core so the same package doubles as a plain
// conversion library. Consumers who want zero DSH dependencies can import from
// 'dsh-unitverse/convert' instead (see package.json exports).
export {
  convert,
  convertDetailed,
  convertRaw,
  parseRequest,
  resolveUnit,
  roundSignificant,
  UnitConversionError,
} from './convert'
export type {
  ConvertOptions,
  ConvertRequest,
  ConvertResult,
  ResolvedUnit,
} from './convert'
export {
  ALIAS_INDEX,
  buildAliasIndex,
  CATEGORIES,
  CATEGORY_ORDER,
  DELTA_MARKERS,
  findUnit,
  normalizeUnit,
  stripDeltaMarker,
  unitsByCategory,
  UNITS,
} from './units'
export type {
  AliasIndex,
  CategoryId,
  CategoryMeta,
  UnitDef,
} from './units'
