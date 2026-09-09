import {
  ALIAS_INDEX,
  CATEGORIES,
  CATEGORY_ORDER,
  DELTA_MARKERS,
  UNITS,
  UnitConversionError,
  buildAliasIndex,
  convert,
  convertDetailed,
  convertRaw,
  findUnit,
  normalizeUnit,
  parseRequest,
  resolveUnit,
  roundSignificant,
  stripDeltaMarker,
  unitsByCategory
} from "./chunk-KLTLDDLU.js";

// src/index.ts
import { defineTool } from "@deepseek-ai/dsh-tools";
var name = "unit-conversion";
var inject = ["tools"];
var CATEGORY_PREVIEWS = {
  length: "m, km, cm, mm, um, nm, in, ft, yd, mi, nmi; \u7C73/\u5343\u7C73/\u82F1\u91CC/\u82F1\u5C3A/\u82F1\u5BF8\u2026",
  area: "m2, km2, cm2, mm2, ha, acre, mu(\u4EA9); \u5E73\u65B9\u7C73/\u516C\u9877/\u4EA9/\u82F1\u4EA9\u2026",
  volume: "m3, l, ml, cm3, in3, ft3, gal(US), gal(UK), bbl; \u7ACB\u65B9\u7C73/\u5347/\u6BEB\u5347/\u52A0\u4ED1\u2026",
  time: "s, ms, min, h, d, wk, mo, yr; \u79D2/\u5206\u949F/\u5C0F\u65F6/\u5929/\u5468/\u6708/\u5E74\u2026",
  angle: "rad, deg(\xB0), grad, arcmin, arcsec, turn; \u5F27\u5EA6/\u5EA6/\u89D2\u5206/\u89D2\u79D2\u2026",
  speed: "m/s, km/h, mph, kn(knot), ft/s; \u7C73\u6BCF\u79D2/\u5343\u7C73\u6BCF\u5C0F\u65F6/\u8282\u2026",
  temperature: "C(\xB0C), F(\xB0F), K, R(\xB0R); \u6444\u6C0F\u5EA6/\u534E\u6C0F\u5EA6/\u5F00\u5C14\u6587\u2026",
  pressure: "pa, kpa, mpa, hpa, bar, atm, psi, torr, mmhg, inhg; \u5E15/\u5343\u5E15/\u5146\u5E15/\u5DF4/\u6807\u51C6\u5927\u6C14\u538B\u2026",
  energy: "j, kj, mj, cal, kcal, wh, kwh, btu; \u7126\u8033/\u5343\u7126/\u5361\u8DEF\u91CC/\u5343\u5361/\u5343\u74E6\u65F6\u2026",
  power: "w, kw, mw, gw, hp, ps; \u74E6/\u5343\u74E6/\u5146\u74E6/\u9A6C\u529B\u2026"
};
var DESCRIPTION = `Universal unit converter across ten categories: length, area, volume, time, angle, speed, temperature, pressure, energy/heat and power. Unit tokens are case-insensitive and accept English names, symbols and Chinese names \u2014 e.g. 'km'/'KM'/'kilometer'/'\u5343\u7C73'/'\u516C\u91CC' are all length units, and '\u516C\u91CC/\u5C0F\u65F6' or 'km/h' are speeds. Supported units: ${CATEGORY_ORDER.map((id) => `${CATEGORIES[id].labelZh}(${id}): ${CATEGORY_PREVIEWS[id]}`).join(" | ")}. Both units must belong to the same category. Temperature is converted as an absolute scale by default (e.g. 25 \xB0C -> \xB0F). For a temperature *difference*, prefix BOTH unit tokens with "\u0394" or "delta" (e.g. value=10, from='\u0394\xB0C', to='\u0394\xB0F' means a 10-degree-Celsius interval equals 18 \xB0F). You cannot mix an absolute and a \u0394 token in one call. Unknown units produce an error naming the token; retry with a listed spelling.`;
function apply(ctx) {
  ctx.tools.register(defineTool({
    name: "convert",
    description: DESCRIPTION,
    parameters: {
      value: {
        type: "number",
        required: true,
        description: "The numeric amount to convert (finite number)."
      },
      from: {
        type: "string",
        required: true,
        description: "Source unit token: symbol, English or Chinese name (case-insensitive)."
      },
      to: {
        type: "string",
        required: true,
        description: "Target unit token: symbol, English or Chinese name (case-insensitive)."
      }
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          value: { type: "number", required: true, description: "Original input value." },
          from: { type: "string", required: true, description: "Resolved source unit." },
          to: { type: "string", required: true, description: "Resolved target unit." },
          result: { type: "number", required: true, description: "Converted value." },
          category: { type: "string", required: true, description: "Category id, e.g. length." },
          categoryZh: { type: "string", required: true, description: "Category name in Chinese." },
          summary: { type: "string", required: true, description: "Human-readable result line." }
        }
      },
      render: (_args, value) => [{ type: "text", text: value.summary }]
    },
    async execute(args) {
      return convertDetailed(args.value, args.from, args.to);
    }
  }));
}
export {
  ALIAS_INDEX,
  CATEGORIES,
  CATEGORY_ORDER,
  DELTA_MARKERS,
  UNITS,
  UnitConversionError,
  apply,
  buildAliasIndex,
  convert,
  convertDetailed,
  convertRaw,
  findUnit,
  inject,
  name,
  normalizeUnit,
  parseRequest,
  resolveUnit,
  roundSignificant,
  stripDeltaMarker,
  unitsByCategory
};
