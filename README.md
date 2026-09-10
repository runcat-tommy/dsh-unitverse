# dsh-unitverse · 单位换算

[English](README.en.md) | 中文

> 名字来自 **unit + universe**：把十类单位收进同一个"单位宇宙"。视图标签仍叫「**单位换算**」，模型调用的工具仍是 `convert`。

**DeepSeek Harness (DSH) 单位换算插件**：提供 `convert` 工具，在 **长度、面积、体积、时间、角度、速度、温度、压力、热量/能量、功率** 十大类单位之间换算，支持英文符号、英文全称与中文名称，大小写不敏感，内置温度温标与温差（Δ）双模式。

## 界面预览

中文界面 —— 十个类别各自独立成模块，只显示本类别的单位：

![单位换算视图（中文界面）](assets/preview-zh.jpg)

英文界面 —— 界面文案、类别名与单位名称全部为英文：

![Unit Converter view (English UI)](assets/preview-en.jpg)

## 特性

- ✅ 覆盖 10 个大类、80+ 个常用单位（公制、英制/美制、常用中国市制）
- ✅ 单位写法宽容：`km` / `KM` / `kilometer` / `千米` / `公里` 全部识别
- ✅ 温度支持绝对温标换算（°C / °F / K / °R）与温差换算（`Δ°C` ↔ `Δ°F`）
- ✅ 纯 TypeScript 实现、零运行时依赖、无副作用，可单测
- ✅ 结果默认保留约 10 位有效数字，避免浮点噪声
- ✅ 非法单位 / 跨类换算返回明确错误，便于模型自我纠正
- ✅ 提供 **Web 交互界面**：「单位换算」视图与「对话」「轨迹」并列显示在会话正文的标签栏中；按 10 个类别分为独立模块，不会把不同类别的单位混在一起；界面文案与**单位名称**完整跟随 DSH 中/英文界面语言（v0.1.0 起，需 DeepSeek Harness 0.1.0-rc.6+ 的 Web GUI）

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
dsh plugin --profile <profile名> add ./dsh-unitverse

# 或从 GitHub 安装（构建产物随仓库提供，无需 allowBuilds）
dsh plugin --profile <profile名> add github:runcat-tommy/dsh-unitverse
```

`package.json` 中声明了 `dsh.bundle`，因此 `dsh plugin add` 会自动把它加入 profile 的 bundle 列表并激活 `cordis.patch.yml` 中定义的插件行。

> 该插件同时提供浏览器端（client）部分：`dsh.client` 声明 + `exports["./client"]` 的 `lib/client.js`。安装到带 Web GUI 的 profile 后，会话视图顶部会出现「单位换算」标签页（见下文 **Web 换算视图**）。若在非 GUI（纯命令行）profile 中安装，客户端部分不会被加载，不影响工具功能。

## Web 换算视图（v0.1.0+）

安装并重启 DSH（`dsh web` 等 GUI 进程）后，打开任意会话，在视图标签栏中「对话 / 轨迹」旁边即可看到新增的 **「单位换算」** 标签：

- **按类别分模块**：面板顶部是 10 个类别标签 —— 长度换算 / 面积换算 / 体积换算 / 时间换算 / 角度换算 / 速度换算 / 温度换算 / 压力换算 / 热量换算 / 功率换算。切换标签即切换到该类别，**只显示本类别的单位**，不同类别的单位绝不会混在一起，因此不可能产生"跨类别"的错误换算；切换类别时自动带入该类别常用的单位对（如 长度 → km ↔ mi）。
- **单位下拉选择**：源单位/目标单位从下拉列表中选择（显示 `符号 · 单位名称`），不需要手打单位名，也不会拼错。
- **结果即时显示**：输入数值后立刻得到结果，大号数字 + 单位 + 换算等式 + 类别徽章，可一键**复制**结果。
- **一键 ⇄ 交换**源/目标单位。
- **温度模块**额外提供 **温差 Δ** 开关：关闭时按绝对温标换算（`°C → °F`），打开时按温差换算（`Δ°C → Δ°F`），并有说明文字提示。
- **最近换算**按类别分别保存（浏览器 localStorage），点击任意记录即可回填复用，也可一键清空本类别记录。
- **完整跟随 DSH 界面语言**：界面在中文环境下所有文案（含**单位名称**，如「千米」「摄氏度」）均为中文；切到英文环境则全部为英文（"kilometer"、"degree Celsius"），包括类别名与切换按钮，切换语言时面板即时刷新，历史记录也随之切换语言。
- 视图为**纯前端实现**：换算核心被打包进 `lib/client.js`，换算过程不经过模型或服务器。

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
import { convert, convertDetailed } from 'dsh-unitverse'

convert(100, 'km', 'mi')                 // 62.13711922
convert(25, '°C', '°F')                  // 77
convert(1, 'Δ°C', 'Δ°F')                 // 1.8（温差）
convertDetailed(3, '公里/小时', 'm/s')   // { result: 0.833..., summary: '...' }
```

> 注意：`src/index.ts` 是 DSH 插件入口（依赖 `@deepseek-ai/cordis` 与 `@deepseek-ai/dsh-tools`）；`src/convert.ts` + `src/units.ts` 是无宿主依赖的核心库。

## 开发

```bash
npm install
npm test          # vitest 全量测试（含各类换算、别名、温度、边界、插件注册、client 冒烟）
npm run typecheck # tsc --noEmit
npm run build     # tsup 构建 lib/（ESM+CJS+d.ts），随后 scripts/build-client.mjs 产出 lib/client.js
```

## 仓库结构

```
src/units.ts             单位表与别名索引（唯一事实来源）
src/convert.ts           换算引擎：解析、换算、温度/温差、精度、错误
src/index.ts             DSH 插件入口（服务端/CLI 侧）：注册 convert 工具
src/client/              Web 客户端插件（浏览器侧）：
                           index.tsx          注册 conversation.view 视图条目
                           UnitConvertView.tsx  换算面板组件（纯前端核心）
                           locales.ts         中/英界面文案
scripts/build-client.mjs esbuild 打包 lib/client.js（ModuleLoader lazy-CJS 格式）
test/                    Vitest 测试（含 lib/client.js 冒烟测试）
cordis.patch.yml         DSH bundle 补丁层
lib/                     构建产物（随仓库提交，便于 GitHub 直接安装）
```

`src/convert.ts` + `src/units.ts` 是无宿主依赖的核心库：既被服务端工具使用，也会被打包进浏览器端 `lib/client.js`（换算完全在浏览器本地完成）。

## 许可证

[MIT](LICENSE)
