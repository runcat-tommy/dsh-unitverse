import { Context } from '@deepseek-ai/cordis';
export { A as ALIAS_INDEX, a as AliasIndex, C as CATEGORIES, b as CATEGORY_ORDER, c as CategoryId, d as CategoryMeta, e as ConvertOptions, f as ConvertRequest, g as ConvertResult, D as DELTA_MARKERS, R as ResolvedUnit, U as UNITS, h as UnitConversionError, i as UnitDef, j as buildAliasIndex, k as convert, l as convertDetailed, m as convertRaw, n as findUnit, o as normalizeUnit, p as parseRequest, r as resolveUnit, q as roundSignificant, s as stripDeltaMarker, u as unitsByCategory } from './convert-DVefQ0C-.js';

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

declare const name = "unitverse";
declare const inject: readonly ["tools"];
declare function apply(ctx: Context): void;

export { apply, inject, name };
