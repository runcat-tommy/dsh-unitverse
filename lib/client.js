window.__ModuleLoader__.load({
	id: "dsh-unit-conversion",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/UnitConvertView.tsx
var import_react = require("react");

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
  constructor(kind, message, token) {
    super(message);
    /** Machine-readable kind: `unknown-unit` | `category-mismatch` | `bad-value` | `mixed-delta` | `unsupported`. */
    __publicField(this, "kind");
    /** The offending raw token for `unknown-unit` errors. */
    __publicField(this, "token");
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
      `unknown unit "${base}": it is not a recognized length/area/volume/time/angle/speed/temperature/pressure/energy/power unit. `,
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
  return { def, delta, canonical: displayNameFor(def, base) };
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
    throw new UnitConversionError(
      "mixed-delta",
      `cannot mix absolute and \u0394 temperature units: use ${fromResolved.delta ? "\u0394" : ""}${from} and ${toResolved.delta ? "\u0394" : ""}${to} consistently.`
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

// src/client/locales.ts
var NS = "unit-conversion";
var zh = {
  "view.tab": "\u5355\u4F4D\u6362\u7B97",
  "view.aria": "\u6253\u5F00\u5355\u4F4D\u6362\u7B97\u89C6\u56FE",
  "ui.title": "\u5355\u4F4D\u6362\u7B97",
  "ui.subtitle": "\u5148\u9009\u62E9\u6362\u7B97\u7C7B\u522B\uFF0C\u518D\u5728\u8BE5\u7C7B\u522B\u7684\u5355\u4F4D\u4E4B\u95F4\u6362\u7B97\u3002",
  "ui.value": "\u6570\u503C",
  "ui.valuePlaceholder": "\u8F93\u5165\u6570\u503C",
  "ui.from": "\u6E90\u5355\u4F4D",
  "ui.to": "\u76EE\u6807\u5355\u4F4D",
  "ui.swap": "\u4EA4\u6362\u5355\u4F4D",
  "ui.delta": "\u6E29\u5DEE \u0394",
  "ui.deltaHint": "\u6E29\u5DEE\u6A21\u5F0F\uFF1A\u7ED3\u679C\u8868\u793A\u6E29\u5EA6\u5DEE\u503C\uFF0C\u800C\u4E0D\u662F\u7EDD\u5BF9\u6E29\u5EA6\u3002",
  "ui.result": "\u6362\u7B97\u7ED3\u679C",
  "ui.copy": "\u590D\u5236",
  "ui.copied": "\u5DF2\u590D\u5236",
  "ui.hint": "\u8F93\u5165\u6570\u503C\u5E76\u9009\u62E9\u5355\u4F4D\uFF0C\u7ED3\u679C\u5373\u65F6\u663E\u793A\u3002",
  "ui.emptyResult": "\u8F93\u5165\u6570\u503C\u540E\u663E\u793A\u7ED3\u679C",
  "ui.history": "\u672C\u7C7B\u522B\u6700\u8FD1\u6362\u7B97",
  "ui.historyEmpty": "\u6682\u65E0\u8BB0\u5F55",
  "ui.clear": "\u6E05\u7A7A",
  "ui.categoryLabel": "\u7C7B\u522B",
  "ui.errorUnknownUnit": "\u672A\u77E5\u5355\u4F4D\uFF1A{token}",
  "ui.errorCategoryMismatch": "\u201C{from}\u201D\u4E0E\u201C{to}\u201D\u4E0D\u5C5E\u4E8E\u540C\u4E00\u7C7B\u522B\uFF0C\u65E0\u6CD5\u6362\u7B97",
  "ui.errorMixedDelta": "\u6E29\u5DEE\u5355\u4F4D\uFF08\u0394\uFF09\u4E0D\u80FD\u4E0E\u7EDD\u5BF9\u6E29\u5EA6\u5355\u4F4D\u6DF7\u7528",
  "ui.errorBadValue": "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6570\u503C",
  "ui.errorGeneric": "\u6362\u7B97\u5931\u8D25\uFF1A{message}",
  "catTab.length": "\u957F\u5EA6\u6362\u7B97",
  "catTab.area": "\u9762\u79EF\u6362\u7B97",
  "catTab.volume": "\u4F53\u79EF\u6362\u7B97",
  "catTab.time": "\u65F6\u95F4\u6362\u7B97",
  "catTab.angle": "\u89D2\u5EA6\u6362\u7B97",
  "catTab.speed": "\u901F\u5EA6\u6362\u7B97",
  "catTab.temperature": "\u6E29\u5EA6\u6362\u7B97",
  "catTab.pressure": "\u538B\u529B\u6362\u7B97",
  "catTab.energy": "\u70ED\u91CF\u6362\u7B97",
  "catTab.power": "\u529F\u7387\u6362\u7B97"
};
var en = {
  "view.tab": "Unit Converter",
  "view.aria": "Open the unit converter view",
  "ui.title": "Unit Converter",
  "ui.subtitle": "Pick a category first, then convert between that category\u2019s units.",
  "ui.value": "Value",
  "ui.valuePlaceholder": "Enter a value",
  "ui.from": "From",
  "ui.to": "To",
  "ui.swap": "Swap units",
  "ui.delta": "Difference \u0394",
  "ui.deltaHint": "Difference mode: the result is a temperature interval, not an absolute temperature.",
  "ui.result": "Result",
  "ui.copy": "Copy",
  "ui.copied": "Copied",
  "ui.hint": "Enter a value and pick units \u2014 the result updates instantly.",
  "ui.emptyResult": "The result appears here",
  "ui.history": "Recent in this category",
  "ui.historyEmpty": "No conversions yet",
  "ui.clear": "Clear",
  "ui.categoryLabel": "Category",
  "ui.errorUnknownUnit": "Unknown unit: {token}",
  "ui.errorCategoryMismatch": "\u201C{from}\u201D and \u201C{to}\u201D are not in the same category",
  "ui.errorMixedDelta": "A \u0394 difference unit cannot be mixed with an absolute temperature",
  "ui.errorBadValue": "Enter a valid number",
  "ui.errorGeneric": "Conversion failed: {message}",
  "catTab.length": "Length",
  "catTab.area": "Area",
  "catTab.volume": "Volume",
  "catTab.time": "Time",
  "catTab.angle": "Angle",
  "catTab.speed": "Speed",
  "catTab.temperature": "Temperature",
  "catTab.pressure": "Pressure",
  "catTab.energy": "Heat / Energy",
  "catTab.power": "Power"
};

// src/client/UnitConvertView.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var HISTORY_KEY = "dsh.unit-conversion.history.v2";
var HISTORY_MAX = 60;
var HISTORY_SHOWN = 6;
function isCategoryId(x) {
  return typeof x === "string" && CATEGORY_ORDER.includes(x);
}
function readHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => {
      if (typeof x !== "object" || x === null) return false;
      const e = x;
      return isCategoryId(e.category) && typeof e.value === "string" && typeof e.fromId === "string" && typeof e.toId === "string" && typeof e.ts === "number";
    }).slice(0, HISTORY_MAX);
  } catch {
    return [];
  }
}
function writeHistory(entries) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, HISTORY_MAX)));
  } catch {
  }
}
var DEFAULTS = {
  length: ["km", "mi"],
  area: ["m2", "mu"],
  volume: ["l", "gal_us"],
  time: ["h", "min"],
  angle: ["deg", "rad"],
  speed: ["km_h", "m_s"],
  temperature: ["celsius", "fahrenheit"],
  pressure: ["atm", "kpa"],
  energy: ["kcal", "kj"],
  power: ["kw", "hp"]
};
var STYLE_ID = "dsh-unit-conversion-view-css";
var CSS = `
.uc-root {
  --uc-brand: var(--dsw-alias-brand-primary, #4c8dff);
  --uc-label: var(--dsw-alias-label-primary, #e6e6e6);
  --uc-label-2: var(--dsw-alias-label-secondary, #c0c0c0);
  --uc-label-3: var(--dsw-alias-label-tertiary, #9a9a9a);
  --uc-dim: var(--dsw-alias-label-dimmed, #888);
  --uc-border: var(--dsw-alias-border-l1, #2e2e2e);
  --uc-border-2: var(--dsw-alias-border-l2, #3a3a3a);
  --uc-layer: var(--dsw-alias-bg-layer-1, #262626);
  --uc-layer-2: var(--dsw-alias-bg-layer-2, #303030);
  --uc-hover: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12));
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 20px 24px 40px;
  color: var(--uc-label);
  font-size: 13px;
  line-height: 20px;
}

.uc-head { display: flex; flex-direction: column; gap: 4px; }
.uc-title { font-size: 17px; line-height: 24px; font-weight: 650; letter-spacing: -.01em; }
.uc-sub { font-size: 12px; line-height: 18px; color: var(--uc-label-3); }

/* ---- module switcher ---- */
.uc-cats { display: flex; flex-wrap: wrap; gap: 8px; }
.uc-cat {
  height: 30px; padding: 0 13px; border-radius: 15px;
  border: 1px solid var(--uc-border-2); background: transparent;
  color: var(--uc-label-2); font-size: 12.5px; font-family: inherit; line-height: 28px;
  cursor: pointer; white-space: nowrap;
  transition: background .12s ease, border-color .12s ease, color .12s ease;
}
.uc-cat:hover { background: var(--uc-hover); color: var(--uc-label); }
.uc-cat[data-active="true"] {
  border-color: color-mix(in srgb, var(--uc-brand) 55%, transparent);
  background: color-mix(in srgb, var(--uc-brand) 14%, transparent);
  color: var(--uc-brand); font-weight: 600;
}
.uc-cat:focus-visible { outline: 2px solid color-mix(in srgb, var(--uc-brand) 60%, transparent); outline-offset: 2px; }

/* ---- cards ---- */
.uc-card {
  display: flex; flex-direction: column; gap: 14px;
  border: 1px solid var(--uc-border); border-radius: 12px;
  background: var(--uc-layer); padding: 16px;
}

/* ---- form ---- */
.uc-form { display: grid; grid-template-columns: minmax(110px, .9fr) minmax(0, 1.4fr) auto minmax(0, 1.4fr); gap: 12px; align-items: end; }
.uc-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.uc-label { font-size: 11px; line-height: 14px; color: var(--uc-label-3); }
.uc-input, .uc-select {
  box-sizing: border-box; width: 100%; height: 36px; padding: 0 11px;
  border: 1px solid var(--uc-border-2); border-radius: 9px;
  background: var(--uc-layer-2); color: var(--uc-label);
  font-size: 13.5px; font-family: inherit; line-height: 34px; outline: none;
  transition: border-color .12s ease, box-shadow .12s ease;
}
.uc-input::placeholder { color: var(--uc-dim); }
.uc-input:focus, .uc-select:focus {
  border-color: var(--uc-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--uc-brand) 18%, transparent);
}
.uc-value { font-variant-numeric: tabular-nums; font-size: 15px; }
.uc-selectwrap { position: relative; display: block; min-width: 0; }
.uc-select { appearance: none; -webkit-appearance: none; padding-right: 30px; cursor: pointer; text-overflow: ellipsis; }
.uc-selectwrap::after {
  content: ""; position: absolute; right: 12px; top: 50%; width: 7px; height: 7px;
  border-right: 1.6px solid var(--uc-label-3); border-bottom: 1.6px solid var(--uc-label-3);
  transform: translateY(-70%) rotate(45deg); pointer-events: none;
}
.uc-swap {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 9px;
  border: 1px solid var(--uc-border-2); background: var(--uc-layer-2);
  color: var(--uc-label-2); font-size: 15px; line-height: 1; cursor: pointer;
  transition: background .12s ease, color .12s ease, transform .18s ease;
}
.uc-swap:hover { background: var(--uc-hover); color: var(--uc-label); }
.uc-swap:active { transform: rotate(180deg); }
.uc-swap:focus-visible { outline: 2px solid color-mix(in srgb, var(--uc-brand) 60%, transparent); outline-offset: 2px; }

/* ---- options row (difference switch) ---- */
.uc-opts { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.uc-switch { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; color: var(--uc-label-2); font-size: 12.5px; }
.uc-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.uc-track {
  position: relative; flex: none; width: 32px; height: 18px; border-radius: 9px;
  background: var(--uc-border-2); transition: background .14s ease;
}
.uc-track::after {
  content: ""; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%;
  background: #fff; transition: transform .14s ease;
}
.uc-switch input:checked + .uc-track { background: var(--uc-brand); }
.uc-switch input:checked + .uc-track::after { transform: translateX(14px); }
.uc-switch input:focus-visible + .uc-track { box-shadow: 0 0 0 3px color-mix(in srgb, var(--uc-brand) 25%, transparent); }
.uc-switch-hint { font-size: 11.5px; line-height: 17px; color: var(--uc-label-3); }

/* ---- result hero ---- */
.uc-hero {
  display: flex; flex-direction: column; gap: 8px;
  border: 1px solid color-mix(in srgb, var(--uc-brand) 30%, var(--uc-border));
  border-radius: 12px; padding: 16px;
  background: color-mix(in srgb, var(--uc-brand) 7%, transparent);
}
.uc-hero-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.uc-hero-label { font-size: 11px; line-height: 14px; color: var(--uc-label-3); letter-spacing: .06em; text-transform: uppercase; }
.uc-ghost {
  border: none; background: transparent; padding: 2px 6px; border-radius: 6px;
  color: var(--uc-label-3); font-size: 11.5px; font-family: inherit; cursor: pointer;
  transition: background .12s ease, color .12s ease;
}
.uc-ghost:hover { background: var(--uc-hover); color: var(--uc-label); }
.uc-hero-value {
  font-size: 30px; line-height: 38px; font-weight: 650; letter-spacing: -.02em;
  font-variant-numeric: tabular-nums; word-break: break-all;
}
.uc-hero-unit { margin-left: 8px; font-size: 15px; font-weight: 500; color: var(--uc-label-2); }
.uc-hero-eq { font-size: 13px; line-height: 20px; color: var(--uc-label-2); word-break: break-word; }
.uc-badge {
  align-self: flex-start; padding: 2px 8px; border-radius: 6px;
  background: var(--uc-layer-2); color: var(--uc-label-3);
  font-size: 11px; line-height: 16px;
}

.uc-empty {
  border: 1px dashed var(--uc-border-2); border-radius: 12px;
  padding: 22px 16px; text-align: center; color: var(--uc-dim); font-size: 12.5px;
}

/* ---- error ---- */
.uc-error {
  display: flex; flex-direction: column; gap: 4px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary, #e5484d) 45%, transparent);
  border-radius: 12px; padding: 12px 14px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #e5484d) 9%, transparent);
}
.uc-error-title { font-size: 13px; font-weight: 600; color: var(--dsw-alias-state-error-primary, #e5484d); }

/* ---- history ---- */
.uc-hist { display: flex; flex-direction: column; gap: 10px; }
.uc-hist-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.uc-hist-title { font-size: 12.5px; font-weight: 600; color: var(--uc-label-2); }
.uc-hist-list { display: flex; flex-direction: column; gap: 6px; }
.uc-row {
  display: flex; align-items: center; gap: 10px; width: 100%;
  padding: 9px 11px; border: 1px solid var(--uc-border); border-radius: 9px;
  background: transparent; color: var(--uc-label-2);
  font-family: inherit; font-size: 12.5px; line-height: 18px;
  text-align: left; cursor: pointer;
  transition: background .12s ease, border-color .12s ease, color .12s ease;
}
.uc-row:hover { background: var(--uc-hover); border-color: var(--uc-border-2); color: var(--uc-label); }
.uc-row-eq { font-variant-numeric: tabular-nums; white-space: nowrap; }
.uc-row-names { color: var(--uc-label-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.uc-row-time { flex: none; margin-left: auto; color: var(--uc-dim); font-size: 11px; font-variant-numeric: tabular-nums; }
.uc-hint { font-size: 11.5px; line-height: 17px; color: var(--uc-label-3); }

@media (max-width: 720px) {
  .uc-root { padding: 16px 14px 32px; }
  .uc-form { grid-template-columns: 1fr auto; }
  .uc-form .uc-field:first-child { grid-column: 1 / -1; }
  .uc-hero-value { font-size: 26px; line-height: 34px; }
}
`;
function ensureStyle() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.setAttribute("data-plugin-css", "dsh-unit-conversion");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function UnitConvertView({ t, locale }) {
  const subscribe = (0, import_react.useCallback)((onChange) => locale.subscribe(onChange), [locale]);
  const getSnapshot = (0, import_react.useCallback)(() => locale.getSnapshot(), [locale]);
  const snapshot = (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
  const lang = snapshot.active;
  const [category, setCategory] = (0, import_react.useState)("length");
  const [value, setValue] = (0, import_react.useState)("1");
  const [fromId, setFromId] = (0, import_react.useState)(DEFAULTS.length[0]);
  const [toId, setToId] = (0, import_react.useState)(DEFAULTS.length[1]);
  const [delta, setDelta] = (0, import_react.useState)(false);
  const [history, setHistory] = (0, import_react.useState)(() => readHistory());
  const [copied, setCopied] = (0, import_react.useState)(false);
  const unitName = (0, import_react.useCallback)(
    (unit) => lang === "en" ? unit.nameEn : unit.nameZh,
    [lang]
  );
  const displayToken = (0, import_react.useCallback)((unit) => {
    if (lang === "en" && /[\u4e00-\u9fff]/.test(unit.symbol)) return unit.nameEn;
    return unit.symbol;
  }, [lang]);
  const optionLabel = (0, import_react.useCallback)((unit) => {
    const token = displayToken(unit);
    const name = unitName(unit);
    return token === name ? name : `${token} \xB7 ${name}`;
  }, [displayToken, unitName]);
  const units = (0, import_react.useMemo)(() => unitsByCategory(category), [category]);
  const fromUnit = units.find((u) => u.id === fromId) ?? units[0];
  const toUnit = units.find((u) => u.id === toId) ?? units[1] ?? units[0];
  const isTemperature = category === "temperature";
  const prefix = isTemperature && delta ? "\u0394" : "";
  const result = (0, import_react.useMemo)(() => {
    if (value.trim() === "" || !Number.isFinite(Number(value)) || !fromUnit || !toUnit) return null;
    try {
      return convertDetailed(Number(value), prefix + fromUnit.id, prefix + toUnit.id);
    } catch {
      return null;
    }
  }, [value, prefix, fromUnit, toUnit]);
  const error = (0, import_react.useMemo)(() => {
    if (!fromUnit || !toUnit || value.trim() === "") return null;
    if (!Number.isFinite(Number(value))) return t("ui.errorBadValue");
    try {
      convertDetailed(Number(value), prefix + fromUnit.id, prefix + toUnit.id);
      return null;
    } catch (err) {
      if (err instanceof UnitConversionError) {
        switch (err.kind) {
          case "unknown-unit":
            return t("ui.errorUnknownUnit", { token: err.token ?? "" });
          case "category-mismatch":
            return t("ui.errorCategoryMismatch", { from: unitName(fromUnit), to: unitName(toUnit) });
          case "mixed-delta":
            return t("ui.errorMixedDelta");
          case "bad-value":
            return t("ui.errorBadValue");
          default:
            return t("ui.errorGeneric", { message: err.message });
        }
      }
      return t("ui.errorGeneric", { message: err instanceof Error ? err.message : "" });
    }
  }, [value, prefix, fromUnit, toUnit, t, unitName]);
  const firstRun = (0, import_react.useRef)(true);
  const signature = result && fromUnit && toUnit ? `${value}|${prefix}${fromUnit.id}|${prefix}${toUnit.id}` : "";
  (0, import_react.useEffect)(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!result || !fromUnit || !toUnit || value.trim() === "") return;
    setHistory((prev) => {
      const entry = {
        category,
        value,
        fromId: fromUnit.id,
        toId: toUnit.id,
        delta: isTemperature && delta,
        ts: Date.now()
      };
      const next = [
        entry,
        ...prev.filter((h) => !(h.value === value && h.fromId === fromUnit.id && h.toId === toUnit.id && h.delta === entry.delta))
      ].slice(0, HISTORY_MAX);
      writeHistory(next);
      return next;
    });
  }, [signature]);
  const pickCategory = (next) => {
    setCategory(next);
    const [f, s] = DEFAULTS[next];
    setFromId(f);
    setToId(s);
    setDelta(false);
    setCopied(false);
  };
  const onSwap = () => {
    setFromId(toId);
    setToId(fromId);
  };
  const onCopy = () => {
    if (!result || !fromUnit || !toUnit) return;
    const text = `${value} ${displayToken(fromUnit)} = ${result.result} ${displayToken(toUnit)}`;
    const pending = navigator.clipboard?.writeText(text);
    if (!pending) return;
    void pending.then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    }).catch(() => {
    });
  };
  const rows = (0, import_react.useMemo)(() => {
    const list = unitsByCategory(category);
    return history.filter((h) => h.category === category).slice(0, HISTORY_SHOWN).map((h) => {
      const f = list.find((u) => u.id === h.fromId);
      const s = list.find((u) => u.id === h.toId);
      if (!f || !s) return null;
      const p = h.delta ? "\u0394" : "";
      let out;
      try {
        out = String(convertDetailed(Number(h.value), p + f.id, p + s.id).result);
      } catch {
        return null;
      }
      return { key: `${h.ts}-${f.id}-${s.id}`, entry: h, from: f, to: s, out };
    }).filter((x) => x !== null);
  }, [history, category]);
  if (typeof window !== "undefined") ensureStyle();
  const catLabel = lang === "en" ? CATEGORIES[category].labelEn : CATEGORIES[category].labelZh;
  const rowsOfCategory = history.filter((h) => h.category === category).length;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-root", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-title", children: t("ui.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-sub", children: t("ui.subtitle") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uc-cats", role: "tablist", "aria-label": t("ui.title"), children: CATEGORY_ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        role: "tab",
        className: "uc-cat",
        "data-active": id === category,
        "aria-selected": id === category,
        onClick: () => pickCategory(id),
        children: t(`catTab.${id}`)
      },
      id
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-form", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "uc-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-label", children: t("ui.value") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "uc-input uc-value",
              value,
              inputMode: "decimal",
              placeholder: t("ui.valuePlaceholder"),
              onChange: (e) => setValue(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "uc-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-label", children: t("ui.from") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-selectwrap", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { className: "uc-select", value: fromUnit?.id ?? "", onChange: (e) => setFromId(e.target.value), children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: u.id, children: optionLabel(u) }, u.id)) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "uc-swap", title: t("ui.swap"), "aria-label": t("ui.swap"), onClick: onSwap, children: "\u21C4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "uc-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-label", children: t("ui.to") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-selectwrap", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { className: "uc-select", value: toUnit?.id ?? "", onChange: (e) => setToId(e.target.value), children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: u.id, children: optionLabel(u) }, u.id)) }) })
        ] })
      ] }),
      isTemperature ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-opts", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "uc-switch", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: delta, onChange: (e) => setDelta(e.target.checked) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-track" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("ui.delta") })
        ] }),
        delta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-switch-hint", children: t("ui.deltaHint") })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uc-hint", children: t("ui.hint") })
    ] }),
    error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uc-error", role: "alert", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-error-title", children: error }) }) : result && fromUnit && toUnit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-hero", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-hero-top", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-hero-label", children: t("ui.result") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "uc-ghost", onClick: onCopy, children: copied ? t("ui.copied") : t("ui.copy") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-hero-value", children: [
        result.result,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-hero-unit", children: displayToken(toUnit) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-hero-eq", children: [
        value,
        " ",
        unitName(fromUnit),
        " = ",
        result.result,
        " ",
        unitName(toUnit)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "uc-badge", children: [
        t("ui.categoryLabel"),
        ": ",
        catLabel
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uc-empty", children: t("ui.emptyResult") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-hist", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-hist-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-hist-title", children: t("ui.history") }),
        rowsOfCategory > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: "uc-ghost",
            onClick: () => {
              setHistory((prev) => {
                const next = prev.filter((h) => h.category !== category);
                writeHistory(next);
                return next;
              });
            },
            children: t("ui.clear")
          }
        )
      ] }),
      rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uc-empty", children: t("ui.historyEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uc-hist-list", children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          className: "uc-row",
          onClick: () => {
            setCategory(r.entry.category);
            setValue(r.entry.value);
            setFromId(r.from.id);
            setToId(r.to.id);
            setDelta(r.entry.delta);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "uc-row-eq", children: [
              r.entry.value,
              " ",
              displayToken(r.from),
              " = ",
              r.out,
              " ",
              displayToken(r.to)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "uc-row-names", children: [
              unitName(r.from),
              " \u2192 ",
              unitName(r.to)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-row-time", children: new Date(r.entry.ts).toLocaleTimeString() })
          ]
        },
        r.key
      )) })
    ] })
  ] });
}

// src/client/index.tsx
var inject = ["slots", "locale"];
var VIEW_ORDER = 20;
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "unit-conversion: dictionaries");
  const t = ctx.locale.bind(NS);
  ctx.slots.inject("conversation.view", () => ctx.slots.register({
    name: "conversation.view",
    id: "unit-conversion",
    order: VIEW_ORDER,
    locale: NS,
    label: () => t("view.tab"),
    // The active-locale source is injected so the panel can localize unit and
    // category names (data owned by units.ts) and re-render on a language switch.
    inject: () => ({ locale: ctx.locale })
  }, UnitConvertView));
}

		return module.exports;
	}
});

