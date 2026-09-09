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

export type CategoryId =
  | 'length'
  | 'area'
  | 'volume'
  | 'time'
  | 'angle'
  | 'speed'
  | 'temperature'
  | 'pressure'
  | 'energy'
  | 'power'

export interface CategoryMeta {
  id: CategoryId
  labelZh: string
  labelEn: string
  baseSymbol: string
}

export const CATEGORY_ORDER: CategoryId[] = [
  'length',
  'area',
  'volume',
  'time',
  'angle',
  'speed',
  'temperature',
  'pressure',
  'energy',
  'power',
]

export const CATEGORIES: Record<CategoryId, CategoryMeta> = {
  length: { id: 'length', labelZh: '长度', labelEn: 'Length', baseSymbol: 'm' },
  area: { id: 'area', labelZh: '面积', labelEn: 'Area', baseSymbol: 'm²' },
  volume: { id: 'volume', labelZh: '体积', labelEn: 'Volume', baseSymbol: 'm³' },
  time: { id: 'time', labelZh: '时间', labelEn: 'Time', baseSymbol: 's' },
  angle: { id: 'angle', labelZh: '角度', labelEn: 'Angle', baseSymbol: 'rad' },
  speed: { id: 'speed', labelZh: '速度', labelEn: 'Speed', baseSymbol: 'm/s' },
  temperature: { id: 'temperature', labelZh: '温度', labelEn: 'Temperature', baseSymbol: 'K' },
  pressure: { id: 'pressure', labelZh: '压力', labelEn: 'Pressure', baseSymbol: 'Pa' },
  energy: { id: 'energy', labelZh: '热量/能量', labelEn: 'Energy/Heat', baseSymbol: 'J' },
  power: { id: 'power', labelZh: '功率', labelEn: 'Power', baseSymbol: 'W' },
}

/**
 * One unit definition.
 *
 * Linear units carry `factor`: `valueInBase = value * factor`.
 * Temperature units instead carry `a` and `b` (affine):
 * `kelvin = value * a + b`, which supports both absolute conversions and
 * temperature differences (delta) where only `a` matters.
 */
export interface UnitDef {
  /** Canonical machine id, e.g. `km` or `gal_us`. */
  id: string
  category: CategoryId
  /** Preferred display symbol, e.g. `km`, `°C`, `km/h`. */
  symbol: string
  /** Chinese display name, e.g. `千米`. */
  nameZh: string
  /** English display name, e.g. `kilometer`. */
  nameEn: string
  /** Every accepted spelling (already normalized, see {@link normalizeUnit}). */
  aliases: readonly string[]
  /** Linear multiplier to the base unit. */
  factor?: number
  /** Temperature slope: kelvin = value * a + b. */
  a?: number
  /** Temperature offset: kelvin = value * a + b. */
  b?: number
}

/** Definition of the delta (difference) temperature marker. */
export const DELTA_MARKERS = ['Δ', 'delta', 'diff'] as const

