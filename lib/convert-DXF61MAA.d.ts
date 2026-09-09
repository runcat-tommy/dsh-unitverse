/**
 * Unit tables for dsh-unit-conversion.
 *
 * Every unit belongs to exactly one of the ten supported categories and is
 * expressed relative to that category's base unit:
 *
 * - length     -> meter (m)
 * - area       -> square meter (m²)
 * - volume     -> cubic meter (m³)
 * - time       -> second (s)
 * - angle      -> radian (rad)
 * - speed      -> meter per second (m/s)
 * - temperature-> kelvin (K), affine: base = a * value + b
 * - pressure   -> pascal (Pa)
 * - energy     -> joule (J)
 * - power      -> watt (W)
 *
 * Notes on chosen conventions (documented in the READMEs):
 * - 1 cal  = 4.184 J (thermochemical calorie); 1 kcal = 4184 J.
 * - 1 BTU  = 1055.05585262 J (International Table).
 * - Year/month use the Julian mean: year = 365.25 d, month = year / 12.
 * - 1 mmHg = 133.322387415 Pa (conventional at 0 °C);
 *   1 torr = 101325/760 Pa. Both are provided.
 */
type CategoryId = 'length' | 'area' | 'volume' | 'time' | 'angle' | 'speed' | 'temperature' | 'pressure' | 'energy' | 'power';
interface CategoryMeta {
    id: CategoryId;
    labelZh: string;
    labelEn: string;
    baseSymbol: string;
}
declare const CATEGORY_ORDER: CategoryId[];
declare const CATEGORIES: Record<CategoryId, CategoryMeta>;
/**
 * One unit definition.
 *
 * Linear units carry `factor`: `valueInBase = value * factor`.
 * Temperature units instead carry `a` and `b` (affine):
 * `kelvin = value * a + b`, which supports both absolute conversions and
 * temperature differences (delta) where only `a` matters.
 */
interface UnitDef {
    /** Canonical machine id, e.g. `km` or `gal_us`. */
    id: string;
    category: CategoryId;
    /** Preferred display symbol, e.g. `km`, `°C`, `km/h`. */
    symbol: string;
    /** Chinese display name, e.g. `千米`. */
    nameZh: string;
    /** English display name, e.g. `kilometer`. */
    nameEn: string;
    /** Every accepted spelling (already normalized, see {@link normalizeUnit}). */
    aliases: readonly string[];
    /** Linear multiplier to the base unit. */
    factor?: number;
    /** Temperature slope: kelvin = value * a + b. */
    a?: number;
    /** Temperature offset: kelvin = value * a + b. */
    b?: number;
}
/** Definition of the delta (difference) temperature marker. */
declare const DELTA_MARKERS: readonly ["Δ", "delta", "diff"];
declare const UNITS: readonly UnitDef[];
/** Normalize a raw unit token for alias lookup. */
declare function normalizeUnit(raw: string): string;
interface AliasIndex {
    map: Map<string, UnitDef>;
    /** Alias -> list of units that claimed it (non-empty only when ambiguous). */
    conflicts: Map<string, UnitDef[]>;
}
/** Build an alias lookup index and report duplicate aliases instead of hiding them. */
declare function buildAliasIndex(units?: readonly UnitDef[]): AliasIndex;
/** Shared alias index. */
declare const ALIAS_INDEX: AliasIndex;
/** Look up a unit by any alias/name/symbol, or `undefined`. */
declare function findUnit(token: string): UnitDef | undefined;
/** All units of one category (in declaration order). */
declare function unitsByCategory(category: CategoryId): readonly UnitDef[];
/** True when a token carries a temperature-delta marker (`Δ°C`). */
declare function stripDeltaMarker(token: string): {
    base: string;
    delta: boolean;
};

/**
 * Pure conversion engine for dsh-unit-conversion.
 *
 * This module has no DeepSeek-Harness dependency on purpose: it is a plain
 * TypeScript library that the DSH plugin entry (`src/index.ts`) wraps as a
 * model-facing tool, and that tests exercise directly.
 */

