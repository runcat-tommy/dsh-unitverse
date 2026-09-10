// src/units.ts
var CATEGORY_ORDER = [
  "length",
  "area",
  "volume",
  "time",
  "angle",
  "speed",
  "temperature",
  "pressure",
  "energy",
  "power"
];
var CATEGORIES = {
  length: { id: "length", labelZh: "\u957F\u5EA6", labelEn: "Length", baseSymbol: "m" },
  area: { id: "area", labelZh: "\u9762\u79EF", labelEn: "Area", baseSymbol: "m\xB2" },
  volume: { id: "volume", labelZh: "\u4F53\u79EF", labelEn: "Volume", baseSymbol: "m\xB3" },
  time: { id: "time", labelZh: "\u65F6\u95F4", labelEn: "Time", baseSymbol: "s" },
  angle: { id: "angle", labelZh: "\u89D2\u5EA6", labelEn: "Angle", baseSymbol: "rad" },
  speed: { id: "speed", labelZh: "\u901F\u5EA6", labelEn: "Speed", baseSymbol: "m/s" },
  temperature: { id: "temperature", labelZh: "\u6E29\u5EA6", labelEn: "Temperature", baseSymbol: "K" },
  pressure: { id: "pressure", labelZh: "\u538B\u529B", labelEn: "Pressure", baseSymbol: "Pa" },
  energy: { id: "energy", labelZh: "\u70ED\u91CF/\u80FD\u91CF", labelEn: "Energy/Heat", baseSymbol: "J" },
  power: { id: "power", labelZh: "\u529F\u7387", labelEn: "Power", baseSymbol: "W" }
};
var DELTA_MARKERS = ["\u0394", "delta", "diff"];
var UNITS = [
  // ---------------------------------------------------------------- length
  { id: "nm", category: "length", symbol: "nm", nameZh: "\u7EB3\u7C73", nameEn: "nanometer", aliases: ["nm", "nanometer", "nanometers", "\u7EB3\u7C73"], factor: 1e-9 },
  { id: "um", category: "length", symbol: "\u03BCm", nameZh: "\u5FAE\u7C73", nameEn: "micrometer", aliases: ["um", "\u03BCm", "\xB5m", "micrometer", "micrometers", "micron", "microns", "\u5FAE\u7C73"], factor: 1e-6 },
  { id: "mm", category: "length", symbol: "mm", nameZh: "\u6BEB\u7C73", nameEn: "millimeter", aliases: ["mm", "millimeter", "millimeters", "millimetre", "millimetres", "\u6BEB\u7C73"], factor: 1e-3 },
  { id: "cm", category: "length", symbol: "cm", nameZh: "\u5398\u7C73", nameEn: "centimeter", aliases: ["cm", "centimeter", "centimeters", "centimetre", "centimetres", "\u5398\u7C73", "\u516C\u5206"], factor: 0.01 },
  { id: "m", category: "length", symbol: "m", nameZh: "\u7C73", nameEn: "meter", aliases: ["m", "meter", "meters", "metre", "metres", "\u7C73", "\u516C\u5C3A"], factor: 1 },
  { id: "km", category: "length", symbol: "km", nameZh: "\u5343\u7C73", nameEn: "kilometer", aliases: ["km", "kilometer", "kilometers", "kilometre", "kilometres", "\u5343\u7C73", "\u516C\u91CC"], factor: 1e3 },
  { id: "in", category: "length", symbol: "in", nameZh: "\u82F1\u5BF8", nameEn: "inch", aliases: ["in", "inch", "inches", "\u82F1\u5BF8", "\u540B"], factor: 0.0254 },
  { id: "ft", category: "length", symbol: "ft", nameZh: "\u82F1\u5C3A", nameEn: "foot", aliases: ["ft", "foot", "feet", "\u82F1\u5C3A"], factor: 0.3048 },
  { id: "yd", category: "length", symbol: "yd", nameZh: "\u7801", nameEn: "yard", aliases: ["yd", "yard", "yards", "\u7801"], factor: 0.9144 },
  { id: "mi", category: "length", symbol: "mi", nameZh: "\u82F1\u91CC", nameEn: "mile", aliases: ["mi", "mile", "miles", "\u82F1\u91CC"], factor: 1609.344 },
  { id: "nmi", category: "length", symbol: "nmi", nameZh: "\u6D77\u91CC", nameEn: "nautical mile", aliases: ["nmi", "nmile", "nautical mile", "nautical miles", "\u6D77\u91CC"], factor: 1852 },
  { id: "li", category: "length", symbol: "\u91CC", nameZh: "\u91CC", nameEn: "li (Chinese mile)", aliases: ["li", "\u91CC", "\u5E02\u91CC", "\u534E\u91CC"], factor: 500 },
  { id: "chi", category: "length", symbol: "\u5C3A", nameZh: "\u5C3A", nameEn: "chi (Chinese foot)", aliases: ["chi", "\u5C3A", "\u5E02\u5C3A"], factor: 1 / 3 },
  // ------------------------------------------------------------------ area
  { id: "mm2", category: "area", symbol: "mm\xB2", nameZh: "\u5E73\u65B9\u6BEB\u7C73", nameEn: "square millimeter", aliases: ["mm2", "mm\xB2", "square millimeter", "square millimeters", "\u5E73\u65B9\u6BEB\u7C73"], factor: 1e-6 },
  { id: "cm2", category: "area", symbol: "cm\xB2", nameZh: "\u5E73\u65B9\u5398\u7C73", nameEn: "square centimeter", aliases: ["cm2", "cm\xB2", "square centimeter", "square centimeters", "\u5E73\u65B9\u5398\u7C73"], factor: 1e-4 },
  { id: "m2", category: "area", symbol: "m\xB2", nameZh: "\u5E73\u65B9\u7C73", nameEn: "square meter", aliases: ["m2", "m\xB2", "square meter", "square meters", "square metre", "square metres", "\u5E73\u65B9\u7C73", "\u5E73\u7C73"], factor: 1 },
  { id: "km2", category: "area", symbol: "km\xB2", nameZh: "\u5E73\u65B9\u5343\u7C73", nameEn: "square kilometer", aliases: ["km2", "km\xB2", "square kilometer", "square kilometers", "\u5E73\u65B9\u5343\u7C73", "\u5E73\u65B9\u516C\u91CC"], factor: 1e6 },
  { id: "ha", category: "area", symbol: "ha", nameZh: "\u516C\u9877", nameEn: "hectare", aliases: ["ha", "hectare", "hectares", "\u516C\u9877"], factor: 1e4 },
  { id: "mu", category: "area", symbol: "\u4EA9", nameZh: "\u4EA9", nameEn: "mu (Chinese acre)", aliases: ["mu", "\u4EA9", "\u5E02\u4EA9"], factor: 2e3 / 3 },
  { id: "in2", category: "area", symbol: "in\xB2", nameZh: "\u5E73\u65B9\u82F1\u5BF8", nameEn: "square inch", aliases: ["in2", "in\xB2", "square inch", "square inches", "\u5E73\u65B9\u82F1\u5BF8"], factor: 0.0254 ** 2 },
  { id: "ft2", category: "area", symbol: "ft\xB2", nameZh: "\u5E73\u65B9\u82F1\u5C3A", nameEn: "square foot", aliases: ["ft2", "ft\xB2", "square foot", "square feet", "\u5E73\u65B9\u82F1\u5C3A"], factor: 0.3048 ** 2 },
  { id: "yd2", category: "area", symbol: "yd\xB2", nameZh: "\u5E73\u65B9\u7801", nameEn: "square yard", aliases: ["yd2", "yd\xB2", "square yard", "square yards", "\u5E73\u65B9\u7801"], factor: 0.9144 ** 2 },
  { id: "acre", category: "area", symbol: "acre", nameZh: "\u82F1\u4EA9", nameEn: "acre", aliases: ["acre", "acres", "\u82F1\u4EA9"], factor: 4046.8564224 },
  { id: "mi2", category: "area", symbol: "mi\xB2", nameZh: "\u5E73\u65B9\u82F1\u91CC", nameEn: "square mile", aliases: ["mi2", "mi\xB2", "square mile", "square miles", "\u5E73\u65B9\u82F1\u91CC"], factor: 1609.344 ** 2 },
  // ---------------------------------------------------------------- volume
  { id: "ml", category: "volume", symbol: "mL", nameZh: "\u6BEB\u5347", nameEn: "milliliter", aliases: ["ml", "mL", "milliliter", "milliliters", "millilitre", "millilitres", "\u6BEB\u5347"], factor: 1e-6 },
  { id: "l", category: "volume", symbol: "L", nameZh: "\u5347", nameEn: "liter", aliases: ["l", "L", "liter", "liters", "litre", "litres", "\u5347", "\u516C\u5347"], factor: 1e-3 },
  { id: "m3", category: "volume", symbol: "m\xB3", nameZh: "\u7ACB\u65B9\u7C73", nameEn: "cubic meter", aliases: ["m3", "m\xB3", "cubic meter", "cubic meters", "cubic metre", "cubic metres", "\u7ACB\u65B9\u7C73", "\u65B9"], factor: 1 },
  { id: "cm3", category: "volume", symbol: "cm\xB3", nameZh: "\u7ACB\u65B9\u5398\u7C73", nameEn: "cubic centimeter", aliases: ["cm3", "cm\xB3", "cc", "cubic centimeter", "cubic centimeters", "\u7ACB\u65B9\u5398\u7C73"], factor: 1e-6 },
  { id: "in3", category: "volume", symbol: "in\xB3", nameZh: "\u7ACB\u65B9\u82F1\u5BF8", nameEn: "cubic inch", aliases: ["in3", "in\xB3", "cubic inch", "cubic inches", "\u7ACB\u65B9\u82F1\u5BF8"], factor: 0.0254 ** 3 },
  { id: "ft3", category: "volume", symbol: "ft\xB3", nameZh: "\u7ACB\u65B9\u82F1\u5C3A", nameEn: "cubic foot", aliases: ["ft3", "ft\xB3", "cubic foot", "cubic feet", "\u7ACB\u65B9\u82F1\u5C3A"], factor: 0.3048 ** 3 },
  { id: "yd3", category: "volume", symbol: "yd\xB3", nameZh: "\u7ACB\u65B9\u7801", nameEn: "cubic yard", aliases: ["yd3", "yd\xB3", "cubic yard", "cubic yards", "\u7ACB\u65B9\u7801"], factor: 0.9144 ** 3 },
  { id: "gal_us", category: "volume", symbol: "gal (US)", nameZh: "\u7F8E\u5236\u52A0\u4ED1", nameEn: "US gallon", aliases: ["gal", "gallon", "gallons", "us gal", "us gallon", "us gallons", "\u7F8E\u5236\u52A0\u4ED1", "\u7F8E\u52A0\u4ED1", "\u52A0\u4ED1"], factor: 0.003785411784 },
  { id: "gal_uk", category: "volume", symbol: "gal (UK)", nameZh: "\u82F1\u5236\u52A0\u4ED1", nameEn: "imperial gallon", aliases: ["imp gal", "uk gal", "imperial gallon", "imperial gallons", "british gallon", "\u82F1\u5236\u52A0\u4ED1", "\u82F1\u52A0\u4ED1"], factor: 454609e-8 },
  { id: "qt_us", category: "volume", symbol: "qt (US)", nameZh: "\u7F8E\u5236\u5938\u8131", nameEn: "US quart", aliases: ["qt", "quart", "quarts", "us quart", "\u7F8E\u5236\u5938\u8131", "\u5938\u8131"], factor: 0.003785411784 / 4 },
  { id: "bbl", category: "volume", symbol: "bbl", nameZh: "\u6876\uFF08\u77F3\u6CB9\uFF09", nameEn: "oil barrel", aliases: ["bbl", "barrel", "oil barrel", "petroleum barrel", "\u6876"], factor: 0.158987294928 },
  // ------------------------------------------------------------------ time
  { id: "ms", category: "time", symbol: "ms", nameZh: "\u6BEB\u79D2", nameEn: "millisecond", aliases: ["ms", "millisecond", "milliseconds", "\u6BEB\u79D2"], factor: 1e-3 },
  { id: "s", category: "time", symbol: "s", nameZh: "\u79D2", nameEn: "second", aliases: ["s", "sec", "secs", "second", "seconds", "\u79D2"], factor: 1 },
  { id: "min", category: "time", symbol: "min", nameZh: "\u5206\u949F", nameEn: "minute", aliases: ["min", "mins", "minute", "minutes", "\u5206\u949F"], factor: 60 },
  { id: "h", category: "time", symbol: "h", nameZh: "\u5C0F\u65F6", nameEn: "hour", aliases: ["h", "hr", "hrs", "hour", "hours", "\u5C0F\u65F6", "\u65F6"], factor: 3600 },
  { id: "d", category: "time", symbol: "d", nameZh: "\u5929", nameEn: "day", aliases: ["d", "day", "days", "\u5929", "\u65E5"], factor: 86400 },
  { id: "wk", category: "time", symbol: "wk", nameZh: "\u5468", nameEn: "week", aliases: ["wk", "week", "weeks", "\u5468", "\u661F\u671F"], factor: 7 * 86400 },
  { id: "mo", category: "time", symbol: "mo", nameZh: "\u6708", nameEn: "month (mean Julian)", aliases: ["mo", "month", "months", "\u6708"], factor: 365.25 / 12 * 86400 },
  { id: "yr", category: "time", symbol: "yr", nameZh: "\u5E74", nameEn: "year (Julian)", aliases: ["y", "yr", "year", "years", "\u5E74"], factor: 365.25 * 86400 },
  // ----------------------------------------------------------------- angle
  { id: "rad", category: "angle", symbol: "rad", nameZh: "\u5F27\u5EA6", nameEn: "radian", aliases: ["rad", "radian", "radians", "\u5F27\u5EA6"], factor: 1 },
  { id: "deg", category: "angle", symbol: "\xB0", nameZh: "\u5EA6", nameEn: "degree", aliases: ["deg", "degree", "degrees", "\xB0", "\u5EA6", "\u89D2\u5EA6"], factor: Math.PI / 180 },
  { id: "grad", category: "angle", symbol: "grad", nameZh: "\u767E\u5206\u5EA6", nameEn: "gradian", aliases: ["grad", "gradian", "gradians", "gon", "\u767E\u5206\u5EA6"], factor: Math.PI / 200 },
  { id: "arcmin", category: "angle", symbol: "\u2032", nameZh: "\u89D2\u5206", nameEn: "arcminute", aliases: ["arcmin", "arcminute", "arcminutes", "\u89D2\u5206", "\u2032"], factor: Math.PI / 10800 },
  { id: "arcsec", category: "angle", symbol: "\u2033", nameZh: "\u89D2\u79D2", nameEn: "arcsecond", aliases: ["arcsec", "arcsecond", "arcseconds", "\u89D2\u79D2", "\u2033"], factor: Math.PI / 648e3 },
  { id: "turn", category: "angle", symbol: "turn", nameZh: "\u5708", nameEn: "turn", aliases: ["turn", "turns", "rev", "revolution", "revolutions", "\u5708", "\u8F6C"], factor: 2 * Math.PI },
  // ----------------------------------------------------------------- speed
  { id: "m_s", category: "speed", symbol: "m/s", nameZh: "\u7C73\u6BCF\u79D2", nameEn: "meter per second", aliases: ["m/s", "mps", "meter per second", "meters per second", "metre per second", "metres per second", "\u7C73\u6BCF\u79D2", "\u7C73/\u79D2"], factor: 1 },
  { id: "km_h", category: "speed", symbol: "km/h", nameZh: "\u5343\u7C73\u6BCF\u5C0F\u65F6", nameEn: "kilometer per hour", aliases: ["km/h", "kmh", "kmph", "kph", "kilometer per hour", "kilometers per hour", "kilometre per hour", "\u5343\u7C73\u6BCF\u5C0F\u65F6", "\u516C\u91CC\u6BCF\u5C0F\u65F6", "\u5343\u7C73/\u5C0F\u65F6", "\u516C\u91CC/\u5C0F\u65F6"], factor: 1 / 3.6 },
  { id: "mph", category: "speed", symbol: "mph", nameZh: "\u82F1\u91CC\u6BCF\u5C0F\u65F6", nameEn: "mile per hour", aliases: ["mph", "mi/h", "mile per hour", "miles per hour", "\u82F1\u91CC\u6BCF\u5C0F\u65F6"], factor: 0.44704 },
  { id: "kn", category: "speed", symbol: "kn", nameZh: "\u8282", nameEn: "knot", aliases: ["kn", "kt", "knot", "knots", "\u8282"], factor: 1852 / 3600 },
  { id: "ft_s", category: "speed", symbol: "ft/s", nameZh: "\u82F1\u5C3A\u6BCF\u79D2", nameEn: "foot per second", aliases: ["ft/s", "fps", "foot per second", "feet per second", "\u82F1\u5C3A\u6BCF\u79D2"], factor: 0.3048 },
  // ----------------------------------------------------------- temperature
  { id: "celsius", category: "temperature", symbol: "\xB0C", nameZh: "\u6444\u6C0F\u5EA6", nameEn: "degree Celsius", aliases: ["c", "\xB0c", "\u2103", "celsius", "\u6444\u6C0F\u5EA6"], a: 1, b: 273.15 },
  { id: "fahrenheit", category: "temperature", symbol: "\xB0F", nameZh: "\u534E\u6C0F\u5EA6", nameEn: "degree Fahrenheit", aliases: ["f", "\xB0f", "\u2109", "fahrenheit", "\u534E\u6C0F\u5EA6"], a: 5 / 9, b: 459.67 * (5 / 9) },
  { id: "kelvin", category: "temperature", symbol: "K", nameZh: "\u5F00\u5C14\u6587", nameEn: "kelvin", aliases: ["k", "kelvin", "\u5F00\u5C14\u6587", "\u5F00"], a: 1, b: 0 },
  { id: "rankine", category: "temperature", symbol: "\xB0R", nameZh: "\u5170\u6C0F\u5EA6", nameEn: "degree Rankine", aliases: ["r", "\xB0r", "rankine", "\u5170\u6C0F\u5EA6"], a: 5 / 9, b: 0 },
  // -------------------------------------------------------------- pressure
  { id: "pa", category: "pressure", symbol: "Pa", nameZh: "\u5E15\u65AF\u5361", nameEn: "pascal", aliases: ["pa", "pascal", "pascals", "\u5E15", "\u5E15\u65AF\u5361"], factor: 1 },
  { id: "kpa", category: "pressure", symbol: "kPa", nameZh: "\u5343\u5E15", nameEn: "kilopascal", aliases: ["kpa", "kilopascal", "kilopascals", "\u5343\u5E15"], factor: 1e3 },
  { id: "mpa", category: "pressure", symbol: "MPa", nameZh: "\u5146\u5E15", nameEn: "megapascal", aliases: ["mpa", "megapascal", "megapascals", "\u5146\u5E15"], factor: 1e6 },
  { id: "hpa", category: "pressure", symbol: "hPa", nameZh: "\u767E\u5E15", nameEn: "hectopascal", aliases: ["hpa", "hectopascal", "hectopascals", "\u767E\u5E15"], factor: 100 },
  { id: "bar", category: "pressure", symbol: "bar", nameZh: "\u5DF4", nameEn: "bar", aliases: ["bar", "bars", "\u5DF4"], factor: 1e5 },
  { id: "atm", category: "pressure", symbol: "atm", nameZh: "\u6807\u51C6\u5927\u6C14\u538B", nameEn: "atmosphere", aliases: ["atm", "atmosphere", "atmospheres", "\u6807\u51C6\u5927\u6C14\u538B", "\u5927\u6C14\u538B"], factor: 101325 },
  { id: "psi", category: "pressure", symbol: "psi", nameZh: "\u78C5\u6BCF\u5E73\u65B9\u82F1\u5BF8", nameEn: "pound per square inch", aliases: ["psi", "pound per square inch", "pounds per square inch", "\u78C5\u6BCF\u5E73\u65B9\u82F1\u5BF8"], factor: 6894.757293168361 },
  { id: "torr", category: "pressure", symbol: "Torr", nameZh: "\u6258", nameEn: "torr", aliases: ["torr", "\u6258"], factor: 101325 / 760 },
  { id: "mmhg", category: "pressure", symbol: "mmHg", nameZh: "\u6BEB\u7C73\u6C5E\u67F1", nameEn: "millimeter of mercury", aliases: ["mmhg", "millimeter of mercury", "millimeters of mercury", "\u6BEB\u7C73\u6C5E\u67F1"], factor: 133.322387415 },
  { id: "inhg", category: "pressure", symbol: "inHg", nameZh: "\u82F1\u5BF8\u6C5E\u67F1", nameEn: "inch of mercury", aliases: ["inhg", "inch of mercury", "inches of mercury", "\u82F1\u5BF8\u6C5E\u67F1"], factor: 25.4 * 133.322387415 },
  // ---------------------------------------------------------------- energy
  { id: "j", category: "energy", symbol: "J", nameZh: "\u7126\u8033", nameEn: "joule", aliases: ["j", "joule", "joules", "\u7126\u8033", "\u7126"], factor: 1 },
  { id: "kj", category: "energy", symbol: "kJ", nameZh: "\u5343\u7126", nameEn: "kilojoule", aliases: ["kj", "kilojoule", "kilojoules", "\u5343\u7126"], factor: 1e3 },
  { id: "mj", category: "energy", symbol: "MJ", nameZh: "\u5146\u7126", nameEn: "megajoule", aliases: ["mj", "megajoule", "megajoules", "\u5146\u7126"], factor: 1e6 },
  { id: "cal", category: "energy", symbol: "cal", nameZh: "\u5361\u8DEF\u91CC", nameEn: "calorie (thermochemical)", aliases: ["cal", "calorie", "calories", "\u5361\u8DEF\u91CC", "\u5361"], factor: 4.184 },
  { id: "kcal", category: "energy", symbol: "kcal", nameZh: "\u5343\u5361", nameEn: "kilocalorie", aliases: ["kcal", "kilocalorie", "kilocalories", "\u5927\u5361", "\u5343\u5361"], factor: 4184 },
  { id: "wh", category: "energy", symbol: "Wh", nameZh: "\u74E6\u65F6", nameEn: "watt-hour", aliases: ["wh", "watt hour", "watt hours", "\u74E6\u65F6"], factor: 3600 },
  { id: "kwh", category: "energy", symbol: "kWh", nameZh: "\u5343\u74E6\u65F6", nameEn: "kilowatt-hour", aliases: ["kwh", "kilowatt hour", "kilowatt hours", "\u5343\u74E6\u65F6"], factor: 36e5 },
  { id: "btu", category: "energy", symbol: "BTU", nameZh: "\u82F1\u70ED\u5355\u4F4D", nameEn: "British thermal unit", aliases: ["btu", "btus", "british thermal unit", "british thermal units", "\u82F1\u70ED\u5355\u4F4D"], factor: 1055.05585262 },
  // ----------------------------------------------------------------- power
  { id: "w", category: "power", symbol: "W", nameZh: "\u74E6", nameEn: "watt", aliases: ["w", "watt", "watts", "\u74E6", "\u74E6\u7279"], factor: 1 },
  { id: "kw", category: "power", symbol: "kW", nameZh: "\u5343\u74E6", nameEn: "kilowatt", aliases: ["kw", "kilowatt", "kilowatts", "\u5343\u74E6"], factor: 1e3 },
  { id: "mw", category: "power", symbol: "MW", nameZh: "\u5146\u74E6", nameEn: "megawatt", aliases: ["mw", "megawatt", "megawatts", "\u5146\u74E6"], factor: 1e6 },
  { id: "gw", category: "power", symbol: "GW", nameZh: "\u5409\u74E6", nameEn: "gigawatt", aliases: ["gw", "gigawatt", "gigawatts", "\u5409\u74E6"], factor: 1e9 },
  { id: "hp", category: "power", symbol: "hp", nameZh: "\u82F1\u5236\u9A6C\u529B", nameEn: "horsepower (mechanical)", aliases: ["hp", "horsepower", "mechanical horsepower", "\u82F1\u5236\u9A6C\u529B"], factor: 745.6998715822702 },
  { id: "ps", category: "power", symbol: "PS", nameZh: "\u516C\u5236\u9A6C\u529B", nameEn: "metric horsepower", aliases: ["ps", "metric horsepower", "pferdest\xE4rke", "\u516C\u5236\u9A6C\u529B", "\u7C73\u5236\u9A6C\u529B", "\u5339"], factor: 735.49875 }
];
function normalizeUnit(raw) {
  return raw.trim().toLowerCase().replace(/\u00b2/g, "2").replace(/\u00b3/g, "3").replace(/\u03bc|\u00b5/g, "u").replace(/[℃]/g, "\xB0c").replace(/[℉]/g, "\xB0f").replace(/\s+/g, "");
}
function buildAliasIndex(units = UNITS) {
  const map = /* @__PURE__ */ new Map();
  const conflicts = /* @__PURE__ */ new Map();
  for (const unit of units) {
    const seen = /* @__PURE__ */ new Set();
    const keys = [...unit.aliases, unit.id, unit.symbol, unit.nameZh, unit.nameEn];
    for (const raw of keys) {
      const key = normalizeUnit(raw);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const existing = map.get(key);
      if (existing) {
        if (existing.id === unit.id) continue;
        const list = conflicts.get(key) ?? [existing];
        if (!list.includes(unit)) list.push(unit);
        conflicts.set(key, list);
        continue;
      }
      map.set(key, unit);
    }
  }
  return { map, conflicts };
}
var ALIAS_INDEX = buildAliasIndex();
function findUnit(token) {
  const key = normalizeUnit(token);
  if (!key) return void 0;
  return ALIAS_INDEX.map.get(key);
}
function unitsByCategory(category) {
  return UNITS.filter((u) => u.category === category);
}
function stripDeltaMarker(token) {
  const t = token.trim();
  for (const marker of DELTA_MARKERS) {
    if (t.toLowerCase().startsWith(marker.toLowerCase())) {
      const base = t.slice(marker.length).trim();
      return { base, delta: true };
    }
  }
  return { base: t, delta: false };
}

