import { describe, expect, it } from 'vitest'
import { convertDetailed } from '../src/convert'
import { CATEGORY_ORDER, unitsByCategory } from '../src/units'
import { en, NS, zh } from '../src/client/locales'
import { DEFAULTS } from '../src/client/UnitConvertView'

/**
 * Unit-view invariants that the type system cannot fully carry:
 *  - both locale dictionaries cover exactly the same key set (no half-translated copy),
 *  - the category switcher exposes one module per category, with a tab label each,
 *  - every module's default unit pair really belongs to that category and converts,
 *  - the temperature module's Δ (difference) defaults convert as intervals.
 */

describe('unit-conversion view copy and modules', () => {
  it('ships the same key set in zh and en (no half-translated copy)', () => {
    const zhKeys = Object.keys(zh).sort()
    const enKeys = Object.keys(en).sort()
    expect(zhKeys.length).toBeGreaterThan(20)
    expect(enKeys).toEqual(zhKeys)
  })

  it('localizes every category tab in both locales', () => {
    for (const category of CATEGORY_ORDER) {
      const key = `catTab.${category}` as const
      expect(zh[key], `zh missing ${key}`).toBeTruthy()
      expect(en[key], `en missing ${key}`).toBeTruthy()
    }
  })

  it('keeps every dictionary value non-empty', () => {
    for (const [key, text] of Object.entries(zh)) expect(text, `zh ${key}`).not.toBe('')
    for (const [key, text] of Object.entries(en)) expect(text, `en ${key}`).not.toBe('')
  })

  it('declares the dictionary namespace used at registration', () => {
    expect(NS).toBe('unit-conversion')
  })

  it('gives every category a default pair inside that category that converts', () => {
    for (const category of CATEGORY_ORDER) {
      const [from, to] = DEFAULTS[category]
      const ids = unitsByCategory(category).map((u) => u.id)
      expect(ids, `${category}: ${from} not in category`).toContain(from)
      expect(ids, `${category}: ${to} not in category`).toContain(to)
      expect(from).not.toBe(to)

      const out = convertDetailed(1, from, to)
      expect(out.category, `${category}: ${from}->${to} category`).toBe(category)
      expect(Number.isFinite(out.result), `${category}: ${from}->${to} result`).toBe(true)
    }
  })

  it('never mixes categories: a module only offers its own units', () => {
    for (const category of CATEGORY_ORDER) {
      const units = unitsByCategory(category)
      expect(units.length).toBeGreaterThan(0)
      for (const unit of units) expect(unit.category).toBe(category)
    }
  })

  it('converts the temperature module defaults as absolute and as Δ intervals', () => {
    const [from, to] = DEFAULTS.temperature
    // Absolute: 1 °C = 33.8 °F
    expect(convertDetailed(1, from, to).result).toBe(33.8)
    // Difference: 1 Δ°C = 1.8 Δ°F
    expect(convertDetailed(1, `Δ${from}`, `Δ${to}`).result).toBe(1.8)
  })
})
