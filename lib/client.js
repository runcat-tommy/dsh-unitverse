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

// src/client/UnitConvertView.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var HISTORY_KEY = "dsh.unit-conversion.history.v1";
var HISTORY_MAX = 20;
function readHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x) => typeof x === "object" && x !== null && typeof x.value === "string" && typeof x.from === "string" && typeof x.to === "string" && typeof x.summary === "string"
    ).slice(0, HISTORY_MAX);
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
var STYLE_ID = "dsh-unit-conversion-view-css";
var CSS = `
.uc-root { display: flex; flex-direction: column; gap: 14px; padding: 4px 2px; min-width: 0; }
.uc-head { display: flex; flex-direction: column; gap: 2px; }
.uc-title { font-size: 15px; line-height: 22px; font-weight: 600; color: var(--dsw-alias-label-primary, #e6e6e6); }
.uc-sub { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary, #9a9a9a); }
.uc-row { display: flex; flex-direction: row; align-items: center; gap: 8px; flex-wrap: wrap; }
.uc-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.uc-label { font-size: 11px; line-height: 14px; color: var(--dsw-alias-label-tertiary, #9a9a9a); }
.uc-input { box-sizing: border-box; height: 32px; padding: 0 10px; border: 1px solid var(--dsw-alias-border-l2, #3a3a3a); border-radius: 8px; background: var(--dsw-alias-bg-layer-1, #262626); color: var(--dsw-alias-label-primary, #e6e6e6); font-size: 13px; line-height: 20px; outline: none; min-width: 120px; }
.uc-input:focus { border-color: var(--dsw-alias-brand-primary, #4c8dff); }
.uc-input::placeholder { color: var(--dsw-alias-label-dimmed, #777); }
.uc-value { width: 150px; }
.uc-token { flex: 1; min-width: 140px; }
.uc-swap { flex: none; width: 30px; height: 30px; border: 1px solid var(--dsw-alias-border-l2, #3a3a3a); border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary, #c0c0c0); font-size: 14px; line-height: 1; cursor: pointer; }
.uc-swap:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(255,255,255,0.06)); }
.uc-result { display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; border: 1px solid var(--dsw-alias-border-l1, #2e2e2e); border-radius: 10px; background: var(--dsw-alias-bg-layer-1, #262626); }
.uc-result-summary { font-size: 16px; line-height: 24px; font-weight: 600; color: var(--dsw-alias-label-primary, #e6e6e6); word-break: break-all; }
.uc-result-cat { font-size: 11px; line-height: 14px; color: var(--dsw-alias-label-tertiary, #9a9a9a); }
.uc-error { padding: 8px 12px; border: 1px solid var(--dsw-alias-state-error-primary, #d64545); border-radius: 8px; background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #d64545) 12%, transparent); color: var(--dsw-alias-state-error-primary, #e5484d); font-size: 12px; line-height: 18px; }
.uc-hist { display: flex; flex-direction: column; gap: 6px; }
.uc-hist-head { display: flex; align-items: center; justify-content: space-between; }
.uc-hist-title { font-size: 12px; font-weight: 600; color: var(--dsw-alias-label-secondary, #c0c0c0); }
.uc-hist-clear { border: none; background: transparent; color: var(--dsw-alias-label-tertiary, #9a9a9a); font-size: 11px; cursor: pointer; padding: 2px 4px; }
.uc-hist-clear:hover { color: var(--dsw-alias-label-primary, #e6e6e6); }
.uc-hist-item { display: flex; flex-direction: row; align-items: center; gap: 8px; padding: 6px 10px; border: 1px solid var(--dsw-alias-border-l1, #2e2e2e); border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary, #c0c0c0); font-size: 12px; line-height: 18px; text-align: left; cursor: pointer; word-break: break-all; }
.uc-hist-item:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(255,255,255,0.06)); color: var(--dsw-alias-label-primary, #e6e6e6); }
.uc-hist-time { flex: none; margin-left: auto; color: var(--dsw-alias-label-dimmed, #777); font-size: 11px; }
.uc-empty { color: var(--dsw-alias-label-dimmed, #777); font-size: 12px; }
.uc-hint { color: var(--dsw-alias-label-tertiary, #9a9a9a); font-size: 11px; line-height: 16px; }
`;
function ensureStyle() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}
function errorText(err) {
  if (err instanceof UnitConversionError) {
    switch (err.kind) {
      case "unknown-unit":
        return `\u672A\u77E5\u5355\u4F4D\uFF1A${err.message}\uFF08\u652F\u6301\u4E2D\u82F1\u6587\u5355\u4F4D\uFF0C\u5982 km/kilometer/\u5343\u7C73/\u516C\u91CC\uFF1B\u4E5F\u63A5\u53D7\u7B26\u53F7\u5199\u6CD5\uFF09`;
      case "category-mismatch":
        return `\u65E0\u6CD5\u6362\u7B97\uFF1A${err.message}\uFF08\u4E24\u4E2A\u5355\u4F4D\u4E0D\u5C5E\u4E8E\u540C\u4E00\u7C7B\u522B\uFF09`;
      case "bad-value":
        return `\u6570\u503C\u65E0\u6548\uFF1A${err.message}`;
      case "mixed-delta":
        return `\u6E29\u5DEE\u5199\u6CD5\u4E0D\u4E00\u81F4\uFF1A${err.message}\uFF08\u8BF7\u540C\u65F6\u5728\u4E24\u4E2A\u5355\u4F4D\u524D\u52A0 \u0394\uFF0C\u6216\u90FD\u4E0D\u52A0\uFF09`;
      default:
        return `\u6362\u7B97\u5931\u8D25\uFF1A${err.message}`;
    }
  }
  return err instanceof Error ? `\u6362\u7B97\u5931\u8D25\uFF1A${err.message}` : "\u6362\u7B97\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u8F93\u5165";
}
function UnitConvertView(_props) {
  const [value, setValue] = (0, import_react.useState)("1");
  const [from, setFrom] = (0, import_react.useState)("km");
  const [to, setTo] = (0, import_react.useState)("mi");
  const [history, setHistory] = (0, import_react.useState)(() => readHistory());
  const suggestions = (0, import_react.useMemo)(() => {
    const seen = /* @__PURE__ */ new Set();
    const options = [];
    for (const unit of UNITS) {
      for (const token of [unit.symbol, unit.nameZh, unit.nameEn]) {
        if (token && !seen.has(token)) {
          seen.add(token);
          options.push(token);
        }
      }
    }
    return options;
  }, []);
  const result = (0, import_react.useMemo)(() => {
    const v = Number(value);
    if (value.trim() === "" || !Number.isFinite(v)) return null;
    try {
      return convertDetailed(v, from, to);
    } catch (err) {
      return null;
    }
  }, [value, from, to]);
  const error = (0, import_react.useMemo)(() => {
    if (value.trim() === "") return null;
    if (!Number.isFinite(Number(value))) return "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6570\u503C";
    try {
      convertDetailed(Number(value), from, to);
      return null;
    } catch (err) {
      return errorText(err);
    }
  }, [value, from, to]);
  const onSwap = () => {
    setFrom(to);
    setTo(from);
  };
  const commitHistory = (summary) => {
    if (value.trim() === "" || summary === "") return;
    setHistory((prev) => {
      const entry = { value, from, to, summary, ts: Date.now() };
      const next = [entry, ...prev.filter((h) => !(h.value === value && h.from === from && h.to === to))].slice(0, HISTORY_MAX);
      writeHistory(next);
      return next;
    });
  };
  const firstRun = (0, import_react.useRef)(true);
  (0, import_react.useEffect)(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (result && result.summary) commitHistory(result.summary);
  }, [result?.summary]);
  const onClear = () => {
    setHistory([]);
    writeHistory([]);
  };
  const onPick = (entry) => {
    setValue(entry.value);
    setFrom(entry.from);
    setTo(entry.to);
  };
  const categoryText = result ? `${result.categoryZh}\uFF08${result.categoryEn}\uFF09` : "";
  if (typeof window !== "undefined") ensureStyle();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-root", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-title", children: "\u5355\u4F4D\u6362\u7B97" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-sub", children: "\u652F\u6301 10 \u5927\u7C7B\u5171 80+ \u5E38\u7528\u5355\u4F4D\uFF1B\u5355\u4F4D\u540D\u53EF\u7528\u82F1\u6587\u7B26\u53F7\u3001\u82F1\u6587\u5168\u79F0\u6216\u4E2D\u6587\uFF08km/kilometer/\u5343\u7C73/\u516C\u91CC \u5747\u53EF\uFF09\u3002\u6E29\u5EA6\u9ED8\u8BA4\u6309\u7EDD\u5BF9\u6E29\u6807\u6362\u7B97\uFF0C\u6E29\u5DEE\u8BF7\u5199\u6210 \u0394\xB0C\u3001\u0394\xB0F \u5F62\u5F0F\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-label", children: "\u6570\u503C" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "uc-input uc-value",
            value,
            placeholder: "\u6570\u503C",
            inputMode: "decimal",
            onChange: (e) => setValue(e.target.value),
            "aria-label": "\u6570\u503C"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-field", style: { flex: "1 1 0" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-label", children: "\u6E90\u5355\u4F4D" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "uc-input uc-token",
            value: from,
            list: "uc-unit-suggestions",
            placeholder: "\u5982 km\u3001\u5343\u7C73\u3001mile",
            onChange: (e) => setFrom(e.target.value),
            "aria-label": "\u6E90\u5355\u4F4D"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "uc-swap", onClick: onSwap, title: "\u4EA4\u6362\u5355\u4F4D", "aria-label": "\u4EA4\u6362\u5355\u4F4D", children: "\u21C4" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-field", style: { flex: "1 1 0" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-label", children: "\u76EE\u6807\u5355\u4F4D" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "uc-input uc-token",
            value: to,
            list: "uc-unit-suggestions",
            placeholder: "\u5982 mi\u3001\u82F1\u91CC",
            onChange: (e) => setTo(e.target.value),
            "aria-label": "\u76EE\u6807\u5355\u4F4D"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", { id: "uc-unit-suggestions", children: suggestions.map((token) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: token }, token)) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uc-hint", children: "\u793A\u4F8B\uFF1A25 \xB0C \u2192 \xB0F \u5F97 77\uFF1B1 \u0394\xB0C \u2192 \u0394\xB0F \u5F97 1.8\uFF1B100 \u516C\u91CC \u2192 \u82F1\u91CC\u3002" }),
    error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uc-error", role: "alert", children: error }) : result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-result", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-result-summary", children: result.summary }),
      categoryText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "uc-result-cat", children: [
        "\u7C7B\u522B\uFF1A",
        categoryText
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uc-empty", children: "\u8F93\u5165\u6570\u503C\u4E0E\u5355\u4F4D\u540E\u663E\u793A\u7ED3\u679C" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-hist", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uc-hist-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-hist-title", children: "\u6700\u8FD1\u6362\u7B97" }),
        history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "uc-hist-clear", onClick: onClear, children: "\u6E05\u7A7A" })
      ] }),
      history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-empty", children: "\u6682\u65E0\u8BB0\u5F55\u3002\u6BCF\u6B21\u6709\u6548\u7684\u6362\u7B97\u4F1A\u81EA\u52A8\u5B58\u5165\uFF08\u672C\u5730\u6D4F\u89C8\u5668\uFF09\u3002" }) : history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "uc-hist-item", onClick: () => onPick(h), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.summary }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uc-hist-time", children: new Date(h.ts).toLocaleTimeString() })
      ] }, `${h.ts}-${h.from}-${h.to}`))
    ] })
  ] });
}

// src/client/locales.ts
var NS = "unit-conversion";
var zh = {
  "view.tab": "\u5355\u4F4D\u6362\u7B97",
  "view.aria": "\u6253\u5F00\u5355\u4F4D\u6362\u7B97\u89C6\u56FE"
};
var en = {
  "view.tab": "Unit Converter",
  "view.aria": "Open the unit converter view"
};

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
    label: () => t("view.tab")
  }, UnitConvertView));
}

		return module.exports;
	}
});