/** Options for {@link convert}. */
interface ConvertOptions {
    /**
     * Round the result to this many significant digits (default 10).
     * Pass `undefined`/omit for the default.
     */
    significantDigits?: number;
}
/** Normalized, resolved unit identity after parsing a token. */
interface ResolvedUnit {
    def: UnitDef;
    /** Whether the caller asked for a temperature *difference* (Δ) conversion. */
    delta: boolean;
    /** Canonical spellings resolved from the input, e.g. `千米`. */
    canonical: string;
}
/** A validated conversion request after both units parsed. */
interface ConvertRequest {
    value: number;
    from: ResolvedUnit;
    to: ResolvedUnit;
}
/** Result of {@link convertDetailed}. */
interface ConvertResult {
    /** Original numeric value. */
    value: number;
    /** Canonical from-unit display name (resolved input spelling). */
    from: string;
    /** Canonical to-unit display name. */
    to: string;
    /** Converted value. */
    result: number;
    /** Category id shared by both units, e.g. `length`. */
    category: CategoryId;
    /** Category display name (Chinese), e.g. `长度`. */
    categoryZh: string;
    /** Category display name (English), e.g. `Length`. */
    categoryEn: string;
    /** Input tokens exactly as the caller passed them. */
    fromInput: string;
    /** Input tokens exactly as the caller passed them. */
    toInput: string;
    /** Human summary line, e.g. `100 千米 = 62.13711922 英里 (长度)`. */
    summary: string;
}
/** Error thrown when a conversion request is invalid. */
declare class UnitConversionError extends Error {
    /** Machine-readable kind: `unknown-unit` | `category-mismatch` | `bad-value` | `mixed-delta` | `unsupported`. */
    readonly kind: 'unknown-unit' | 'category-mismatch' | 'bad-value' | 'mixed-delta' | 'unsupported';
    /** The offending raw token for `unknown-unit` errors. */
    readonly token?: string;
    constructor(kind: UnitConversionError['kind'], message: string, token?: string);
}
/**
 * Parse and resolve one unit token. Supports case-insensitive matches
 * against symbols, English names and Chinese names, plus an optional
 * temperature-delta marker (`Δ°C`, `deltaC`, `ΔK`, ...).
 */
declare function resolveUnit(token: string): ResolvedUnit;
/**
 * Parse both unit tokens and verify they belong to the same category.
 * `from`/`to` may be the same unit (returns the value unchanged).
 */
declare function parseRequest(value: number, from: string, to: string): ConvertRequest;
/**
 * Round to `digits` significant digits (default 10). Implemented through
 * `toPrecision`, which stays finite across the full double range (a naive
 * `10 ** exponent` overflows for very small/large magnitudes).
 */
declare function roundSignificant(value: number, digits?: number): number;
/** Convert `value` from unit `from` to unit `to`. */
declare function convertRaw(value: number, from: ResolvedUnit, to: ResolvedUnit): number;
/**
 * Convert a numeric value between two units of the same category.
 *
 * ```ts
 * convert(100, 'km', 'mi')          // 62.13711922
 * convert(25, '°C', '°F')           // 77
 * convert(1, 'Δ°C', '°F')           // 1.8  (temperature difference)
 * convert(3, '公里/小时', 'm/s')    // 0.8333333333
 * ```
 *
 * @param value - the numeric amount to convert
 * @param from - source unit token (symbol, English or Chinese name)
 * @param to - target unit token
 * @param options - {@link ConvertOptions}
 * @throws {@link UnitConversionError} on unknown units, cross-category
 *   requests, or non-finite values.
 */
declare function convert(value: number, from: string, to: string, options?: ConvertOptions): number;
/** Convert and return a structured {@link ConvertResult} including a summary. */
declare function convertDetailed(value: number, from: string, to: string, options?: ConvertOptions): ConvertResult;

export { ALIAS_INDEX as A, CATEGORIES as C, DELTA_MARKERS as D, type ResolvedUnit as R, UNITS as U, type AliasIndex as a, CATEGORY_ORDER as b, type CategoryId as c, type CategoryMeta as d, type ConvertOptions as e, type ConvertRequest as f, type ConvertResult as g, UnitConversionError as h, type UnitDef as i, buildAliasIndex as j, convert as k, convertDetailed as l, convertRaw as m, findUnit as n, normalizeUnit as o, parseRequest as p, roundSignificant as q, resolveUnit as r, stripDeltaMarker as s, unitsByCategory as u };
