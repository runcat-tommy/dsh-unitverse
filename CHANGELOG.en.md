# Changelog

This project follows [Semantic Versioning](https://semver.org/). Chinese version: [CHANGELOG.md](CHANGELOG.md).

## [1.1.0] - 2026-09-10

The web converter view kept working, but the model-facing `convert` tool **rejected every single call** since 0.1.0 because of host output validation. This release fixes that blocking defect and repairs the temperature-difference (Δ) output and error text.

### Fixed

- **The `convert` tool could not be called at all**: the output schema declared only 7 properties while the engine returned 10 (it also returns `categoryEn`, `fromInput`, `toInput`), so under `additionalProperties: false` every call was rejected by the host with "returned invalid output". All three properties are now declared, keeping the caller's original spelling in the echo.
- **The Δ marker was dropped from a difference `summary`**: `10 Δ°C → Δ°F` used to read `10 °C = 18 °F`, i.e. it looked like an absolute-scale equality (the absolute `10 °C` is `50 °F`). Echoed units and `summary` now keep the marker: `10 Δ°C = 18 Δ°F (温度)`.
- **The absolute/Δ mismatch error doubled the marker into `ΔΔ`**: `Δ°C → K` used to suggest `use ΔΔ°C and K consistently` (`ΔΔ°C` is not a valid unit) and offered only one repair. It now prefixes `Δ` only to the side that lacks it and names both repairs: `use both with the Δ marker (Δ°C, ΔK) or both absolute (°C, K)`.
- Stray trailing space in the unknown-unit error message.
- Stale delta example in the core JSDoc, `convert(1, 'Δ°C', '°F')` → `convert(1, 'Δ°C', 'Δ°F')`. The original call is rejected as `mixed-delta`, and the comment ships inside `lib/*.d.ts`, so it handed library consumers a wrong example.

### Changed

- Echoed unit names for a difference conversion now carry the `Δ` prefix (`from` / `to` fields and `summary`), which tells an interval apart from an absolute reading. The web view is unaffected — it builds its own display strings and never reads `summary`.
- Tests grew from 88 to 92: a regression assertion that the output schema and the returned key set stay identical (so a missing declaration can never silently break the tool again), plus dedicated assertions for the delta echo and the non-doubled error hint.

### Docs

- `README.md` / `README.en.md`: document the full `convert` result shape (10 fields) and the delta echo / dual-repair error behaviour.

### Release

- npm: `dsh-unitverse@1.1.0`
- GitHub: https://github.com/runcat-tommy/dsh-unitverse

## [0.1.0] - 2026-09-10

First release.

### Added

- **`convert` tool**: converts across ten categories — length, area, volume, time, angle, speed, temperature, pressure, energy/heat and power — with 80+ common units (metric, imperial/US customary, common Chinese units).
- **Lenient unit spelling**: `km` / `KM` / `kilometer` / `千米` / `公里` all resolve; matching is case-insensitive and accepts symbols, English full names and Chinese names.
- **Two temperature modes**: absolute scales (°C / °F / K / °R) and temperature differences (`Δ°C` ↔ `Δ°F`); mixing the two is rejected with a clear error.
- **Web converter view** "单位换算 / Unit Converter": renders next to Conversation / Trajectory in the session view tab bar and runs purely in the browser (the conversion core is bundled into `lib/client.js`, so no model or server round-trip is involved).
  - One module per category: ten category tabs, and each module **only lists its own category's units**, so units are never mixed.
  - Units are picked from dropdowns (`symbol · name`) — nothing has to be typed; one-click swap and one-click copy of the result.
  - The temperature module adds a **difference Δ switch**; recent conversions are stored per category in browser localStorage.
  - All copy, **unit names included**, follows the DSH zh/en UI language and refreshes the moment the language changes.
- Results are rounded to ~10 significant digits by default; unknown units and cross-category requests return structured errors (`unknown-unit` / `category-mismatch` / `bad-value` / `mixed-delta`).

### Changed

- Renamed the plugin to **`dsh-unitverse`** (formerly `dsh-unit-conversion`; unit + universe). The tool is still `convert` and the view tab is still "单位换算 / Unit Converter".

### Release

- npm: `dsh-unitverse@0.1.0` (first publish; previously GitHub source only)
- GitHub: https://github.com/runcat-tommy/dsh-unitverse
- The browser half ships through the `dsh.client` declaration plus `exports["./client"]`; when it is not loaded, the tool keeps working unchanged.
