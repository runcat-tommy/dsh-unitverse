# dsh-unit-conversion

English | [中文](README.md)

A **DeepSeek Harness (DSH) unit conversion plugin** exposing one `convert` tool
across **length, area, volume, time, angle, speed, temperature, pressure,
energy/heat and power**, with case-insensitive English and Chinese unit names,
plus both absolute-temperature and temperature-difference (Δ) modes.

## Features

- ✅ 10 categories, 80+ common units (metric, imperial/US customary, common Chinese units)
- ✅ Lenient unit spelling: `km` / `KM` / `kilometer` / `千米` / `公里` all resolve
- ✅ Absolute temperature (°C / °F / K / °R) and temperature difference (`Δ°C` ↔ `Δ°F`)
- ✅ Pure TypeScript, zero runtime dependencies, side-effect free and unit-testable
- ✅ Results rounded to ~10 significant digits by default
- ✅ Clear errors for unknown units or cross-category requests

## Supported categories and units

| Category | Base | Units (symbols) |
| --- | --- | --- |
| length | m | nm, μm, mm, cm, m, km, in, ft, yd, mi, nmi, 里 (li), 尺 (chi) |
| area | m² | mm², cm², m², km², ha, 亩 (mu), in², ft², yd², acre, mi² |
| volume | m³ | mL, L, m³, cm³, in³, ft³, yd³, gal (US), gal (UK), qt (US), bbl |
| time | s | ms, s, min, h, d, wk, mo, yr |
| angle | rad | rad, ° (deg), grad, ′ (arcmin), ″ (arcsec), turn |
| speed | m/s | m/s, km/h, mph, kn (knot), ft/s |
| temperature | K | °C, °F, K, °R (Δ prefix available for differences) |
| pressure | Pa | Pa, kPa, MPa, hPa, bar, atm, psi, Torr, mmHg, inHg |
| energy | J | J, kJ, MJ, cal, kcal, Wh, kWh, BTU |
| power | W | W, kW, MW, GW, hp, PS |

Every unit also accepts its **English full name (including plurals) and its
Chinese name** as aliases — e.g. `ft`, `foot`, `feet` and `英尺` are the same unit.

## Installation

Install it as a DSH bundle (local checkout, tarball or GitHub all work):

```bash
# From a local checkout
dsh plugin --profile <profile-name> add ./dsh-unit-conversion

# Or from GitHub (build artifacts are committed, so no allowBuilds needed)
dsh plugin --profile <profile-name> add github:runcat-tommy/dsh-unit-conversion
```

`package.json` declares `dsh.bundle`, so `dsh plugin add` registers the plugin
row from `cordis.patch.yml` automatically.

## Usage

Once installed, the model can call the `convert` tool:

```text
convert(value=100, from="km", to="mi")   -> 62.13711922 mi
```

Tool parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | number | yes | The numeric amount (finite number) |
| `from` | string | yes | Source unit: symbol / English / Chinese, case-insensitive |
| `to` | string | yes | Target unit: symbol / English / Chinese, case-insensitive |

Returns a structured result: `{ value, from, to, result, category, categoryZh, summary }`.

### Examples

```
"Convert 100 km to miles"
→ convert(100, "km", "mi") → summary: "100 km = 62.13711922 mi (length)"

"How many cm is 5 feet?"
→ convert(5, "feet", "cm") → summary: "5 feet = 152.4 cm (length)"

"36 km/h to m/s"     → convert(36, "km/h", "m/s")     → 10
"1 atm to kPa"       → convert(1, "atm", "kPa")       → 101.325
"212 °F to °C"       → convert(212, "°F", "°C")       → 100
```

### Temperature differences (Δ)

Temperature converts as an **absolute scale** by default. For a temperature
*difference*, prefix BOTH units with `Δ` or `delta`:

```
"What is a 1 °C temperature interval in °F?"
→ convert(1, "Δ°C", "Δ°F") → 1.8
```

Mixing an absolute and a Δ unit (e.g. `Δ°C` → `K`) is rejected to avoid
ambiguous "degrees Kelvin"-style semantics.

## Precision and conventions

- Results round to ~**10 significant digits** by default; the core `convert()`
  accepts a `significantDigits` option (1–15).
- `cal` is the thermochemical calorie (1 cal = 4.184 J); use `kcal` / `大卡`
  for the food "Calorie".
- `BTU` is the International Table BTU (1 BTU = 1055.05585262 J).
- `yr` (year) is the Julian year of 365.25 days; `mo` (month) = year / 12.
- The Chinese character 度 means degrees (angle); write 千瓦时 for kWh
  (avoid ambiguity with 度).
- Chinese 分/秒 in a time context map to `min`/`s`; use `arcmin`/`arcsec`
  (角分/角秒) for angular minutes/seconds.

## Using the core library directly

The conversion core is a zero-dependency pure module:

```ts
import { convert, convertDetailed } from 'dsh-unit-conversion'

convert(100, 'km', 'mi')                 // 62.13711922
convert(25, '°C', '°F')                  // 77
convert(1, 'Δ°C', 'Δ°F')                 // 1.8 (temperature difference)
convertDetailed(3, 'km/h', 'm/s')        // { result: 0.833..., summary: '...' }
```

> `src/index.ts` is the DSH plugin entry (depends on `@deepseek-ai/cordis` and
> `@deepseek-ai/dsh-tools`); `src/convert.ts` + `src/units.ts` form the
> host-independent core library.

## Development

```bash
npm install
npm test          # full vitest suite (conversions, aliases, temperature, edges, plugin registration)
npm run typecheck # tsc --noEmit
npm run build     # tsup -> lib/ (ESM + CJS + d.ts; artifacts are committed so GitHub installs work)
```

## Repository layout

```
src/units.ts     unit tables and alias index (single source of truth)
src/convert.ts   conversion engine: parsing, converting, temperature/Δ, precision, errors
src/index.ts     DSH plugin entry: registers the convert tool
test/            Vitest tests
cordis.patch.yml DSH bundle patch layer
lib/             tsup build output (committed so GitHub installs need no build)
```

## License

[MIT](LICENSE)
