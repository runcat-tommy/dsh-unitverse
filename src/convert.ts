/**
 * Pure conversion engine for dsh-unit-conversion.
 *
 * This module has no DeepSeek-Harness dependency on purpose: it is a plain
 * TypeScript library that the DSH plugin entry (`src/index.ts`) wraps as a
 * model-facing tool, and that tests exercise directly.
 */

import {
  CATEGORIES,
  type CategoryId,
  findUnit,
  stripDeltaMarker,
  type UnitDef,
} from './units'

/** Options for {@link convert}. */
export interface ConvertOptions {
  /**
   * Round the result to this many significant digits (default 10).
   * Pass `undefined`/omit for the default.
   */
  significantDigits?: number
}

/** Normalized, resolved unit identity after parsing a token. */
export interface ResolvedUnit {
  def: UnitDef
  /** Whether the caller asked for a temperature *difference* (Δ) conversion. */
  delta: boolean
  /** Canonical spellings resolved from the input, e.g. `千米`. */
  canonical: string
}

/** A validated conversion request after both units parsed. */
export interface ConvertRequest {
  value: number
  from: ResolvedUnit
  to: ResolvedUnit
}

/** Result of {@link convertDetailed}. */
export interface ConvertResult {
  /** Original numeric value. */
  value: number
  /** Canonical from-unit display name (resolved input spelling). */
  from: string
  /** Canonical to-unit display name. */
  to: string
  /** Converted value. */
  result: number
  /** Category id shared by both units, e.g. `length`. */
  category: CategoryId
  /** Category display name (Chinese), e.g. `长度`. */
  categoryZh: string
  /** Category display name (English), e.g. `Length`. */
  categoryEn: string
  /** Input tokens exactly as the caller passed them. */
  fromInput: string
  /** Input tokens exactly as the caller passed them. */
  toInput: string
  /** Human summary line, e.g. `100 千米 = 62.13711922 英里 (长度)`. */
  summary: string
}

/** Error thrown when a conversion request is invalid. */
export class UnitConversionError extends Error {
  /** Machine-readable kind: `unknown-unit` | `category-mismatch` | `bad-value` | `mixed-delta` | `unsupported`. */
  readonly kind: 'unknown-unit' | 'category-mismatch' | 'bad-value' | 'mixed-delta' | 'unsupported'
  /** The offending raw token for `unknown-unit` errors. */
  readonly token?: string
  constructor(kind: UnitConversionError['kind'], message: string, token?: string) {
    super(message)
    this.name = 'UnitConversionError'
    this.kind = kind
    if (token !== undefined) this.token = token
  }
}

/** Human spellings the resolver should try when echoing a unit back. */
function displayNameFor(def: UnitDef, rawToken: string): string {
  const trimmed = rawToken.trim()
  // Keep CJK spellings as-is when the user typed them (e.g. `千米`).
  if (/[\u4e00-\u9fff]/.test(trimmed)) return trimmed
  return def.symbol
}

/**
 * Parse and resolve one unit token. Supports case-insensitive matches
 * against symbols, English names and Chinese names, plus an optional
 * temperature-delta marker (`Δ°C`, `deltaC`, `ΔK`, ...).
 */
export function resolveUnit(token: string): ResolvedUnit {
  const { base, delta } = stripDeltaMarker(token)
  const def = findUnit(base)
  if (def === undefined) {
    throw new UnitConversionError(
      'unknown-unit',
      `unknown unit "${base}": it is not a recognized length/area/volume/time/angle/speed/temperature/pressure/energy/power unit. `,
      base,
    )
  }
  if (delta && def.category !== 'temperature') {
    throw new UnitConversionError(
      'mixed-delta',
      `"${token}": the Δ/delta marker only applies to temperature units.`,
      token,
    )
  }
  return { def, delta, canonical: displayNameFor(def, base) }
}

/** Validate a finite numeric value. */
function assertFiniteValue(value: number): void {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new UnitConversionError('bad-value', `value must be a finite number, got ${JSON.stringify(value)}`)
  }
}

/**
 * Parse both unit tokens and verify they belong to the same category.
 * `from`/`to` may be the same unit (returns the value unchanged).
 */
export function parseRequest(value: number, from: string, to: string): ConvertRequest {
  assertFiniteValue(value)
  const fromResolved = resolveUnit(from)
  const toResolved = resolveUnit(to)
  if (fromResolved.def.category !== toResolved.def.category) {
    throw new UnitConversionError(
      'category-mismatch',
      `cannot convert ${from} (${CATEGORIES[fromResolved.def.category].labelZh}) to ${to} (${CATEGORIES[toResolved.def.category].labelZh}): units must belong to the same category.`,
    )
  }
  if (fromResolved.delta !== toResolved.delta) {
    throw new UnitConversionError(
      'mixed-delta',
      `cannot mix absolute and Δ temperature units: use ${fromResolved.delta ? 'Δ' : ''}${from} and ${toResolved.delta ? 'Δ' : ''}${to} consistently.`,
    )
  }
  return { value, from: fromResolved, to: toResolved }
}

/**
 * Round to `digits` significant digits (default 10). Implemented through
 * `toPrecision`, which stays finite across the full double range (a naive
 * `10 ** exponent` overflows for very small/large magnitudes).
 */
export function roundSignificant(value: number, digits = 10): number {
  if (!Number.isFinite(value)) return value
  if (value === 0) return 0
  if (!Number.isFinite(digits) || digits <= 0) digits = 10
  const clamped = Math.min(15, Math.max(1, Math.floor(digits)))
  const rounded = Number(value.toPrecision(clamped))
  // Avoid -0.
  return rounded === 0 ? 0 : rounded
}

/** Convert `value` from unit `from` to unit `to`. */
export function convertRaw(value: number, from: ResolvedUnit, to: ResolvedUnit): number {
  const { def: f } = from
  const { def: t } = to
  if (f.category === 'temperature') {
    const fA = f.a as number
    const fB = f.b as number
    const tA = t.a as number
    const tB = t.b as number
    if (from.delta || to.delta) {
      // A temperature *difference* scales only by the slope: 1 Δ°C = 1.8 Δ°F.
      return (value * fA) / tA
    }
    // Absolute temperature through kelvin: (value*a_f + b_f) is kelvin.
    return ((value * fA + fB) - tB) / tA
  }
  const fFactor = f.factor as number
  const tFactor = t.factor as number
  return (value * fFactor) / tFactor
}

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
export function convert(value: number, from: string, to: string, options: ConvertOptions = {}): number {
  const req = parseRequest(value, from, to)
  const raw = convertRaw(req.value, req.from, req.to)
  const sig = options.significantDigits ?? 10
  return roundSignificant(raw, sig)
}

/** Convert and return a structured {@link ConvertResult} including a summary. */
export function convertDetailed(value: number, from: string, to: string, options: ConvertOptions = {}): ConvertResult {
  const req = parseRequest(value, from, to)
  const raw = convertRaw(req.value, req.from, req.to)
  const sig = options.significantDigits ?? 10
  const result = roundSignificant(raw, sig)
  const category = req.from.def.category
  const meta = CATEGORIES[category]
  const fromName = req.from.canonical
  const toName = req.to.canonical
  const summary = `${value} ${fromName} = ${result} ${toName} (${meta.labelZh})`
  return {
    value,
    from: fromName,
    to: toName,
    result,
    category,
    categoryZh: meta.labelZh,
    categoryEn: meta.labelEn,
    fromInput: from,
    toInput: to,
    summary,
  }
}