// src/convert.ts
var UnitConversionError = class extends Error {
  /** Machine-readable kind: `unknown-unit` | `category-mismatch` | `bad-value` | `mixed-delta` | `unsupported`. */
  kind;
  /** The offending raw token for `unknown-unit` errors. */
  token;
  constructor(kind, message, token) {
    super(message);
    this.name = "UnitConversionError";
    this.kind = kind;
    if (token !== void 0) this.token = token;
  }
};
function displayNameFor(def, rawToken) {
  const trimmed = rawToken.trim();
  if (/[\u4e00-\u9fff]/.test(trimmed)) return trimmed;
  return def.symbol;
}
function resolveUnit(token) {
  const { base, delta } = stripDeltaMarker(token);
  const def = findUnit(base);
  if (def === void 0) {
    throw new UnitConversionError(
      "unknown-unit",
      `unknown unit "${base}": it is not a recognized length/area/volume/time/angle/speed/temperature/pressure/energy/power unit.`,
      base
    );
  }
  if (delta && def.category !== "temperature") {
    throw new UnitConversionError(
      "mixed-delta",
      `"${token}": the \u0394/delta marker only applies to temperature units.`,
      token
    );
  }
  const canonical = `${delta ? "\u0394" : ""}${displayNameFor(def, base)}`;
  return { def, delta, canonical };
}
function assertFiniteValue(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new UnitConversionError("bad-value", `value must be a finite number, got ${JSON.stringify(value)}`);
  }
}
function parseRequest(value, from, to) {
  assertFiniteValue(value);
  const fromResolved = resolveUnit(from);
  const toResolved = resolveUnit(to);
  if (fromResolved.def.category !== toResolved.def.category) {
    throw new UnitConversionError(
      "category-mismatch",
      `cannot convert ${from} (${CATEGORIES[fromResolved.def.category].labelZh}) to ${to} (${CATEGORIES[toResolved.def.category].labelZh}): units must belong to the same category.`
    );
  }
  if (fromResolved.delta !== toResolved.delta) {
    const bothDelta = `\u0394${fromResolved.def.symbol}, \u0394${toResolved.def.symbol}`;
    const bothAbsolute = `${fromResolved.def.symbol}, ${toResolved.def.symbol}`;
    throw new UnitConversionError(
      "mixed-delta",
      `cannot mix absolute and \u0394 temperature units: use both with the \u0394 marker (${bothDelta}) or both absolute (${bothAbsolute}) consistently.`
    );
  }
  return { value, from: fromResolved, to: toResolved };
}
function roundSignificant(value, digits = 10) {
  if (!Number.isFinite(value)) return value;
  if (value === 0) return 0;
  if (!Number.isFinite(digits) || digits <= 0) digits = 10;
  const clamped = Math.min(15, Math.max(1, Math.floor(digits)));
  const rounded = Number(value.toPrecision(clamped));
  return rounded === 0 ? 0 : rounded;
}
function convertRaw(value, from, to) {
  const { def: f } = from;
  const { def: t } = to;
  if (f.category === "temperature") {
    const fA = f.a;
    const fB = f.b;
    const tA = t.a;
    const tB = t.b;
    if (from.delta || to.delta) {
      return value * fA / tA;
    }
    return (value * fA + fB - tB) / tA;
  }
  const fFactor = f.factor;
  const tFactor = t.factor;
  return value * fFactor / tFactor;
}
function convert(value, from, to, options = {}) {
  const req = parseRequest(value, from, to);
  const raw = convertRaw(req.value, req.from, req.to);
  const sig = options.significantDigits ?? 10;
  return roundSignificant(raw, sig);
}
function convertDetailed(value, from, to, options = {}) {
  const req = parseRequest(value, from, to);
  const raw = convertRaw(req.value, req.from, req.to);
  const sig = options.significantDigits ?? 10;
  const result = roundSignificant(raw, sig);
  const category = req.from.def.category;
  const meta = CATEGORIES[category];
  const fromName = req.from.canonical;
  const toName = req.to.canonical;
  const summary = `${value} ${fromName} = ${result} ${toName} (${meta.labelZh})`;
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
    summary
  };
}

export {
  CATEGORY_ORDER,
  CATEGORIES,
  DELTA_MARKERS,
  UNITS,
  normalizeUnit,
  buildAliasIndex,
  ALIAS_INDEX,
  findUnit,
  unitsByCategory,
  stripDeltaMarker,
  UnitConversionError,
  resolveUnit,
  parseRequest,
  roundSignificant,
  convertRaw,
  convert,
  convertDetailed
};