export const UNITS: readonly UnitDef[] = [
  // ---------------------------------------------------------------- length
  { id: 'nm', category: 'length', symbol: 'nm', nameZh: '纳米', nameEn: 'nanometer', aliases: ['nm', 'nanometer', 'nanometers', '纳米'], factor: 1e-9 },
  { id: 'um', category: 'length', symbol: 'μm', nameZh: '微米', nameEn: 'micrometer', aliases: ['um', 'μm', 'µm', 'micrometer', 'micrometers', 'micron', 'microns', '微米'], factor: 1e-6 },
  { id: 'mm', category: 'length', symbol: 'mm', nameZh: '毫米', nameEn: 'millimeter', aliases: ['mm', 'millimeter', 'millimeters', 'millimetre', 'millimetres', '毫米'], factor: 1e-3 },
  { id: 'cm', category: 'length', symbol: 'cm', nameZh: '厘米', nameEn: 'centimeter', aliases: ['cm', 'centimeter', 'centimeters', 'centimetre', 'centimetres', '厘米', '公分'], factor: 1e-2 },
  { id: 'm', category: 'length', symbol: 'm', nameZh: '米', nameEn: 'meter', aliases: ['m', 'meter', 'meters', 'metre', 'metres', '米', '公尺'], factor: 1 },
  { id: 'km', category: 'length', symbol: 'km', nameZh: '千米', nameEn: 'kilometer', aliases: ['km', 'kilometer', 'kilometers', 'kilometre', 'kilometres', '千米', '公里'], factor: 1e3 },
  { id: 'in', category: 'length', symbol: 'in', nameZh: '英寸', nameEn: 'inch', aliases: ['in', 'inch', 'inches', '英寸', '吋'], factor: 0.0254 },
  { id: 'ft', category: 'length', symbol: 'ft', nameZh: '英尺', nameEn: 'foot', aliases: ['ft', 'foot', 'feet', '英尺'], factor: 0.3048 },
  { id: 'yd', category: 'length', symbol: 'yd', nameZh: '码', nameEn: 'yard', aliases: ['yd', 'yard', 'yards', '码'], factor: 0.9144 },
  { id: 'mi', category: 'length', symbol: 'mi', nameZh: '英里', nameEn: 'mile', aliases: ['mi', 'mile', 'miles', '英里'], factor: 1609.344 },
  { id: 'nmi', category: 'length', symbol: 'nmi', nameZh: '海里', nameEn: 'nautical mile', aliases: ['nmi', 'nmile', 'nautical mile', 'nautical miles', '海里'], factor: 1852 },
  { id: 'li', category: 'length', symbol: '里', nameZh: '里', nameEn: 'li (Chinese mile)', aliases: ['li', '里', '市里', '华里'], factor: 500 },
  { id: 'chi', category: 'length', symbol: '尺', nameZh: '尺', nameEn: 'chi (Chinese foot)', aliases: ['chi', '尺', '市尺'], factor: 1 / 3 },

  // ------------------------------------------------------------------ area
  { id: 'mm2', category: 'area', symbol: 'mm²', nameZh: '平方毫米', nameEn: 'square millimeter', aliases: ['mm2', 'mm²', 'square millimeter', 'square millimeters', '平方毫米'], factor: 1e-6 },
  { id: 'cm2', category: 'area', symbol: 'cm²', nameZh: '平方厘米', nameEn: 'square centimeter', aliases: ['cm2', 'cm²', 'square centimeter', 'square centimeters', '平方厘米'], factor: 1e-4 },
  { id: 'm2', category: 'area', symbol: 'm²', nameZh: '平方米', nameEn: 'square meter', aliases: ['m2', 'm²', 'square meter', 'square meters', 'square metre', 'square metres', '平方米', '平米'], factor: 1 },
  { id: 'km2', category: 'area', symbol: 'km²', nameZh: '平方千米', nameEn: 'square kilometer', aliases: ['km2', 'km²', 'square kilometer', 'square kilometers', '平方千米', '平方公里'], factor: 1e6 },
  { id: 'ha', category: 'area', symbol: 'ha', nameZh: '公顷', nameEn: 'hectare', aliases: ['ha', 'hectare', 'hectares', '公顷'], factor: 1e4 },
  { id: 'mu', category: 'area', symbol: '亩', nameZh: '亩', nameEn: 'mu (Chinese acre)', aliases: ['mu', '亩', '市亩'], factor: 2000 / 3 },
  { id: 'in2', category: 'area', symbol: 'in²', nameZh: '平方英寸', nameEn: 'square inch', aliases: ['in2', 'in²', 'square inch', 'square inches', '平方英寸'], factor: 0.0254 ** 2 },
  { id: 'ft2', category: 'area', symbol: 'ft²', nameZh: '平方英尺', nameEn: 'square foot', aliases: ['ft2', 'ft²', 'square foot', 'square feet', '平方英尺'], factor: 0.3048 ** 2 },
  { id: 'yd2', category: 'area', symbol: 'yd²', nameZh: '平方码', nameEn: 'square yard', aliases: ['yd2', 'yd²', 'square yard', 'square yards', '平方码'], factor: 0.9144 ** 2 },
  { id: 'acre', category: 'area', symbol: 'acre', nameZh: '英亩', nameEn: 'acre', aliases: ['acre', 'acres', '英亩'], factor: 4046.8564224 },
  { id: 'mi2', category: 'area', symbol: 'mi²', nameZh: '平方英里', nameEn: 'square mile', aliases: ['mi2', 'mi²', 'square mile', 'square miles', '平方英里'], factor: 1609.344 ** 2 },

  // ---------------------------------------------------------------- volume
  { id: 'ml', category: 'volume', symbol: 'mL', nameZh: '毫升', nameEn: 'milliliter', aliases: ['ml', 'mL', 'milliliter', 'milliliters', 'millilitre', 'millilitres', '毫升'], factor: 1e-6 },
  { id: 'l', category: 'volume', symbol: 'L', nameZh: '升', nameEn: 'liter', aliases: ['l', 'L', 'liter', 'liters', 'litre', 'litres', '升', '公升'], factor: 1e-3 },
  { id: 'm3', category: 'volume', symbol: 'm³', nameZh: '立方米', nameEn: 'cubic meter', aliases: ['m3', 'm³', 'cubic meter', 'cubic meters', 'cubic metre', 'cubic metres', '立方米', '方'], factor: 1 },
  { id: 'cm3', category: 'volume', symbol: 'cm³', nameZh: '立方厘米', nameEn: 'cubic centimeter', aliases: ['cm3', 'cm³', 'cc', 'cubic centimeter', 'cubic centimeters', '立方厘米'], factor: 1e-6 },
  { id: 'in3', category: 'volume', symbol: 'in³', nameZh: '立方英寸', nameEn: 'cubic inch', aliases: ['in3', 'in³', 'cubic inch', 'cubic inches', '立方英寸'], factor: 0.0254 ** 3 },
  { id: 'ft3', category: 'volume', symbol: 'ft³', nameZh: '立方英尺', nameEn: 'cubic foot', aliases: ['ft3', 'ft³', 'cubic foot', 'cubic feet', '立方英尺'], factor: 0.3048 ** 3 },
  { id: 'yd3', category: 'volume', symbol: 'yd³', nameZh: '立方码', nameEn: 'cubic yard', aliases: ['yd3', 'yd³', 'cubic yard', 'cubic yards', '立方码'], factor: 0.9144 ** 3 },
  { id: 'gal_us', category: 'volume', symbol: 'gal (US)', nameZh: '美制加仑', nameEn: 'US gallon', aliases: ['gal', 'gallon', 'gallons', 'us gal', 'us gallon', 'us gallons', '美制加仑', '美加仑', '加仑'], factor: 0.003785411784 },
  { id: 'gal_uk', category: 'volume', symbol: 'gal (UK)', nameZh: '英制加仑', nameEn: 'imperial gallon', aliases: ['imp gal', 'uk gal', 'imperial gallon', 'imperial gallons', 'british gallon', '英制加仑', '英加仑'], factor: 0.00454609 },
  { id: 'qt_us', category: 'volume', symbol: 'qt (US)', nameZh: '美制夸脱', nameEn: 'US quart', aliases: ['qt', 'quart', 'quarts', 'us quart', '美制夸脱', '夸脱'], factor: 0.003785411784 / 4 },
  { id: 'bbl', category: 'volume', symbol: 'bbl', nameZh: '桶（石油）', nameEn: 'oil barrel', aliases: ['bbl', 'barrel', 'oil barrel', 'petroleum barrel', '桶'], factor: 0.158987294928 },

  // ------------------------------------------------------------------ time
  { id: 'ms', category: 'time', symbol: 'ms', nameZh: '毫秒', nameEn: 'millisecond', aliases: ['ms', 'millisecond', 'milliseconds', '毫秒'], factor: 1e-3 },
  { id: 's', category: 'time', symbol: 's', nameZh: '秒', nameEn: 'second', aliases: ['s', 'sec', 'secs', 'second', 'seconds', '秒'], factor: 1 },
  { id: 'min', category: 'time', symbol: 'min', nameZh: '分钟', nameEn: 'minute', aliases: ['min', 'mins', 'minute', 'minutes', '分钟'], factor: 60 },
  { id: 'h', category: 'time', symbol: 'h', nameZh: '小时', nameEn: 'hour', aliases: ['h', 'hr', 'hrs', 'hour', 'hours', '小时', '时'], factor: 3600 },
  { id: 'd', category: 'time', symbol: 'd', nameZh: '天', nameEn: 'day', aliases: ['d', 'day', 'days', '天', '日'], factor: 86400 },
  { id: 'wk', category: 'time', symbol: 'wk', nameZh: '周', nameEn: 'week', aliases: ['wk', 'week', 'weeks', '周', '星期'], factor: 7 * 86400 },
  { id: 'mo', category: 'time', symbol: 'mo', nameZh: '月', nameEn: 'month (mean Julian)', aliases: ['mo', 'month', 'months', '月'], factor: (365.25 / 12) * 86400 },
  { id: 'yr', category: 'time', symbol: 'yr', nameZh: '年', nameEn: 'year (Julian)', aliases: ['y', 'yr', 'year', 'years', '年'], factor: 365.25 * 86400 },

  // ----------------------------------------------------------------- angle
  { id: 'rad', category: 'angle', symbol: 'rad', nameZh: '弧度', nameEn: 'radian', aliases: ['rad', 'radian', 'radians', '弧度'], factor: 1 },
  { id: 'deg', category: 'angle', symbol: '°', nameZh: '度', nameEn: 'degree', aliases: ['deg', 'degree', 'degrees', '°', '度', '角度'], factor: Math.PI / 180 },
  { id: 'grad', category: 'angle', symbol: 'grad', nameZh: '百分度', nameEn: 'gradian', aliases: ['grad', 'gradian', 'gradians', 'gon', '百分度'], factor: Math.PI / 200 },
  { id: 'arcmin', category: 'angle', symbol: '′', nameZh: '角分', nameEn: 'arcminute', aliases: ['arcmin', 'arcminute', 'arcminutes', '角分', '′'], factor: Math.PI / 10800 },
  { id: 'arcsec', category: 'angle', symbol: '″', nameZh: '角秒', nameEn: 'arcsecond', aliases: ['arcsec', 'arcsecond', 'arcseconds', '角秒', '″'], factor: Math.PI / 648000 },
  { id: 'turn', category: 'angle', symbol: 'turn', nameZh: '圈', nameEn: 'turn', aliases: ['turn', 'turns', 'rev', 'revolution', 'revolutions', '圈', '转'], factor: 2 * Math.PI },

  // ----------------------------------------------------------------- speed
  { id: 'm_s', category: 'speed', symbol: 'm/s', nameZh: '米每秒', nameEn: 'meter per second', aliases: ['m/s', 'mps', 'meter per second', 'meters per second', 'metre per second', 'metres per second', '米每秒', '米/秒'], factor: 1 },
  { id: 'km_h', category: 'speed', symbol: 'km/h', nameZh: '千米每小时', nameEn: 'kilometer per hour', aliases: ['km/h', 'kmh', 'kmph', 'kph', 'kilometer per hour', 'kilometers per hour', 'kilometre per hour', '千米每小时', '公里每小时', '千米/小时', '公里/小时'], factor: 1 / 3.6 },
  { id: 'mph', category: 'speed', symbol: 'mph', nameZh: '英里每小时', nameEn: 'mile per hour', aliases: ['mph', 'mi/h', 'mile per hour', 'miles per hour', '英里每小时'], factor: 0.44704 },
  { id: 'kn', category: 'speed', symbol: 'kn', nameZh: '节', nameEn: 'knot', aliases: ['kn', 'kt', 'knot', 'knots', '节'], factor: 1852 / 3600 },
  { id: 'ft_s', category: 'speed', symbol: 'ft/s', nameZh: '英尺每秒', nameEn: 'foot per second', aliases: ['ft/s', 'fps', 'foot per second', 'feet per second', '英尺每秒'], factor: 0.3048 },

  // ----------------------------------------------------------- temperature
  { id: 'celsius', category: 'temperature', symbol: '°C', nameZh: '摄氏度', nameEn: 'degree Celsius', aliases: ['c', '°c', '℃', 'celsius', '摄氏度'], a: 1, b: 273.15 },
  { id: 'fahrenheit', category: 'temperature', symbol: '°F', nameZh: '华氏度', nameEn: 'degree Fahrenheit', aliases: ['f', '°f', '℉', 'fahrenheit', '华氏度'], a: 5 / 9, b: 459.67 * (5 / 9) },
  { id: 'kelvin', category: 'temperature', symbol: 'K', nameZh: '开尔文', nameEn: 'kelvin', aliases: ['k', 'kelvin', '开尔文', '开'], a: 1, b: 0 },
  { id: 'rankine', category: 'temperature', symbol: '°R', nameZh: '兰氏度', nameEn: 'degree Rankine', aliases: ['r', '°r', 'rankine', '兰氏度'], a: 5 / 9, b: 0 },

  // -------------------------------------------------------------- pressure
  { id: 'pa', category: 'pressure', symbol: 'Pa', nameZh: '帕斯卡', nameEn: 'pascal', aliases: ['pa', 'pascal', 'pascals', '帕', '帕斯卡'], factor: 1 },
  { id: 'kpa', category: 'pressure', symbol: 'kPa', nameZh: '千帕', nameEn: 'kilopascal', aliases: ['kpa', 'kilopascal', 'kilopascals', '千帕'], factor: 1e3 },
  { id: 'mpa', category: 'pressure', symbol: 'MPa', nameZh: '兆帕', nameEn: 'megapascal', aliases: ['mpa', 'megapascal', 'megapascals', '兆帕'], factor: 1e6 },
  { id: 'hpa', category: 'pressure', symbol: 'hPa', nameZh: '百帕', nameEn: 'hectopascal', aliases: ['hpa', 'hectopascal', 'hectopascals', '百帕'], factor: 100 },
  { id: 'bar', category: 'pressure', symbol: 'bar', nameZh: '巴', nameEn: 'bar', aliases: ['bar', 'bars', '巴'], factor: 1e5 },
  { id: 'atm', category: 'pressure', symbol: 'atm', nameZh: '标准大气压', nameEn: 'atmosphere', aliases: ['atm', 'atmosphere', 'atmospheres', '标准大气压', '大气压'], factor: 101325 },
  { id: 'psi', category: 'pressure', symbol: 'psi', nameZh: '磅每平方英寸', nameEn: 'pound per square inch', aliases: ['psi', 'pound per square inch', 'pounds per square inch', '磅每平方英寸'], factor: 6894.757293168361 },
  { id: 'torr', category: 'pressure', symbol: 'Torr', nameZh: '托', nameEn: 'torr', aliases: ['torr', '托'], factor: 101325 / 760 },
  { id: 'mmhg', category: 'pressure', symbol: 'mmHg', nameZh: '毫米汞柱', nameEn: 'millimeter of mercury', aliases: ['mmhg', 'millimeter of mercury', 'millimeters of mercury', '毫米汞柱'], factor: 133.322387415 },
  { id: 'inhg', category: 'pressure', symbol: 'inHg', nameZh: '英寸汞柱', nameEn: 'inch of mercury', aliases: ['inhg', 'inch of mercury', 'inches of mercury', '英寸汞柱'], factor: 25.4 * 133.322387415 },

  // ---------------------------------------------------------------- energy
  { id: 'j', category: 'energy', symbol: 'J', nameZh: '焦耳', nameEn: 'joule', aliases: ['j', 'joule', 'joules', '焦耳', '焦'], factor: 1 },
  { id: 'kj', category: 'energy', symbol: 'kJ', nameZh: '千焦', nameEn: 'kilojoule', aliases: ['kj', 'kilojoule', 'kilojoules', '千焦'], factor: 1e3 },
  { id: 'mj', category: 'energy', symbol: 'MJ', nameZh: '兆焦', nameEn: 'megajoule', aliases: ['mj', 'megajoule', 'megajoules', '兆焦'], factor: 1e6 },
  { id: 'cal', category: 'energy', symbol: 'cal', nameZh: '卡路里', nameEn: 'calorie (thermochemical)', aliases: ['cal', 'calorie', 'calories', '卡路里', '卡'], factor: 4.184 },
  { id: 'kcal', category: 'energy', symbol: 'kcal', nameZh: '千卡', nameEn: 'kilocalorie', aliases: ['kcal', 'kilocalorie', 'kilocalories', '大卡', '千卡'], factor: 4184 },
  { id: 'wh', category: 'energy', symbol: 'Wh', nameZh: '瓦时', nameEn: 'watt-hour', aliases: ['wh', 'watt hour', 'watt hours', '瓦时'], factor: 3600 },
  { id: 'kwh', category: 'energy', symbol: 'kWh', nameZh: '千瓦时', nameEn: 'kilowatt-hour', aliases: ['kwh', 'kilowatt hour', 'kilowatt hours', '千瓦时'], factor: 3.6e6 },
  { id: 'btu', category: 'energy', symbol: 'BTU', nameZh: '英热单位', nameEn: 'British thermal unit', aliases: ['btu', 'btus', 'british thermal unit', 'british thermal units', '英热单位'], factor: 1055.05585262 },

  // ----------------------------------------------------------------- power
  { id: 'w', category: 'power', symbol: 'W', nameZh: '瓦', nameEn: 'watt', aliases: ['w', 'watt', 'watts', '瓦', '瓦特'], factor: 1 },
  { id: 'kw', category: 'power', symbol: 'kW', nameZh: '千瓦', nameEn: 'kilowatt', aliases: ['kw', 'kilowatt', 'kilowatts', '千瓦'], factor: 1e3 },
  { id: 'mw', category: 'power', symbol: 'MW', nameZh: '兆瓦', nameEn: 'megawatt', aliases: ['mw', 'megawatt', 'megawatts', '兆瓦'], factor: 1e6 },
  { id: 'gw', category: 'power', symbol: 'GW', nameZh: '吉瓦', nameEn: 'gigawatt', aliases: ['gw', 'gigawatt', 'gigawatts', '吉瓦'], factor: 1e9 },
  { id: 'hp', category: 'power', symbol: 'hp', nameZh: '英制马力', nameEn: 'horsepower (mechanical)', aliases: ['hp', 'horsepower', 'mechanical horsepower', '英制马力'], factor: 745.6998715822702 },
  { id: 'ps', category: 'power', symbol: 'PS', nameZh: '公制马力', nameEn: 'metric horsepower', aliases: ['ps', 'metric horsepower', 'pferdestärke', '公制马力', '米制马力', '匹'], factor: 735.49875 },
]

