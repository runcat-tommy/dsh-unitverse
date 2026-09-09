# dsh-unit-conversion · 单位换算

[English](README.en.md) | 中文

**DeepSeek Harness (DSH) 单位换算插件**：提供 `convert` 工具，在 **长度、面积、体积、时间、角度、速度、温度、压力、热量/能量、功率** 十大类单位之间换算，支持英文符号、英文全称与中文名称，大小写不敏感，内置温度温标与温差（Δ）双模式。

## 特性

- ✅ 覆盖 10 个大类、80+ 个常用单位（公制、英制/美制、常用中国市制）
- ✅ 单位写法宽容：`km` / `KM` / `kilometer` / `千米` / `公里` 全部识别
- ✅ 温度支持绝对温标换算（°C / °F / K / °R）与温差换算（`Δ°C` ↔ `Δ°F`）
- ✅ 纯 TypeScript 实现、零运行时依赖、无副作用，可单测
- ✅ 结果默认保留约 10 位有效数字，避免浮点噪声
- ✅ 非法单位 / 跨类换算返回明确错误，便于模型自我纠正

## 支持的类别与单位

| 类别 | 基准单位 | 支持单位（符号） |
| --- | --- | --- |
| 长度 length | m | nm, μm, mm, cm, m, km, in, ft, yd, mi, nmi, 里, 尺 |
| 面积 area | m² | mm², cm², m², km², ha, 亩, in², ft², yd², acre, mi² |
| 体积 volume | m³ | mL, L, m³, cm³, in³, ft³, yd³, gal(US), gal(UK), qt(US), bbl |
| 时间 time | s | ms, s, min, h, d, wk, mo, yr |
| 角度 angle | rad | rad, °(deg), grad, ′(arcmin), ″(arcsec), turn |
| 速度 speed | m/s | m/s, km/h, mph, kn(knot), ft/s |
| 温度 temperature | K | °C, °F, K, °R（另支持温差 Δ 前缀） |
| 压力 pressure | Pa | Pa, kPa, MPa, hPa, bar, atm, psi, Torr, mmHg, inHg |
| 热量/能量 energy | J | J, kJ, MJ, cal, kcal, Wh, kWh, BTU |
| 功率 power | W | W, kW, MW, GW, hp, PS |

每个单位同时接受 **英文符号、英文全称（含复数）、中文名称** 作为输入别名，例如 `ft` / `foot` / `feet` / `英尺` 是同一单位。

## 安装

作为 DSH bundle 安装（本地目录、tarball 或 GitHub 均支持）：

```bash
# 从本地 checkout 安装
dsh plugin --profile <profile名> add ./dsh-unit-conversion

# 或从 GitHub 安装（构建产物随仓库提供，无需 allowBuilds）
dsh plugin --profile <profile名> add github:runcat-tommy/dsh-unit-conversion
```

`package.json` 中声明了 `dsh.bundle`，因此 `dsh plugin add` 会自动把它加入 profile 的 bundle 列表并激活 `cordis.patch.yml` 中定义的插件行。

## 使用方法

安装后，模型可调用工具 `convert`：

```text
convert(value=100, from="km", to="mi")   -> 62.13711922 mi
```

工具参数：

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `value` | number | 是 | 要换算的数值（有限数） |
| `from` | string | 是 | 源单位：符号 / 英文 / 中文，大小写不敏感 |
| `to` | string | 是 | 目标单位：符号 / 英文 / 中文，大小写不敏感 |

返回结构化结果：`{ value, from, to, result, category, categoryZh, summary }`。

### 示例（模型会话）

```
把 100 公里换成英里
→ convert(100, "公里", "英里") → summary: "100 公里 = 62.13711922 英里 (长度)"

5 feet 是多少厘米
→ convert(5, "feet", "cm") → summary: "5 feet = 152.4 cm (长度)"

36 km/h 换成 m/s
→ convert(36, "km/h", "m/s") → 10

1 atm 是多少 kPa
→ convert(1, "atm", "kPa") → 101.325

212 °F 是多少 °C
→ convert(212, "°F", "°C") → 100
```

### 温度温差（Δ）

温度默认按**绝对温标**换算。若想换算**温差**，给两个单位都加上 `Δ` 或 `delta` 前缀：

```
1 °C 的温差 = 多少 °F 温差？
→ convert(1, "Δ°C", "Δ°F") → 1.8
```

绝对温标与 Δ 温差不可混用（例如 `Δ°C` → `K` 会被拒绝），以避免"开氏度"式的歧义。

## 精度与约定

- 结果默认舍入到约 **10 位有效数字**；核心库 `convert()` 支持 `{ significantDigits }` 选项（1–15）。
- `cal` 采用热化学卡路里（1 cal = 4.184 J）；如需食品营养意义上的"大卡"，请使用 `kcal` / `大卡`。
- `BTU` 采用国际表英热单位（1 BTU = 1055.05585262 J）。
- `yr`（年）采用儒略年 365.25 天；`mo`（月）= 年/12。
- 中文"度"指角度（degree）；"千瓦时"请写作 `kWh` / `千瓦时`（避免与角度"度"歧义）。
- 中文"分/秒"在时间语境对应 `min`/`s`；角度分秒请用 `arcmin`/`arcsec` 或 `角分`/`角秒`。

## 从代码中直接使用核心库

换算核心是零依赖纯模块，可直接复用：

```ts
import { convert, convertDetailed } from 'dsh-unit-conversion'

convert(100, 'km', 'mi')                 // 62.13711922
convert(25, '°C', '°F')                  // 77
convert(1, 'Δ°C', 'Δ°F')                 // 1.8（温差）
convertDetailed(3, '公里/小时', 'm/s')   // { result: 0.833..., summary: '...' }
```

> 注意：`src/index.ts` 是 DSH 插件入口（依赖 `@deepseek-ai/cordis` 与 `@deepseek-ai/dsh-tools`）；`src/convert.ts` + `src/units.ts` 是无宿主依赖的核心库。

## 开发

```bash
npm install
npm test          # vitest 全量测试（含各类换算、别名、温度、边界、插件注册）
npm run typecheck # tsc --noEmit
npm run build     # tsup 构建 lib/（ESM + CJS + d.ts，构建产物随仓库提交以便 git 安装）
```

## 仓库结构

```
src/units.ts     单位表与别名索引（唯一事实来源）
src/convert.ts   换算引擎：解析、换算、温度/温差、精度、错误
src/index.ts     DSH 插件入口：注册 convert 工具
test/            Vitest 测试
cordis.patch.yml DSH bundle 补丁层
lib/             tsup 构建产物（随仓库提交，便于 GitHub 直接安装）
```

## 许可证

[MIT](LICENSE)
