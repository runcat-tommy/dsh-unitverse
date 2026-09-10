import { describe, expect, it } from 'vitest'
import { convert, convertDetailed, UnitConversionError, roundSignificant } from '../src/convert'
import { ALIAS_INDEX, normalizeUnit } from '../src/units'

const approx = (actual: number, expected: number, digits = 6) =>
  expect(actual).toBeCloseTo(expected, digits)

describe('alias index integrity', () => {
  it('has no duplicate alias across units', () => {
    const problems = [...ALIAS_INDEX.conflicts.entries()].filter(([, list]) => list.length > 1)
    expect(problems).toEqual([])
  })

  it('normalizes case, unicode and whitespace', () => {
    expect(normalizeUnit(' KM ')).toBe('km')
    expect(normalizeUnit('m²')).toBe('m2')
    expect(normalizeUnit('m³')).toBe('m3')
    expect(normalizeUnit('℃')).toBe('°c')
    expect(normalizeUnit('µs')).toBe('us')
  })
})

describe('length conversions', () => {
  it('km -> m', () => approx(convert(1, 'km', 'm'), 1000))
  it('km -> mi', () => approx(convert(100, 'km', 'mi'), 62.13711922))
  it('m -> ft', () => approx(convert(1, 'm', 'ft'), 3.280839895))
  it('in -> cm', () => approx(convert(12, 'in', 'cm'), 30.48))
  it('nmi -> km', () => approx(convert(1, 'nmi', 'km'), 1.852))
  it('Chinese aliases 公里 -> 英里', () => approx(convert(5, '公里', '英里'), 3.106855961))
  it('English plural names', () => approx(convert(1, 'meters', 'feet'), 3.280839895))
})

describe('area conversions', () => {
  it('m2 -> km2', () => approx(convert(1_000_000, 'm²', 'km²'), 1))
  it('ha -> m2', () => approx(convert(1, 'ha', 'm2'), 10_000))
  it('acre -> m2', () => approx(convert(1, 'acre', 'm²'), 4046.8564224))
  it('亩 -> m2 (Chinese)', () => approx(convert(1, '亩', 'm2'), 2000 / 3))
  it('平方英尺 -> 平方米', () => approx(convert(100, '平方英尺', '平方米'), 9.290304))
})

describe('volume conversions', () => {
  it('l -> m3', () => approx(convert(1, 'L', 'm³'), 0.001))
  it('ml -> l', () => approx(convert(500, 'ml', 'L'), 0.5))
  it('gal(US) -> l', () => approx(convert(1, 'gal', 'l'), 3.785411784))
  it('gal(UK) -> l', () => approx(convert(1, 'imp gal', 'l'), 4.54609))
  it('bbl -> l', () => approx(convert(1, 'bbl', 'L'), 158.987294928))
  it('升 -> 毫升', () => approx(convert(2, '升', '毫升'), 2000))
})

describe('time conversions', () => {
  it('h -> s', () => approx(convert(1, 'h', 's'), 3600))
  it('d -> h', () => approx(convert(1, 'day', 'h'), 24))
  it('yr -> d', () => approx(convert(1, 'yr', 'd'), 365.25))
  it('min -> s', () => approx(convert(3, 'min', 's'), 180))
  it('分钟 -> 小时', () => approx(convert(90, '分钟', '小时'), 1.5))
})

describe('angle conversions', () => {
  it('deg -> rad', () => approx(convert(180, 'deg', 'rad'), Math.PI))
  it('rad -> deg', () => approx(convert(Math.PI / 2, 'rad', 'deg'), 90))
  it('arcmin -> deg', () => approx(convert(60, 'arcmin', 'deg'), 1))
  it('arcsec -> deg', () => approx(convert(3600, '角秒', '°'), 1))
  it('度 -> 弧度', () => approx(convert(360, '度', '弧度'), 2 * Math.PI))
})

describe('speed conversions', () => {
  it('km/h -> m/s', () => approx(convert(36, 'km/h', 'm/s'), 10))
  it('m/s -> km/h', () => approx(convert(1, 'm/s', 'km/h'), 3.6))
  it('mph -> km/h', () => approx(convert(60, 'mph', 'km/h'), 96.56064))
  it('knot -> km/h', () => approx(convert(1, 'kn', 'km/h'), 1.852))
  it('公里每小时 -> 米每秒', () => approx(convert(108, '公里每小时', 'm/s'), 30))
})

describe('temperature conversions', () => {
  it('0 °C -> 32 °F', () => approx(convert(0, '°C', '°F'), 32))
  it('100 °C -> 212 °F', () => approx(convert(100, 'C', 'F'), 212))
  it('0 °C -> 273.15 K', () => approx(convert(0, 'celsius', 'K'), 273.15))
  it('300 K -> °C', () => approx(convert(300, 'kelvin', '°C'), 26.85))
  it('°F -> K', () => approx(convert(32, '°F', 'K'), 273.15))
  it('Rankine round trip', () => approx(convert(convert(32, '°F', '°R'), '°R', '°F'), 32))
  it('Δ°C -> Δ°F is 1.8', () => approx(convert(10, 'Δ°C', 'Δ°F'), 18))
  it('delta marker deltaC/deltaF', () => approx(convert(1, 'deltaC', 'delta°F'), 1.8))
})

describe('pressure conversions', () => {
  it('atm -> pa', () => approx(convert(1, 'atm', 'Pa'), 101325))
  it('bar -> kpa', () => approx(convert(1, 'bar', 'kPa'), 100))
  it('psi -> kpa', () => approx(convert(1, 'psi', 'kPa'), 6.894757293))
  it('mmhg -> kpa', () => approx(convert(760, 'mmHg', 'kPa'), 101.3250148, 5))
  it('标准大气压 -> 兆帕', () => approx(convert(1, '标准大气压', 'MPa'), 0.101325))
})