/** Normalize a raw unit token for alias lookup. */
export function normalizeUnit(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\u00b2/g, '2') // ² -> 2
    .replace(/\u00b3/g, '3') // ³ -> 3
    .replace(/\u03bc|\u00b5/g, 'u') // μ or µ -> u
    .replace(/[℃]/g, '°c')
    .replace(/[℉]/g, '°f')
    .replace(/\s+/g, '')
}

export interface AliasIndex {
  map: Map<string, UnitDef>
  /** Alias -> list of units that claimed it (non-empty only when ambiguous). */
  conflicts: Map<string, UnitDef[]>
}

/** Build an alias lookup index and report duplicate aliases instead of hiding them. */
export function buildAliasIndex(units: readonly UnitDef[] = UNITS): AliasIndex {
  const map = new Map<string, UnitDef>()
  const conflicts = new Map<string, UnitDef[]>()
  for (const unit of units) {
    const seen = new Set<string>()
    const keys = [...unit.aliases, unit.id, unit.symbol, unit.nameZh, unit.nameEn]
    for (const raw of keys) {
      const key = normalizeUnit(raw)
      if (!key || seen.has(key)) continue
      seen.add(key)
      const existing = map.get(key)
      if (existing) {
        if (existing.id === unit.id) continue
        const list = conflicts.get(key) ?? [existing]
        if (!list.includes(unit)) list.push(unit)
        conflicts.set(key, list)
        continue
      }
      map.set(key, unit)
    }
  }
  return { map, conflicts }
}

/** Shared alias index. */
export const ALIAS_INDEX = buildAliasIndex()

/** Look up a unit by any alias/name/symbol, or `undefined`. */
export function findUnit(token: string): UnitDef | undefined {
  const key = normalizeUnit(token)
  if (!key) return undefined
  return ALIAS_INDEX.map.get(key)
}

/** All units of one category (in declaration order). */
export function unitsByCategory(category: CategoryId): readonly UnitDef[] {
  return UNITS.filter((u) => u.category === category)
}

/** True when a token carries a temperature-delta marker (`Δ°C`). */
export function stripDeltaMarker(token: string): { base: string; delta: boolean } {
  const t = token.trim()
  for (const marker of DELTA_MARKERS) {
    if (t.toLowerCase().startsWith(marker.toLowerCase())) {
      const base = t.slice(marker.length).trim()
      return { base, delta: true }
    }
  }
  return { base: t, delta: false }
}
