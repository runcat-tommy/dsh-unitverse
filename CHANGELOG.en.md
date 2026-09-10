# Changelog

This project follows [Semantic Versioning](https://semver.org/). Chinese version: [CHANGELOG.md](CHANGELOG.md).

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