describe('energy conversions', () => {
  it('kwh -> j', () => approx(convert(1, 'kWh', 'J'), 3_600_000))
  it('cal -> j', () => approx(convert(1, 'cal', 'J'), 4.184))
  it('kcal -> kj', () => approx(convert(1, '大卡', 'kJ'), 4.184))
  it('btu -> j', () => approx(convert(1, 'BTU', 'J'), 1055.05585262))
  it('瓦时 -> 焦耳', () => approx(convert(1, '瓦时', '焦耳'), 3600))
})

describe('power conversions', () => {
  it('kw -> w', () => approx(convert(1, 'kW', 'W'), 1000))
  it('hp -> w', () => approx(convert(1, 'hp', 'W'), 745.6998716))
  it('ps -> kw', () => approx(convert(1, '公制马力', 'kW'), 0.73549875))
  it('兆瓦 -> 千瓦', () => approx(convert(1, '兆瓦', 'kW'), 1000))
})

describe('same-category guard and identity', () => {
  it('same unit returns the value', () => expect(convert(42, 'km', 'KM')).toBe(42))

  it('rejects cross-category requests', () => {
    expect(() => convert(1, 'm', 's')).toThrowError(UnitConversionError)
    expect(() => convert(1, 'm', 's')).toThrowError(/cannot convert/)
  })

  it('rejects unknown units', () => {
    expect(() => convert(1, 'parsec', 'm')).toThrowError(/unknown unit/)
    expect(() => convert(1, 'm', 'zzz')).toThrowError(UnitConversionError)
  })

  it('rejects non-finite values', () => {
    expect(() => convert(Number.NaN, 'm', 'km')).toThrowError(/finite number/)
    expect(() => convert(Number.POSITIVE_INFINITY, 'm', 'km')).toThrowError(UnitConversionError)
  })

  it('rejects Δ markers on non-temperature units', () => {
    expect(() => convert(1, 'Δm', 'Δkm')).toThrowError(/only applies to temperature/)
  })

  it('rejects mixing absolute and Δ temperature tokens', () => {
    expect(() => convert(1, 'Δ°C', 'K')).toThrowError(/consistently/)
    expect(() => convert(1, 'K', 'Δ°C')).toThrowError(UnitConversionError)
  })

  it('suggests both repaired spellings without doubling the Δ marker', () => {
    const messageFor = (from: string, to: string): string => {
      try {
        convert(1, from, to)
      } catch (error) {
        return (error as Error).message
      }
      throw new Error(`expected ${from} -> ${to} to be rejected`)
    }

    const forward = messageFor('Δ°C', 'K')
    expect(forward).not.toContain('ΔΔ')
    expect(forward).toContain('Δ°C, ΔK')
    expect(forward).toContain('°C, K')

    const backward = messageFor('K', 'Δ°C')
    expect(backward).not.toContain('ΔΔ')
    expect(backward).toContain('ΔK, Δ°C')
  })
})

describe('precision and rounding', () => {
  it('defaults to ~10 significant digits', () => {
    expect(convert(1, 'km', 'mi')).toBe(0.6213711922)
  })

  it('respects significantDigits option', () => {
    expect(convert(100, 'km', 'mi', { significantDigits: 3 })).toBe(62.1)
    approx(convert(100, 'km', 'mi', { significantDigits: 15 }), 62.1371192237334, 12)
  })

  it('roundSignificant avoids -0', () => {
    expect(roundSignificant(-0)).toBe(0)
    expect(Object.is(roundSignificant(-1e-30, 3), -0)).toBe(false)
  })

  it('handles extremes without NaN', () => {
    expect(Number.isFinite(convert(1e290, 'km', 'nm'))).toBe(true)
    expect(Number.isFinite(convert(1e-290, 'nm', 'km'))).toBe(true)
  })
})

describe('convertDetailed summary', () => {
  it('builds a structured result', () => {
    const r = convertDetailed(100, '千米', '英里')
    expect(r.result).toBeCloseTo(62.13711922)
    expect(r.category).toBe('length')
    expect(r.categoryZh).toBe('长度')
    expect(r.categoryEn).toBe('Length')
    expect(r.summary).toContain('100')
    expect(r.summary).toContain('英里')
  })

  it('round-trips through the library API', () => {
    const r = convertDetailed(1, 'h', 's')
    expect(r.result).toBe(3600)
    expect(r.summary).toContain('时间')
    expect(r.from).toBe('h')
    expect(r.to).toBe('s')
  })

  it('keeps the Δ marker in the echoed units and the summary', () => {
    const delta = convertDetailed(10, 'Δ°C', 'Δ°F')
    expect(delta.result).toBeCloseTo(18)
    expect(delta.from).toBe('Δ°C')
    expect(delta.to).toBe('Δ°F')
    expect(delta.summary).toBe('10 Δ°C = 18 Δ°F (温度)')
  })

  it('never states a delta reading as an absolute one', () => {
    const absolute = convertDetailed(10, '°C', '°F')
    expect(absolute.result).toBe(50)
    expect(absolute.summary).toBe('10 °C = 50 °F (温度)')
    expect(convertDetailed(10, 'Δ°C', 'Δ°F').summary).not.toBe(absolute.summary)
  })

  it('echoes the Δ marker for Chinese and delta-word spellings', () => {
    expect(convertDetailed(1, 'Δ摄氏度', 'Δ华氏度').from).toBe('Δ摄氏度')
    expect(convertDetailed(1, 'deltaC', 'deltaF').to).toBe('Δ°F')
  })
})
